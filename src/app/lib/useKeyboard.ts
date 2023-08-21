export interface Key {
  freq: number;
}

export interface UseKeyboardResult {
  keys: Key[];
}

function useKeyboard(): UseKeyboardResult {
  const keys = [
    { freq: 261.63 },
    { freq: 293.66 },
    { freq: 329.63 },
    { freq: 349.23 },
    { freq: 392.0 },
    { freq: 440.0 },
    { freq: 493.88 },
    { freq: 523.25 },
  ];

  return {
    keys,
  };
}

export { useKeyboard };
