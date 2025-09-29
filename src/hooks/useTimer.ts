import { useEffect, useState } from "react";

const useTimer = (expiryTimestamp: number | undefined): boolean => {
  const [isExpired, setIsExpired] = useState<boolean>(false);

  useEffect(() => {
    // unixTimestamp가 undefined인 경우 early return
    if (typeof expiryTimestamp === "undefined") {
      setIsExpired(false);
      return;
    }

    if (expiryTimestamp) {
      setIsExpired(false);
    }

    // 밀리초를 초 단위로 변환
    const targetTimeSeconds = Math.floor(expiryTimestamp / 1000);

    const checkTime = () => {
      const currentTimeSeconds = Math.floor(Date.now() / 1000);
      if (currentTimeSeconds >= targetTimeSeconds) {
        setIsExpired(true);
        return true;
      }
      return false;
    };

    // 초기 체크
    const isTimeReached = checkTime();

    // 이미 시간이 지났다면 인터벌 설정하지 않음
    if (isTimeReached) {
      return;
    }

    // 1초마다 시간 체크
    const intervalId = setInterval(() => {
      const isTimeReached = checkTime();
      if (isTimeReached) {
        clearInterval(intervalId);
      }
    }, 1000);

    // 클린업
    return () => {
      clearInterval(intervalId);
    };
  }, [expiryTimestamp]);

  return isExpired;
};

export default useTimer;
