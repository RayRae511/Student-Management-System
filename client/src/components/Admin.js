import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const admin_address = "http://127.0.0.1:5000/adminlogin"
  const navigate = useNavigate()

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail){
      setEmail(savedEmail)
    }
    if (savedPassword){
      setPassword(savedPassword)
    }
  }, [])

  const handleAdmin = () => {
    axios
      .post(admin_address, {
        email,
        password,
      })
      .then((response) => {
        const token = response.data.token;
        alert('Welcome back admin!');
        localStorage.setItem('token', token);
        navigate('/details')
      })
      .catch((error) => {
        console.error('Log in error:', error);
        setError('Log in failed. Please try again.');
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("email", email)
    localStorage.setItem("password", password)
  }

  
  return (
    <div className='relative flex flex-col justify-center min-h-screen overflow-hidden'>
      <div className='w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-blue-400/60 ring  ring-gray-500 lg:max-w-xl'>
        <h1 className='mt-3 text-3xl font-bold text-center text-black'>SCHOLAR STUDENT MS</h1>
        <h2 className='mt-3 text-3xl text-center text-black'>Admin Login</h2>
        <form className='mt-6' onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label
            htmlFor="admin"
            className='block font-semibold text-black text-s'
            >
              Email
               <input 
              type='text'
              name='email'
              className='block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 rounded-md focus:outline-none focus:ring focus:ring-opacity-40'
              placeholder='Enter Admin Email'
              value={email}
              onChange={handleEmailChange}
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
            placeholder='Enter admin password'
            className='block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 rounded-md focus:outline-none focus:ring focus:ring-opacity-40'
            value={password}
            onChange={handlePasswordChange}
            required
            />
          </div>
          <div className=''>
            
          </div>
        </form>
        <button
        type='submit'
        className='w-full px-4 py-2 mt-5 tracking-wide text-white bg-blue-400 border cursor-pointer hover:border-blue-400 transit hover:bg-white hover:text-blue-400 rounded-xl'
        onClick={handleAdmin}
        >
          Log in
        </button>
        {error && <p className='text-red-400'>{error}</p>}
        <p className='mt-8 text-xs font-light text-center text-black'>
          {""}
          Are you a student?
          <a href='./login' className='font-medium text-blue-400 cursor-pointer hover:underline hover:text-black text-decoration-none'>Log back in!</a> or <a href='./signup' className='font-medium text-blue-600 cursor-pointer hover:underline hover:text-black text-decoration-none' >Sign Up</a>
        </p>
      </div>
    </div>
  )
}
export default Admin