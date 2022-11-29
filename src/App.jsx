import React, { useEffect } from "react";
import useStore from "./store";

function App() {
  const cousins = useStore((state) => state.cousins);
  const addCousin = useStore((state) => state.addCousin);
  const resetCousinValues = useStore((state) => state.resetCousinValues);
  const removeCousins = useStore((state) => state.removeCousin);
  const friend = useStore((state) => state.friends);
  const addFriend = useStore((state) => state.addFriend);
  const playerData = useStore((state) => state.playerData);
  const teamsData = useStore((state) => state.teamsData);

  function getPlayerData(playerId) {
    fetch(
      `https://site.web.api.espn.com/apis/common/v3/sports/soccer/epl/athletes/${playerId}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        playerData.push(data);
      });
  }

  function getTeamsData() {
    fetch(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/:league/teams?league=eng.1`
    )
      .then((response) => response.json())
      .then((data) => {
        const { sports } = data;
        teamsData.push(sports[0]);
        // console.log(sports[0]);
      });
  }

  useEffect(() => {
    getPlayerData(6183);
    getTeamsData();
  }, []);

  // console.log(playerData);
  // console.log(teamsData);

  const count = useStore((state) => state.count);
  const incrementCount = useStore((state) => state.incrementCount);
  const decrementCount = useStore((state) => state.decrementCount);

  function getCousinName() {
    const name = document.getElementsByClassName("cousin-name")[0];
    // console.log(name.value);
    addCousin(name.value);
    console.log(playerData);
    console.log(teamsData);
    name.value = "";
  }

  function removeCousin(e) {
    const name = e.target.parentNode.children[0].innerHTML;
    // console.log(name);
    removeCousins(name);
  }
  // console.log(friend);

  return (
    <div className="App">
      <input
        type="text"
        className="cousin-name border-[1.5px] outline-none border-black px-2 py-1 mx-4 mt-5"
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
                    className="flex mx-4 my-3 border-[1.5px] border-red-400 px-5 py-2"
                    key={cousin}
                  >
                    <h1 className="cousin-to-be-removed mr-7 font-mono text-2xl">
                      {cousin}
                    </h1>
                    <button
                      onClick={removeCousin}
                      className="bg-red-500 px-2 text-white"
                    >
                      —
                    </button>
                  </div>
                );
              }
            })}
          </div>
        </section>
      )}
      <div>
        <h1 className="mx-4 mb-1 text-2xl font-mono font-medium">
          Count: <span className="text-red-500 text-3xl">{count}</span>
        </h1>
        <button
          className="bg-red-500 text-white px-1 text-2xl mx-4"
          onClick={decrementCount}
        >
          —
        </button>
        <button
          className="bg-green-500 text-white px-1 text-2xl"
          onClick={incrementCount}
        >
          +
        </button>
        <button onClick={() => addFriend("Aakash")}>Add friend</button>
      </div>
    </div>
  );
}

export default App;
