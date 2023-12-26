import "./App.css";
import { KeyboardDemo } from "./demos/KeyboardDemo";
import { Trombone } from "./Crosshairs/Trombone";
import { Theremin } from "./Crosshairs/Theremin";
import { useState } from "react";

function App() {
  const [yes, setYes] = useState(false);
  return (
    <div className="some-div p-2 gap-6 flex flex-col">
      {!yes ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setYes(true)}
        >
          I am ready to jam
        </button>
      ) : (
        <>
          <h1>Keyboard demo:</h1>
          <p>
            This is a simple keyboard with a couple of options. Its only
            dimension is pitch, but you can change the range of keys as well as
            the first note. Double click on a key to pin its tone.
          </p>
          <KeyboardDemo />
          <h1>Trombone demo:</h1>
          <p>
            Like the keyboard, this "trombone" only has a pitch dimension.
            However, it provides an infinite number of steps between each scalar
            tone. In this way, it's one of the closest instruments to the human
            voice. Each bar represents a partial range based on the harmonic
            series. When a trombone player tightens their embouchure, they jump
            up a partial. Double click on a bar to pin its tone. You can
            actually pin multiple partials to play chords which I realize is not
            how a trombone works, but it's more fun this way.
          </p>
          <Trombone />
          <h1>Theremin demo:</h1>
          <p>
            Like the trombone, a theremin allows for an infinite number of steps
            between tones. A player would use one hand each to control two
            dimensions: pitch and volume. The example below simulates that in a
            2D space. Double click anywhere to pin the tone.
          </p>
          <Theremin />
        </>
      )}
    </div>
  );
}

export default App;
