export interface Key {
  freq: number;
  color: "white" | "black";
}

interface KeyboardConfig {
  tonic?: number;
  keyCount?: number;
}

export interface UseKeyboardResult {
  keys: Key[];
}

const getEqualTemperamentFreq = (tonic: number, n: number): number => {
  return tonic * Math.pow(Math.pow(2, 1 / 12), n);
};

function useKeyboard(config: KeyboardConfig = {}): UseKeyboardResult {
  const { tonic = 440, keyCount = 12 } = config;

  const keys = new Array(keyCount).fill(0).map((_, i) => ({
    freq: getEqualTemperamentFreq(tonic, i),
    color: [1, 4, 6, 9, 11].includes(i % 12)
      ? ("black" as const)
      : ("white" as const),
  }));

  return {
    keys,
  };
}

export { useKeyboard };
