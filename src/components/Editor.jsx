import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-themes-all";

function Editor({
  id,
  selectedLanguageBoxColor,
  width,
  height,
  code,
  handleChange,
  marginTop,
  marginLeft,
  isEditable,
}) {
  return (
    <div
      className={`flex flex-col mr-0 overflow-hidden md:w-[${width}px] mt-${marginTop} ml-${marginLeft}`}
    >
      <div
        className={`flex justify-between bg-red-500 items-center pl-3 opacity-80 h-[20px] md:h-[30px] w-[${width}px] rounded-tl-md rounded-tr-md`}
      >
        <div className="flex gap-x-4">
          <div className="h-[8px] md:h-[10px] w-[8px] md:w-[10px] bg-indigo-300 rounded-full"></div>
          <div className="h-[8px] md:h-[10px] w-[8px] md:w-[10px] bg-yellow-500 rounded-full"></div>
          <div className="h-[8px] md:h-[10px] w-[8px] md:w-[10px] bg-green-500 rounded-full"></div>
        </div>
        <div className={`${selectedLanguageBoxColor ? "block" : "hidden"}`}>
          <select
            name="language"
            className={`outline-none text-sm md:text-base text-white font-poppins font-semibold tracking-wide h-[25px] md:h-[30px] px-2 bg-${selectedLanguageBoxColor}-500 rounded-tr-md`}
            id={`${id}`}
          >
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Python">Python</option>
            <option value="C">C</option>
            <option value="C++">C++</option>
          </select>
        </div>
      </div>
      <div>
        <CodeMirror
          className="border-b-8 border-[#1E1E1E]"
          value={code}
          onChange={handleChange}
          mode="javascript"
          theme={vscodeDark}
          extensions={[
            javascript({ jsx: true }),
            // Makes the Editor readOnly based on the value of the isEditable prop
            isEditable == "true"
              ? EditorView.editable.of(true)
              : EditorView.editable.of(false),
          ]}
          style={{
            borderBottomLeftRadius: "6px",
            borderBottomRightRadius: "6px",
          }}
          height={`${height}px`}
          width={`${width}px`}
        />
      </div>
    </div>
  );
}

export default Editor;
