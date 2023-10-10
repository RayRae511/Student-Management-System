import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Details = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    contact: '',
    courseName: '',
    courseId: '',
    enrollmentDate: '',
  });
  const [searchCourseId, setSearchCourseId] = useState('');

  useEffect(() => {
    // Fetch student data from the database when the component mounts
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    // Make an HTTP GET request to fetch student data
    axios
      .get('http://127.0.0.1:5000/students') // Adjust the API endpoint
      .then((response) => {
        setStudents(response.data.students);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  };

  const handleAddStudent = () => {
    // Make an HTTP POST request to add a new student
    axios
      .post('http://127.0.0.1:5000/students', newStudent) // Adjust the API endpoint
      .then(() => {
        // After successful enrollment, update the list of students
        setStudents([...students, newStudent]);

        // Clear the form fields after adding a student
        setNewStudent({
          name: '',
          contact: '',
          courseName: '',
          courseId: '',
          enrollmentDate: '',
        });
      })
      .catch((error) => {
        console.error('Error adding student:', error);
      });
  };

  const handleDeleteStudent = (studentId) => {
    // Make an HTTP DELETE request to delete a student
    axios
      .delete(`http://127.0.0.1:5000/students/${studentId}`) // Adjust the API endpoint
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
        placeholder="Search by Course ID"
        value={searchCourseId}
        onChange={(e) => setSearchCourseId(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />

      <table className="w-full border">
        {/* Table headers */}
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Student ID</th>
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
              <td className="border p-2">{student.id}</td>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.contact}</td>
              <td className="border p-2">{student.courseName}</td>
              <td className="border p-2">{student.courseId}</td>
              <td className="border p-2">{student.enrollmentDate}</td>
              <td className="border p-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add student form */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Add Student</h3>
        <form>
          {/* Input fields for student information */}
          <input
            type="text"
            placeholder="Student Name"
            value={newStudent.name}
            onChange={(e) =>
              setNewStudent({ ...newStudent, name: e.target.value })
            }
            className="w-full border rounded p-2 mb-2"
          />
          <input
            type="text"
            placeholder="Student Contact"
            value={newStudent.contact}
            onChange={(e) =>
              setNewStudent({ ...newStudent, contact: e.target.value })
            }
            className="w-full border rounded p-2 mb-2"
          />
          <input
            type="text"
            placeholder="Course Name"
            value={newStudent.courseName}
            onChange={(e) =>
              setNewStudent({ ...newStudent, courseName: e.target.value })
            }
            className="w-full border rounded p-2 mb-2"
          />
          <input
            type="text"
            placeholder="Course ID"
            value={newStudent.courseId}
            onChange={(e) =>
              setNewStudent({ ...newStudent, courseId: e.target.value })
            }
            className="w-full border rounded p-2 mb-2"
          />
          <input
            type="text"
            placeholder="Date of Enrollment"
            value={newStudent.enrollmentDate}
            onChange={(e) =>
              setNewStudent({
                ...newStudent,
                enrollmentDate: e.target.value,
              })
            }
            className="w-full border rounded p-2 mb-2"
          />
          <button
            type="button"
            onClick={handleAddStudent}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default Details;
