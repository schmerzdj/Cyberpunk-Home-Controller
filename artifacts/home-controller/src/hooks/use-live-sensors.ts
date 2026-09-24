import { useEffect, useState } from 'react';

type SensorState = {
  temperature: number;
  humidity: number;
  co2: number;
  noise: number;
  history: number[];
};

function jitter(value: number, delta: number, min: number, max: number) {
  const next = value + (Math.random() - 0.5) * delta;
  return Math.max(min, Math.min(max, next));
}

export function useLiveSensors() {
  const [state, setState] = useState<SensorState>({
    temperature: 22.6,
    humidity: 61,
    co2: 604,
    noise: 31,
    history: Array.from({ length: 20 }, () => 22.6),
  });

  useEffect(() => {
    const interval = window.setInterval(() => {
      setState((prev) => {
        const temp = jitter(prev.temperature, 0.35, 21.2, 23.8);
        return {
          temperature: temp,
          humidity: jitter(prev.humidity, 2, 56, 67),
          co2: Math.round(jitter(prev.co2, 12, 565, 675)),
          noise: jitter(prev.noise, 1.2, 28, 38),
          history: [...prev.history.slice(-19), temp],
        };
      });
    }, 2500);
    return () => window.clearInterval(interval);
  }, []);

  return state;
}
