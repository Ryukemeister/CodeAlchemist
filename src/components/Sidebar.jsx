import React from "react";
import { Link } from "react-router-dom";

function Sidebar({ handleClick }) {
  return (
    <div className="flex flex-col hamburger-navigation fixed w-[100vw] h-[100vh] translate-x-[-100%] transition-all ease-in-out duration-500 bg-black z-50 md:hidden">
      <div className="flex w-[100vw] h-[40px] pr-5 transition-all justify-end">
        <button onClick={handleClick}>
          <img
            className="w-[50px] h-[40px]"
            src="./public/Cross_Icon.jpg"
            alt="Cross icon"
          />
        </button>
      </div>
      <div className="flex h-[91vh] justify-center items-center">
        <ul className="flex flex-col gap-x-0 gap-y-10">
          <li>
            <Link to="/">
              <h1 className="text-white font-semibold font-poppins text-3xl text-center">
                Home
              </h1>
            </Link>
          </li>
          <li>
            <Link to="/convertCode">
              <h1 className="text-white font-semibold font-poppins text-3xl text-center">
                Convert code
              </h1>
            </Link>
          </li>
          <li>
            <Link to="/explainCode">
              <h1 className="text-white font-semibold font-poppins text-3xl text-center">
                Explain code
              </h1>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <h1 className="text-white font-semibold font-poppins text-3xl text-center">
                About
              </h1>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
