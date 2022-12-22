import Navbar from "../components/Navbar";
import Editor from "../components/Editor";
import useStore from "../Store";

/*
const calcAge = function(birthYear, currentYear) {
  const age = currentYear - birthYear;
  return `Your age is ${age} years.`;
};
*/
export default function ExplainCode({ openAiConfig }) {
  const codeToBeExplained = useStore((state) => state.codeToBeExplained);
  const setCodeToBeExplained = useStore((state) => state.setCodeToBeExplained);
  const apiKey = import.meta.env.VITE_Open_AI_Key;

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
        max_tokens: 120,
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
          const splitResponseText = responseText.split("\n");
          const filterResponseText = splitResponseText.filter((text) => {
            if (!text.includes(":") && text.length > 0) {
              // console.log(text);
              return text;
            }
            // console.log(s);
            // console.log(text);
          });
          const joinFilteredResponseText = filterResponseText.join(" ");

          console.log(data);
          console.log(data.choices[0].text);
          console.log(joinFilteredResponseText);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const explainCodeSnippet = async function (inputCodePrompt) {
    const response = await openAiConfig.createCompletion({
      model: "code-davinci-002",
      prompt: `${inputCodePrompt}"""Here's what the code is doing`,
      /*
      prompt: `function calculateAge(birthYear){
        let age = 2022 - birthYear;
        console.log(age);

        return age;
      };"""Here's what the code is doing`
      */ temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      /*stop: ['"""'],*/
      stop: [`"""`],
    });

    const responseText = response.data.choices[0].text;
    console.log(responseText);
    const splitResponseText = responseText.split("\n");
    // console.log(splitResponseText);
    const filteredResponseText = splitResponseText.filter((text) => {
      if (!text.includes(":") && text.length > 0) {
        // console.log(text);
        return text;
      }
      // console.log(s);
      // console.log(text);
    });

    const joinFilteredResponseText = filteredResponseText.join(" ");
    console.log(filteredResponseText);
    console.log(joinFilteredResponseText);
    speak(joinFilteredResponseText);

    const si = responseText
      .split("\n")
      .filter((text) => (text.includes("") || text.includes(":") ? "" : text));
    // console.log(s);
    // console.log(typeof response.data.choices[0].text);
  };

  function handleClick(prompt) {
    // console.log(prompt, typeof prompt);
    // explainCodeSnippet(prompt);
    const err = `// Oops, something's wrong :(

const error = {
  cause: "It looks like you haven't provided any input for the Editor to explain.",
  possibleSolution: "Try providing a better prompt or refresh the page.",
}
      `;

    // Error handling
    // Try to check if the user provides a blank input to the Editor
    if (prompt.length <= 0 || prompt == err) {
      setCodeToBeExplained(err);
      return;
    }

    explainUserCodeSnippet(prompt);
    console.log(`${prompt}"""Here's what the code is doing`);
    setCodeToBeExplained("");
  }

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

  return (
    <div>
      <Navbar />
      <h1 className="font-poppins text-3xl font-semibold pl-5 md:px-10 py-5">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent bg-clip-text">
          {" "}
          Explanation Land
        </span>
        , where you get explanations about code snippets.
      </h1>
      <div className="overflow-hidden ml-5 md:ml-10 md:w-[850px]">
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
            className="bg-yellow-500 mt-4 mb-4 px-3 py-1 text-xl font-poppins font-semibold tracking-wide text-white rounded-md"
          >
            Expalin code
          </button>
        </div>
      </div>
    </div>
  );
}
