import React, { useState } from "react";
import { FaUserGraduate, FaPenAlt, FaSave } from "react-icons/fa";
import AdvancedSidebar from "../Shared/AdvancedSidebar";

const AdvancedAddMarks = () => {
  // Sample data for contests and students
  const contests = [
    { id: 1, name: "Advanced Programming Contest" },
    { id: 2, name: "Beginner Coding Challenge" },
    { id: 3, name: "Data Structures Championship" },
    { id: 4, name: "Algorithm Showdown" },
  ];

  const students = [
    { id: 1, name: "John Doe", studentId: "STU001" },
    { id: 2, name: "Jane Smith", studentId: "STU002" },
    { id: 3, name: "Robert Johnson", studentId: "STU003" },
    { id: 4, name: "Emily Davis", studentId: "STU004" },
    { id: 5, name: "Michael Wilson", studentId: "STU005" },
  ];

  // State for form inputs
  const [formData, setFormData] = useState({
    contestId: "",
    studentId: "",
    marks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    alert("Marks added successfully!");
    // Reset form
    setFormData({
      contestId: "",
      studentId: "",
      marks: "",
    });
  };

  return (
    <>
      <AdvancedSidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Marks</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Contest Selection */}
                <div>
                  <label
                    htmlFor="contestId"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Contest
                  </label>
                  <div className="relative">
                    <select
                      id="contestId"
                      name="contestId"
                      value={formData.contestId}
                      onChange={handleChange}
                      className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      required
                    >
                      <option value="">Select a contest</option>
                      {contests.map((contest) => (
                        <option key={contest.id} value={contest.id}>
                          {contest.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Student Selection */}
                <div>
                  <label
                    htmlFor="studentId"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Student
                  </label>
                  <div className="relative">
                    <select
                      id="studentId"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      required
                    >
                      <option value="">Select a student</option>
                      {students.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.name} ({student.studentId})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Marks Input */}
                <div>
                  <label
                    htmlFor="marks"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Marks
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPenAlt className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="marks"
                      id="marks"
                      value={formData.marks}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                      placeholder="Enter marks"
                      required
                      min="0"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FaSave className="mr-2 h-4 w-4" />
                    Save Marks
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Recent Marks Added Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recently Added Marks
          </h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-6">
              <p className="text-gray-600 text-center py-4">
                No recent marks added yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedAddMarks;
