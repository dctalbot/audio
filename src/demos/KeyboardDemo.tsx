import * as React from "react";
import { Keyboard } from "../Keyboard/Keyboard";

function KeyboardDemo() {
  const [count, setCount] = React.useState(40);
  const [tonic, setTonic] = React.useState(440);
  return (
    <>
      <div>
        <form className="mb-2">
          <div className="flex items-center">
            <label
              htmlFor="keyboard-keycount"
              className="flex-1 block mb-2 text-gray-900 text-black"
            >
              Number of keys
            </label>
            <input
              id="keyboard-keycount"
              type="range"
              min="1"
              max="88"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="flex-1"
            />
            <p className="flex-1 pl-2">{count}</p>
          </div>

          <div className="flex items-center">
            <label
              htmlFor="keyboard-tonic"
              className="flex-1 block mb-2 text-gray-900 text-black"
            >
              Tonic
            </label>
            <input
              id="keyboard-tonic"
              type="range"
              min="1"
              max="1000"
              value={tonic}
              onChange={(e) => setTonic(Number(e.target.value))}
              className="flex-1"
            />
            <p className="flex-1 pl-2">{tonic} Hz</p>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setCount(40);
                setTonic(440);
              }}
            >
              Reset
            </button>
          </div>
        </form>
        <Keyboard keyCount={count} tonic={tonic} />
      </div>
    </>
  );
}

export { KeyboardDemo };
