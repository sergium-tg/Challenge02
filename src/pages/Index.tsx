import { IonButton, IonContent, IonIcon, IonPage, IonText } from "@ionic/react";
import { schoolOutline } from "ionicons/icons";

const Index: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <div
          style={{
            maxWidth: 560,
            margin: "0 auto",
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 24,
            padding: "32px 0",
          }}
        >
          <IonIcon icon={schoolOutline} color="primary" style={{ fontSize: 80 }} />
          <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.25rem)", fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
            Bienvenido al gestor de notas
          </h1>
          <IonText color="medium">
            <p style={{ fontSize: "1.05rem", lineHeight: 1.55, margin: 0 }}>
              En este aplicativo podrás calcular la nota promedio de cada estudiante; solo necesitas ingresar los
              estudiantes y sus notas.
            </p>
          </IonText>
          <IonButton routerLink="/estudiantes" size="large" style={{ marginTop: 12 }}>
            Ir a la sección de estudiantes
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Index;