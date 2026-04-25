import { useState, useEffect, useRef } from "react";
import { Geolocation } from "@capacitor/geolocation";
import { Haptics } from "@capacitor/haptics";
import { Device } from "@capacitor/device";
import { LocalNotifications } from "@capacitor/local-notifications";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

export const useGeolocation = () => {
  const [position, setPosition] = useState<any>(null);
  const [path, setPath] = useState<any[]>([]);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const watchIdRef = useRef<string | null>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentSessionRef = useRef<any>(null);

  const checkPermissions = async () => {
    const geoCheck = await Geolocation.checkPermissions();
    if (geoCheck.location !== 'granted') await Geolocation.requestPermissions();
    
    const notifCheck = await LocalNotifications.checkPermissions();
    if (notifCheck.display !== 'granted') await LocalNotifications.requestPermissions();
  };

  const getCurrentLocation = async () => {
    try {
      await checkPermissions();
      const pos = await Geolocation.getCurrentPosition();
      setPosition(pos.coords);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    getCurrentLocation();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  const saveSessionToHistory = async (session: any) => {
    try {
      let history: any[] = [];
      try {
        const file = await Filesystem.readFile({
          path: 'recorridos_challenge08.json',
          directory: Directory.Data,
          encoding: Encoding.UTF8,
        });
        history = JSON.parse(file.data as string);
      } catch (e) { /* Archivo nuevo */ }

      history.push(session);

      await Filesystem.writeFile({
        path: 'recorridos_challenge08.json',
        data: JSON.stringify(history),
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
    } catch(e) {
      console.error("Error guardando sesión:", e);
    }
  };

  const stopTracking = async () => {
    if (watchIdRef.current !== null) {
      await Geolocation.clearWatch({ id: watchIdRef.current });
      watchIdRef.current = null;
      setIsTracking(false);
      await Haptics.vibrate();

      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }

      if (currentSessionRef.current) {
        currentSessionRef.current.endTime = new Date().toISOString();
        await saveSessionToHistory(currentSessionRef.current);
        currentSessionRef.current = null;
      }
      
      setPath([]); 
    }
  };

  const startTracking = async () => {

    try {
        const info = await Device.getBatteryInfo();
        if (info.batteryLevel && info.batteryLevel < 0.20 && !info.isCharging) {
            alert("Batería baja: No es posible iniciar un nuevo recorrido (Menor al 20%).");
            return;
        }
    } catch (e) {
        console.log("No se pudo leer la batería en este dispositivo antes de iniciar.");
    }

    await checkPermissions();
    await Haptics.vibrate();
    setIsTracking(true);

    if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
    }

    currentSessionRef.current = {
        startTime: new Date().toISOString(),
        endTime: null,
        points: []
    };

    const id = await Geolocation.watchPosition(
      { enableHighAccuracy: true },
      async (pos, err) => {
        if (err || !pos) return;

        // F: Validación continua por si la batería se descarga DURANTE el recorrido
        try {
            const info = await Device.getBatteryInfo();
            if (info.batteryLevel && info.batteryLevel < 0.15 && !info.isCharging) {
                LocalNotifications.schedule({
                    notifications: [{ title: "Batería baja", body: "Tracking detenido para ahorrar energía.", id: 1 }]
                });
                stopTracking();
                return;
            }
        } catch (e) {}

        const speed = pos.coords.speed || 0;
        
        if (speed > 20) {
            LocalNotifications.schedule({
                notifications: [{ title: "Movimiento rápido", body: "Vas muy rápido.", id: 2 }]
            });
        }

        if (speed >= 1) { 
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
                inactivityTimerRef.current = null;
            }
        } else {
            if (!inactivityTimerRef.current) {
                inactivityTimerRef.current = setTimeout(() => {
                    LocalNotifications.schedule({
                        notifications: [{ title: "Sin movimiento", body: "Tracking detenido (30s).", id: 3 }]
                    });
                    stopTracking();
                }, 30000); 
            }
        }

        setPosition(pos.coords);
        const newPoint = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        
        if (currentSessionRef.current) {
            currentSessionRef.current.points.push(newPoint);
            setPath([...currentSessionRef.current.points]);
        }
      }
    );
    watchIdRef.current = id;
  };

  return { position, path, error, getCurrentLocation, startTracking, stopTracking, isTracking };
};