import { useState } from "react";
import { useParams } from "react-router-dom";
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
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { useStudents } from "../hooks/useStudents";

const EstudianteDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useIonRouter();
  const [presentToast] = useIonToast();
  const { getEstudiante, addAsignatura } = useStudents();
  const estudiante = id ? getEstudiante(id) : undefined;

  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [calificacion, setCalificacion] = useState("");

  if (!estudiante) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/estudiantes" />
            </IonButtons>
            <IonTitle>Estudiante</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div style={{ textAlign: "center", paddingTop: 48 }}>
            <IonText color="medium">Estudiante no encontrado.</IonText>
            <div className="ion-padding">
              <IonButton routerLink="/estudiantes" fill="outline">
                Volver a estudiantes
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const handleAgregar = () => {
    const nota = parseFloat(calificacion);
    if (!nombre.trim()) {
      presentToast({ message: "El nombre es obligatorio", duration: 2200, color: "danger" });
      return;
    }
    if (Number.isNaN(nota)) {
      presentToast({ message: "Calificación inválida", duration: 2200, color: "danger" });
      return;
    }
    addAsignatura(estudiante.id_estudiante, nombre.trim(), nota);
    presentToast({ message: "Asignatura agregada", duration: 2000, color: "success" });
    setNombre("");
    setCalificacion("");
    setOpen(false);
  };

  const handlePromedio = () => {
    if (estudiante.asignaturas.length === 0) {
      presentToast({
        message: "Este estudiante no tiene asignaturas registradas",
        duration: 2500,
        color: "warning",
      });
      return;
    }
    router.push(`/estudiantes/${estudiante.id_estudiante}/promedio`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/estudiantes" text="Estudiantes" />
          </IonButtons>
          <IonTitle>{estudiante.nombre}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <IonText color="medium">
            <p style={{ marginTop: 0 }}>Asignaturas registradas</p>
          </IonText>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            <IonButton onClick={handlePromedio}>Mostrar promedio</IonButton>
            <IonButton fill="outline" onClick={() => setOpen(true)}>
              Agregar asignatura
            </IonButton>
          </div>
        </div>

        {estudiante.asignaturas.length === 0 ? (
          <div className="ion-padding" style={{ textAlign: "center" }}>
            <IonText color="medium">Sin asignaturas. Agrega la primera.</IonText>
          </div>
        ) : (
          <IonList inset>
            {estudiante.asignaturas.map((a) => (
              <IonItem key={a.id_asignatura}>
                <IonLabel>
                  <h2>{a.nombre}</h2>
                </IonLabel>
                <IonText slot="end" style={{ fontWeight: 700, fontSize: "1.25rem" }}>
                  {a.calificacion.toFixed(2)}
                </IonText>
              </IonItem>
            ))}
          </IonList>
        )}

        <IonModal isOpen={open} onDidDismiss={() => setOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Nueva asignatura</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setOpen(false)}>Cerrar</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="stacked">Nombre</IonLabel>
              <IonInput
                value={nombre}
                placeholder="Ej. Matemáticas"
                onIonInput={(ev) => setNombre(String(ev.detail.value ?? ""))}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Calificación</IonLabel>
              <IonInput
                type="number"
                value={calificacion}
                placeholder="Ej. 4.5"
                onIonInput={(ev) => setCalificacion(String(ev.detail.value ?? ""))}
              />
            </IonItem>
            <div className="ion-padding" style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <IonButton fill="clear" onClick={() => setOpen(false)}>
                Cancelar
              </IonButton>
              <IonButton onClick={handleAgregar}>Agregar</IonButton>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default EstudianteDetalle;