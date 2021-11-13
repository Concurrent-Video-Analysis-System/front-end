import { useEffect, useState } from "react";

export const useTrigger = (callback: () => void) => {
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    if (trigger) {
      callback();
      setTrigger(false);
    }
  }, [callback, trigger]);
  return setTrigger;
};
