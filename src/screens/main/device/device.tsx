import { selectDeviceReducer } from "./device.slice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";

export const DeviceFragment = () => {
  const navigate = useNavigate();
  const { deviceId } = useParams();
  const deviceSelector = useSelector(selectDeviceReducer);

  const device = useMemo(() => {
    return deviceSelector.deviceList.find((item) => item.id === +deviceId);
  }, [deviceId, deviceSelector.deviceList]);

  useEffect(() => {
    if (!device) {
      navigate(`/device`);
    }
  }, [device, navigate]);

  return (
    <>
      <h1>{device?.viewport}</h1>
      <h3>{device?.rtsp}</h3>
    </>
  );
};
