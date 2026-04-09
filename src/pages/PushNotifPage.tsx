import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonBackButton, IonItem, IonLabel, IonList } from '@ionic/react';
import { usePushNotif } from '../hooks/usePushNotif';

const PushNotifPage: React.FC = () => {
  const { token, messages, registerPush } = usePushNotif();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Push Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={registerPush}>Registrar Dispositivo</IonButton>
        
        {token && (
          <div style={{ marginTop: '20px', wordBreak: 'break-all', fontSize: '12px', background: '#e0e0e0', padding: '10px', borderRadius: '5px' }}>
            <strong>Token (Para usar en Firebase):</strong> <br/> {token}
          </div>
        )}

        <IonList style={{ marginTop: '20px' }}>
          {messages && messages.map((msg, idx) => (
            <IonItem key={idx}>
              <IonLabel className="ion-text-wrap">
                <h2>{msg?.title || 'Sin título'}</h2>
                <p>{msg?.body || 'Sin contenido'}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default PushNotifPage;