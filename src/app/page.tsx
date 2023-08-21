"use client";

import { useState } from "react";
import { useTone } from "./useTone";

export default function Home() {
  const [drone, setDrone] = useState(440);
  const [volume, setVolume] = useState(0.5);
  const { init, play, stop } = useTone({ freq: drone, volume });

  return (
    <main>
      <input
        type="number"
        value={drone}
        min={0}
        onChange={(e) => setDrone(Number(e.target.value))}
      ></input>

      <input
        type="number"
        value={volume}
        min={0}
        max={1}
        step="0.01"
        onChange={(e) => setVolume(Number(e.target.value))}
      ></input>

      <div style={{ display: "flex", flexDirection: "row", gap: "6px" }}>
        <button type="button" onClick={(e) => init()}>
          init
        </button>
        <button type="button" onClick={(e) => play()}>
          start
        </button>
        <button type="button" onClick={(e) => stop()}>
          stop
        </button>
      </div>
    </main>
  );
}
