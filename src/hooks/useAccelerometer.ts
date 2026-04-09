import { useState, useEffect } from "react";
import { Motion } from "@capacitor/motion";

export const useAccelerometer = () => {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    let listener: any;
    
    const startListening = async () => {
      listener = await Motion.addListener('accel', (event) => {
        setAcceleration(event.acceleration);
      });
    };

    startListening();

    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, []);

  return { acceleration };
};