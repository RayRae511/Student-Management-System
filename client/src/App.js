import './App.css';
import React from 'react'; 
import Signup from './components/Signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
//import Homepage from './components/Homepage';
import Admin from './components/Admin';
//import Homepage from './components/Homepage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<Signup />} />
        <Route path='Admin' element={<Admin />} />
        <Route path='Login' element={<Login />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
