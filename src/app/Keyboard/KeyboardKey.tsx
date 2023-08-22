import { useEffect, useRef, useState } from "react";
import { Key } from "../lib/useKeyboard";
import { useTone } from "../lib/useTone";
import { useWindowSize } from "../useWindowSize";

interface KeyboardKeyProps {
  keyConfig: Key;
}
function KeyboardKey({ keyConfig }: KeyboardKeyProps) {
  const tone = useTone({ freq: keyConfig.freq });
  const [checked, setChecked] = useState(false);
  const [height, setHeight] = useState(0);
  const [screenWidth] = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);

  const stdWidth = 7 / 8;
  const stdHeight = 6;
  const heightMultipler = (1 / stdWidth) * stdHeight;

  useEffect(() => {
    setHeight((ref?.current?.offsetWidth ?? 0) * heightMultipler);
  }, [screenWidth]);

  useEffect(() => {
    if (checked) {
      tone.play();
    } else {
      tone.stop();
    }
  }, [checked]);

  return (
    <div
      ref={ref}
      className="flex-grow h-full flex flex-col"
      style={{ height: height + "px" }}
    >
      <div
        className="flex-grow bg-blue-200 hover:bg-blue-300"
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
