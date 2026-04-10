import React from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Home: React.FC = () => {
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sensores - Challenge 07</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Selecciona un sensor:</h2>
        <IonButton expand="block" routerLink="/geolocation"> Geolocalización </IonButton>
        <IonButton expand="block" routerLink="/accelerometer"> Acelerómetro </IonButton>
        <IonButton expand="block" routerLink="/haptics"> Vibración (Haptics) </IonButton>
        <IonButton expand="block" routerLink="/camera" color="tertiary"> Cámara </IonButton>
        <IonButton expand="block" routerLink="/device" color="tertiary"> Info del Dispositivo </IonButton>
        <IonButton expand="block" routerLink="/filesystem" color="tertiary"> Archivos </IonButton>
        <IonButton expand="block" routerLink="/local-notifications" color="secondary"> Notificaciones Locales </IonButton>
        <IonButton expand="block" routerLink="/push-notifications" color="secondary"> Push Notifications </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;