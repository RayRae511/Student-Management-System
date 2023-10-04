import React, { useEffect, useState } from "react";

function SignUp() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    if (savedUsername){
      setUsername(savedUsername)
    }
    if (savedPassword){
      setPassword(savedPassword)
    }
  }, [])

  const handleInputChange = (e) => {
    const {name, value } = e.target;
    if (name === 'username'){
      setUsername(value)
    }
    if (name === 'password'){
      setPassword(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username)
    localStorage.setItem("password", password)
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-blue-400/60 ring ring-2 ring-black lg-max-w-xl text-black">
        <h1 className="text-3xl font-semibold text-center text-black uppercase">Sign up</h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
            htmlFor="username"
              className="block text-sm font-semibold text-black">
              Username
              </label>
              <input 
              type="text"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 "
              placeholder="Enter your username"
              onChange={handleInputChange}
              name="username"
              value={username}
              />
             <div>
              <label
              htmlFor="password"
                className="block text-sm font-semibold text-black"
              >
                Password
              </label>
              <input 
              type="password"
              className="block w-full px-4 py-2 mt-2 text-black bg-blue-400 "
              placeholder="Enter your password"
              onChange={handleInputChange}
              value={password}
              />
             </div>
             <div>
              <label
              htmlFor="password"
                className="block text-sm font-semibold text-black"
              >
                Confirm Password
              </label>
              <input 
              type="password"
              className="block w-full px-4 py-2 mt-2 text-black bg-blue-400 "
              placeholder="Confirm your password"
              onChange={handleInputChange}
              value={password}
              />
             </div>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default SignUp;
