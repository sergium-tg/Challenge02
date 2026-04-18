import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonBadge, IonButton } from '@ionic/react';
import { db } from '../database/db';
import { auth } from '../firebase';
import { useHistory } from 'react-router';

interface UserRanking {
  name: string;
  points: number;
  isMe: boolean;
}

const Results: React.FC = () => {
  const history = useHistory();
  const [ranking, setRanking] = useState<UserRanking[]>([]);
  const [myPoints, setMyPoints] = useState(0);

  useEffect(() => {
    const loadRanking = async () => {
      const userId = auth.currentUser?.uid;
      let userPts = 0;
      
      if (userId) {
        const localData = await db.progress.get(userId);
        if (localData) {
          userPts = localData.points;
          setMyPoints(userPts);
        }
      }

      const mockUsers: UserRanking[] = [
        { name: 'Juan', points: 200, isMe: false },
        { name: 'Mayra', points: 150, isMe: false },
        { name: 'Carlos', points: 80, isMe: false },
        { name: 'Ana', points: 30, isMe: false },
        { name: 'Yo', points: userPts, isMe: true }
      ];

      mockUsers.sort((a, b) => b.points - a.points);
      setRanking(mockUsers);
    };

    loadRanking();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Resultados</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Resumen de Partida</h2>
        <p>Puntos Totales: <strong>{myPoints}</strong></p>
        <p>Misiones Completadas: <strong>{myPoints / 50} / 3</strong></p>
        
        <h3 style={{ marginTop: '20px' }}>Top 5 - Ranking Global</h3>
        <IonList>
          {ranking.map((user, index) => (
            <IonItem key={index} color={user.isMe ? "light" : ""}>
              <IonLabel>
                <h2>#{index + 1} {user.name}</h2>
              </IonLabel>
              <IonBadge color="primary">{user.points} pts</IonBadge>
            </IonItem>
          ))}
        </IonList>

        <IonButton expand="block" onClick={() => history.push('/home')} style={{ marginTop: '20px' }}>
          Volver a Misiones
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Results;