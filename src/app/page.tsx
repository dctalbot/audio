"use client";

import { useState } from "react";
import { useTone } from "./lib/useTone";
import { useKeyboard } from "./lib/useKeyboard";
import { KeyboardKey } from "./Keyboard/KeyboardKey";
import { Keyboard } from "./Keyboard/Keyboard";
import { Graph } from "./Graph/Graph";

export default function Home() {
  return (
    <main className="h-full">
      <Keyboard />
      <Graph />
    </main>
  );
}
