"use client";

import { KeyboardKey } from "./KeyboardKey";
import { useKeyboard } from "../lib/useKeyboard";
import { useWindowSize } from "../useWindowSize";
import { useEffect, useRef, useState } from "react";

interface KeyboardProps {
  // keyCount is the number of keys to render
  keyCount?: number;
}

// Keyboard fills the width of its parent element
function Keyboard(props: KeyboardProps) {
  const keyCount = props.keyCount ?? 40;
  const { keys } = useKeyboard({ tonic: 55, keyCount });

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
  }, [containerHeight, containerWidth, keyCount]);

  const whiteKeys = keys
    .filter((k) => k.color === "white")
    .map((key, i) => (
      <KeyboardKey key={String(key.freq)} keyConfig={key} variant="white" />
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
            variant="black"
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

  if (keys[keys.length - 1]?.color === "white") {
    blackKeys.push(<div className="flex-1"></div>);
  }

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
