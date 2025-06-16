import React from "react";
import { FaUsers, FaTrophy, FaUserTie, FaUniversity } from "react-icons/fa";
import AdvancedSidebar from "../Shared/AdvancedSidebar";
import InterSidebar from "../Shared/InterSidebar";

const InterContestTeam = () => {
  // Sample team data
  const teams = [
    {
      id: 1,
      name: "Team Alpha",
      members: ["Alex Johnson (Captain)", "Sarah Williams", "Michael Brown"],
      coach: "Dr. Robert Smith",
      contest: "ICPC World Finals 2023",
      university: "Tech University",
    },
    {
      id: 2,
      name: "Team Beta",
      members: ["Emily Davis (Captain)", "David Wilson", "Jennifer Lee"],
      coach: "Prof. Amanda Chen",
      contest: "IUPC National Round 2023",
      university: "Science Institute",
    },
    {
      id: 3,
      name: "Team Gamma",
      members: ["Daniel Kim (Captain)", "Jessica Martinez", "Ryan Taylor"],
      coach: "Dr. James Wilson",
      contest: "ICPC Regional 2023",
      university: "Engineering College",
    },
  ];

  return (
    <>
      <InterSidebar />
      <div className="ml-64 p-8">
        <div className="flex items-center mb-8">
          <FaTrophy className="text-3xl text-yellow-500 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              IUPC/ICPC Teams
            </h1>
            <p className="text-gray-600">
              Official teams for upcoming programming contests
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                {/* Team Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-indigo-700">
                      {team.name}
                    </h2>
                    <div className="flex items-center mt-1 text-gray-600">
                      <FaUniversity className="mr-2" />
                      <span>{team.university}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                    {team.contest}
                  </span>
                </div>

                {/* Team Members */}
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                    <FaUsers className="mr-2 text-indigo-500" />
                    Team Members
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {team.members.map((member, index) => (
                      <li key={index} className="text-gray-700">
                        {member}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Coach and Contest Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                      <FaUserTie className="mr-2 text-indigo-500" />
                      Coach
                    </h3>
                    <p className="text-gray-700">{team.coach}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                      <FaTrophy className="mr-2 text-indigo-500" />
                      Contest
                    </h3>
                    <p className="text-gray-700">{team.contest}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-3">
            Important Dates
          </h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-gray-700">Registration Deadline:</span>
              <span className="font-medium">November 15, 2023</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-700">Practice Session:</span>
              <span className="font-medium">November 20, 2023</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-700">Main Contest:</span>
              <span className="font-medium">November 25, 2023</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default InterContestTeam;
