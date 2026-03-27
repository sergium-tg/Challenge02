import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonInput, IonButtons, IonIcon } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { dbFirestore, auth } from '../config/firebase';
import useNetwork from '../hooks/useNetwork';

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { isOnline } = useNetwork();

  useEffect(() => {
    const q = collection(dbFirestore, 'contacts');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setContacts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const addContact = async () => {
    if (!name || !phone) return;
    await addDoc(collection(dbFirestore, 'contacts'), { name, phone });
    setName(''); setPhone('');
  };

  const deleteContact = async (id: string) => {
    await deleteDoc(doc(dbFirestore, 'contacts', id));
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contactos</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout} color="danger">
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {!isOnline && <p style={{ color: 'red' }}>Sin conexión. Acciones deshabilitadas.</p>}
        
        <IonInput placeholder="Nombre" value={name} onIonChange={e => setName(e.detail.value!)} />
        <IonInput placeholder="Teléfono" value={phone} onIonChange={e => setPhone(e.detail.value!)} />
        <IonButton expand="block" onClick={addContact} disabled={!isOnline}>Agregar</IonButton>

        <IonList>
          {contacts.map(c => (
            <IonItem key={c.id}>
              <IonLabel>{c.name} - {c.phone}</IonLabel>
              <IonButton color="danger" onClick={() => deleteContact(c.id)} disabled={!isOnline}>Borrar</IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default Contacts;