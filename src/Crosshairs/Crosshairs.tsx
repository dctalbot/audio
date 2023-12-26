import { useEffect, useRef, useState } from "react";
import { useMousePosition } from "./useMousePosition";

function Crosshairs() {
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const res = useMousePosition({ element: ref.current });

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
    >
      <div
        className="border border-black absolute w-full"
        style={{
          height: "2px",
          top: res.y + "px",
        }}
      />
      <div
        className="border border-black absolute h-full"
        style={{
          width: "2px",
          left: res.x + "px",
        }}
      />
    </div>
  );
}

export { Crosshairs };
