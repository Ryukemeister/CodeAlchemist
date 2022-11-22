import { Input } from "postcss";
import React from "react";
import useStore from "./store";

function App() {
  const cousins = useStore((state) => state.cousins);
  const bears = useStore((state) => state.bears);
  const addCousin = useStore((state) => state.addCousin);
  const resetCousinValues = useStore((state) => state.resetCousinValues);
  // const addBear = useStore((state) => state.addBear);
  // console.log(cousins);
  // console.log(addCousin);
  // console.log(addBear);
  // addCousin("vaibhav");

  function getCousinName() {
    const name = document.getElementsByClassName("cousin-name")[0];
    // console.log(name.value);
    addCousin(name.value);
    name.value = "";
  }

  return (
    <div className="App">
      <h1 className="font-bold text-red-500 text-2xl">Hello world</h1>
      <input
        type="text"
        className="cousin-name border-[1.5px] outline-none border-black px-2 py-1 mx-3"
        placeholder="Enter cousin name..."
      ></input>
      <button
        className="bg-green-500 text-white px-3 mx-2 my-2 py-1 rounded-full font-semibold"
        onClick={getCousinName}
      >
        Add cousin
      </button>
      <button
        className="bg-red-500 text-white px-3 mx-2 my-2 py-1 rounded-full font-semibold"
        onClick={resetCousinValues}
      >
        Reset cousins
      </button>
      {cousins.length > 0 && (
        <section>
          <div className="flex flex-wrap">
            {cousins.map((cousin) => {
              if (cousin.length > 0) {
                return (
                  <div
                    className="mx-4 my-3 border-[1.5px] border-red-400 px-5 py-2"
                    key={cousin}
                  >
                    <h1 className="font-mono text-2xl">{cousin}</h1>
                  </div>
                );
              }
            })}
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
