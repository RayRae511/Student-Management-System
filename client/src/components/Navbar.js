import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full top-0 left-0">
      <div className="md:flex items-center justify-between py-12 md:px-10 px-7 ">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-sans text-black">
          SCHOLAR |
          <span className="text-blue-500">STUDENT MS</span>
        </div>
        <ul className="text-blue-500 md:flex md:items-center ">
          <li className="md:ml-20 text-xl">
            <Link className="hover:text-black duration-500" to="/">
              HOME |
            </Link>
          </li>
          <li className="md:ml-20 text-xl">
            <Link className="hover:text-black duration-500" to="/enrollment">
              ENROLLMENT |
            </Link>
          </li>
          <li className="md:ml-20 text-xl">
            <Link className="hover:text-black duration-500" to="/details">
              DETAILS
            </Link>
            
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;