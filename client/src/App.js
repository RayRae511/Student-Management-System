import './App.css';
import React from 'react'; 
import Signin from './components/Signin';
import Signup from './components/Signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
