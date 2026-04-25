import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonText, IonList, IonListHeader } from '@ionic/react';
import { useGeolocation } from '../hooks/useGeolocation';
import useNetwork from '../hooks/useNetwork';
import { getLocationInfo } from '../services/opencagedata';
import MapComponent from '../components/MapComponent';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const Home: React.FC = () => {
  const { isWifi, connectionType } = useNetwork();
  const { position, path, startTracking, stopTracking, isTracking } = useGeolocation();
  
  const [addressData, setAddressData] = useState<{address: string, places: string[]} | null>(null);
  const [photoWithWatermark, setPhotoWithWatermark] = useState<string | null>(null);

  useEffect(() => {
    if (isWifi && position) {
      getLocationInfo(position.latitude, position.longitude).then(data => {
        if(data) setAddressData(data);
      });
    }
  }, [position, isWifi]);

  const takePicture = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 90
    });

    if (photo.dataUrl && position) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        if (ctx) {
            ctx.font = '40px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText(`Lat: ${position.latitude.toFixed(4)}, Lng: ${position.longitude.toFixed(4)}`, 20, img.height - 80);
            if(addressData) ctx.fillText(addressData.address, 20, img.height - 30);
        }
        setPhotoWithWatermark(canvas.toDataURL('image/jpeg'));
      };
      img.src = photo.dataUrl;
    }
  };

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Challenge 08 - Mapa</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        
        <IonItem><IonLabel><p>Red actual: {connectionType}</p></IonLabel></IonItem>

        <IonButton expand="block" onClick={isTracking ? stopTracking : startTracking} disabled={!isWifi}>
          {isTracking ? 'Detener Tracking' : 'Iniciar Tracking'}
        </IonButton>

        <IonButton expand="block" onClick={takePicture} disabled={!position}>Tomar Foto</IonButton>

        {!isWifi && (
            <IonItem lines="none"><IonText color="danger"><p>Mapa no disponible. Conéctate a Wi-Fi.</p></IonText></IonItem>
        )}

        {isWifi && addressData && (
          <>
            <IonItem><IonLabel className="ion-text-wrap"><h2><strong>Dirección:</strong></h2><p>{addressData.address}</p></IonLabel></IonItem>
            <IonList>
              <IonListHeader><IonLabel>Sitios Cercanos</IonLabel></IonListHeader>
              {addressData.places.map((place, idx) => <IonItem key={idx}><IonLabel><p>{place}</p></IonLabel></IonItem>)}
            </IonList>
          </>
        )}

        {photoWithWatermark && <div style={{ marginTop: '20px' }}><img src={photoWithWatermark} alt="Watermark" style={{ width: '100%' }} /></div>}

        <div style={{ marginTop: '20px', height: '400px', backgroundColor: '#e0e0e0' }}>
          {isWifi ? <MapComponent position={position} path={path} /> : <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center'}}><p>⚠️ Mapa deshabilitado</p></div>}
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Home;