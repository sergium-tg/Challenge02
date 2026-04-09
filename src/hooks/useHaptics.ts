import { Haptics, ImpactStyle } from "@capacitor/haptics";

export const useHaptics = () => {
  const notify = async () => {
    await Haptics.impact({
      style: ImpactStyle.Heavy,
    });
  };

  return { notify };
};