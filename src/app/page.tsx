"use client";

import { useState } from "react";
import { Keyboard } from "./Keyboard/Keyboard";

export default function Home() {
  const [keyCount, setKeyCount] = useState(12);
  return (
    <main className="h-full">
      <input
        type="range"
        min="1"
        max="200"
        value={keyCount}
        onChange={(e) => setKeyCount(Number(e.target.value))}
      />

      <div style={{ maxWidth: "700px" }}>
        <Keyboard keyCount={keyCount} />
      </div>
    </main>
  );
}
