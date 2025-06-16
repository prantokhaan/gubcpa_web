import React, { useState } from "react";
import { FaUserGraduate, FaArrowDown, FaSearch } from "react-icons/fa";
import AdvancedSidebar from "../Shared/AdvancedSidebar";

const AdvancedAllStudents = () => {
  // Sample student data
  const initialStudents = [
    {
      id: 1,
      name: "John Doe",
      studentId: "STU001",
      level: "Advanced",
      email: "john.doe@example.com",
      joinDate: "2022-09-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      studentId: "STU002",
      level: "Advanced",
      email: "jane.smith@example.com",
      joinDate: "2022-10-20",
    },
    {
      id: 3,
      name: "Robert Johnson",
      studentId: "STU003",
      level: "Intermediate",
      email: "robert.j@example.com",
      joinDate: "2023-01-05",
    },
    {
      id: 4,
      name: "Emily Davis",
      studentId: "STU004",
      level: "Advanced",
      email: "emily.d@example.com",
      joinDate: "2023-02-18",
    },
    {
      id: 5,
      name: "Michael Wilson",
      studentId: "STU005",
      level: "Advanced",
      email: "michael.w@example.com",
      joinDate: "2023-03-22",
    },
  ];

  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Degrade student to Intermediate level
  const degradeStudent = (id) => {
    if (
      window.confirm(
        "Are you sure you want to degrade this student to Intermediate level?"
      )
    ) {
      setStudents(
        students.map((student) =>
          student.id === id ? { ...student, level: "Intermediate" } : student
        )
      );
    }
  };

  return (
    <>
      <AdvancedSidebar />
      <div className="ml-64 p-8">
        <div className="flex items-center mb-8">
          <FaUserGraduate className="text-3xl text-indigo-500 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Students</h1>
            <p className="text-gray-600">Manage all registered students</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search students by name, ID or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.studentId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            student.level === "Advanced"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {student.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(student.joinDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.level === "Advanced" && (
                          <button
                            onClick={() => degradeStudent(student.id)}
                            className="flex items-center text-sm text-yellow-600 hover:text-yellow-900"
                          >
                            <FaArrowDown className="mr-1" />
                            Degrade to Intermediate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No students found matching your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Total Students
            </h3>
            <p className="text-2xl font-bold">{students.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Advanced Students
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {students.filter((s) => s.level === "Advanced").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Intermediate Students
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {students.filter((s) => s.level === "Intermediate").length}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedAllStudents;
