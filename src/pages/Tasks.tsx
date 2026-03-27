import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonInput, IonButtons, IonIcon } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import { ref, onValue, push, remove, update } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { dbRealtime, auth } from '../config/firebase';
import useNetwork from '../hooks/useNetwork';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [taskName, setTaskName] = useState('');
  const [taskDetail, setTaskDetail] = useState('');
  const { isOnline } = useNetwork();

  useEffect(() => {
    const tasksRef = ref(dbRealtime, 'tasks');
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      const loadedTasks = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setTasks(loadedTasks);
    });
    return () => unsubscribe();
  }, []);

  const addTask = () => {
    if (!taskName) return;
    push(ref(dbRealtime, 'tasks'), { name: taskName, detail: taskDetail, state: 'pendiente' });
    setTaskName(''); setTaskDetail('');
  };

  const toggleComplete = (task: any) => {
    if (!isOnline) return;
    update(ref(dbRealtime, `tasks/${task.id}`), { state: task.state === 'pendiente' ? 'completada' : 'pendiente' });
  };

  const deleteTask = (id: string) => {
    remove(ref(dbRealtime, `tasks/${id}`));
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tareas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout} color="danger">
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {!isOnline && <p style={{ color: 'red' }}>Sin conexión. Acciones deshabilitadas.</p>}
        
        <IonInput placeholder="Nombre Tarea" value={taskName} onIonChange={e => setTaskName(e.detail.value!)} />
        <IonInput placeholder="Detalle" value={taskDetail} onIonChange={e => setTaskDetail(e.detail.value!)} />
        <IonButton expand="block" onClick={addTask} disabled={!isOnline}>Agregar</IonButton>

        <IonList>
          {tasks.map(t => (
            <IonItem key={t.id} onClick={() => toggleComplete(t)} button>
              <IonLabel style={{ textDecoration: t.state === 'completada' ? 'line-through' : 'none' }}>
                {t.name} - {t.detail}
              </IonLabel>
              <IonButton slot="end" color="danger" onClick={(e) => { e.stopPropagation(); deleteTask(t.id); }} disabled={!isOnline}>Borrar</IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default Tasks;