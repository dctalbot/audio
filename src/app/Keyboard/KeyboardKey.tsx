import { useEffect, useState } from "react";
import { Key } from "../lib/useKeyboard";
import { useTone } from "../lib/useTone";

interface KeyboardKeyProps {
  keyConfig: Key;
}
function KeyboardKey({ keyConfig }: KeyboardKeyProps) {
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
    <div className="flex-grow h-full flex flex-col ">
      <div
        className="flex-grow bg-blue-200 hover:bg-blue-300 border border-black"
        onMouseEnter={() => {
          if (checked) return;
          tone.play();
        }}
        onMouseLeave={() => {
          if (checked) return;
          tone.stop();
        }}
      ></div>
      <div className="flex-grow bg-green-500">
        <input
          type="checkbox"
          value={Number(checked)}
          onChange={() => setChecked(!checked)}
        />
      </div>
    </div>
  );
}

export { KeyboardKey };
