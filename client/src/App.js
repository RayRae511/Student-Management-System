import './App.css';
import React from 'react'; 
import Signup from './components/Signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Admin from './components/Admin';
import Navbar from "./components/Navbar";
import './index.css'
import ScholarStudentMS from './components/Homepage'
import Details from "./components/Details"
import Enrollment from './components/Enrollment';


function App() {
  return (
    // Helps to navigate to whatever has been clicked
    <div className="bg-white bg-repeat w-full h-screen text-black">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="Signup" element={<Signup />} />
        <Route path='Admin' element={<Admin />} />
        <Route path='Login' element={<Login />} />
        <Route path='/' element={<ScholarStudentMS />}/> 
        <Route path='/details' element={<Details/>}/>
        <Route path='/enrollment' element={<Enrollment/>}/>
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
