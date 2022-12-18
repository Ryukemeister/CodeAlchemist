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

  const translateFromOneLangToAnother = function (
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
    fetch("https://api.openai.com/v1/completions", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const translatedCode = data.choices[0].text.trimStart().trimEnd();

        setConvertedCode(translatedCode);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleClick() {
    setConvertedCode("");
    translateFromOneLangToAnother(
      codeToBeConverted,
      currentLang.value,
      langToConvert.value
    );
  }

  return (
    <div>
      <Navbar />
      <h1 className="font-poppins text-3xl font-semibold px-5 md:px-10 py-5">
        This is where we convert our code.
      </h1>
      <div className="overflow-hidden flex flex-col md:flex-row gap-x-14 ml-5 gap-y-10 md:ml-10 mt-5">
        <Editor
          width="560"
          height="320"
          marginTop="0"
          marginLeft="0"
          selectedLanguageBoxColor="green"
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
          id="language-to-be-converted"
          code={convertedCode}
          handleChange={setConvertedCode}
        />
      </div>
      <button
        onClick={handleClick}
        className="bg-red-500 opacity-90 text-white font-poppins font-semibold text-xl px-3 py-1 rounded-md tracking-wide ml-5 md:ml-10 mt-5"
      >
        Convert code
      </button>
    </div>
  );
}
