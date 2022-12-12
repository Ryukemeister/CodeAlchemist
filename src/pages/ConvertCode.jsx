import Navbar from "../components/Navbar";
import Editor from "../components/Editor";
import useStore from "../Store";

export default function ConvertCode({ openAiConfig }) {
  const codeToBeConverted = useStore((state) => state.codeToBeConverted);
  const setCodeToBeConverted = useStore((state) => state.setCodeToBeConverted);

  // console.log(codeToBeConverted);
  // console.log(setCodeToBeConverted);

  const translateFromOneLanguageToAnother = async function (
    currentLanguage,
    languageToBeTranslated
  ) {
    const response = await openAiConfig.createCompletion({
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

  return (
    <div>
      <Navbar />
      <h1 className="font-poppins text-3xl font-semibold px-10 py-5">
        This is where we convert our code.
      </h1>
      <div className="flex gap-x-14 ml-10 mt-10">
        <Editor
          color="red-500"
          width="560"
          height="320"
          marginTop="0"
          marginLeft="0"
          code={codeToBeConverted}
          handleChange={setCodeToBeConverted}
        />
        <Editor
          color="pink-500"
          width="560"
          height="320"
          marginTop="0"
          marginLeft="0"
        />
      </div>
    </div>
  );
}
