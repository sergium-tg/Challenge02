import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import { useLocalNotif } from '../hooks/useLocalNotif';

const LocalNotifPage: React.FC = () => {
  const { scheduleNotification } = useLocalNotif();

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons><IonTitle>Notificaciones Locales</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <p>Al presionar, la notificación aparecerá en 3 segundos. ¡Puedes minimizar la app para verla en la barra de estado!</p>
        <IonButton expand="block" onClick={scheduleNotification}>Programar Notificación (3s)</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default LocalNotifPage;