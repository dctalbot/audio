import { useEffect, useRef, useState } from "react";
import { useMousePosition } from "./useMousePosition";
import { useTone } from "../lib/useTone";

function Crosshairs() {
  const [ready, setReady] = useState(false);
  const [volume, setVolume] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  const rect = ref?.current?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0);

  const mouse = useMousePosition({ element: ref.current });

  const tone = useTone({
    freq: (rect.right - mouse.x) * 2,
    volume: 1,
    // volume: rect.bottom / mouse.y,
  });

  useEffect(() => {
    if (!ready && ref.current) {
      setReady(true);
    }
  }, [ref, ready]);

  return (
    <div
      ref={ref}
      className="border-2 border-black overflow-hidden relative"
      style={{ height: 250, width: "100%" }}
      onMouseEnter={() => tone.play()}
      onMouseLeave={() => tone.stop()}
    >
      <div
        className="border border-black absolute w-full"
        style={{
          height: "2px",
          top: mouse.y + "px",
        }}
      />
      <div
        className="border border-black absolute h-full"
        style={{
          width: "2px",
          left: mouse.x + "px",
        }}
      />
    </div>
  );
}

export { Crosshairs };
