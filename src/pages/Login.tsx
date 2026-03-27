import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(); 
    } catch (error) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Login</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonInput placeholder="Email" onIonChange={e => setEmail(e.detail.value!)} />
        <IonInput type="password" placeholder="Password" onIonChange={e => setPassword(e.detail.value!)} />
        <IonButton expand="block" onClick={handleLogin}>Ingresar</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default Login;