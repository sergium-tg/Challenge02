import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import { useGeolocation } from '../hooks/useGeolocation';

const GeolocationPage: React.FC = () => {
  const { position, getCurrentLocation } = useGeolocation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Geolocalización</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={getCurrentLocation}>Obtener Ubicación</IonButton>
        {position && (
          <div>
            <p><strong>Latitud:</strong> {position.latitude}</p>
            <p><strong>Longitud:</strong> {position.longitude}</p>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default GeolocationPage;