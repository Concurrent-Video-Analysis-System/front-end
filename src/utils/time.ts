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
  /*moment.updateLocale("zh-cn", {
    future: "%s后",
    past:   "%s前",
    s  : '几秒',
    ss : '%d秒',
    m:  "一分钟",
    mm: "%d分钟",
    h:  "一小时",
    hh: "%d小时",
    d:  "一天",
    dd: "%d天",
    w:  "一周",
    ww: "%d周",
    M:  "一个月",
    MM: "%d个月",
    y:  "一年",
    yy: "%d 年"
  });*/
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
