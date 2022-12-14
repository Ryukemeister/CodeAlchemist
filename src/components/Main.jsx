import React from "react";
import Editor from "./Editor";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <div className="overflow-hidden justify-center md:justify-start flex flex-col md:flex-row h-[88vh]">
      <div className="flex flex-col md:mt-0 md:justify-center">
        <h1 className="font-poppins w-[350px] md:w-[570px] font-semibold text-[65px] md:text-[80px] ml-5 md:ml-10 mb-3 leading-[103%]">
          Turning code into clarity.
        </h1>
        <h1 className="font-poppins font-medium w-[350px] md:w-[465px] text-[28px] md:text-[36px] ml-5 md:ml-10 leading-[120%]">
          Where coding wizards come to craft their spells.
        </h1>
      </div>
      <div className="hidden md:flex justify-center translate-x-[60px] items-center">
        <Editor width="850" height="400" marginLeft="0" marginTop="0" />
      </div>
      <div className="block md:hidden">
        <button className="bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent font-poppins font-semibold px-4 py-1 rounded-md text-2xl ml-5 mt-5">
          <Link to="/about">
            <h1 className="text-white">Know more</h1>
          </Link>
        </button>
      </div>
    </div>
  );
}
