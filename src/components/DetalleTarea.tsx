import React, { useContext, useEffect, useState } from 'react';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonButton, IonIcon, IonButtons, IonBackButton
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';
import { createOutline } from 'ionicons/icons';

const DetalleTarea: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const { tareas } = useContext(TaskContext);
    const [tarea, setTarea] = useState<any>(null);

    useEffect(() => {
        const encontrada = tareas.find((t: any) => t.id === parseInt(id));
        if (encontrada) setTarea(encontrada);
    }, [id, tareas]);

        if (!tarea) {
            return <IonPage><IonContent className="ion-padding">Cargando...</IonContent></IonPage>;
        }

        return (
            <IonPage>
            <IonHeader>
            <IonToolbar>
            <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
            </IonButtons>
            <IonTitle>Detalle de Tarea</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
            <IonCard>
            <IonCardHeader>
            <IonCardTitle>{tarea.titulo}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
            <p><strong>Descripción:</strong> {tarea.descripcion}</p>
            <p><strong>Estado:</strong> {tarea.completada ? 'Completada' : 'Pendiente'}</p>

            <IonButton
            expand="block"
            onClick={() => history.push(`/tasks/edit/${tarea.id}`)}
            className="ion-margin-top"
            >
            <IonIcon slot="start" icon={createOutline} />
            Editar esta tarea
            </IonButton>
            </IonCardContent>
            </IonCard>
            </IonContent>
            </IonPage>
        );
};

export default DetalleTarea;
