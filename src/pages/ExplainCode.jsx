import Navbar from "../components/Navbar";
import Editor from "../components/Editor";
import useStore from "../Store";

export default function ExplainCode({ openAiConfig }) {
  /* prompt:
        'class Log:\n    def __init__(self, path):\n        dirname = os.path.dirname(path)\n        os.makedirs(dirname, exist_ok=True)\n        f = open(path, "a+")\n\n        # Check that the file is newline-terminated\n        size = os.path.getsize(path)\n        if size > 0:\n            f.seek(size - 1)\n            end = f.read(1)\n            if end != "\\n":\n                f.write("\\n")\n        self.f = f\n        self.path = path\n\n    def log(self, event):\n        event["_event_id"] = str(uuid.uuid4())\n        json.dump(event, self.f)\n        self.f.write("\\n")\n\n    def state(self):\n        state = {"complete": set(), "last": None}\n        for line in open(self.path):\n            event = json.loads(line)\n            if event["type"] == "submit" and event["success"]:\n                state["complete"].add(event["id"])\n                state["last"] = event\n        return state\n\n"""\nHere\'s what the above class is doing:\n1.',*/

  const codeToBeExplained = useStore((state) => state.codeToBeExplained);
  const setCodeToBeExplained = useStore((state) => state.setCodeToBeExplained);
  // console.log(codeToBeExplained);

  /*
Sample prompt
function getSumofNums(num1, num2) {
  const sum = num1 + num2 + 100;
  return sum;
};
*/
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
    // window.navigator.userAgent = "My custom user agent";

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
    explainCodeSnippet(prompt);
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
        This is where we explain the code snippets.
      </h1>
      <div className="overflow-hidden w-[370px] ml-5 md:ml-10 md:w-[850px]">
        <Editor
          height="320"
          marginTop="0"
          marginLeft="0"
          code={codeToBeExplained}
          handleChange={setCodeToBeExplained}
        />
        <button
          onClick={() => handleClick(codeToBeExplained)}
          className="bg-yellow-500 mt-4 px-3 py-1 text-xl font-poppins font-semibold tracking-wide text-white rounded-md"
        >
          Expalin code
        </button>
      </div>
    </div>
  );
}

/*
To set the user agent manually in the above React code, you can use the "navigator.userAgent" property. This property is accessible on the global window object, and will return a string containing the user agent information of the browser. You can then use this string to set the user agent header in your request.
You can set the user agent manually by using the `Navigator.userAgent` property. For example: 

`window.navigator.userAgent = 'My custom user agent';`
*/
