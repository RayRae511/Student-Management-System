import React, { useEffect, useState } from "react"
import axios from "axios";

function SignUp() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  useEffect(() => {
    const savedEmail = localStorage.getItem("Email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail){
      setEmail(savedEmail)
    }
    if (savedPassword){
      setPassword(savedPassword)
    }
    
  }, [])
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleSignUp = () => {
    axios
      .post('http://127.0.0.1:6942/Signup', {
        email,
        password,
      })
      .then((response) => {
        const token = response.data.token;
        alert('Signed up successfully');
        localStorage.setItem('token', token);
      })
      .catch((error) => {
        console.error('Signup error:', error);
        setError('Signup failed. Please try again.');
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('Email', email);
    localStorage.setItem('password', password);
  };
  return (
    <div className='relative flex flex-col justify-center min-h-screen overflow-hidden'>
      <div className='w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-blue-400/60 ring-2 ring-gray-500 lg:max-w-xl'>
        <h1 className="text-3xl font-semibold text-center text-black uppercase">Sign up</h1>
        <form 
        className='mt-6'
        onSubmit={handleSubmit}>
          <div className="mb-2">
            <label 
            htmlFor="Email" 
            className='block w-full px-4 py-2 mt-2 text-black bg-white rounded-md focus:ring-blue-400 focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40'
            >
              Email
              </label>
            <input 
              type="text"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400"
              placeholder="Enter your Email"
              onChange={handleEmailChange} 
              name="Email"
              value={email}
            />
          </div>
          <div>
            <label htmlFor="password"
             className='block text-sm font-semibold text-black'>
              Password</label>
            <input 
              type="password"
              className='block w-full px-4 py-2 mt-2 mb-3 text-black bg-white border border-blue-400 rounded-md focus:ring-blue-400 focus:ring-gray-700 focus:outline-none focus:ring focus:ring-opacity-40'
              placeholder="Enter your password"
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
          
          <div className=''>
            <button className='w-full px-4 py-2 tracking-wide text-white bg-blue-400 border cursor-pointer transit hover:-black hover:bg-white hover:text-blue-400 hover:border-black' type='submit' onClick={handleSignUp}>Log in</button>
          </div>  
          {error && <p className='text-blue-400'>{error}</p>}
        </form>
        <p className='mt-8 text-xs font-light text-center text-black'>
          {""}
          Already have an account?
          <a href="./login" className='font-medium text-blue-400 cursor-pointer hover:underline hover:text-black'>Log back in!</a>
        </p>
      </div>
    </div>
  );
}
export default SignUp;