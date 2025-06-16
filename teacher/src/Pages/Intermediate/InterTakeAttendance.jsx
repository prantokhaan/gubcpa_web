import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaSave, FaUserGraduate } from "react-icons/fa";
import AdvancedSidebar from "../Shared/AdvancedSidebar";
import InterSidebar from "../Shared/InterSidebar";

const InterTakeAttendance = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Mock data for students - in a real app, this would come from an API
  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock student data
        const mockStudents = [
          { id: 1, name: "John Doe", roll: "101" },
          { id: 2, name: "Jane Smith", roll: "102" },
          { id: 3, name: "Robert Johnson", roll: "103" },
          { id: 4, name: "Emily Davis", roll: "104" },
          { id: 5, name: "Michael Brown", roll: "105" },
          { id: 6, name: "Sarah Wilson", roll: "106" },
          { id: 7, name: "David Taylor", roll: "107" },
          { id: 8, name: "Jessica Anderson", roll: "108" },
        ];

        setStudents(mockStudents);

        // Initialize attendance status for each student as present by default
        const initialAttendance = {};
        mockStudents.forEach((student) => {
          initialAttendance[student.id] = "present";
        });
        setAttendance(initialAttendance);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [date]); // In a real app, you might want to refetch when date changes

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Simulate API call to save attendance
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Attendance data to save:", {
        date,
        attendance,
      });

      // Show success message and navigate away
      alert("Attendance saved successfully!");
      navigate("/attendance");
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Failed to save attendance. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <InterSidebar />
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 overflow-auto p-8 ml-64">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-800">
                Take Attendance
              </h1>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center mb-6">
                <FaCalendarAlt className="text-indigo-600 mr-2" />
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mr-4"
                >
                  Select Date:
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FaUserGraduate className="mr-2 text-indigo-600" />
                  Student List
                </h2>

                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Roll No.
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Student Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {students.map((student) => (
                            <tr key={student.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {student.roll}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {student.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center space-x-4">
                                  <label className="inline-flex items-center">
                                    <input
                                      type="radio"
                                      name={`attendance-${student.id}`}
                                      value="present"
                                      checked={
                                        attendance[student.id] === "present"
                                      }
                                      onChange={() =>
                                        handleAttendanceChange(
                                          student.id,
                                          "present"
                                        )
                                      }
                                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="ml-2">Present</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      type="radio"
                                      name={`attendance-${student.id}`}
                                      value="absent"
                                      checked={
                                        attendance[student.id] === "absent"
                                      }
                                      onChange={() =>
                                        handleAttendanceChange(
                                          student.id,
                                          "absent"
                                        )
                                      }
                                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="ml-2">Absent</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                          isSaving ? "opacity-75 cursor-not-allowed" : ""
                        }`}
                      >
                        {isSaving ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          <>
                            <FaSave className="mr-2" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterTakeAttendance;
