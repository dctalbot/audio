import { Key } from "../lib/useKeyboard";
import { useTone } from "../lib/useTone";

interface KeyboardKeyProps {
  keyConfig: Key;
}
function KeyboardKey({ keyConfig }: KeyboardKeyProps) {
  const tone = useTone({ freq: keyConfig.freq });

  return (
    <div
      className="flex-1 bg-blue-500 h-full"
      style={{
        margin: "0 2px",
        display: "inline-block",
      }}
      onMouseEnter={() => {
        tone.play();
      }}
      onMouseLeave={() => tone.stop()}
    ></div>
  );
}

export { KeyboardKey };
