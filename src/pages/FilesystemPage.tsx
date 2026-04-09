import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonBackButton, IonTextarea, IonItem } from '@ionic/react';
import { useFilesystem } from '../hooks/useFilesystem';

const FilesystemPage: React.FC = () => {
  const { fileContent, writeFile, readFile } = useFilesystem();
  const [inputText, setInputText] = useState("");

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons><IonTitle>Archivos</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonTextarea placeholder="Escribe algo para guardar..." value={inputText} onIonChange={e => setInputText(e.detail.value!)} />
        </IonItem>
        <IonButton expand="block" onClick={() => writeFile(inputText)}>Guardar en Texto</IonButton>
        <IonButton expand="block" color="light" onClick={readFile}>Leer Archivo</IonButton>
        
        {fileContent && (
          <div style={{ marginTop: '20px', padding: '10px', background: '#f4f5f8', borderRadius: '5px' }}>
            <strong>Contenido recuperado:</strong> <br/> {fileContent}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};
export default FilesystemPage;