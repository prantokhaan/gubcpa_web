import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaLock, FaBan } from "react-icons/fa";
import Sidebar from "../Shared/Sidebar";
import { Link } from "react-router-dom";
import axios from "../api/axios"; // Adjust path if needed
import Swal from "sweetalert2";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch students from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/admin/getAllStudents");
        if (response.data && response.data.students) {
          setStudents(response.data.students);
        } else {
          setStudents([]);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/admin/deleteStudent/${id}`);

        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== id)
        );

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Student has been deleted.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text:
            error.response?.data?.message ||
            "Failed to delete student. Please try again.",
        });
      }
    }
  };

  const handleBan = (id) => {
    alert(`Ban student ID ${id}`);
  };

  return (
    <>
      <Sidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Student List</h1>

        <div className="bg-white shadow overflow-hidden rounded-lg border border-gray-200">
          {loading ? (
            <p className="p-8 text-center text-gray-500">Loading students...</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">
                    Batch
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.length > 0 ? (
                  students.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.studentId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.batch}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        <Link
                          to={`/change-password-student/${student.id}`}
                          className="inline-flex items-center px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          <FaLock className="mr-1" />
                          Change Password
                        </Link>
                        <Link
                          to={`/edit-student/${student.id}`}
                          className="inline-flex items-center px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          <FaEdit className="mr-1" />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="inline-flex items-center px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          <FaTrash className="mr-1" />
                          Delete
                        </button>
                        <button
                          onClick={() => handleBan(student.id)}
                          className="inline-flex items-center px-3 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-800"
                        >
                          <FaBan className="mr-1" />
                          Ban
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-500 py-8">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentList;
