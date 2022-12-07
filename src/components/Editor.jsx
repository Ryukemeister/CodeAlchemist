import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-themes-all";
import useStore from "../store";

function Editor() {
  const code = useStore((state) => state.code);
  const setCode = useStore((state) => state.setCode);

  function handleChange(newValue) {
    setCode(newValue);
  }

  console.log(code);

  return (
    <div className="flex flex-wrap">
      <div className="w-[560px] mr-10 mt-10 flex flex-col ml-10">
        <div className="flex items-center pl-3 gap-x-4 bg-red-500 opacity-80 h-[23px] rounded-tl-md rounded-tr-md">
          <div className="h-[10px] w-[10px] bg-indigo-300 rounded-full"></div>
          <div className="h-[10px] w-[10px] bg-yellow-500 rounded-full"></div>
          <div className="h-[10px] w-[10px] bg-green-500 rounded-full"></div>
        </div>
        <div>
          <CodeMirror
            className="border-b-8 border-[#1E1E1E]"
            value={code}
            onChange={handleChange}
            mode={javascript}
            theme={vscodeDark}
            extensions={[javascript({ jsx: true })]}
            style={{
              borderBottomLeftRadius: "6px",
              borderBottomRightRadius: "6px",
            }}
            width="100%"
            height="320px"
          />
        </div>
      </div>
      <div className="w-[560px] mt-10 ml-10 flex flex-col">
        <div className="flex items-center pl-3 gap-x-4 bg-indigo-400 opacity-80 h-[23px] rounded-tl-md rounded-tr-md">
          <div className="h-[10px] w-[10px] bg-red-500 rounded-full"></div>
          <div className="h-[10px] w-[10px] bg-yellow-500 rounded-full"></div>
          <div className="h-[10px] w-[10px] bg-pink-500 rounded-full"></div>
        </div>
        <div>
          <CodeMirror
            className="border-b-8 border-[#1E1E1E]"
            value={code}
            onChange={handleChange}
            mode={javascript}
            theme={vscodeDark}
            extensions={[javascript({ jsx: true })]}
            style={{
              borderBottomLeftRadius: "6px",
              borderBottomRightRadius: "6px",
            }}
            width="100%"
            height="320px"
          />
        </div>
      </div>
      <div className="w-[560px] mr-0 mt-10 flex flex-col ml-10">
        <div className="flex items-center pl-3 gap-x-4 bg-red-500 opacity-80 h-[23px] rounded-tl-md rounded-tr-md">
          <div className="h-[10px] w-[10px] bg-indigo-300 rounded-full"></div>
          <div className="h-[10px] w-[10px] bg-yellow-500 rounded-full"></div>
          <div className="h-[10px] w-[10px] bg-green-500 rounded-full"></div>
        </div>
        <div>
          <CodeMirror
            className="border-b-8 border-[#1E1E1E] mb-10"
            value={code}
            onChange={handleChange}
            mode={javascript}
            theme={vscodeDark}
            extensions={[javascript({ jsx: true })]}
            style={{
              borderBottomLeftRadius: "6px",
              borderBottomRightRadius: "6px",
            }}
            width="100%"
            height="320px"
          />
        </div>
      </div>
    </div>
  );
}

export default Editor;
