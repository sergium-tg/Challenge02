import { useState, useEffect } from "react";
import { Device, DeviceInfo, BatteryInfo } from "@capacitor/device";

export const useDevice = () => {
  const [info, setInfo] = useState<DeviceInfo | null>(null);
  const [battery, setBattery] = useState<BatteryInfo | null>(null);

  useEffect(() => {
    const fetchDeviceData = async () => {
      const devInfo = await Device.getInfo();
      const batInfo = await Device.getBatteryInfo();
      setInfo(devInfo);
      setBattery(batInfo);
    };
    fetchDeviceData();
  }, []);

  return { info, battery };
};