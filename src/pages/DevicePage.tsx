import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel } from '@ionic/react';
import { useDevice } from '../hooks/useDevice';

const DevicePage: React.FC = () => {
  const { info, battery } = useDevice();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Dispositivo</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel><strong>Modelo:</strong> {info?.model}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel><strong>Sistema Operativo:</strong> {info?.operatingSystem} {info?.osVersion}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel><strong>Plataforma:</strong> {info?.platform}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel><strong>Cargando:</strong> {battery?.isCharging ? 'Sí' : 'No'}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DevicePage;