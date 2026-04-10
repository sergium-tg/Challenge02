import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export const useCamera = () => {
  const [photo, setPhoto] = useState<string | undefined>();

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });
      setPhoto(image.webPath);
    } catch (error) {
      console.error("Error al tomar foto", error);
    }
  };

  return { photo, takePhoto };
};