import './App.css';
import React from 'react'; 
import Signup from './components/Signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Admin from './components/Admin';
import Navbar from "./components/Navbar";
import { BrowserRouter,Routes,Route} from "react-router-dom";
import './index.css'
import ScholarStudentMS from './components/homepage'
import Details from "./components/Details"


function App() {
  return (
    // Helps to navigate to whatever has been clicked
    <div className="bg-white bg-repeat w-full h-screen text-black">
      <BrowserRouter>
      <Routes>
        <Navbar />
        <Route path="Signup" element={<Signup />} />
        <Route path='Admin' element={<Admin />} />
        <Route path='Login' element={<Login />} />
        <Route path='/' element={<ScholarStudentMS/>}/> 
        <Route path='/details' element={<Details/>}/>
        </Routes>
  </BrowserRouter>
</div>
  );
}

export default App;
