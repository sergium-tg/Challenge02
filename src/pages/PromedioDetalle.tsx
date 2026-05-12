import { useParams } from "react-router-dom";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useStudents } from "../hooks/useStudents";

const PromedioDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEstudiante } = useStudents();
  const estudiante = id ? getEstudiante(id) : undefined;

  if (!estudiante) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/estudiantes" />
            </IonButtons>
            <IonTitle>Promedio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div style={{ textAlign: "center", paddingTop: 48 }}>
            <IonText color="medium">Estudiante no encontrado.</IonText>
            <div className="ion-padding">
              <IonButton routerLink="/estudiantes" fill="outline">
                Volver
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (estudiante.asignaturas.length === 0) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref={`/estudiantes/${estudiante.id_estudiante}`} />
            </IonButtons>
            <IonTitle>Promedio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div style={{ textAlign: "center", paddingTop: 48 }}>
            <IonText color="medium">El estudiante no tiene notas registradas.</IonText>
            <div className="ion-padding">
              <IonButton routerLink={`/estudiantes/${estudiante.id_estudiante}`} fill="outline">
                Volver al estudiante
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const suma = estudiante.asignaturas.reduce((acc, a) => acc + a.calificacion, 0);
  const promedio = suma / estudiante.asignaturas.length;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/estudiantes/${estudiante.id_estudiante}`} text="Estudiante" />
          </IonButtons>
          <IonTitle>Promedio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div
          style={{
            maxWidth: 420,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 20,
            paddingTop: 16,
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>Promedio general</h1>
          <IonText color="medium">
            <p style={{ margin: 0, fontSize: "1.1rem" }}>{estudiante.nombre}</p>
          </IonText>

          <IonCard style={{ width: "100%" }}>
            <IonCardHeader>
              <IonCardTitle style={{ fontSize: "3.5rem", fontWeight: 800, color: "var(--ion-color-primary)" }}>
                {promedio.toFixed(2)}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText color="medium">
                Basado en {estudiante.asignaturas.length} asignatura
                {estudiante.asignaturas.length !== 1 ? "s" : ""}
              </IonText>
            </IonCardContent>
          </IonCard>

          <IonButton expand="block" routerLink="/" style={{ marginTop: 8 }}>
            Ir al inicio
          </IonButton>
          <IonButton expand="block" fill="outline" routerLink={`/estudiantes/${estudiante.id_estudiante}`}>
            Volver al estudiante
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PromedioDetalle;