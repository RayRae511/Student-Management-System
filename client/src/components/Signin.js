import React, { useState } from "react";


const Signin = () => {
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setSignIn({...signIn, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form dubmitted with data:", signIn)
  }

  return (
  <div className="min-h-screen flex items-center justify-center">
    <div className="p-8 rounded shadow-md w-96">
      <h1 className="text-2xl font-semibold mb-4 text-black">Scholar</h1><h1 className="text-2xl font-semibold mb-4 text-blue-400">Student MS</h1>
      <h2 className="mb-4 text-2xl font-semibold">Sign in</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-black text-sm font-bold mb-2">
            Email
          </label>
          <input 
          type="email"
          name="email"
          value={signIn.email}
          onChange={handleChange}
          placeholder="Enter your email"
          id="email"
          className="border border-blue-400 p-2 w-full"
          required
          />
        </div>
        <div>
          <label>
            Password
          </label>
          <input 
          type="password"
          name="password"
          value={signIn.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="border border-blue-400 p-2 w-full"
          required
          />
        </div>
        <button
        type="submit"
        className="bg-blue-400 hover:bg-black hover:text-blue-400 text-black font-semibold py-2 px-4 rounded"
        >Sign in</button>
      </form>
      <div>
        <span>Already have an account?<link to="/signup">Sign up</link></span>
      </div>
    </div>
  </div>
  )
}

export default Signin