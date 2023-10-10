// Enrollment.js
import React, { useState } from 'react';
import axios from 'axios';

const Enrollment = () => {
  const [studentData, setStudentData] = useState({
    fullName: '',
    contact: '',
    course: '',
    courseId: '',
    date: '',
  });

  const handleSubmit = () => {
    axios
      .post('http://127.0.0.1:6942/enroll', studentData) // Adjust the API endpoint
      .then((response) => {
        // Handle successful enrollment
        console.log('Enrollment successful');
      })
      .catch((error) => {
        console.error('Error enrolling student:', error);
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
            name="fullName"
            value={studentData.fullName}
            onChange={(e) =>
              setStudentData({ ...studentData, fullName: e.target.value })
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
            type="text"
            name="course"
            value={studentData.course}
            onChange={(e) =>
              setStudentData({ ...studentData, course: e.target.value })
            }
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Course code:
          </label>
          <input
            type="text"
            name="courseId"
            value={studentData.courseId}
            onChange={(e) =>
              setStudentData({ ...studentData, courseId: e.target.value })
            }
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date:
          </label>
          <input
            type="text"
            name="date"
            value={studentData.date}
            onChange={(e) =>
              setStudentData({ ...studentData, date: e.target.value })
            }
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="button"
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