import React from "react";
import { Link } from "react-router-dom";

function Sidebar({ handleClick }) {
  return (
    <div className="flex flex-col hamburger-navigation fixed w-[100vw] h-[100vh] translate-x-[-100%] transition-all ease-in-out duration-500 bg-black z-50 md:hidden">
      <div className="justify-center w-[100%] h-[95%]">
        <button className="fixed w-[100%]" onClick={handleClick}>
          <img
            className="w-[50px] h-[50px] float-right mr-5"
            src="/Cross_Icon.jpg"
            alt="Cross icon"
          />
        </button>
        <ul className="flex justify-center items-center h-[100%] flex-col gap-x-0 gap-y-14">
          <li>
            <Link to="/">
              <h1 className="text-white font-bebasNeue font-semibold tracking-wider text-4xl text-center">
                Home
              </h1>
            </Link>
          </li>
          <li>
            <Link to="/convertCode">
              <h1 className="text-white font-bebasNeue font-semibold tracking-wider text-4xl text-center">
                Convert code
              </h1>
            </Link>
          </li>
          <li>
            <Link to="/explainCode">
              <h1 className="text-white font-bebasNeue font-semibold tracking-wider text-4xl text-center">
                Explain code
              </h1>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <h1 className="text-white font-bebasNeue font-semibold tracking-wider text-4xl text-center">
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
