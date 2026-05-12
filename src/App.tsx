import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";

import "./theme/variables.css";

import Index from "./pages/Index";
import Estudiantes from "./pages/Estudiantes";
import EstudianteDetalle from "./pages/EstudianteDetalle";
import PromedioDetalle from "./pages/PromedioDetalle";
import NotFound from "./pages/NotFound";
import { StudentsProvider } from "./hooks/useStudents";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <StudentsProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" component={Index} />
          <Route exact path="/estudiantes" component={Estudiantes} />
          <Route exact path="/estudiantes/:id/promedio" component={PromedioDetalle} />
          <Route exact path="/estudiantes/:id" component={EstudianteDetalle} />
          <Route component={NotFound} />
        </IonRouterOutlet>
      </IonReactRouter>
    </StudentsProvider>
  </IonApp>
);

export default App;