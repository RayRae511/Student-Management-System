import axios from "axios";
import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('email') !== null)
  const logout_address = "http://127.0.0.1:6942/logout"

  function handleDetails(){
    if (loggedIn){
      navigate('/details')
    }else{
      const confirmSignIn = window.confirm("You need to sign in as an admin to access this page")
      if (confirmSignIn){
        navigate('/admin')
      }
    }
  }

  function logOut() {
    axios({
      method: "POST",
      url: logout_address,
    })
    .then((response) => {
      localStorage.removeItem('email')
      console.log(response.data)
      alert("Successfully logged out")
      navigate('/homepage', {replace: true})
      setLoggedIn(false)
    })
  }


  return (
    <div className="w-full top-0 left-0">
      <div className="md:flex items-center justify-between py-12 md:px-10 px-7 ">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-sans text-black">
          SCHOLAR |
          <span className="text-blue-500">STUDENT MS</span>
        </div>
        <ul className="text-blue-500 md:flex md:items-center ">
          <li className="md:ml-20 text-xl">
            <Link className="hover:text-black duration-500 font-semibold" to="/">
              HOME |
            </Link>
          </li>
          <li className="md:ml-20 text-xl">
            <Link className="hover:text-black duration-500 font-semibold" to="/enrollment">
              ENROLLMENT |
            </Link>
          </li>
          <li className="md:ml-20 text-xl">
            <button className="hover:text-black duration-500 font-semibold" to="/details" onClick={handleDetails}>
              DETAILS |
            </button>
            {loggedIn ? (
              <button onClick={logOut}className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-black hover:text-blue-400 font-semibold">LOG OUT</button>
            ) : null}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;