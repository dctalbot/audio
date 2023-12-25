import * as React from "react";
import "./App.css";
import { Keyboard } from "./Keyboard/Keyboard";

function App() {
  const [count, setCount] = React.useState(10);
  return (
    <>
      <div className="some-div">
        <Keyboard keyCount={count} />
      </div>
      <input
        type="range"
        min="1"
        max="88"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      />
    </>
  );
}

export default App;
