import { IonPage, IonContent, IonInput, IonButton, IonText, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            await login(email, password);
            history.push('/tasks');
        } catch (error: any) {
            alert("Error al iniciar sesión: " + error.message);
        }
    };

    return (
        <IonPage>
        <IonHeader>
        <IonToolbar>
        <IonTitle>Iniciar Sesión</IonTitle>
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
        placeholder="Contraseña"
        onIonChange={(e) => setPassword(e.detail.value!)}
        style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}
        />
        <IonButton expand="block" onClick={handleLogin}>
        Ingresar
        </IonButton>

        {/* Botón para ir a la pantalla de Registro */}
        <div className="ion-text-center" style={{ marginTop: '20px' }}>
        <IonText color="medium">¿No tienes una cuenta?</IonText>
        <IonButton
        fill="clear"
        expand="block"
        onClick={() => history.push('/register')}
        >
        Regístrate aquí
        </IonButton>
        </div>
        </div>
        </IonContent>
        </IonPage>
    );
}

export default Login;
