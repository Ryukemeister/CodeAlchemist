import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import useStore from "../store";

function Editor() {
  const code = useStore((state) => state.code);
  const setCode = useStore((state) => state.setCode);

  function handleChange(newValue) {
    setCode(newValue);
  }

  console.log(code);

  return (
    <div className="flex">
      <div className="w-[560px] mr-10 mt-10 flex flex-col ml-14">
        <div className="flex items-center pl-3 gap-x-4 bg-red-500 opacity-80 h-[23px] rounded-tl-md rounded-tr-md">
          <div className="h-[10px] w-[10px] bg-indigo-300 rounded-full"></div>
          <div className="h-[10px] w-[10px] bg-yellow-500 rounded-full"></div>
          <div className="h-[10px] w-[10px] bg-green-500 rounded-full"></div>
        </div>
        <div>
          <AceEditor
            onChange={handleChange}
            mode="javascript"
            style={{
              fontSize: "13px",
              marginBottom: "50px",
              width: "100%",
              height: "320px",
              /*borderRadius: "6px",*/
              borderBottomLeftRadius: "6px",
              borderBottomRightRadius: "6px",
            }}
            value={code}
            theme="monokai"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showFoldWidgets: false,
              showGutter: true,
            }}
          />
        </div>
      </div>

      <div className="w-[560px] mt-10 flex flex-col">
        <div className="flex items-center pl-3 gap-x-4 bg-indigo-400 opacity-80 h-[23px] rounded-tl-md rounded-tr-md">
          <div className="h-[10px] w-[10px] bg-red-500 rounded-full"></div>
          <div className="h-[10px] w-[10px] bg-yellow-500 rounded-full"></div>
          <div className="h-[10px] w-[10px] bg-pink-500 rounded-full"></div>
        </div>
        <div>
          <AceEditor
            mode="python"
            style={{
              fontSize: "13px",
              width: "560px",
              height: "320px",
              /* borderRadius: "6px",*/
              borderBottomLeftRadius: "6px",
              borderBottomRightRadius: "6px",
            }}
            theme="monokai"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showFoldWidgets: false,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Editor;
