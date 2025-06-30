import React, { useEffect, useState } from "react";
import Sidebar from "../Shared/Sidebar";
import axios from "../api/axios";
import Swal from "sweetalert2";
import { FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";

const ConfirmedStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("/admin/getAllTempStudents");
        const confirmedStudents = res.data.students.filter(
          (student) => student.isConfirmed
        );
        setStudents(confirmedStudents);
        setFilteredStudents(confirmedStudents);
      } catch (err) {
        console.error("Error fetching students:", err);
        Swal.fire("Error", "Failed to fetch students", "error");
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredStudents(students);
    } else {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = students.filter(
        (student) =>
          student.name.toLowerCase().includes(lowercasedSearch) ||
          student.email.toLowerCase().includes(lowercasedSearch) ||
          student.studentId.toLowerCase().includes(lowercasedSearch) ||
          student.phone.toLowerCase().includes(lowercasedSearch) ||
          student.batch.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredStudents(filtered);
    }
  }, [searchTerm, students]);

  const deleteStudent = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this student?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirm.isConfirmed) {
        await axios.delete(`/admin/deleteTempStudent/${id}`);
        setStudents((prev) => prev.filter((s) => s.id !== id));
        setFilteredStudents((prev) => prev.filter((s) => s.id !== id));
        Swal.fire("Deleted!", "Student deleted successfully!", "success");
      }
    } catch (err) {
      console.error("Error deleting student:", err);
      Swal.fire("Failed!", "Failed to delete student.", "error");
    }
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div
        className={`flex-1 ${
          isMobile ? "ml-0" : "ml-64"
        } transition-all duration-300`}
      >
        <div className="p-4 md:p-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header Section */}
            <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Confirmed Students
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  {filteredStudents.length} confirmed student
                  {filteredStudents.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search students..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Empty State */}
            {filteredStudents.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No confirmed students found
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Try adjusting your search query or check back later.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Batch
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student, index) => (
                      <React.Fragment key={student.id}>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {student.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {student.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.studentId}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {student.email}
                            </div>
                            <div
                              className="text-sm text-gray-500 truncate max-w-xs"
                              title={student.address}
                            >
                              {student.address}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {student.batch}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => deleteStudent(student.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => toggleRow(student.id)}
                              className="text-blue-600 hover:text-blue-900 flex items-center"
                            >
                              {expandedRow === student.id ? (
                                <>
                                  <FiChevronUp className="mr-1" /> Hide
                                </>
                              ) : (
                                <>
                                  <FiChevronDown className="mr-1" /> View
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                        {expandedRow === student.id && (
                          <tr>
                            <td colSpan="6" className="px-6 py-4 bg-gray-50">
                              <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                                    Student Details
                                  </h4>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <p className="text-gray-500">Name:</p>
                                      <p className="text-gray-900">
                                        {student.name}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-gray-500">
                                        Student ID:
                                      </p>
                                      <p className="text-gray-900">
                                        {student.studentId}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-gray-500">Email:</p>
                                      <p className="text-gray-900">
                                        {student.email}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-gray-500">Phone:</p>
                                      <p className="text-gray-900">
                                        {student.phone}
                                      </p>
                                    </div>
                                    <div className="col-span-2">
                                      <p className="text-gray-500">Address:</p>
                                      <p className="text-gray-900">
                                        {student.address}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                                    ID Card
                                  </h4>
                                  <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                                    <img
                                      src={student.idCardUrl}
                                      alt="Student ID Card"
                                      className="w-full h-auto max-h-64 object-contain"
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedStudents;
