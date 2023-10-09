import './App.css';
import React from 'react'; 
<<<<<<< HEAD
import Signup from './components/Signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Admin from './components/Admin';
=======
import Navbar from "./components/Navbar";
import { BrowserRouter,Routes,Route} from "react-router-dom";
import './index.css'
import ScholarStudentMS from './components/homepage'
import Details from "./components/Details"
>>>>>>> c622c4f71c66ec44da5620f28a9350cf49e58d85

function App() {
  return (
    // Helps to navigate to whatever has been clicked
    <div className="bg-white bg-repeat w-full h-screen text-black">
      <BrowserRouter>
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path='Admin' element={<Admin />} />
        <Route path='Login' element={<Login />} />
      </Routes>
      </BrowserRouter>
    </div>
=======
        <Navbar />
        <Routes>
          <Route path='/' element={<ScholarStudentMS/>}/> 
          <Route path='/details' element={<Details/>}/>
        </Routes>

  </BrowserRouter>
</div>
>>>>>>> c622c4f71c66ec44da5620f28a9350cf49e58d85
  );
}

export default App;
