import Navbar from "../components/Navbar";
import Editor from "../components/Editor";
import useStore from "../Store";

export default function ExplainCode() {
  const codeToBeExplained = useStore((state) => state.codeToBeExplained);
  const setCodeToBeExplained = useStore((state) => state.setCodeToBeExplained);
  const codeReadyToBeExplained = useStore(
    (state) => state.codeReadyToBeExplained
  );
  const setCodeReadyToBeExplained = useStore(
    (state) => state.setCodeReadyToBeExplained
  );
  const apiKey = import.meta.env.VITE_Open_AI_Key;

  // This the part where all the code snippet explanation is displayed to the user
  const codeSnippetExplanation = (
    <div>
      <h1 className="font-poppins mx-5 mb-1 md:mx-10 font-semibold text-2xl">
        Here's what the below code snippet does: <br />
      </h1>
      <span className="font-poppins text-xl bg-yellow-500 text-black">
        {codeReadyToBeExplained.map((piece, i) => {
          return (
            <p className="font-poppins text-xl px-5 md:px-10" key={i}>
              {i + 1}. {piece} <br />
            </p>
          );
        })}
      </span>
    </div>
  );

  const explainUserCodeSnippet = async function (inputCodePrompt) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(apiKey),
      },
      body: JSON.stringify({
        model: "code-davinci-002",
        prompt: `${inputCodePrompt}"""Here's what the code is doing`,
        temperature: 0,
        max_tokens: 80,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: [`"""`],
      }),
    };

    try {
      await fetch("https://api.openai.com/v1/completions", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          const responseText = data.choices[0].text;

          // Splitting up the text that we get as a response from the api
          // Then filtering out the unnecessary part
          const splitResponseText = responseText.split("\n");
          const filterResponseText = splitResponseText.filter((text) => {
            if (!(text == ":") && text.length > 0) {
              return text;
            }
          });
          const joinFilteredResponseText = filterResponseText.join(" ");

          setCodeReadyToBeExplained(filterResponseText);
          speak(joinFilteredResponseText);
        });
    } catch (err) {
      console.error(err);
    }
  };

  function handleClick(prompt) {
    // Error message to be displayed
    const err = `// Oops, something's wrong :(

const error = {
  cause: "It looks like you haven't provided any input for the Editor to explain.",
  possibleSolution: "Try providing a better prompt or refresh the page.",
}
      `;

    // Error handling
    // Trying to check if the user provides a blank input to the Editor
    if (prompt.length <= 0 || prompt == err) {
      setCodeToBeExplained(err);
      return;
    }

    explainUserCodeSnippet(prompt);
  }

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    // Setting up the pitch tone and rate
    utterance.pitch = 1;
    utterance.rate = 0.8;
    utterance.voice = voices[7];
    utterance.volume = 2;

    window.speechSynthesis.speak(utterance);
  }

  return (
    <div>
      <Navbar />
      <h1 className="font-poppins text-3xl font-semibold pl-5 md:px-10 py-5">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent bg-clip-text">
          {" "}
          Explanation Land
        </span>
        , this is where you get all the explanations about your code snippet.
      </h1>
      {codeReadyToBeExplained.length > 0 && (
        <div className="pb-5">{codeSnippetExplanation}</div>
      )}
      <div className="overflow-hidden ml-5 mr-5 md:ml-10 lg:w-[850px]">
        <div className="w-[100%] mr-5 md:mr-0">
          <Editor
            height="320"
            marginTop="0"
            marginLeft="0"
            code={codeToBeExplained}
            handleChange={setCodeToBeExplained}
            isEditable="true"
          />
        </div>
        <div>
          <button
            onClick={() => handleClick(codeToBeExplained)}
            className="bg-yellow-500 outline-none mt-4 mb-4 px-3 py-1 text-xl font-poppins font-semibold tracking-wide text-white rounded-md"
          >
            Expalin code
          </button>
        </div>
      </div>
    </div>
  );
}
