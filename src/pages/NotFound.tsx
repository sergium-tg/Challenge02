import { IonButton, IonContent, IonPage, IonText } from "@ionic/react";

const NotFound: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <div
          style={{
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 16,
          }}
        >
          <h1 style={{ fontSize: "4rem", fontWeight: 800, margin: 0, color: "var(--ion-color-medium)" }}>404</h1>
          <h2 style={{ fontSize: "1.25rem", margin: 0 }}>Página no encontrada</h2>
          <IonText color="medium">
            <p style={{ maxWidth: 360 }}>La ruta a la que intentas acceder no existe.</p>
          </IonText>
          <IonButton routerLink="/">Volver al inicio</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;