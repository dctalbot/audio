"use client";

import { createContext, useContext, useRef, useState } from "react";

interface ToneProviderProps {
  children: React.ReactNode;
}

interface MyContext {
  ctx: AudioContext;
  initialized: boolean;
  setInitialized: (initialized: boolean) => void;
}

export const MyContext = createContext<MyContext>({
  ctx: new AudioContext(),
  initialized: false,
  setInitialized: (x: boolean) => {},
});

function ToneProvider({ children }: ToneProviderProps) {
  const ctx = useRef(new AudioContext()).current;
  const [initialized, setInitialized] = useState(false);

  return (
    <MyContext.Provider value={{ ctx, initialized, setInitialized }}>
      {children}
    </MyContext.Provider>
  );
}

export { ToneProvider };
