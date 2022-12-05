import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

export default function Main() {
  return (
    <div className="overflow-hidden flex h-[88vh]">
      <div className="flex flex-col justify-center">
        <h1 className="font-poppins w-[400px] font-semibold text-[80px] ml-10 mb-3 leading-[103%]">
          Turning code into clarity.
        </h1>
        <h1 className="font-poppins font-medium w-[465px] text-[36px] ml-10 leading-[130%]">
          Where coding wizards come to craft their spells.
        </h1>
      </div>
      <div className="translate-x-[100px] w-[850px] ml-[27px] flex flex-col justify-center">
        <div className="flex items-center pl-3 gap-x-4 bg-red-500 opacity-80 h-[23px] rounded-tl-md rounded-tr-md">
          <div className="h-[10px] w-[10px] bg-indigo-300 rounded-full"></div>
          <div className="h-[10px] w-[10px] bg-yellow-500 rounded-full"></div>
          <div className="h-[10px] w-[10px] bg-green-500 rounded-full"></div>
        </div>
        <div>
          <AceEditor
            mode="javascript"
            style={{
              fontSize: "13px",
              width: "100%",
              height: "420px",
              /*borderRadius: "6px",*/
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
              showGutter: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}
