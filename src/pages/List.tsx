import React from 'react';
import { 
  IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton 
} from '@ionic/react';
import { useHistory } from 'react-router';

export const List: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {

    localStorage.removeItem('logged');
    
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>List Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Bienvenido a la zona protegida</h2>
        <IonButton color="danger" expand="block" onClick={handleLogout}>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};