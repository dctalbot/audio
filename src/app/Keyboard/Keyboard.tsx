"use client";

import { KeyboardKey } from "./KeyboardKey";
import { useKeyboard } from "../lib/useKeyboard";

function Keyboard() {
  const { keys } = useKeyboard();

  const renderedKeys = keys.map((key, i) => (
    <KeyboardKey key={String(key.freq)} keyConfig={key} />
  ));

  return <div className="flex h-full">{renderedKeys}</div>;
}

export { Keyboard };
