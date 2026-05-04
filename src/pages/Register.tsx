import { IonPage, IonContent, IonInput, IonButton, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/react';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const { register } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      await register(email, password);
      history.push('/tasks');
    } catch (error: any) {
      alert("Error al registrar: " + error.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ marginTop: '20px' }}>
          <IonInput
            placeholder="Correo electrónico"
            type="email"
            onIonChange={(e) => setEmail(e.detail.value!)}
            style={{ marginBottom: '15px', borderBottom: '1px solid #ccc' }}
          />
          <IonInput
            type="password"
            placeholder="Contraseña (mín. 6 caracteres)"
            onIonChange={(e) => setPassword(e.detail.value!)}
            style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}
          />
          <IonButton expand="block" color="success" onClick={handleRegister}>
            Crear cuenta
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Register;