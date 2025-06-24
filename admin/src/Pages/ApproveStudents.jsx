import React, { useEffect, useState } from "react";
import Sidebar from "../Shared/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";

const ApproveStudents = () => {
  const [students, setStudents] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  // Fetch students from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/admin/getAllTempStudents"
        );
        setStudents(res.data.students);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };
    fetchStudents();
  }, []);

  const approveStudent = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to approve this student?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, approve it!",
      });

      if (confirm.isConfirmed) {
        await axios.put(`http://localhost:5000/admin/approveStudent/${id}`);
        setStudents((prev) => prev.filter((s) => s.id !== id));

        Swal.fire("Approved!", "Student approved successfully!", "success");
      }
    } catch (err) {
      console.error("Error approving student:", err);
      Swal.fire("Failed!", "Failed to approve student.", "error");
    }
  };

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
        await axios.delete(`http://localhost:5000/admin/deleteTempStudent/${id}`);
        setStudents((prev) => prev.filter((s) => s.id !== id));

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
    <>
      <Sidebar />
      <div className="ml-64 p-8 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">Approve Students</h1>
        {students.length === 0 ? (
          <p>No non-approved students found.</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Student ID</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Batch</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(
                ({ id, name, studentId, email, phone, batch, idCardUrl }) => (
                  <React.Fragment key={id}>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">
                        {name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {studentId}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {email}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {phone}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {batch}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 space-x-2">
                        <button
                          onClick={() => approveStudent(id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => deleteStudent(id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => toggleRow(id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                        >
                          {expandedRow === id ? "Hide ID Card" : "See ID Card"}
                        </button>
                      </td>
                    </tr>

                    {expandedRow === id && (
                      <tr>
                        <td
                          colSpan="6"
                          className="border border-gray-300 px-4 py-4 bg-gray-50 text-center"
                        >
                          <img
                            src={idCardUrl}
                            alt="ID Card"
                            className="mx-auto max-h-[400px] object-contain rounded shadow-md"
                          />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ApproveStudents;
