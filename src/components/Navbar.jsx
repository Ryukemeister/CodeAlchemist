import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

function Navbar() {
  // Fixed height : 70px

  function displaySidebar() {
    const hamburgerMenu = document.querySelector(".hamburger-navigation");
    hamburgerMenu.classList.remove("translate-x-[-100%]");
  }

  function hideSidebar() {
    const hamburgerMenu = document.querySelector(".hamburger-navigation");
    hamburgerMenu.classList.add("translate-x-[-100%]");
  }

  return (
    <nav className="flex bg-black h-[12vh] items-center justify-between overflow-hidden">
      <div className="md:pl-10">
        <Sidebar handleClick={hideSidebar} />
        <Link to="/">
          <h1 className="pl-5 md:pl-0 bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent bg-clip-text font-poppins font-bold  text-[26px]">
            CodeAlchemist
          </h1>
        </Link>
      </div>
      <div className="block md:hidden">
        <button onClick={displaySidebar}>
          <img
            src="/Hamburger_Icon.jpg"
            className="w-[50px] h-[40px] mr-5"
            alt="Hamburger icon"
          />
        </button>
      </div>
      <div className="hidden md:block pr-10">
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
