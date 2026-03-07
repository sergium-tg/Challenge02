import React, { useState } from 'react';
import { 
  IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton, IonHeader, IonToolbar, IonTitle 
} from '@ionic/react';
import { useHistory } from 'react-router';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    if (email === 'user@mail.com' && password === '123') {
      localStorage.setItem('logged', 'true');
      
      history.push('/list');
    } else {
      alert('Credenciales incorrectas. Intenta de nuevo.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Demo Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput 
            type="email" 
            value={email} 
            onIonChange={e => setEmail(e.detail.value!)} 
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput 
            type="password" 
            value={password} 
            onIonChange={e => setPassword(e.detail.value!)} 
          />
        </IonItem>
        <IonButton expand="block" onClick={handleLogin} className="ion-margin-top">
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};