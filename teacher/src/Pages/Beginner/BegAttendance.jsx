import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaClipboardList,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";
import BegSidebar from "../Shared/BegSidebar";

const BegAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [uniqueDates, setUniqueDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAttendance() {
      setIsLoading(true);
      try {
        const res = await fetch(
          "http://localhost:5000/teacher/getAllAttendanceByBatch/Beginner"
        );
        if (!res.ok) throw new Error("Failed to fetch attendance data");
        const data = await res.json();

        const attendance = data.attendance || [];

        // Extract unique dates sorted ascending
        const datesSet = new Set(attendance.map((item) => item.date));
        const sortedDates = Array.from(datesSet).sort();

        setUniqueDates(sortedDates);
        setSelectedDate(sortedDates[0] || "");
        setAttendanceData(attendance);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAttendance();
  }, []);

  // Filter attendance for selected date
  const attendanceForDate = attendanceData.filter(
    (a) => a.date === selectedDate
  );

  // Calculate attendance percentage for selected date
  const totalStudentsOnDate = attendanceForDate.length;
  const presentCount = attendanceForDate.filter(
    (a) => a.status.toLowerCase() === "present"
  ).length;
  const attendancePercentage =
    totalStudentsOnDate > 0
      ? Math.round((presentCount / totalStudentsOnDate) * 100)
      : 0;

  // Format date helper
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <BegSidebar />
      <div className="ml-64 p-8">
        <div className="flex items-center mb-6">
          <FaClipboardList className="text-2xl text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">
            Attendance Record
          </h1>
        </div>

        {/* Attendance Summary - only total days */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 flex items-center">
              <FaCalendarAlt className="mr-2" /> Total Days
            </h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {uniqueDates.length}
            </p>
          </div>
          {/* You can add more summary cards here if needed */}
        </div>

        {/* Date Selection */}
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-6">
          <label
            htmlFor="date-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Date to View Attendance
          </label>
          <select
            id="date-select"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {uniqueDates.map((date) => (
              <option key={date} value={date}>
                {formatDate(date)}
              </option>
            ))}
          </select>
        </div>

        {/* Attendance for Selected Date */}
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Attendance for {formatDate(selectedDate)}
            </h3>
          </div>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Student
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Details
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
                {attendanceForDate.map((student) => (
                  <tr
                    key={`${selectedDate}-${student.id}`}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <FaUser className="text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.studentName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {student.studentId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <FaEnvelope className="mr-2 text-gray-400" />
                        {student.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.status.toLowerCase() === "present" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <FaCheckCircle className="mr-1" /> Present
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <FaTimesCircle className="mr-1" /> Absent
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Attendance Percentage for Selected Date */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow border border-gray-200 max-w-md">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Attendance Percentage for {formatDate(selectedDate)}
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-indigo-600 h-4 rounded-full"
              style={{ width: `${attendancePercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm font-medium text-gray-500">
            <span>0%</span>
            <span>Current: {attendancePercentage}%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BegAttendance;
