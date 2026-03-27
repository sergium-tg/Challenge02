import { useState, useEffect } from "react";
import { Network } from "@capacitor/network";

const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState("unknown");

  useEffect(() => {
    const initNetwork = async () => {
      const status = await Network.getStatus();
      setIsOnline(status.connected);
      setConnectionType(status.connectionType);
    };
    initNetwork();
    
    const listenerPromise = Network.addListener("networkStatusChange", (status) => {
      console.log("Network status changed", status);
      setIsOnline(status.connected);
      setConnectionType(status.connectionType);
    });

    return () => {
      listenerPromise.then(handle => handle.remove());
    };
  }, []);

  return { isOnline, connectionType };
};

export default useNetwork;