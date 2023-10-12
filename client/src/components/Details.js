import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Details = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch student data from the database when the component mounts
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    // Make an HTTP GET request to fetch student data
    axios
      .get('http://127.0.0.1:5000/enrollment') // Adjust the API endpoint
      .then((response) => {
        console.log('API response:', response.data);
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  };

  const handleDeleteStudent = () => {
    // Make an HTTP DELETE request to delete a student
    axios
      .delete(`http://127.0.0.1:5000/enrollment`) // Adjust the API endpoint
      .then(() => {
        // After successful deletion, refetch the students
        fetchStudents();
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Student Details</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />

      <table className="w-full border">
        {/* Table headers */}
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Student Name</th>
            <th className="border p-2">Student Contact</th>
            <th className="border p-2">Course Name</th>
            <th className="border p-2">Course code</th>
            <th className="border p-2">Date of Enrollment</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border p-2">{student.full_name}</td>
              <td className="border p-2">{student.contact}</td>
              <td className="border p-2">{student.course}</td>
              <td className="border p-2">{student.course_id}</td>
              <td className="border p-2">{student.date}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 hover:bg-white hover:text-blue-400 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href='Enrollment'><button className='bg-blue-500 hover:bg-white text-white hover:text-blue-400 align-center justify-center font-bold py-2 px-4 rounded'>Add A Student</button></a>
    </div>
  );
};

export default Details;
