import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
  IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar,
  IonTabButton, IonTabs, IonLoading, setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { homeOutline, trophyOutline, logOutOutline } from 'ionicons/icons';

import { auth } from './firebase';
import { signOut } from 'firebase/auth';

import { MissionProvider } from './context/MissionContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Results from './pages/Results';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <IonLoading isOpen={true} message="Cargando Misiones..." />;
  }

  return (
    <IonApp>
      <MissionProvider>
        <IonReactRouter>
          
          {!user ? (
            <IonRouterOutlet>
              <Route exact path="/login" component={Login} />
              <Route render={() => <Redirect to="/login" />} />
            </IonRouterOutlet>
          ) : (
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/home" component={Home} />
                <Route exact path="/results" component={Results} />
                <Route render={() => <Redirect to="/home" />} />
              </IonRouterOutlet>

              <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home">
                  <IonIcon aria-hidden="true" icon={homeOutline} />
                  <IonLabel>Misiones</IonLabel>
                </IonTabButton>

                <IonTabButton tab="results" href="/results">
                  <IonIcon aria-hidden="true" icon={trophyOutline} />
                  <IonLabel>Ranking</IonLabel>
                </IonTabButton>

                <IonTabButton tab="logout" onClick={() => signOut(auth)}>
                  <IonIcon aria-hidden="true" icon={logOutOutline} color="danger" />
                  <IonLabel color="danger">Salir</IonLabel>
                </IonTabButton>
              </IonTabBar>

            </IonTabs>
          )}

        </IonReactRouter>
      </MissionProvider>
    </IonApp>
  );
};

export default App;