"use client";

import { KeyboardKey } from "./KeyboardKey";
import { useKeyboard } from "../lib/useKeyboard";
import { useWindowSize } from "../useWindowSize";
import { useEffect, useRef, useState } from "react";

// Keyboard renders 1 octave of keys
// It fills the width of the parent container
function Keyboard() {
  const { keys } = useKeyboard();

  const [whiteHeight, setWhiteHeight] = useState(0);

  const [containerHeight, containerWidth] = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);

  const stdWhiteWidth = 7 / 8;
  const stdWhiteHeight = 6.0;

  const whiteWidth = (stdWhiteWidth / stdWhiteHeight) * whiteHeight;

  const stdBlackWidth = 0.54;
  const stdBlackHeight = 3.5;

  const blackHeight = (whiteHeight * stdBlackHeight) / stdWhiteHeight;
  const blackWidth = (whiteHeight * stdBlackWidth) / stdWhiteHeight;
  const blackMarginLeft = whiteWidth - blackWidth / 2;

  useEffect(() => {
    const whiteKeyCount = keys.filter((k) => k.color === "white").length;
    const whiteWidth = (ref?.current?.offsetWidth ?? 0) / whiteKeyCount;
    const whiteHeight = (stdWhiteHeight / stdWhiteWidth) * whiteWidth;
    setWhiteHeight(whiteHeight);
  }, [containerHeight, containerWidth]);

  const whiteKeys = keys
    .filter((k) => k.color === "white")
    .map((key, i) => (
      <KeyboardKey
        key={String(key.freq)}
        keyConfig={key}
        className={`flex-1 bg-neutral-50 hover:bg-neutral-200 border border-black`}
      />
    ));

  let blackKeys = [];

  keys.forEach((_, i) => {
    if (keys[i].color === "black") {
      return;
    }

    if (keys[i + 1]?.color === "black") {
      blackKeys.push(
        <div
          className="flex-1"
          style={{
            height: blackHeight + "px",
            transform: `translateX(${blackMarginLeft}px)`,
          }}
        >
          <KeyboardKey
            key={String(keys[i + 1].freq)}
            keyConfig={keys[i + 1]}
            className={`bg-neutral-950 hover:bg-neutral-700 border border-black `}
            style={{
              width: blackWidth + "px",
              height: "100%",
            }}
          />
        </div>
      );
      return;
    }

    if (keys[i + 1]?.color === "white") {
      blackKeys.push(<div className="flex-1"></div>);
      return;
    }
  });

  blackKeys.push(<div className="flex-1"></div>);

  return (
    <div className="relative">
      <div
        className="flex gap-px"
        ref={ref}
        style={{ height: whiteHeight + "px" }}
      >
        {whiteKeys}
      </div>
      <div className="absolute flex w-full top-0">{blackKeys}</div>
    </div>
  );
}

export { Keyboard };
