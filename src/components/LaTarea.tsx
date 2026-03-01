import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonFooter, useIonAlert } from '@ionic/react';
import { Tarea } from '../models/Tarea';

interface LaTareaProps {
  tarea: Tarea;
  onCerrar: () => void;
  onEliminar: (id: number) => void;
  onEditar: () => void;
}

const LaTarea: React.FC<LaTareaProps> = ({ tarea, onCerrar, onEliminar, onEditar }) => {
  const [presentAlert] = useIonAlert();

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Detalles de la Tarea ID: {tarea.id}</IonCardSubtitle>
          <IonCardTitle>{tarea.titulo}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p><strong>Descripción:</strong> {tarea.descripcion}</p>
          <p><strong>Estado actual:</strong> {tarea.estado ? "Completada" : "Pendiente"}</p>
        </IonCardContent>
      </IonCard>

      <IonFooter className="ion-padding">
        <IonButton expand="block" color="primary" onClick={onEditar}>MODIFICAR</IonButton>
        <IonButton expand="block" color="danger" onClick={() => {
          presentAlert({
            header: 'Confirmar',
            message: '¿Deseas eliminar esta tarea?',
            buttons: [
              { text: 'NO', role: 'cancel' },
              { text: 'SÍ', handler: () => onEliminar(tarea.id) }
            ]
          })
        }}>ELIMINAR</IonButton>
        <IonButton expand="block" fill="clear" onClick={onCerrar}>VOLVER AL LISTADO</IonButton>
      </IonFooter>
    </>
  );
};

export default LaTarea;