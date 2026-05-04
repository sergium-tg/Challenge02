import React, { useState, useEffect } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonInput, IonItem,
  IonLabel, IonButton, IonTextarea, IonButtons, IonBackButton, IonNote
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { Tarea } from '../models/Tarea';

const API_URL = 'http://localhost:3000/tareas';

const EditarTarea: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [form, setForm] = useState<Partial<Tarea>>({ titulo: '', descripcion: '', estado: false });
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [savingData, setSavingData] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTarea = async () => {
      try {
        setLoadingData(true);
        const response = await axios.get<Tarea>(`${API_URL}/${id}`);
        setForm(response.data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar la tarea para edición:', err);
        setError('Error al cargar la tarea solicitada.');
      } finally {
        setLoadingData(false);
      }
    };
    fetchTarea();
  }, [id]);

  const handleGuardar = async () => {
    if (!form.titulo || form.titulo.trim() === '') return;

    try {
      setSavingData(true);
      setError(null);
      
      await axios.put(`${API_URL}/${id}`, form, {
        headers: { 'Content-Type': 'application/json' }
      });
      history.push('/tasks');
    } catch (err) {
      console.error('Error al actualizar tarea:', err);
      setError('Hubo un error al intentar actualizar la tarea.');
    } finally {
      setSavingData(false);
    }
  };

  if (loadingData) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start"><IonBackButton defaultHref="/tasks" /></IonButtons>
            <IonTitle>Editar Tarea</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-text-center">
          <IonNote>Cargando datos de la tarea...</IonNote>
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
          <IonTitle>Editar Tarea</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {error && <IonNote color="danger" className="ion-margin-bottom ion-padding-horizontal">{error}</IonNote>}
        <IonCard>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Título</IonLabel>
              <IonInput
                value={form.titulo}
                onIonChange={e => setForm({ ...form, titulo: e.detail.value! })}
                disabled={savingData}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Descripción</IonLabel>
              <IonTextarea
                value={form.descripcion}
                onIonChange={e => setForm({ ...form, descripcion: e.detail.value! })}
                disabled={savingData}
              />
            </IonItem>
            <div className="ion-margin-top">
              <IonButton expand="block" onClick={handleGuardar} disabled={savingData}>
                {savingData ? 'Actualizando...' : 'Actualizar Tarea'}
              </IonButton>
              <IonButton expand="block" color="medium" onClick={() => history.push('/tasks')} disabled={savingData}>
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