import React, { useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaClipboardList,
  FaSearch,
  FaSave,
} from "react-icons/fa";
import AdvancedSidebar from "../Shared/AdvancedSidebar";
import InterSidebar from "../Shared/InterSidebar";

const InterUpdateAttendance = () => {
  // Sample attendance data
  const initialAttendanceData = [
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
  ];

  const [attendanceData, setAttendanceData] = useState(initialAttendanceData);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    status: "present",
    remarks: "",
  });

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

  // Filter attendance records based on search term
  const filteredRecords = attendanceData.filter((record) =>
    formatDate(record.date).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const selectedRecord = attendanceData.find(
      (record) => record.date === date
    );
    if (selectedRecord) {
      setFormData({
        status: selectedRecord.status,
        remarks: selectedRecord.remarks,
      });
    } else {
      setFormData({
        status: "present",
        remarks: "",
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate) {
      alert("Please select a date first");
      return;
    }

    const updatedData = attendanceData.some(
      (record) => record.date === selectedDate
    )
      ? attendanceData.map((record) =>
          record.date === selectedDate
            ? {
                ...record,
                status: formData.status,
                remarks: formData.remarks,
              }
            : record
        )
      : [
          ...attendanceData,
          {
            id: attendanceData.length + 1,
            date: selectedDate,
            status: formData.status,
            remarks: formData.remarks,
          },
        ];

    setAttendanceData(updatedData);
    alert("Attendance updated successfully!");
  };

  return (
    <>
      <InterSidebar />
      <div className="ml-64 p-8">
        <div className="flex items-center mb-6">
          <FaClipboardList className="text-2xl text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">
            Update Attendance
          </h1>
        </div>

        {/* Search and Select Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Attendance Dates
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search by date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Date to Update
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedDate}
                onChange={(e) => handleDateSelect(e.target.value)}
              >
                <option value="">Select a date</option>
                {filteredRecords.map((record) => (
                  <option key={record.id} value={record.date}>
                    {formatDate(record.date)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Update Form */}
        {selectedDate && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Update Attendance for {formatDate(selectedDate)}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Status Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="radio"
                        id="present"
                        name="status"
                        value="present"
                        checked={formData.status === "present"}
                        onChange={() =>
                          setFormData({ ...formData, status: "present" })
                        }
                        className="hidden peer"
                      />
                      <label
                        htmlFor="present"
                        className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer ${
                          formData.status === "present"
                            ? "border-green-500 bg-green-50"
                            : "border-gray-300"
                        }`}
                      >
                        <FaCheckCircle className="h-5 w-5 mr-2 text-green-600" />
                        <span>Present</span>
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="absent"
                        name="status"
                        value="absent"
                        checked={formData.status === "absent"}
                        onChange={() =>
                          setFormData({ ...formData, status: "absent" })
                        }
                        className="hidden peer"
                      />
                      <label
                        htmlFor="absent"
                        className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer ${
                          formData.status === "absent"
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                      >
                        <FaTimesCircle className="h-5 w-5 mr-2 text-red-600" />
                        <span>Absent</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Remarks */}
                <div>
                  <label
                    htmlFor="remarks"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Remarks
                  </label>
                  <textarea
                    id="remarks"
                    name="remarks"
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter remarks (e.g., 'Late by 15 mins', 'Medical leave')"
                    value={formData.remarks}
                    onChange={(e) =>
                      setFormData({ ...formData, remarks: e.target.value })
                    }
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FaSave className="mr-2 h-4 w-4" />
                    Update Attendance
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Recent Attendance Records */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Recent Attendance Records
          </h3>
          <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceData.slice(0, 5).map((record) => (
                  <tr
                    key={record.id}
                    className={`hover:bg-gray-50 ${
                      record.date === selectedDate ? "bg-blue-50" : ""
                    }`}
                  >
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
        </div>
      </div>
    </>
  );
};

export default InterUpdateAttendance;
