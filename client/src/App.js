import './App.css';
import React from 'react'; 
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
        <Navbar />
        <Routes>
          <Route path='/' element={<ScholarStudentMS/>}/> 
          <Route path='/details' element={<Details/>}/>
        </Routes>

  </BrowserRouter>
</div>
  );
}

export default App;
