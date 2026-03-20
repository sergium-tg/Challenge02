import React, { useState, useContext } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonInput, IonItem,
  IonLabel, IonButton, IonTextarea
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';

const NuevaTarea: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  // Consumimos el estado y la función del Contexto
  const { tareas, agregarTarea } = useContext(TaskContext);
  const history = useHistory();

  const handleGuardar = () => {
    if (titulo.trim() === '') return;

    // Generamos un ID simple
    const proximoId = tareas.length > 0 ? Math.max(...tareas.map((t: any) => t.id)) + 1 : 1;

    const nueva = {
      id: proximoId,
      titulo: titulo,
      descripcion: descripcion,
      completada: false
    };

    agregarTarea(nueva);
    history.push('/tasks'); // Regresa a la lista
  };

  return (
    <IonPage>
    <IonHeader>
    <IonToolbar>
    <IonTitle>Nueva Tarea</IonTitle>
    </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
    <IonCard>
    <IonCardContent>
    <IonItem>
    <IonLabel position="stacked">Título</IonLabel>
    <IonInput
    value={titulo}
    onIonChange={e => setTitulo(e.detail.value!)}
    />
    </IonItem>
    <IonItem>
    <IonLabel position="stacked">Descripción</IonLabel>
    <IonTextarea
    value={descripcion}
    onIonChange={e => setDescripcion(e.detail.value!)}
    />
    </IonItem>
    <div className="ion-margin-top">
    <IonButton expand="block" onClick={handleGuardar}>Guardar</IonButton>
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

export default NuevaTarea;
