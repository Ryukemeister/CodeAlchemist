import Navbar from "../components/Navbar";
import Editor from "../components/Editor";
import useStore from "../Store";

export default function ConvertCode() {
  const codeToBeConverted = useStore((state) => state.codeToBeConverted);
  const convertedCode = useStore((state) => state.convertedCode);
  const setCodeToBeConverted = useStore((state) => state.setCodeToBeConverted);
  const setConvertedCode = useStore((state) => state.setConvertedCode);
  const apiKey = import.meta.env.VITE_Open_AI_Key;

  const currentLang = document.getElementById("current-language");
  const langToConvert = document.getElementById("language-to-be-converted");
  const languagesAvailable = [
    "javascript",
    "typeScript",
    "python",
    "c",
    "c++",
    "ruby",
    "rust",
    "flutter",
    "dart",
    "go",
    "redux",
  ];

  const translateFromOneLangToAnother = async function (
    codeToBeConverted,
    currentLanguage,
    languageToBeTranslated
  ) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(apiKey),
      },
      body: JSON.stringify({
        model: "code-davinci-002",
        prompt: `#####Translate this function from ${currentLanguage} into ${languageToBeTranslated}### ${currentLanguage}\n ${codeToBeConverted}### ${languageToBeTranslated}`,
        temperature: 0,
        max_tokens: 2000,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["###"],
      }),
    };
    await fetch("https://api.openai.com/v1/completions", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const translatedCode = data.choices[0].text.trimStart().trimEnd();

        setConvertedCode(translatedCode);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const convert = async function (
    codeToBeConverted,
    currentLanguage,
    languageToBeTranslated
  ) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(apiKey),
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content: `Translate the following piece of code from ${currentLanguage} to ${languageToBeTranslated} without suggesting any notes: "${codeToBeConverted}"`,
          },
        ],
      }),
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        requestOptions
      );
      const data = await response.json();
      const translatedCode = data.choices[0].message.content
        .trimStart()
        .trimEnd();
      console.log(data);
      console.log(data.choices[0].message);
      console.log(translatedCode);
      setConvertedCode(translatedCode);
    } catch (error) {
      console.log(error);
    }
  };

  function handleClick(prompt) {
    const err = `// Oops, something's wrong :(

const error = {
  causes:[
    "Either you haven't provided any input to the Editor.",
    "Or the language that you're trying to convert your code into and the language that you're current providing to the Editor are both one and the same",
    "Or maybe you aren't connected to the internet."
  ], 
  possibleSolutions:[
    "Try providing a better prompt to the Editor.",
    "Or check if the language that you write your code and the language you want to convert your code into are not the same.",
    "Or try refreshing your browser."
  ],
}; `;

    // Error handling
    // Try to check if the user provides a blank input to the Editor
    // Or the language to convert and current language are the same
    if (
      prompt.length <= 0 ||
      currentLang.value == langToConvert.value ||
      prompt == err
    ) {
      setConvertedCode(err);
      return;
    }

    setConvertedCode("");
    convert(prompt, currentLang.value, langToConvert.value);
    // translateFromOneLangToAnother(
    //   prompt,
    //   currentLang.value,
    //   langToConvert.value
    // );
  }

  return (
    <div>
      <Navbar />
      <h1 className="font-poppins text-3xl font-semibold px-5 md:px-10 pt-5 md:py-5">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent bg-clip-text">
          {" "}
          Conversion Land
        </span>
        , this is where you convert your code.
      </h1>
      <div className="overflow-hidden flex flex-col md:flex-row mx-5 gap-x-14 gap-y-10 md:ml-10 mt-5">
        <Editor
          width="560"
          height="320"
          marginTop="0"
          marginLeft="0"
          selectedLanguageBoxColor="green"
          isEditable="true"
          availableLanguages={languagesAvailable}
          id="current-language"
          code={codeToBeConverted}
          handleChange={setCodeToBeConverted}
        />
        <Editor
          width="560"
          height="320"
          marginTop="0"
          marginLeft="0"
          selectedLanguageBoxColor="yellow"
          isEditable="true"
          availableLanguages={languagesAvailable}
          id="language-to-be-converted"
          code={convertedCode}
          handleChange={setConvertedCode}
        />
      </div>
      <button
        onClick={() => handleClick(codeToBeConverted)}
        className="bg-red-500 opacity-90 text-white font-poppins font-semibold text-xl px-3 py-1 rounded-md tracking-wide ml-5 md:ml-10 mb-5 mt-5"
      >
        Convert code
      </button>
    </div>
  );
}
