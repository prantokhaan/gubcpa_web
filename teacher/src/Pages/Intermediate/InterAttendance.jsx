import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaClipboardList,
} from "react-icons/fa";
import AdvancedSidebar from "../Shared/AdvancedSidebar";
import InterSidebar from "../Shared/InterSidebar";

const InterAttendance = () => {
  // Sample attendance data
  const attendanceData = [
    {
      id: 1,
      date: "2023-10-01",
      status: "present",
      remarks: "On time",
    },
    {
      id: 2,
      date: "2023-10-02",
      status: "present",
      remarks: "Late (10 mins)",
    },
    {
      id: 3,
      date: "2023-10-03",
      status: "absent",
      remarks: "Medical leave",
    },
    {
      id: 4,
      date: "2023-10-04",
      status: "present",
      remarks: "On time",
    },
    {
      id: 5,
      date: "2023-10-05",
      status: "present",
      remarks: "Early",
    },
    {
      id: 6,
      date: "2023-10-08",
      status: "absent",
      remarks: "Personal reason",
    },
    {
      id: 7,
      date: "2023-10-09",
      status: "present",
      remarks: "On time",
    },
  ];

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Calculate attendance summary
  const totalDays = attendanceData.length;
  const presentDays = attendanceData.filter(
    (item) => item.status === "present"
  ).length;
  const attendancePercentage = Math.round((presentDays / totalDays) * 100);

  return (
    <>
      <InterSidebar />
      <div className="ml-64 p-8">
        <div className="flex items-center mb-6">
          <FaClipboardList className="text-2xl text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">
            Attendance Record
          </h1>
        </div>

        {/* Attendance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 flex items-center">
              <FaCalendarAlt className="mr-2" /> Total Days
            </h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {totalDays}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Present Days</h3>
            <p className="mt-1 text-2xl font-semibold text-green-600">
              {presentDays}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">
              Attendance Percentage
            </h3>
            <p className="mt-1 text-2xl font-semibold text-blue-600">
              {attendancePercentage}%
            </p>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceData.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatDate(record.date)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.status === "present" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <FaCheckCircle className="mr-1" /> Present
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <FaTimesCircle className="mr-1" /> Absent
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {record.remarks}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Attendance Statistics */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Attendance Statistics
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-indigo-600 h-4 rounded-full"
              style={{ width: `${attendancePercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm font-medium text-gray-500">0%</span>
            <span className="text-sm font-medium text-gray-500">
              Current: {attendancePercentage}%
            </span>
            <span className="text-sm font-medium text-gray-500">100%</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterAttendance;
