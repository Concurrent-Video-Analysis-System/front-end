import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/zh-cn";

export const pad = (value: number, digits: number = 2) => {
  const sign = Math.sign(value) === -1 ? "-" : "";
  return (
    sign +
    new Array(digits)
      .concat([Math.abs(value)])
      .join("0")
      .slice(-digits)
  );
};

export const updateCurrentTime = () => {
  moment.locale("zh-cn");
};

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return currentTime;
};
