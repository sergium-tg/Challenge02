import React, { useState } from 'react';
import {
  IonCard, IonCardTitle, IonCardContent,
  IonButton, IonIcon, IonItem, IonLabel, IonCheckbox, IonSpinner
} from '@ionic/react';
import { createOutline, trashOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Tarea } from '../models/Tarea';

interface LaTareaProps {
  tarea: Tarea;
  onUpdate?: () => void;
}

const API_URL = 'http://localhost:3000/tareas';

const LaTarea: React.FC<LaTareaProps> = ({ tarea, onUpdate }) => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);

  const handleViewDetail = () => history.push(`/tasks/detail/${tarea.id}`);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    history.push(`/tasks/edit/${tarea.id}`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${tarea.id}`);
      if (onUpdate) onUpdate(); // Refrescar la lista superior
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Hubo un error al intentar borrar la tarea');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (e: any) => {
    e.stopPropagation();
    try {
      setLoading(true);
      // Mapeo: Invertimos el campo booleano 'estado' actual y enviamos toda la estructura por PUT
      const tareaActualizada = { ...tarea, estado: !tarea.estado };
      await axios.put(`${API_URL}/${tarea.id}`, tareaActualizada, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (onUpdate) onUpdate(); // Refrescar la lista superior
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      alert('Hubo un error al cambiar el estado de la tarea');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonCard>
      <IonItem lines="none">
        {loading ? (
          <IonSpinner slot="start" name="dots" />
        ) : (
          <IonCheckbox slot="start" checked={tarea.estado} onIonChange={handleToggle} />
        )}

        <IonLabel onClick={handleViewDetail} style={{ cursor: 'pointer' }}>
          <IonCardTitle style={{ textDecoration: tarea.estado ? 'line-through' : 'none' }}>
            {tarea.titulo}
          </IonCardTitle>
        </IonLabel>
      </IonItem>

      <IonCardContent>
        <div onClick={handleViewDetail} style={{ cursor: 'pointer' }}>
          <p>{tarea.descripcion}</p>
        </div>

        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <IonButton fill="outline" color="primary" onClick={handleEdit} disabled={loading}>
            <IonIcon slot="icon-only" icon={createOutline} />
          </IonButton>
          <IonButton fill="outline" color="danger" onClick={handleDelete} disabled={loading}>
            <IonIcon slot="icon-only" icon={trashOutline} />
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default LaTarea;