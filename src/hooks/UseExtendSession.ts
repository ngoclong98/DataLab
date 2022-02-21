import { useEffect } from "react";
import Utils from "src/utils/Utils";
import useLocalStorage from "./UseLocalStorage";
const SCAN_INTERVAL = 60000;
const EXTEND_INTERVAL = 600000;
const useExtendSession = () => {
  const [lastExtendTime, setLastExtendTime] =
    useLocalStorage<number>("lastExtendTimme");

  useEffect(() => {
    const extendTimer = setInterval(() => {
      console.log("Running session interval");
      const now = new Date().getTime();
      if (!lastExtendTime) {
        setLastExtendTime(now);
      } else if (now - lastExtendTime >= EXTEND_INTERVAL) {
        setLastExtendTime(now);
        // Utils.sendExtendSession();
      }
    }, SCAN_INTERVAL);
    return () => {
      if (extendTimer) {
        clearInterval(extendTimer);
      }
    };
  }, [lastExtendTime, setLastExtendTime]);
};

export default useExtendSession;
