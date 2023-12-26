import { useEffect, useRef, useState } from "react";
import { MouseCoordinates, useMousePosition } from "./useMousePosition";
import { UseToneOptions, useTone } from "../lib/useTone";

export interface CrosshairsProps {
  makeToneConfig: (elemAttrs: {
    rect: DOMRect;
    mouse: MouseCoordinates;
  }) => UseToneOptions;

  height?: number;

  dimension?: "x" | "y" | "xy";
}

function Crosshairs(props: CrosshairsProps) {
  const { height = 250, makeToneConfig, dimension = "xy" } = props;
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const rect = ref?.current?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0);

  const mouse = useMousePosition({ element: ref.current });

  const tone = useTone(makeToneConfig({ rect, mouse }));

  useEffect(() => {
    if (!ready && ref.current) {
      setReady(true);
    }
  }, [ref, ready]);

  return (
    <div
      ref={ref}
      className="border-2 border-black overflow-hidden relative"
      style={{ height, width: "100%" }}
      onMouseEnter={() => tone.play()}
      onMouseLeave={() => tone.stop()}
    >
      {dimension.includes("y") && (
        <div
          className="border border-black absolute w-full"
          style={{
            height: "2px",
            top: mouse.y + "px",
          }}
        />
      )}
      {dimension.includes("x") && (
        <div
          className="border border-black absolute h-full"
          style={{
            width: "2px",
            left: mouse.x + "px",
          }}
        />
      )}
    </div>
  );
}

export { Crosshairs };
