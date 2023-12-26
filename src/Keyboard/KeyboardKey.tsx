import { Key } from "./useKeyboard";
import { useTone } from "../lib/useTone";
import { useState } from "react";
import { useDoubleClick } from "../lib/useDoubleClick";

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
  const [pinned, setPinned] = useState(false);
  const tone = useTone({ freq: keyConfig.freq });

  const onSingleClick = () => tone.play();
  const onDoubleClick = () => {
    if (pinned) {
      setPinned(false);
    } else {
      setPinned(true);
      tone.play();
    }
  };
  const onClick = useDoubleClick({ onSingleClick, onDoubleClick });

  const className2 =
    variant === "white"
      ? ` flex-1 bg-neutral-50 hover:bg-neutral-200 border border-black `
      : ` bg-neutral-950 hover:bg-neutral-700 border border-black `;

  const className3 = pinned
    ? variant === "white"
      ? ` bg-neutral-200 `
      : ` bg-neutral-700 `
    : ``;

  return (
    <div
      className={className + className2 + className3}
      style={style}
      onClick={onClick}
      onMouseEnter={() => {
        tone.play();
      }}
      onMouseLeave={() => {
        if (!pinned) {
          tone.stop();
        }
      }}
      onTouchStart={() => {
        tone.play();
      }}
      onTouchEnd={() => {
        if (!pinned) {
          tone.stop();
        }
      }}
    ></div>
  );
}

export { KeyboardKey };
