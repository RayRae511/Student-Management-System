import React, { useEffect, useState } from 'react'

//login 
const Login = () => {
  const [username, setUsername]= useState("");
  const [password, setPassword]= useState("");

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
  }
  return (
    <div className='relative flex flex-col justify-center min-h-screen overflow-hidden'>
      <div className='w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-blue-400/60 ring ring-2 ring-gray-500 lg:max-w-xl'>
        <h1 className='text-3xl font-semibold text-center text-black'>Log back in</h1>
        <form className='mt-6' onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label
            htmlFor="username"
            className='block font-semibold text-black text-s'
            >
              Username
              <input 
              type='text'
              name='username'
              className='block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 rounded-md focus:ring-blue-400 focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40'
              placeholder='Enter your username'
              value={username}
              onChange={handleInputChange}
              required
              />
            </label>
          </div>
          <div className='mb-2'>
            <label
            htmlFor='password'
            className='block text-sm font-semibold text-black'
            >
              Password
            </label>
            <input 
            type='password'
            name='password'
            placeholder='Enter your password'
            className='block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 rounded-md focus:ring-blue-400 focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40'
            value={password}
            onChange={handleInputChange}
            required
            />
          </div>
          <p className='text-xs text-blue-400 hover:text-black'>Forgotten password? Click 
            <a href='#' className='font-medium text-blue-400 cursor-pointer hover:underline hover:text-black text-decoration-none'>here</a>
          </p>
          <div>
            <button className='w-full px-4 py-2 tracking-wide text-white bg-blue-400 cursor-pointer transit hover:bg-white hover:text-blue-400' type='submit'>Log in</button>
          </div>
        </form>
        <p className='mt-8 text-xs font-light text-center text-black'>
          {""}
          Don't have an account?
          <a href='./Signup.js' className='font-medium text-blue-400 cursor-pointer hover:underline hover:text-black'>Sign up now!</a></p>
          <p>
            {""}
            Are you an admin?
            <a href='./admin.js' className='font-medium text-blue-400 cursor-pointer hover:underline hover:text-black'>Log in</a>
          </p>
      </div>
    </div>
  )
}

export default Login