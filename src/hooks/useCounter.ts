import { useState, useEffect } from 'react';

export interface CounterState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const START_DATE = new Date('2025-08-09T00:00:00');

export function useCounter(): CounterState {
  const [counter, setCounter] = useState<CounterState>(() => calculate());

  function calculate(): CounterState {
    const diff = Date.now() - START_DATE.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const id = setInterval(() => setCounter(calculate()), 1000);
    return () => clearInterval(id);
  }, []);

  return counter;
}
