import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonHeader, IonToolbar, IonTitle, IonToast } from '@ionic/react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useHistory } from 'react-router';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.replace('/home');
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      history.replace('/home');
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Acceso de Misiones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput type="email" placeholder="Correo" value={email} onIonChange={e => setEmail(e.detail.value!)} />
        <IonInput type="password" placeholder="Contraseña" value={password} onIonChange={e => setPassword(e.detail.value!)} />
        <IonButton expand="block" onClick={handleLogin}>Iniciar Sesión</IonButton>
        <IonButton expand="block" fill="outline" onClick={handleRegister}>Registrarse</IonButton>
        
        <IonToast isOpen={!!error} message={error} duration={3000} onDidDismiss={() => setError('')} />
      </IonContent>
    </IonPage>
  );
};

export default Login;