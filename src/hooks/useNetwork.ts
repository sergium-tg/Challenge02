import { useState, useEffect } from "react";
import { Network } from "@capacitor/network";
import { LocalNotifications } from "@capacitor/local-notifications";

const useNetwork = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [connectionType, setConnectionType] = useState<string>("unknown");

  useEffect(() => {
    Network.getStatus().then((status) => {
      setIsOnline(status.connected);
      setConnectionType(status.connectionType);
    });

    const listenerPromise = Network.addListener("networkStatusChange", (status) => {
      setIsOnline(status.connected);
      setConnectionType(status.connectionType);

      if (!status.connected) {
        LocalNotifications.schedule({
            notifications: [{ title: "Sin conexión", body: "Se ha perdido la conexión a internet.", id: 4 }]
        });
      }
    });

    return () => {
      listenerPromise.then(listener => listener.remove());
    };
  }, []);

  const isWifi = isOnline && connectionType === 'wifi';

  return { isOnline, connectionType, isWifi };
};

export default useNetwork;