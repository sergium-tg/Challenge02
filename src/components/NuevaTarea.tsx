import React, { useState } from 'react';
import { 
  IonCard, IonCardContent, IonInput, IonItem, 
  IonLabel, IonButton, IonTextarea, IonCardHeader, IonCardTitle 
} from '@ionic/react';
import { Tarea } from '../models/Tarea';

interface NuevaTareaProps {
  proximoId: number;
  onAgregar: (nueva: Tarea) => void;
  onCancelar: () => void;
}

const NuevaTarea: React.FC<NuevaTareaProps> = ({ proximoId, onAgregar, onCancelar }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleGuardar = () => {
    if (titulo.trim() === '') return;

    const nueva: Tarea = {
      id: proximoId,
      titulo: titulo,
      descripcion: descripcion,
      estado: false
    };

    onAgregar(nueva);
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Nueva Tarea (ID: {proximoId})</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem>
          <IonLabel position="stacked">Título</IonLabel>
          <IonInput 
            placeholder="¿Qué hay que hacer?" 
            value={titulo} 
            onIonChange={e => setTitulo(e.detail.value!)} 
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonTextarea 
            placeholder="Detalles adicionales..." 
            value={descripcion} 
            onIonChange={e => setDescripcion(e.detail.value!)} 
          />
        </IonItem>

        <div style={{ marginTop: '20px' }}>
          <IonButton expand="block" onClick={handleGuardar}>Crear Tarea</IonButton>
          <IonButton expand="block" color="light" onClick={onCancelar}>Cancelar</IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default NuevaTarea;