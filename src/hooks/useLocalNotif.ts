import { LocalNotifications } from "@capacitor/local-notifications";

export const useLocalNotif = () => {
  const scheduleNotification = async () => {
    await LocalNotifications.requestPermissions();
    
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "¡Hola desde Ionic!",
          body: "Esta es una notificación local de prueba.",
          id: 1,
          schedule: { at: new Date(Date.now() + 3000) },
          actionTypeId: "",
          extra: null
        }
      ]
    });
  };

  return { scheduleNotification };
};