import { useState, useEffect, useRef } from 'react';

/**
 * Reusable hook to handle interval-based timers
 * @param {number} initialTime - Initial time in seconds
 * @param {boolean} countdown - True if countdown timer, false if stopwatch count-up
 * @param {boolean} active - True if the timer should run
 */
export function useTimer(initialTime = 0, countdown = false, active = true) {
  const [time, setTime] = useState(initialTime);
  const timerRef = useRef(null);

  useEffect(() => {
    if (active) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (countdown) {
            if (prevTime <= 1) {
              clearInterval(timerRef.current);
              return 0;
            }
            return prevTime - 1;
          }
          return prevTime + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active, countdown]);

  const reset = (newTime = initialTime) => {
    setTime(newTime);
  };

  const formatTime = () => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return { time, formatTime, reset };
}
