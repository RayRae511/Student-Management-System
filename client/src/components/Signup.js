import React, {useState} from "react";
import { Link } from "react-router-dom";


const Signup = () => {

  const [signUp, setSignUp] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setSignUp({...signUp, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form dubmitted with data:", signUp)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4 text-blue-400">Scholar</h1><h1 className="text-2xl font-semibold mb-4 text-blue-400">Student MS</h1>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-black text-sm font-bold mb-2">
              Username
            </label>
            <input
            type="text"
            name="username"
            value={signUp.username}
            onChange={handleChange}
            className="border border-blue-400 p-2 w-full"
            required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-black text-sm font-bold mb-2">
              Email
            </label>
            <input
            type="email"
            name="email"
            value={signUp.email}
            onChange={handleChange}
            className="border border-blue-400 p-2 w-full"
            required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-black text-sm font-bold mb-2">
              Password
            </label>
            <input
            type="password"
            name="password"
            value={signUp.password}
            onChange={handleChange}
            className="border border-blue-400 p-2 w-full"
            required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-400 hover:bg-black hover:text-blue-400 text-black font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
          <div>
            <span>Don't have an account? <Link to={"/signup"} className="text-blue-400">Sign up</Link></span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup