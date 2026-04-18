import React from 'react';
import { 
  IonPage, IonContent, IonHeader, IonToolbar, IonTitle, 
  IonList, IonItem, IonLabel, IonButton, IonProgressBar, IonText, IonBadge 
} from '@ionic/react';
import { useMissions } from '../context/MissionContext';

const Home: React.FC = () => {
  const { progress, completeMission1, startMission2, startMission3, resetSession } = useMissions();

  const completedCount = progress.missions.filter(m => m.completed).length;
  const progressPercent = completedCount / 3;
  const allCompleted = completedCount === 3;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Misiones Parcial 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <IonText color="dark">
            <p>PUNTOS ACUMULADOS</p>
            <h1 style={{ fontSize: '3em', margin: '0' }}>{progress.points}</h1>
          </IonText>
        </div>
        
        <IonLabel>Progreso de la sesión: {completedCount}/3</IonLabel>
        <IonProgressBar value={progressPercent} color="success" style={{ height: '12px', borderRadius: '6px' }} />

        <IonList style={{ marginTop: '20px' }}>
          {/* MISIÓN 1 */}
          <IonItem lines="full">
            <IonLabel className="ion-text-wrap">
              <h2>1. Evidencia Fotográfica</h2>
              <p>Captura una imagen del entorno</p>
            </IonLabel>
            {progress.missions[0].completed ? <IonBadge color="success">Hecho</IonBadge> : 
              <IonButton slot="end" onClick={completeMission1}>Cámara</IonButton>
            }
          </IonItem>
          
          {/* MISIÓN 2 */}
          <IonItem lines="full">
            <IonLabel className="ion-text-wrap">
              <h2>2. Desplazamiento Local</h2>
              <p>Aléjate 30 metros de tu punto inicial</p>
            </IonLabel>
            {progress.missions[1].completed ? <IonBadge color="success">Hecho</IonBadge> : 
              <IonButton slot="end" color="secondary" onClick={startMission2}>GPS</IonButton>
            }
          </IonItem>
          
          {/* MISIÓN 3 */}
          <IonItem lines="none">
            <IonLabel className="ion-text-wrap">
              <h2>3. Zona de Silencio</h2>
              <p>Mantente inmóvil por 10 segundos</p>
            </IonLabel>
            {progress.missions[2].completed ? <IonBadge color="success">Hecho</IonBadge> : 
              <IonButton slot="end" color="tertiary" disabled={progress.missions[2].locked} onClick={startMission3}>
                {progress.missions[2].locked ? "Bloqueado" : "Iniciar"}
              </IonButton>
            }
          </IonItem>
        </IonList>

        {allCompleted && (
          <div style={{ marginTop: '40px' }}>
            <IonText color="success" className="ion-text-center">
              <p>¡Has completado todas las misiones de esta ronda!</p>
            </IonText>
            <IonButton expand="block" color="warning" onClick={resetSession}>
              🚀 INICIAR NUEVA SESIÓN (+ Puntos)
            </IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;