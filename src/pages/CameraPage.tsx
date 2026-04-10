import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import { useCamera } from '../hooks/useCamera';

const CameraPage: React.FC = () => {
  const { photo, takePhoto } = useCamera();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Cámara</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={takePhoto}> Tomar Foto </IonButton>
        {photo && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <img src={photo} alt="Captura" style={{ width: '100%', borderRadius: '8px' }} />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CameraPage;