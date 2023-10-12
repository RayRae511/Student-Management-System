import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Enrollment = () => {
  const [student, setStudent] = useState([])
  const [newStudent, setNewStudent] = useState({
    full_name: '',
    contact: '',
    course: '',
    course_id: '',
    date: new Date(),
  })
  const [studentData, setStudentData] = useState({
    full_name: '',
    contact: '',
    course: '',  // Course dropdown value
    course_id: '',
    date: new Date(), // Calendar date
  });

  const handleSubmit = () => {
    // Make an HTTP POST request to add a new student
    axios
      .post('http://127.0.0.1:5000/enrollment', newStudent) // Adjust the API endpoint
      .then(() => {
        // After successful enrollment, update the list of students
        setStudent([...student, newStudent]);
        // Clear the form fields after adding a student
        setNewStudent({
          full_name: '',
          contact: '',
          course: '',
          course_id: '',
          date: new Date(),
        });
        alert('Enrolled successfully');
      })
      .catch((error) => {
        console.error('Error adding student:', error);
      });
  };

  return (
    <div className="bg-gray-200 p-2">
      <h2 className="text-2xl font-bold mb-4">Enrollment</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Full Name:
          </label>
          <input
            type="text"
            name="full_name"
            value={studentData.full_name}
            onChange={(e) =>
              setStudentData({ ...studentData, full_name: e.target.value })
            }
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Contact:
          </label>
          <input
            type="text"
            name="contact"
            value={studentData.contact}
            onChange={(e) =>
              setStudentData({ ...studentData, contact: e.target.value })
            }
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Course:
          </label>
          <input
            name="course"
            value={studentData.course}
            onChange={(e) =>
              setStudentData({ ...studentData, course: e.target.value })
            }
            className="w-full border rounded p-2"
          >
            {/* <option value="">Select Course</option>
            <option value="Course A">Cyber-Security</option>
            <option value="Course B">Criminology</option>
            <option value="Course C">Forensic Science</option> */}
          </input>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Course code:
          </label>
          <input
            name="course_id"
            value={studentData.course_id}
            placeholder='Enter course'
            onChange={(e) =>
              setStudentData({ ...studentData, course_id: e.target.value })
            }
            className="w-full border rounded p-2"
          >
            {/* <option value="">Select Course code</option>
            <option value="101">101</option>
            <option value="201">201</option>
            <option value="301">301</option> */}
          </input>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date:
          </label>
          <DatePicker
            selected={studentData.date}
            onChange={(date) =>
              setStudentData({ ...studentData, date: date })
            }
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Enrollment;