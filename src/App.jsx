import React, { useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import useStore from "./store";
import Navbar from "./components/Navbar";
import Editor from "./components/Editor";

function App() {
  const cousins = useStore((state) => state.cousins);
  const addCousin = useStore((state) => state.addCousin);
  const resetCousinValues = useStore((state) => state.resetCousinValues);
  const removeCousins = useStore((state) => state.removeCousin);
  const friend = useStore((state) => state.friends);
  const addFriend = useStore((state) => state.addFriend);
  const playerData = useStore((state) => state.playerData);
  const teamsData = useStore((state) => state.teamsData);

  const configration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configration);

  const translateFromOneLanguageToAnother = async function (
    currentLanguage,
    languageToBeTranslated
  ) {
    const response = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: `##### Translate this function from ${currentLanguage} into ${languageToBeTranslated}### x=3;\n y=5;\n print(x+y);### ${languageToBeTranslated}`,
      temperature: 0,
      max_tokens: 54,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["###"],
    });

    console.log(response);
    console.log(response.data.choices[0].text);
  };

  /* prompt:
        'class Log:\n    def __init__(self, path):\n        dirname = os.path.dirname(path)\n        os.makedirs(dirname, exist_ok=True)\n        f = open(path, "a+")\n\n        # Check that the file is newline-terminated\n        size = os.path.getsize(path)\n        if size > 0:\n            f.seek(size - 1)\n            end = f.read(1)\n            if end != "\\n":\n                f.write("\\n")\n        self.f = f\n        self.path = path\n\n    def log(self, event):\n        event["_event_id"] = str(uuid.uuid4())\n        json.dump(event, self.f)\n        self.f.write("\\n")\n\n    def state(self):\n        state = {"complete": set(), "last": None}\n        for line in open(self.path):\n            event = json.loads(line)\n            if event["type"] == "submit" and event["success"]:\n                state["complete"].add(event["id"])\n                state["last"] = event\n        return state\n\n"""\nHere\'s what the above class is doing:\n1.',*/

  const explainCodeSnippet = async function () {
    const response = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: `function calculateAge(birthYear){
        let age = 2022 - birthYear;
        console.log(age);

        return age;
      };"""Here's what the code is doing`,
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      /*stop: ['"""'],*/
      stop: [`"""`],
    });

    console.log(response.data.choices[0].text);
    console.log(typeof response.data.choices[0].text);
  };

  // console.log(configration.apiKey);

  function speak(text) {
    // const text = `hey hows it going its me rajiv I'm a frontend developer`;

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    utterance.pitch = 1;
    utterance.rate = 0.8;
    utterance.voice = voices[7];
    utterance.volume = 2;
    // console.log(voices);

    window.speechSynthesis.speak(utterance);
  }

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
      <Navbar />
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
      <button
        className="bg-green-500 text-white px-3 mx-2 my-2 py-1 rounded-full font-semibold"
        onClick={() =>
          translateFromOneLanguageToAnother("Python", "JavaScript")
        }
      >
        Translate
      </button>
      <button
        onClick={() =>
          speak(`hey hows it going its me rajiv I'm a frontend developer`)
        }
        className="bg-red-500 text-white px-3 mx-2 my-2 py-1 rounded-full font-semibold"
      >
        Speak
      </button>
      <button
        onClick={explainCodeSnippet}
        className="bg-orange-500 text-white px-3 mx-2 my-2 py-1 rounded-full font-semibold"
      >
        Explain code
      </button>
      <div>
        <Editor />
      </div>
    </div>
  );
}

export default App;
