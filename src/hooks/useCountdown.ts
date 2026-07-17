import { useState, useEffect } from 'react';

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
  expired: boolean;
}

export function useCountdown(targetDate: Date): CountdownState {
  const [state, setState] = useState<CountdownState>(() => calculate(targetDate));

  useEffect(() => {
    const id = setInterval(() => setState(calculate(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return state;
}

function calculate(target: Date): CountdownState {
  const total = target.getTime() - Date.now();
  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0, expired: true };
  }
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { days, hours, minutes, seconds, total, expired: false };
}
