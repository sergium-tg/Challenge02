import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import { useHaptics } from '../hooks/useHaptics';

const HapticsPage: React.FC = () => {
  const { notify } = useHaptics();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"> <IonBackButton defaultHref="/home" /> </IonButtons>
          <IonTitle> Haptics </IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <p>Haz clic en el botón para sentir la vibración en tu dispositivo.</p>
        <IonButton expand="block" color="warning" onClick={notify}> Vibrar Dispositivo </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default HapticsPage;