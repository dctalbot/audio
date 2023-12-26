import { Context, createContext, useRef } from "react";

interface ToneProviderProps {
  children: React.ReactNode;
}

interface AppAudioContext {
  ctx: AudioContext;
}

export const AppAudioContext: Context<AppAudioContext> =
  createContext<AppAudioContext>({
    ctx:
      typeof window === "undefined" ? (undefined as any) : new AudioContext(),
  });

function ToneProvider({ children }: ToneProviderProps) {
  const ctx: AppAudioContext["ctx"] = useRef(
    typeof window === "undefined" ? (undefined as any) : new AudioContext()
  ).current;

  return (
    <AppAudioContext.Provider value={{ ctx }}>
      {children}
    </AppAudioContext.Provider>
  );
}

export { ToneProvider };
