import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-themes-all";

function Editor({
  color,
  width,
  height,
  translateX,
  code,
  handleChange,
  marginTop,
  marginLeft,
}) {
  // Ideal width: 560px, width: 320px
  return (
    <div
      className={`flex flex-col w-[${width}px] translate-x-[${translateX}px] mt-${marginTop} ml-${marginLeft}`}
    >
      <div
        className={`flex items-center pl-3 gap-x-4 bg-${color} opacity-80 h-[23px] rounded-tl-md rounded-tr-md`}
      >
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
          height={`${height}px`}
        />
      </div>
    </div>
  );
}

export default Editor;
