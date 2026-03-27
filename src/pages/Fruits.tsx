import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonInput, IonButtons, IonIcon } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import { useLiveQuery } from 'dexie-react-hooks';
import { signOut } from 'firebase/auth';
import { dbDexie } from '../config/dexie';
import { auth } from '../config/firebase';

const Fruits: React.FC = () => {
  const [fruitName, setFruitName] = useState('');
  const fruits = useLiveQuery(() => dbDexie.fruits.toArray(), []) ?? [];

  const addFruit = async () => {
    if (!fruitName) return;
    await dbDexie.fruits.add({ name: fruitName });
    setFruitName('');
  };

  const deleteFruit = async (id?: number) => {
    if(id) await dbDexie.fruits.delete(id);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Frutas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout} color="danger">
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput placeholder="Nombre de Fruta" value={fruitName} onIonChange={e => setFruitName(e.detail.value!)} />
        <IonButton expand="block" onClick={addFruit}>Agregar (Local)</IonButton>

        <IonList>
          {fruits.map(f => (
            <IonItem key={f.id}>
              <IonLabel>{f.name}</IonLabel>
              <IonButton slot="end" color="danger" onClick={() => deleteFruit(f.id)}>Borrar</IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default Fruits;