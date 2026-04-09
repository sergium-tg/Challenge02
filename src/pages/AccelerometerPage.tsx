import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/react';
import { useAccelerometer } from '../hooks/useAccelerometer';

const AccelerometerPage: React.FC = () => {
  const { acceleration } = useAccelerometer();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Acelerómetro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Valores de Aceleración:</h2>
        <p><strong>X:</strong> {acceleration.x?.toFixed(1) || 0}</p>
        <p><strong>Y:</strong> {acceleration.y?.toFixed(1) || 0}</p>
        <p><strong>Z:</strong> {acceleration.z?.toFixed(1) || 0}</p>
      </IonContent>
    </IonPage>
  );
};

export default AccelerometerPage;