"use client";

import { Context, createContext, useRef, useState } from "react";

interface ToneProviderProps {
  children: React.ReactNode;
}

interface AppAudioContext {
  ctx: AudioContext;
  initialized: boolean;
  setInitialized: (initialized: boolean) => void;
}

export const AppAudioContext: Context<AppAudioContext> =
  createContext<AppAudioContext>({
    ctx:
      typeof window === "undefined" ? (undefined as any) : new AudioContext(),
    initialized: false,
    setInitialized: (x: boolean) => {},
  });

function ToneProvider({ children }: ToneProviderProps) {
  const ctx: AppAudioContext["ctx"] = useRef(
    typeof window === "undefined" ? (undefined as any) : new AudioContext()
  ).current;
  const [initialized, setInitialized] = useState(false);

  return (
    <AppAudioContext.Provider value={{ ctx, initialized, setInitialized }}>
      {children}
    </AppAudioContext.Provider>
  );
}

export { ToneProvider };
