import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonInput, IonItem,
  IonLabel, IonButton, IonTextarea, IonNote
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/tareas';

const NuevaTarea: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const history = useHistory();

  const handleGuardar = async () => {
    if (titulo.trim() === '') return;

    // Mapeo: Construimos el JSON respetando los campos propios (sin id, el servidor lo asigna).
    const nuevaTarea = {
      titulo: titulo,
      descripcion: descripcion,
      estado: false
    };

    try {
      setLoading(true);
      setError(null);
      await axios.post(API_URL, nuevaTarea, {
        headers: { 'Content-Type': 'application/json' }
      });
      history.push('/tasks');
    } catch (err) {
      console.error('Error al crear tarea:', err);
      setError('Hubo un error al guardar la nueva tarea.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nueva Tarea</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {error && <IonNote color="danger" className="ion-margin-bottom ion-padding-horizontal">{error}</IonNote>}
        <IonCard>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Título</IonLabel>
              <IonInput
                value={titulo}
                onIonChange={e => setTitulo(e.detail.value!)}
                disabled={loading}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Descripción</IonLabel>
              <IonTextarea
                value={descripcion}
                onIonChange={e => setDescripcion(e.detail.value!)}
                disabled={loading}
              />
            </IonItem>
            <div className="ion-margin-top">
              <IonButton expand="block" onClick={handleGuardar} disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar'}
              </IonButton>
              <IonButton expand="block" color="medium" onClick={() => history.push('/tasks')} disabled={loading}>
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