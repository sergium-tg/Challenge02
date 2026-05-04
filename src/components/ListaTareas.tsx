import React, { useEffect, useState } from 'react';
import { IonList, IonNote, IonListHeader, IonLabel, IonSpinner } from '@ionic/react';
import axios from 'axios';
import LaTarea from './LaTarea';
import { Tarea } from '../models/Tarea';

const API_URL = 'http://localhost:3000/tareas';

const ListaTareas: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTareas = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Tarea[]>(API_URL);
      setTareas(response.data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar tareas', err);
      setError('Error al cargar la lista de tareas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTareas();
  }, []);

  if (loading) {
    return (
      <div className="ion-padding ion-text-center">
        <IonSpinner name="crescent" />
        <IonNote style={{ display: 'block', marginTop: '10px' }}>Cargando tareas...</IonNote>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ion-padding ion-text-center">
        <IonNote color="danger">{error}</IonNote>
      </div>
    );
  }

  if (!tareas || tareas.length === 0) {
    return (
      <div className="ion-padding ion-text-center">
        <IonNote>No hay tareas pendientes</IonNote>
      </div>
    );
  }

  return (
    <IonList>
      <IonListHeader>
        <IonLabel>Tus Tareas</IonLabel>
      </IonListHeader>
      {tareas.map((tarea: Tarea) => (
        <LaTarea key={tarea.id} tarea={tarea} onUpdate={fetchTareas} />
      ))}
    </IonList>
  );
};

export default ListaTareas;