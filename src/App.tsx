import { useState, useEffect } from 'react';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonLabel, setupIonicReact, IonSpinner } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase'; // Asegúrate de que esta ruta sea correcta

import Login from './pages/Login';
import Contacts from './pages/Contacts';
import Tasks from './pages/Tasks';
import Fruits from './pages/Fruits';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Nuevo estado de carga

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false); // Firebase ya terminó de verificar
    });
    return () => unsubscribe();
  }, []);

  // Mientras Firebase chequea el usuario, mostramos un spinner para que no haya pantalla blanca
  if (loading) {
    return (
      <IonApp style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <IonSpinner name="crescent" />
      </IonApp>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          
          {/* RUTA DE LOGIN */}
          <Route exact path="/login">
            {isAuthenticated ? <Redirect to="/app/contacts" /> : <Login onLogin={() => setIsAuthenticated(true)} />}
          </Route>
          
          {/* CONTENEDOR DE LA APP (TABS) - Protegido */}
          <Route path="/app" render={() => {
            if (!isAuthenticated) return <Redirect to="/login" />;
            
            return (
              <IonTabs>
                <IonRouterOutlet>
                  <Route exact path="/app/contacts" component={Contacts} />
                  <Route exact path="/app/tasks" component={Tasks} />
                  <Route exact path="/app/fruits" component={Fruits} />
                  {/* Redirección interna si entran directo a /app */}
                  <Route exact path="/app">
                    <Redirect to="/app/contacts" />
                  </Route>
                </IonRouterOutlet>
                
                <IonTabBar slot="bottom">
                  <IonTabButton tab="contacts" href="/app/contacts">
                    <IonLabel>Contactos</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="tasks" href="/app/tasks">
                    <IonLabel>Tareas</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="fruits" href="/app/fruits">
                    <IonLabel>Frutas</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            );
          }} />

          {/* REDIRECCIÓN GLOBAL DESDE LA RAÍZ */}
          <Route exact path="/">
            <Redirect to={isAuthenticated ? "/app/contacts" : "/login"} />
          </Route>

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;