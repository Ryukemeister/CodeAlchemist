import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  // Fixed height : 70px
  return (
    <nav className="flex bg-black h-[12vh] items-center justify-between">
      <div className="pl-10">
        <Link to="/">
          <h1 className="bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent bg-clip-text text-white font-poppins font-extrabold text-[26px]">
            CodeAlchemist
          </h1>
        </Link>
      </div>
      <div className="flex pr-10">
        <ul className="flex gap-x-14">
          <li>
            <Link to="/convertCode">
              <h1 className="text-white font-poppins text-xl">Convert code</h1>
            </Link>
          </li>
          <li>
            <Link to="/explainCode">
              <h1 className="text-white font-poppins text-xl">Explain code</h1>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <h1 className="text-white font-poppins text-xl">About</h1>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
