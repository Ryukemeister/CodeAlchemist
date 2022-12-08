import React from "react";
import Editor from "./Editor";

export default function Main() {
  return (
    <div className="overflow-hidden flex h-[88vh]">
      <div className="flex flex-col justify-center">
        <h1 className="font-poppins w-[570px] font-semibold text-[80px] ml-10 mb-3 leading-[103%]">
          Turning code into clarity.
        </h1>
        <h1 className="font-poppins font-medium w-[465px] text-[36px] ml-10 leading-[120%]">
          Where coding wizards come to craft their spells.
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <Editor color="red-500" translateX="60" width="850" height="400" />
      </div>
    </div>
  );
}
