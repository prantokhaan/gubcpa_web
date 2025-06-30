import React, { useState, useEffect } from "react";
import Sidebar from "../Shared/Sidebar";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import Swal from "sweetalert2";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch teachers from API
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("/admin/getAllTeachers");
        if (response.data && response.data.teachers) {
          setTeachers(response.data.teachers);
        } else {
          setTeachers([]);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
        setTeachers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
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
        await axios.delete(`/admin/deleteTeacher/${id}`);

        setTeachers((prevTeachers) =>
          prevTeachers.filter((teacher) => teacher.id !== id)
        );

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Teacher has been deleted.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text:
            error.response?.data?.message ||
            "Failed to delete teacher. Please try again.",
        });
      }
    }
  };

  return (
    <>
      <Sidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold mb-6">Teacher List</h1>

        <div className="overflow-x-auto">
          {loading ? (
            <p className="p-8 text-center text-gray-500">Loading teachers...</p>
          ) : (
            <table className="w-full table-auto border border-gray-300 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Teacher Name</th>
                  <th className="px-4 py-3 text-left">Batch</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.length > 0 ? (
                  teachers.map((teacher, index) => (
                    <tr
                      key={teacher.id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 font-medium">{teacher.name}</td>
                      <td className="px-4 py-3">{teacher.batch}</td>
                      <td className="px-4 py-3 space-x-2">
                        <Link
                          to={`/change-password-teacher/${teacher.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                        >
                          Change Password
                        </Link>
                        <Link
                          to={`/edit-teacher/${teacher.id}`}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(teacher.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-500">
                      No teachers found.
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

export default TeacherList;
