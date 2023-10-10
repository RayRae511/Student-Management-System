import React from 'react';
import { Link } from 'react-router-dom';

function ScholarStudentMS() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center align-center  p-8">
      <div className="w-full sm:w-1/2 lg:w-1/3">

        <div className="bg-blue-500 w-full p-6 rounded">
          <h2 className="text-white text-lg font-semibold mb-4">ABOUT</h2>
          <p className="text-white">
          "The Scholar" is a cutting-edge Student Management System designed to elevate the academic experience. Streamlining course enrollment, it offers a user-friendly interface and real-time updates, ensuring a seamless registration process. Empowering students to select and register for their desired courses effortlessly, it optimizes their educational journey. With robust features and intuitive navigation, "The Scholar" revolutionizes education management, providing students with unparalleled efficiency and convenience. Stay organized, informed, and in control of your academic path with "The Scholar" – your ultimate partner for academic success.
          </p>
          <button className="mt-4 bg-white text-blue-500 py-2 px-4 rounded hover:bg-black hover:text-blue-400 font-semibold align-center justify-center h-9"><Link to={'/login'}>Log In</Link></button>
        </div>
      </div>
    </div>
  );
}

export default ScholarStudentMS;