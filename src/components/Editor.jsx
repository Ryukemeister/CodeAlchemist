import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

function Editor() {
  const [code, setCode] = useState("");

  function handleChange(newValue) {
    setCode(newValue);
  }

  // console.log(code);

  return (
    <div>
      <AceEditor
        onChange={handleChange}
        mode="javascript"
        style={{
          fontSize: "13px",
        }}
        value={code}
        theme="monokai"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
      />
    </div>
  );
}

export default Editor;
