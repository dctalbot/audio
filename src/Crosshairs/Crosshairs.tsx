import { useEffect, useRef, useState } from "react";
import { MouseCoordinates, useMousePosition } from "./useMousePosition";
import { UseToneOptions, useTone } from "../lib/useTone";
import { useDoubleClick } from "../lib/useDoubleClick";

interface CrosshairsPin {
  isPinned: boolean;
  mouse: MouseCoordinates | null;
}

export interface CrosshairsProps {
  makeToneConfig: (elemAttrs: {
    rect: DOMRect;
    mouse: MouseCoordinates;
    pin: CrosshairsPin;
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
  const [pin, setPin] = useState<{
    isPinned: boolean;
    mouse: MouseCoordinates | null;
  }>({ isPinned: false, mouse: null });

  const tone = useTone(makeToneConfig({ rect, mouse, pin }));

  const onSingleClick = () => tone.play();
  const onDoubleClick = () => {
    if (pin.isPinned) {
      setPin({ isPinned: false, mouse: null });
    } else {
      setPin({ isPinned: true, mouse });
      tone.play();
    }
  };
  const onClick = useDoubleClick({ onSingleClick, onDoubleClick });

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
      onMouseLeave={() => {
        if (!pin.isPinned) {
          tone.stop();
        }
      }}
      onTouchStart={() => tone.play()}
      onTouchEnd={() => {
        if (!pin.isPinned) {
          tone.stop();
        }
      }}
      onClick={onClick}
    >
      {dimension.includes("y") && (
        <div
          className="border border-black absolute w-full"
          style={{
            height: "2px",
            top: pin?.mouse?.y ?? mouse.y + "px",
          }}
        />
      )}
      {dimension.includes("x") && (
        <div
          className="border border-black absolute h-full"
          style={{
            width: "2px",
            left: pin?.mouse?.x ?? mouse.x + "px",
          }}
        />
      )}
    </div>
  );
}

export { Crosshairs };
