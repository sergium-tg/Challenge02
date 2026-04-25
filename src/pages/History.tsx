import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonListHeader, useIonViewWillEnter, IonButtons, IonButton, IonIcon, IonText, IonBadge } from '@ionic/react';
import { refreshOutline, alertCircleOutline } from 'ionicons/icons';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const History: React.FC = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [debugMsg, setDebugMsg] = useState<string>("Iniciando...");

  const loadHistory = async () => {
    try {
      setDebugMsg("Buscando archivo JSON...");
      
      const file = await Filesystem.readFile({
        path: 'recorridos_challenge08.json',
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
      
      if (!file.data) {
        setDebugMsg("Archivo vacío.");
        setSessions([]);
        return;
      }

      const allSessions = JSON.parse(file.data as string);
      const todayLocal = new Date().toDateString();
      
      const todaysSessions = allSessions.filter((session: any) => {
          if (!session.startTime) return false;
          return new Date(session.startTime).toDateString() === todayLocal;
      });

      setSessions(todaysSessions.reverse());
      setDebugMsg(`Datos cargados. Tracks hoy: ${todaysSessions.length}`);
      
    } catch (e: any) {
      setDebugMsg(`Error: No hay datos guardados aún.`);
      setSessions([]);
    }
  };

  useIonViewWillEnter(() => {
    loadHistory();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Historial de Tracking</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={loadHistory}><IonIcon icon={refreshOutline} slot="icon-only" /></IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ padding: '10px', background: '#f4f4f4', borderBottom: '1px solid #ddd' }}>
          <IonText color="medium">
            <p style={{ fontSize: '12px', margin: 0 }}><IonIcon icon={alertCircleOutline} /> <strong>Estado:</strong> {debugMsg}</p>
          </IonText>
        </div>

        <IonList>
          <IonListHeader><IonLabel>Recorridos Completados Hoy</IonLabel></IonListHeader>
          
          {sessions.map((session, index) => (
            <IonItem key={index}>
              <IonLabel className="ion-text-wrap">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h2 style={{ fontWeight: 'bold' }}>Recorrido #{sessions.length - index}</h2>
                    <IonBadge color="primary">{session.points?.length || 0} pts</IonBadge>
                </div>
                <p><strong>Inicio:</strong> {new Date(session.startTime).toLocaleTimeString()}</p>
                <p><strong>Fin:</strong> {session.endTime ? new Date(session.endTime).toLocaleTimeString() : 'Interrumpido'}</p>
              </IonLabel>
            </IonItem>
          ))}

          {sessions.length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <IonText color="medium"><p>No se encontraron recorridos.</p></IonText>
            </div>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default History;