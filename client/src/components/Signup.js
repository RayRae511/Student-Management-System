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
    if (password === 'password'){
      setPassword(value)
    }
  }
  
  const handleChange = (e) => {
    setPassword(e.target.value)
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username)
    localStorage.setItem("password", password)
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white border border-black rounded-md shadow-xl shadow-blue-400/60 ring-gray-500 lg-max-w-xl">
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
              className="block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 "
              placeholder="Enter your password"
              onChange={handleChange}
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
              className="block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 "
              placeholder="Confirm your password"
              onChange={handleChange}
              value={password}
              />
             </div>
          </div>
          <div className=''>
            <button className='w-full px-4 py-2 tracking-wide text-white bg-blue-400 border cursor-pointer transit hover:-black hover:bg-white hover:text-blue-400 hover:border-black' type='submit'>Log in</button>
          </div>  
        </form>
        <p className='mt-8 text-xs font-light text-center text-black'>
          {""}
          Already have an account?
          <a href='./Login' className='font-medium text-blue-400 cursor-pointer hover:underline hover:text-black'>Log back in!</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
