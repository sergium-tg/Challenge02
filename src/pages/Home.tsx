import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonFab, IonFabButton, IonIcon, IonButtons, IonButton
} from '@ionic/react';
import { add, logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import ListaTareas from '../components/ListaTareas';
import { AuthContext } from '../context/AuthContext';

const Home: React.FC = () => {
  const history = useHistory();
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      history.push('/login');
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Tareas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mis Tareas</IonTitle>
          </IonToolbar>
        </IonHeader>

        <ListaTareas />

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/tasks/new')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;