import { useEffect, useRef, useState } from "react";
import { Key } from "../lib/useKeyboard";
import { useTone } from "../lib/useTone";
import { useWindowSize } from "../useWindowSize";

interface KeyboardKeyProps {
  keyConfig: Key;
  className?: string;
  style?: any;
}
function KeyboardKey({
  keyConfig,
  className = "",
  style = undefined,
}: KeyboardKeyProps) {
  const tone = useTone({ freq: keyConfig.freq });
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      tone.play();
    } else {
      tone.stop();
    }
  }, [checked]);

  return (
    <div
      className={className}
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
