import { useState, useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";

export const usePushNotif = () => {
  const [token, setToken] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);

  const registerPush = async () => {
    if (!Capacitor.isNativePlatform()) {
      alert("Las notificaciones Push solo funcionan en un celular real.");
      return;
    }

    try {
      let permStatus = await PushNotifications.checkPermissions();
      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }
      if (permStatus.receive !== 'granted') {
        alert("Permiso denegado por el usuario.");
        return;
      }
      await PushNotifications.register();
    } catch (error: any) {
      alert("Error al registrar: " + error.message);
    }
  };

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      try {
        PushNotifications.addListener('registration', (t) => {
          setToken(t.value);
        });

        PushNotifications.addListener('pushNotificationReceived', (notification) => {
          setMessages(msgs => [...msgs, notification]);
        });
      } catch (e) {
        console.error("Error agregando listeners:", e);
      }
    }

    return () => {
      if (Capacitor.isNativePlatform()) {
        try {
          PushNotifications.removeAllListeners();
        } catch (e) {}
      }
    };
  }, []);

  return { token, messages, registerPush };
};