import React, { useState } from "react";
import { FaTrophy, FaUser, FaChartLine, FaMedal } from "react-icons/fa";
import AdvancedSidebar from "../Shared/AdvancedSidebar";
import InterSidebar from "../Shared/InterSidebar";

const InterLeaderboard = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Sample leaderboard data
  const leaderboardData = [
    {
      id: 1,
      name: "Alex Johnson",
      contest1: 85,
      contest2: 92,
      classMarks: 88,
      total: 265,
      rank: 1,
    },
    {
      id: 2,
      name: "Sarah Williams",
      contest1: 78,
      contest2: 95,
      classMarks: 90,
      total: 263,
      rank: 2,
    },
    {
      id: 3,
      name: "Michael Brown",
      contest1: 92,
      contest2: 85,
      classMarks: 82,
      total: 259,
      rank: 3,
    },
    {
      id: 4,
      name: "Emily Davis",
      contest1: 80,
      contest2: 88,
      classMarks: 87,
      total: 255,
      rank: 4,
    },
    {
      id: 5,
      name: "David Wilson",
      contest1: 75,
      contest2: 90,
      classMarks: 85,
      total: 250,
      rank: 5,
    },
  ];

  return (
    <>
      <InterSidebar />
      <div className="ml-64 p-8">
        <div className="flex items-center mb-6">
          <FaTrophy className="text-2xl text-yellow-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`py-2 px-4 font-medium text-sm flex items-center ${
              activeTab === "all"
                ? "border-b-2 border-indigo-500 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FaUser className="mr-2" /> All Students
          </button>
          <button
            onClick={() => setActiveTab("top")}
            className={`py-2 px-4 font-medium text-sm flex items-center ${
              activeTab === "top"
                ? "border-b-2 border-indigo-500 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FaMedal className="mr-2" /> Top Performers
          </button>
          <button
            onClick={() => setActiveTab("progress")}
            className={`py-2 px-4 font-medium text-sm flex items-center ${
              activeTab === "progress"
                ? "border-b-2 border-indigo-500 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FaChartLine className="mr-2" /> Progress
          </button>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
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
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contest 1
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contest 2
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Class Marks
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboardData.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {student.rank <= 3 ? (
                        <FaTrophy
                          className={`text-xl mr-2 ${
                            student.rank === 1
                              ? "text-yellow-500"
                              : student.rank === 2
                              ? "text-gray-400"
                              : "text-amber-700"
                          }`}
                        />
                      ) : null}
                      <span className="font-medium">{student.rank}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {student.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {student.contest1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {student.contest2}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {student.classMarks}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-indigo-600">
                      {student.total}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-indigo-800">
              Highest Score
            </h3>
            <p className="mt-1 text-2xl font-semibold text-indigo-600">265</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-800">
              Average Score
            </h3>
            <p className="mt-1 text-2xl font-semibold text-green-600">258.4</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-yellow-800">
              Participants
            </h3>
            <p className="mt-1 text-2xl font-semibold text-yellow-600">
              {leaderboardData.length}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterLeaderboard;
