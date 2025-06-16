// ApproveStudents.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../Shared/Sidebar";

const ApproveStudents = () => {
  const [students, setStudents] = useState([]);

  // Simulated fetch of non-approved students
  useEffect(() => {
    // Replace with your actual API call to fetch non-approved students
    const fetchStudents = async () => {
      // Example static data
      const data = [
        {
          id: 1,
          name: "Ismatul Islam Pranto",
          studentId: "20231001",
          email: "pranto@example.com",
          phone: "017XXXXXXXX",
          batch: "CSE 23",
        },
        {
          id: 2,
          name: "Sadia Akter",
          studentId: "20231002",
          email: "sadia@example.com",
          phone: "018XXXXXXXX",
          batch: "CSE 23",
        },
      ];
      setStudents(data);
    };
    fetchStudents();
  }, []);

  const approveStudent = (id) => {
    // Replace with your API call to approve student
    alert(`Student with ID ${id} approved.`);
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const deleteStudent = (id) => {
    // Replace with your API call to delete student
    if (window.confirm("Are you sure you want to delete this student?")) {
      alert(`Student with ID ${id} deleted.`);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
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
              {students.map(({ id, name, studentId, email, phone, batch }) => (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{name}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {studentId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{email}</td>
                  <td className="border border-gray-300 px-4 py-2">{phone}</td>
                  <td className="border border-gray-300 px-4 py-2">{batch}</td>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ApproveStudents;
