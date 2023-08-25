import { useEffect, useRef, useState } from "react";
import { Key } from "../lib/useKeyboard";
import { useTone } from "../lib/useTone";
import { useWindowSize } from "../useWindowSize";

interface KeyboardKeyProps {
  keyConfig: Key;
  className?: string;
  style?: any;
  variant?: "black" | "white";
}
function KeyboardKey({
  keyConfig,
  className = "",
  style = undefined,
  variant,
}: KeyboardKeyProps) {
  const tone = useTone({ freq: keyConfig.freq });
  const [checked, setChecked] = useState(false);

  const className2 =
    variant === "white"
      ? ` flex-1 bg-neutral-50 hover:bg-neutral-200 border border-black `
      : ` bg-neutral-950 hover:bg-neutral-700 border border-black `;

  useEffect(() => {
    if (checked) {
      tone.play();
    } else {
      tone.stop();
    }
  }, [checked]);

  return (
    <div
      className={className + className2}
      style={style}
      onMouseEnter={() => {
        if (checked) return;
        tone.play();
      }}
      onMouseLeave={() => {
        if (checked) return;
        tone.stop();
      }}
    ></div>
  );
}

export { KeyboardKey };
