import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaChartLine,
  FaUserGraduate,
} from "react-icons/fa";
import AdvancedSidebar from "../Shared/AdvancedSidebar";

const AdvancedMarks = () => {
  // Mock data for contests and student marks
  const [contests, setContests] = useState([
    {
      id: 1,
      name: "Weekly Contest #125",
      date: "2023-05-15",
      isOpen: false,
      students: [
        { id: 101, name: "John Doe", marks: 85, rank: 1 },
        { id: 102, name: "Jane Smith", marks: 78, rank: 2 },
        { id: 103, name: "Robert Johnson", marks: 72, rank: 3 },
        { id: 104, name: "Emily Davis", marks: 68, rank: 4 },
        { id: 105, name: "Michael Brown", marks: 65, rank: 5 },
      ],
    },
    {
      id: 2,
      name: "Monthly Challenge #42",
      date: "2023-05-01",
      isOpen: false,
      students: [
        { id: 101, name: "John Doe", marks: 92, rank: 1 },
        { id: 102, name: "Jane Smith", marks: 88, rank: 2 },
        { id: 103, name: "Robert Johnson", marks: 85, rank: 3 },
        { id: 104, name: "Emily Davis", marks: 80, rank: 4 },
        { id: 105, name: "Michael Brown", marks: 75, rank: 5 },
        { id: 106, name: "Sarah Wilson", marks: 70, rank: 6 },
      ],
    },
    {
      id: 3,
      name: "Practice Contest #89",
      date: "2023-04-25",
      isOpen: false,
      students: [
        { id: 101, name: "John Doe", marks: 78, rank: 2 },
        { id: 102, name: "Jane Smith", marks: 82, rank: 1 },
        { id: 103, name: "Robert Johnson", marks: 75, rank: 3 },
        { id: 105, name: "Michael Brown", marks: 65, rank: 4 },
      ],
    },
  ]);

  const toggleContest = (contestId) => {
    setContests(
      contests.map((contest) =>
        contest.id === contestId
          ? { ...contest, isOpen: !contest.isOpen }
          : contest
      )
    );
  };

  return (
    <>
      <div className="p-8 bg-gray-50 min-h-screen">
        <AdvancedSidebar />
        <div className="max-w-6xl mx-auto ml-64">
          <div className="flex items-center mb-8">
            <FaChartLine className="text-indigo-600 text-2xl mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Student Marks</h1>
          </div>

          <div className="space-y-4">
            {contests.map((contest) => (
              <div
                key={contest.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleContest(contest.id)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {contest.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Date: {contest.date} • Participants:{" "}
                      {contest.students.length}
                    </p>
                  </div>
                  {contest.isOpen ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </button>

                {contest.isOpen && (
                  <div className="border-t border-gray-200 px-6 py-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Rank
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Student ID
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Marks
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Percentage
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {contest.students.map((student) => (
                            <tr key={student.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${
                                  student.rank === 1
                                    ? "bg-green-100 text-green-800"
                                    : student.rank <= 3
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                                >
                                  {student.rank}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {student.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                <div className="flex items-center">
                                  <FaUserGraduate className="text-indigo-500 mr-2" />
                                  {student.name}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {student.marks}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {Math.round((student.marks / 100) * 100)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {contests.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <FaChartLine className="inline-block text-4xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-700">
                No marks data available
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Student marks will appear here when contests are completed.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdvancedMarks;
