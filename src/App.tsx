import "./App.css";
import { KeyboardDemo } from "./demos/KeyboardDemo";
import { CrosshairsDemo } from "./demos/CrosshairsDemo";

function App() {
  return (
    <div className="some-div p-2 gap-1 flex flex-col">
      <button>click me first</button>
      <KeyboardDemo />
      <CrosshairsDemo />
    </div>
  );
}

export default App;
