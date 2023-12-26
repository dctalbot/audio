import { KeyboardKey } from "./KeyboardKey";
import { useKeyboard } from "./useKeyboard";
import { useWindowSize } from "../useWindowSize";
import { useEffect, useRef, useState } from "react";

// standard key dimensions in inches
const stdKeySize = {
  white: {
    width: 7 / 8,
    height: 6.0,
  },
  black: {
    width: 0.54,
    height: 3.5,
  },
};

interface KeyboardProps {
  // keyCount is the number of keys to render
  keyCount?: number;

  // tonic is the frequency of the lowest note
  // must be greater than 0
  tonic?: number;
}

// Keyboard fills the width of its parent element
function Keyboard({ keyCount = 40, tonic = 440 }: KeyboardProps) {
  const { keys } = useKeyboard({ keyCount, tonic });
  const ref = useRef<HTMLDivElement>(null);
  const [containerHeight, containerWidth] = useWindowSize();
  const [whiteHeight, setWhiteHeight] = useState(0);

  useEffect(() => {
    const whiteKeyCount = keys.filter((k) => k.color === "white").length;
    const whiteWidth = (ref?.current?.offsetWidth ?? 0) / whiteKeyCount;
    const whiteHeight = (stdWhite.height / stdWhite.width) * whiteWidth;
    setWhiteHeight(whiteHeight);
  }, [containerHeight, containerWidth, keyCount]);

  const stdWhite = stdKeySize["white"];
  const stdBlack = stdKeySize["black"];

  const whiteWidth = (stdWhite.width / stdWhite.height) * whiteHeight;
  const blackHeight = (whiteHeight * stdBlack.height) / stdWhite.height;
  const blackWidth = (whiteHeight * stdBlack.width) / stdWhite.height;
  const blackMarginLeft = whiteWidth - blackWidth / 2;

  const whiteKeys: JSX.Element[] = [];
  const blackKeys: JSX.Element[] = [];

  keys.forEach((key, i) => {
    if (key.color === "white") {
      whiteKeys.push(
        <KeyboardKey key={String(key.freq)} keyConfig={key} variant="white" />
      );
      return;
    }

    blackKeys.push(
      <div
        key={String(keys[i].freq)}
        className="flex-1"
        style={{
          height: blackHeight + "px",
          transform: `translateX(${
            blackMarginLeft + (whiteKeys.length - 1) * whiteWidth
          }px)`,
          position: "absolute",
          top: 0,
        }}
      >
        <KeyboardKey
          keyConfig={keys[i]}
          variant="black"
          style={{
            width: blackWidth + "px",
            height: "100%",
          }}
        />
      </div>
    );
  });

  return (
    <div className="relative">
      <div
        className="flex gap-px"
        ref={ref}
        style={{ height: whiteHeight + "px" }}
      >
        {whiteKeys}
      </div>

      {blackKeys}
    </div>
  );
}

export { Keyboard };
