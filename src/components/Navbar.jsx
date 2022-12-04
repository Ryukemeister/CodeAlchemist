import React from "react";

function Navbar() {
  return (
    <div className="flex bg-black h-[70px] items-center justify-between">
      <div className="pl-10">
        <a href="#">
          <h1 className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text text-white font-poppins font-extrabold text-2xl">
            CodeAlchemist
          </h1>
        </a>
      </div>
      <div className="flex pr-10">
        <ul className="flex gap-x-14">
          <li>
            <a href="#">
              <h1 className="text-white font-poppins text-xl">Convert code</h1>
            </a>
          </li>
          <li>
            <a href="#">
              <h1 className="text-white font-poppins text-xl">
                Explain a code snippet
              </h1>
            </a>
          </li>
          <li>
            <a href="#">
              <h1 className="text-white font-poppins text-xl">About</h1>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
