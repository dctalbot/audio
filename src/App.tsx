import "./App.css";
import { KeyboardDemo } from "./demos/KeyboardDemo";
import { CrosshairsDemo } from "./demos/CrosshairsDemo";
import { Trombone } from "./Crosshairs/Trombone";
import { Theremin } from "./Crosshairs/Theremin";

function App() {
  return (
    <div className="some-div p-2 gap-1 flex flex-col">
      <button>click me first</button>
      <KeyboardDemo />
      <Trombone />
      <Theremin />
    </div>
  );
}

export default App;
