import { useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
  IonAvatar,
} from "@ionic/react";
import { useStudents } from "../hooks/useStudents";

const Estudiantes: React.FC = () => {
  const { estudiantes, addEstudiante } = useStudents();
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [presentToast] = useIonToast();

  const handleCrear = () => {
    const nombreLimpio = nombre.trim();
    if (!nombreLimpio) {
      presentToast({ message: "El nombre es obligatorio", duration: 2200, color: "danger" });
      return;
    }
    addEstudiante(nombreLimpio);
    presentToast({ message: "Estudiante creado", duration: 2000, color: "success" });
    setNombre("");
    setOpen(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="Inicio" />
          </IonButtons>
          <IonTitle>Estudiantes</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setOpen(true)}>Nuevo</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <IonText color="medium">
            <p style={{ marginTop: 0 }}>Gestiona la lista de estudiantes registrados.</p>
          </IonText>
        </div>

        {estudiantes.length === 0 ? (
          <div className="ion-padding" style={{ textAlign: "center", paddingTop: 48 }}>
            <IonText color="medium">Aún no hay estudiantes. Crea el primero con el botón Nuevo.</IonText>
          </div>
        ) : (
          <IonList inset>
            {estudiantes.map((e) => (
              <IonItem key={e.id_estudiante} button routerLink={`/estudiantes/${e.id_estudiante}`} detail>
                <IonAvatar
                  slot="start"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--ion-color-primary)",
                    color: "var(--ion-color-primary-contrast)",
                    fontWeight: 700,
                  }}
                >
                  {e.nombre.charAt(0).toUpperCase()}
                </IonAvatar>
                <IonLabel>
                  <h2>{e.nombre}</h2>
                  <p>
                    {e.asignaturas.length} asignatura{e.asignaturas.length !== 1 ? "s" : ""}
                  </p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}

        <IonModal isOpen={open} onDidDismiss={() => setOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Nuevo estudiante</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setOpen(false)}>Cerrar</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem lines="none">
              <IonLabel position="stacked">Nombre completo</IonLabel>
              <IonInput
                value={nombre}
                placeholder="Ej. María Pérez"
                onIonInput={(ev) => setNombre(String(ev.detail.value ?? ""))}
                onKeyDown={(ev) => ev.key === "Enter" && handleCrear()}
              />
            </IonItem>
            <div className="ion-padding" style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <IonButton fill="clear" onClick={() => setOpen(false)}>
                Cancelar
              </IonButton>
              <IonButton onClick={handleCrear}>Crear</IonButton>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Estudiantes;