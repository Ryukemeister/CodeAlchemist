import React from "react";
import useStore from "./store";

function App() {
  const bears = useStore((state) => state.bears);
  const addBear = useStore((state) => state.addBear);
  console.log(bears);
  console.log(addBear);

  return (
    <div className="App">
      <h1 className="font-bold text-red-500 text-2xl">Hello world</h1>
    </div>
  );
}

export default App;
