"use client";

import { createContext, useContext, useRef, useState } from "react";

interface MyProviderProps {
  children: React.ReactNode;
}

export const MyContext = createContext<AudioContext>(new AudioContext());

function MyProvider({ children }: MyProviderProps) {
  const value = useContext(MyContext);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}

export { MyProvider };
