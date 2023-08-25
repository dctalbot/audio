export interface Key {
  freq: number;
  color: "white" | "black";
}

export interface UseKeyboardResult {
  keys: Key[];
}

function useKeyboard(): UseKeyboardResult {
  const keys: Key[] = [
    { freq: 261.63, color: "white" },
    { freq: 277.18, color: "black" },
    { freq: 293.66, color: "white" },
    { freq: 311.13, color: "black" },
    { freq: 329.63, color: "white" },
    { freq: 349.23, color: "white" },
    { freq: 369.99, color: "black" },
    { freq: 392.0, color: "white" },
    { freq: 415.3, color: "black" },
    { freq: 440.0, color: "white" },
    { freq: 466.16, color: "black" },
    { freq: 493.88, color: "white" },
    { freq: 523.25, color: "white" },
  ];

  return {
    keys,
  };
}

export { useKeyboard };
