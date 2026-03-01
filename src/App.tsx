import React, { useState } from 'react';
import { 
  IonApp, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonPage, setupIonicReact, IonFab, IonFabButton, IonIcon 
} from '@ionic/react';
import { add } from 'ionicons/icons';

/* --- ESTILOS OBLIGATORIOS DE IONIC --- */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';

/* --- COMPONENTES --- */
import { Tarea } from './models/Tarea';
import ListaTareas from './components/ListaTareas';
import LaTarea from './components/LaTarea';
import EditarTarea from './components/EditarTarea';
import NuevaTarea from './components/NuevaTarea';

setupIonicReact();

const App: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([
    { id: 1, titulo: "Terminar Challenge03", descripcion: "Terminar tarea y subirla al Github", estado: true },
    { id: 2, titulo: "Repasar para el parcial 1", descripcion: "Repaso y practica temas corte 1 DESARR..Soft..Plat..mov", estado: false }
  ]);

  const [seleccionada, setSeleccionada] = useState<Tarea | null>(null);
  const [vista, setVista] = useState<'LISTA' | 'DETALLE' | 'EDITAR' | 'NUEVA'>('LISTA');

  const generarProximoId = () => {
    return tareas.length > 0 ? Math.max(...tareas.map(t => t.id)) + 1 : 1;
  };

  const agregarTarea = (nueva: Tarea) => {
    setTareas([...tareas, nueva]);
    setVista('LISTA');
  };

  const eliminarTarea = (id: number) => {
    setTareas(tareas.filter(t => t.id !== id));
    setVista('LISTA');
    setSeleccionada(null);
  };

  const guardarEdicion = (editada: Tarea) => {
    setTareas(tareas.map(t => t.id === editada.id ? editada : t));
    setSeleccionada(editada);
    setVista('DETALLE');
  };

  const toggleEstadoListado = (id: number) => {
    setTareas(tareas.map(t => t.id === id ? { ...t, estado: !t.estado } : t));
  };

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>
              {vista === 'LISTA' ? 'Listado de Tareas' : 
               vista === 'NUEVA' ? 'Creacion de Tarea' : 
               vista === 'EDITAR' ? 'Edicion de Tarea' : 'Detalle de la tarea'}
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent color="light">
          {vista === 'LISTA' && (
            <>
              <ListaTareas 
                tareas={tareas} 
                onCambiarEstado={toggleEstadoListado} 
                onVerDetalle={(t) => { setSeleccionada(t); setVista('DETALLE'); }} 
              />
              <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={() => setVista('NUEVA')}>
                  <IonIcon icon={add} />
                </IonFabButton>
              </IonFab>
            </>
          )}

          {vista === 'NUEVA' && (
            <NuevaTarea 
              proximoId={generarProximoId()} 
              onAgregar={agregarTarea} 
              onCancelar={() => setVista('LISTA')} 
            />
          )}

          {vista === 'DETALLE' && seleccionada && (
            <LaTarea 
              tarea={seleccionada} 
              onCerrar={() => setVista('LISTA')} 
              onEliminar={eliminarTarea}
              onEditar={() => setVista('EDITAR')}
            />
          )}

          {vista === 'EDITAR' && seleccionada && (
            <EditarTarea 
              tarea={seleccionada} 
              onGuardar={guardarEdicion} 
              onCancelar={() => setVista('DETALLE')} 
            />
          )}
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default App;