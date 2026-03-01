import React, { useState } from 'react';
import { 
  IonCard, IonCardContent, IonInput, IonItem, 
  IonLabel, IonButton, IonTextarea, IonSelect, IonSelectOption 
} from '@ionic/react';
import { Tarea } from '../models/Tarea';

interface EditarTareaProps {
  tarea: Tarea;
  onGuardar: (tareaEditada: Tarea) => void;
  onCancelar: () => void;
}

const EditarTarea: React.FC<EditarTareaProps> = ({ tarea, onGuardar, onCancelar }) => {
  const [form, setForm] = useState<Tarea>({ ...tarea });

  return (
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

        <IonItem>
          <IonLabel position="stacked">Estado de la Tarea</IonLabel>
          <IonSelect 
            value={form.estado} 
            interface="popover"
            onIonChange={e => setForm({...form, estado: e.detail.value})}
          >
            <IonSelectOption value={false}>Pendiente</IonSelectOption>
            <IonSelectOption value={true}>Completada</IonSelectOption>
          </IonSelect>
        </IonItem>
        
        <div style={{ marginTop: '20px' }}>
          <IonButton expand="block" onClick={() => onGuardar(form)}>
            Guardar Cambios
          </IonButton>
          <IonButton expand="block" color="light" onClick={onCancelar}>
            Cancelar
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default EditarTarea;