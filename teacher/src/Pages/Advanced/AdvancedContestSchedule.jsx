import React from "react";
import {
  FaTrophy,
  FaCalendarAlt,
  FaRegClock,
  FaBuilding,
} from "react-icons/fa";
import AdvancedSidebar from "../Shared/AdvancedSidebar";

const AdvancedContestSchedule = () => {
  // Sample contest schedule data
  const contestSchedules = [
    {
      id: 1,
      name: "Advanced Programming Contest",
      date: "2023-11-05",
      time: "10:00 AM - 02:00 PM",
      room: "Lab 1",
      type: "Team",
    },
    {
      id: 2,
      name: "Beginner Coding Challenge",
      date: "2023-11-12",
      time: "09:00 AM - 12:00 PM",
      room: "Room 202",
      type: "Individual",
    },
    {
      id: 3,
      name: "Data Structures Championship",
      date: "2023-11-19",
      time: "02:00 PM - 06:00 PM",
      room: "Lab 3",
      type: "Team",
    },
    {
      id: 4,
      name: "Algorithm Showdown",
      date: "2023-11-26",
      time: "11:00 AM - 03:00 PM",
      room: "Main Hall",
      type: "Individual",
    },
  ];

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <AdvancedSidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Contest Schedule
        </h1>

        <div className="space-y-6">
          {contestSchedules.map((contest) => (
            <div
              key={contest.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {contest.name}
                    </h2>
                    <p className="text-gray-600 mb-1 flex items-center">
                      <FaTrophy className="h-5 w-5 mr-2 text-indigo-500" />
                      {contest.type} Contest
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      contest.type === "Team"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {contest.type}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="text-gray-700">
                      {formatDate(contest.date)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaRegClock className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="text-gray-700">{contest.time}</span>
                  </div>
                  <div className="flex items-center">
                    <FaBuilding className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="text-gray-700">{contest.room}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdvancedContestSchedule;
