"use client";

export interface Key {
  freq: number;
  color: "white" | "black";
}

type Temperment = "equal" | "just" | "pythagorean";

interface KeyboardConfig {
  drone?: number;
  temperament?: Temperment;
  keyCount?: number;
}

export interface UseKeyboardResult {
  keys: Key[];
}

const getEqualTemperamentFreq = (drone: number, n: number): number => {
  return drone * Math.pow(Math.pow(2, 1 / 12), n);
};

function useKeyboard(config: KeyboardConfig = {}): UseKeyboardResult {
  const { drone = 440, temperament = "equal", keyCount = 12 } = config;

  const keys = new Array(keyCount).fill(0).map((_, i) => ({
    freq: getEqualTemperamentFreq(drone, i),
    color: [1, 4, 6, 9, 11].includes(i % 12)
      ? ("black" as const)
      : ("white" as const),
  }));

  return {
    keys,
  };
}

export { useKeyboard };
