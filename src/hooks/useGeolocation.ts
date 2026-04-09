import { useState } from "react";
import { Geolocation } from "@capacitor/geolocation";

export const useGeolocation = () => {
  const [position, setPosition] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const getCurrentLocation = async () => {
    try {
      const pos = await Geolocation.getCurrentPosition();
      setPosition(pos.coords);
    } catch (err) {
      setError(err);
    }
  };

  return { position, error, getCurrentLocation };
};