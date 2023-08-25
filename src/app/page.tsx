"use client";

import { Keyboard } from "./Keyboard/Keyboard";

export default function Home() {
  return (
    <main className="h-full">
      <div style={{ maxWidth: "500px" }}>
        <Keyboard />
      </div>
    </main>
  );
}
