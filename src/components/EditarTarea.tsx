import React, { useState, useContext, useEffect } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonInput, IonItem,
  IonLabel, IonButton, IonTextarea, IonButtons, IonBackButton
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';

const EditarTarea: React.FC = () => {
  // Capturamos el ID de la tarea desde la URL
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  // Consumimos las tareas y la función para editar desde el Contexto
  const { tareas, editarTarea } = useContext(TaskContext);

  // Estado local para el formulario
  const [form, setForm] = useState<any>({ titulo: '', descripcion: '' });

  // Cuando el componente carga, buscamos la tarea correspondiente
  useEffect(() => {
    const tareaAEditar = tareas.find((t: any) => t.id === parseInt(id));
    if (tareaAEditar) {
      setForm(tareaAEditar);
    }
  }, [id, tareas]);

  const handleGuardar = () => {
    // Validamos que no esté vacío
    if (form.titulo.trim() === '') return;

    // Ejecutamos la función del contexto y regresamos a la lista
    editarTarea(form);
    history.push('/tasks');
  };

  return (
    <IonPage>
    <IonHeader>
    <IonToolbar>
    <IonButtons slot="start">
    <IonBackButton defaultHref="/tasks" />
    </IonButtons>
    <IonTitle>Editar Tarea</IonTitle>
    </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
    <IonCard>
    <IonCardContent>
    <IonItem>
    <IonLabel position="stacked">Título</IonLabel>
    <IonInput
    value={form.titulo}
    onIonChange={e => setForm({...form, titulo: e.detail.value!})}
    />
    </IonItem>
    <IonItem>
    <IonLabel position="stacked">Descripción</IonLabel>
    <IonTextarea
    value={form.descripcion}
    onIonChange={e => setForm({...form, descripcion: e.detail.value!})}
    />
    </IonItem>
    <div className="ion-margin-top">
    <IonButton expand="block" onClick={handleGuardar}>
    Actualizar Tarea
    </IonButton>
    <IonButton expand="block" color="medium" onClick={() => history.push('/tasks')}>
    Cancelar
    </IonButton>
    </div>
    </IonCardContent>
    </IonCard>
    </IonContent>
    </IonPage>
  );
};

export default EditarTarea;
