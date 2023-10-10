import React, { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types";

function SignUp(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const signup_address = "http://127.0.0.1:6942/Signup"
  const navigate = useNavigate()
 // const location = useLocation()
  
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const savedConfirmPassword = localStorage.getItem("confirm password");
    
    if (savedEmail){
      setEmail(savedEmail)
    }
    if (savedPassword){
      setPassword(savedPassword)
    }
    if (savedConfirmPassword){
      setConfirmPassword(savedConfirmPassword)
    }
    
  }, [])
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }
  const handleSignUp = () => {
    axios
      .post(signup_address, {
        email,
        password,
      })
      .then((response) => {
        const token = response.data.token;
        alert('Signed up successfully');
        localStorage.setItem('token', token);
        navigate('/enrollment', {replace: true});
      })
      .catch((error) => {
        console.error('Sign up was unsuccessful :( ', error);
        setError('Sign up failed. Please try again.');
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
  };
    return (
      <div className='relative flex flex-col justify-center min-h-screen overflow-hidden'>
        <div className='w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-blue-400/60 ring-2 ring-gray-500 lg:max-w-xl'>
          <h1  className="text-3xl font-bold text-center text-black">SCHOLAR STUDENT MS</h1>
          <h2 className="mt-3 text-3xl text-center text-black uppercase">Sign up</h2>
          <form onSubmit={handleSubmit} className='mt-6'>
            <div className="mb-2">
              <label htmlFor="Email" className='justify-center block w-full px-4 py-2 mt-2 font-semibold text-black bg-white rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 align-center'>Email</label>
              <input type="text"  className="block w-full px-4 py-2 mt-2 text-black bg-white border border-blue-400 rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Enter your Email" onChange={handleEmailChange}  name="Email" value={email} />
            </div>
            <div>
              <label htmlFor="password" className='block text-sm font-semibold text-black'>Password</label>
              <input type="password"  className='block w-full px-4 py-2 mt-2 mb-3 text-black bg-white border border-blue-400 rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40' placeholder="Enter your password" onChange={handlePasswordChange} value={password} />
            </div>
            <div>
              <label htmlFor="password"
               className='block text-sm font-semibold text-black'>
                Confirm your Password</label>
              <input type="password"  className='block w-full px-4 py-2 mt-2 mb-3 text-black bg-white border border-blue-400 rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40' placeholder="Confirm your password" onChange={handleConfirmPassword} value={confirmPassword} />
            </div>
            <div className=''>
              <button className='w-full px-4 py-2 tracking-wide text-white bg-blue-400 border rounded-md cursor-pointer transit hover:-black hover:bg-white hover:text-blue-400 hover:border-blue-400' type='submit' onClick={handleSignUp}>Sign up</button>
            </div>  
            {error && <p className='text-red-600'>{error}</p>}
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


SignUp.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SignUp;