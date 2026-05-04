import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonButton, IonIcon, IonButtons, IonBackButton, IonNote
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { createOutline } from 'ionicons/icons';
import { Tarea } from '../models/Tarea';

const API_URL = 'http://localhost:3000/tareas';

const DetalleTarea: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  
  const [tarea, setTarea] = useState<Tarea | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTarea = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Tarea>(`${API_URL}/${id}`);
        setTarea(response.data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar la tarea:', err);
        setError('Error al cargar los detalles de la tarea.');
      } finally {
        setLoading(false);
      }
    };
    fetchTarea();
  }, [id]);

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start"><IonBackButton defaultHref="/tasks" /></IonButtons>
            <IonTitle>Detalle de Tarea</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-text-center">
          <IonNote>Cargando detalles...</IonNote>
        </IonContent>
      </IonPage>
    );
  }

  if (error || !tarea) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start"><IonBackButton defaultHref="/tasks" /></IonButtons>
            <IonTitle>Detalle de Tarea</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-text-center">
          <IonNote color="danger">{error || 'Tarea no encontrada'}</IonNote>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>Detalle de Tarea</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{tarea.titulo}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p><strong>Descripción:</strong> {tarea.descripcion}</p>
            <p><strong>Estado:</strong> {tarea.estado ? 'Completada' : 'Pendiente'}</p>

            <IonButton
              expand="block"
              onClick={() => history.push(`/tasks/edit/${tarea.id}`)}
              className="ion-margin-top"
            >
              <IonIcon slot="start" icon={createOutline} />
              Editar esta tarea
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default DetalleTarea;