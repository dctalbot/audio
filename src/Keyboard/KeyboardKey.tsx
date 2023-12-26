import { Key } from "../lib/useKeyboard";
import { useTone } from "../lib/useTone";

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

  const className2 =
    variant === "white"
      ? ` flex-1 bg-neutral-50 hover:bg-neutral-200 border border-black `
      : ` bg-neutral-950 hover:bg-neutral-700 border border-black `;

  return (
    <div
      className={className + className2}
      style={style}
      onMouseEnter={() => {
        tone.play();
      }}
      onMouseLeave={() => {
        tone.stop();
      }}
    ></div>
  );
}

export { KeyboardKey };
