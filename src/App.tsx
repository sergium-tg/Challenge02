import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import DetalleTarea from './components/DetalleTarea';

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

import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

// 1. Importamos los componentes de las tareas
import NuevaTarea from './components/NuevaTarea';
import EditarTarea from './components/EditarTarea';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
  <AuthProvider>
  <TaskProvider>
  <IonReactRouter>
  <IonRouterOutlet>
  <Route exact path="/login" component={Login} />
  <Route exact path="/register" component={Register} />
  <Route exact path="/tasks" component={Home} />

  <Route exact path="/tasks/new" component={NuevaTarea} />
  <Route exact path="/tasks/edit/:id" component={EditarTarea} />
  <Route exact path="/tasks/detail/:id" component={DetalleTarea} />

  <Route exact path="/">
  <Redirect to="/login" />
  </Route>
  </IonRouterOutlet>
  </IonReactRouter>
  </TaskProvider>
  </AuthProvider>
  </IonApp>
);

export default App;
