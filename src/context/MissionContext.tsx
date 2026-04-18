import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Motion } from '@capacitor/motion';
import { Preferences } from '@capacitor/preferences';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import { dbFirebase as db, auth } from '../firebase';
import { Mission, UserProgress } from '../types';

interface MissionContextProps {
  progress: UserProgress;
  completeMission1: () => Promise<void>;
  startMission2: () => Promise<void>;
  startMission3: () => Promise<void>;
  resetSession: () => void;
}

const initialMissions: Mission[] = [
  { id: 1, title: 'Evidencia', description: 'Tomar foto', points: 30, completed: false, locked: false },
  { id: 2, title: 'Movimiento Real', description: 'Moverse 30m', points: 40, completed: false, locked: false },
  { id: 3, title: 'Permanencia', description: '10s quieto', points: 50, completed: false, locked: true },
];

const MissionContext = createContext<MissionContextProps>({} as MissionContextProps);

export const MissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>({ points: 0, missions: initialMissions });
  const isMission3Running = useRef(false);

  useEffect(() => {
    const loadData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const { value } = await Preferences.get({ key: `progress_${user.uid}` });
      if (value) setProgress(JSON.parse(value));

      const docSnap = await getDoc(doc(db, 'users', user.uid));
      if (docSnap.exists()) setProgress(docSnap.data() as UserProgress);
    };
    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      const user = auth.currentUser;
      if (!user) return;
      await Preferences.set({ key: `progress_${user.uid}`, value: JSON.stringify(progress) });
      await setDoc(doc(db, 'users', user.uid), progress);
    };
    saveData();
  }, [progress]);

  const completeMission1 = async () => {
    try {
      await Camera.getPhoto({ quality: 90, allowEditing: false, resultType: CameraResultType.Uri, source: CameraSource.Camera });
      updateMission(1, 30);
      await LocalNotifications.schedule({ notifications: [{ title: "¡Misión Cumplida!", body: "Evidencia capturada (+30 pts)", id: 1 }] });
    } catch (e) { console.log("Cámara cancelada"); }
  };

const startMission2 = async () => {
    const startPos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    
    const watchId = await Geolocation.watchPosition({ enableHighAccuracy: true }, (pos) => {
      if (pos) {
        const dist = calculateDistance(
          startPos.coords.latitude, 
          startPos.coords.longitude, 
          pos.coords.latitude, 
          pos.coords.longitude
        );
        
        console.log(`Distancia recorrida: ${Math.round(dist)} metros`);

        if (dist >= 15) { 
          updateMission(2, 40);
          Geolocation.clearWatch({ id: watchId });
        }
      }
    });
  };

  const startMission3 = async () => {
    if (isMission3Running.current) return;
    isMission3Running.current = true;
    let secondsStill = 0;

    const handler = await Motion.addListener('accel', async (event) => {
      const isMoving = Math.abs(event.acceleration.x) > 1.2 || Math.abs(event.acceleration.y) > 1.2;
      if (!isMoving) {
        secondsStill++;
        if (secondsStill >= 10) {
          updateMission(3, 50);
          await Haptics.impact({ style: ImpactStyle.Heavy });
          handler.remove();
          isMission3Running.current = false;
        }
      } else {
        secondsStill = 0;
      }
    });
  };

  const updateMission = (id: number, pointsToAdd: number) => {
    setProgress(prev => {
      const newMissions = prev.missions.map(m => {
        if (m.id === id) return { ...m, completed: true };
        if (m.id === id + 1) return { ...m, locked: false };
        return m;
      });
      return { points: prev.points + pointsToAdd, missions: newMissions };
    });
  };

  const resetSession = () => {
    setProgress(prev => ({ ...prev, missions: initialMissions }));
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  return (
    <MissionContext.Provider value={{ progress, completeMission1, startMission2, startMission3, resetSession }}>
      {children}
    </MissionContext.Provider>
  );
};

export const useMissions = () => useContext(MissionContext);