import React, { useState } from "react";
import {
  FaTrophy,
  FaCalendarAlt,
  FaClock,
  FaBuilding,
  FaPlus,
  FaUsers,
  FaUser,
} from "react-icons/fa";
import AdvancedSidebar from "../Shared/AdvancedSidebar";
import InterSidebar from "../Shared/InterSidebar";

const InterAddContest = () => {
  // Sample rooms data
  const rooms = [
    { id: 1, name: "Lab 1" },
    { id: 2, name: "Lab 2" },
    { id: 3, name: "Lab 3" },
    { id: 4, name: "Main Hall" },
    { id: 5, name: "Room 101" },
    { id: 6, name: "Room 202" },
  ];

  // State for form inputs
  const [formData, setFormData] = useState({
    contestName: "",
    contestType: "Team",
    date: "",
    startTime: "",
    endTime: "",
    roomId: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    const formattedContest = {
      ...formData,
      time: `${formData.startTime} - ${formData.endTime}`,
    };
    console.log("Contest submitted:", formattedContest);
    alert("Contest added successfully!");
    // Reset form
    setFormData({
      contestName: "",
      contestType: "Team",
      date: "",
      startTime: "",
      endTime: "",
      roomId: "",
      description: "",
    });
  };

  return (
    <>
      <InterSidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Add New Contest
        </h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Contest Name */}
                <div>
                  <label
                    htmlFor="contestName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Contest Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="contestName"
                      name="contestName"
                      value={formData.contestName}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter contest name"
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaTrophy className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Contest Type */}
                <div>
                  <label
                    htmlFor="contestType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Contest Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="radio"
                        id="teamContest"
                        name="contestType"
                        value="Team"
                        checked={formData.contestType === "Team"}
                        onChange={handleChange}
                        className="hidden peer"
                      />
                      <label
                        htmlFor="teamContest"
                        className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer ${
                          formData.contestType === "Team"
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-300"
                        }`}
                      >
                        <FaUsers className="h-5 w-5 mr-2 text-gray-700" />
                        <span>Team Contest</span>
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="individualContest"
                        name="contestType"
                        value="Individual"
                        checked={formData.contestType === "Individual"}
                        onChange={handleChange}
                        className="hidden peer"
                      />
                      <label
                        htmlFor="individualContest"
                        className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer ${
                          formData.contestType === "Individual"
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-300"
                        }`}
                      >
                        <FaUser className="h-5 w-5 mr-2 text-gray-700" />
                        <span>Individual Contest</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Date */}
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Start Time */}
                  <div>
                    <label
                      htmlFor="startTime"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Start Time
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaClock className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* End Time */}
                  <div>
                    <label
                      htmlFor="endTime"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      End Time
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        id="endTime"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaClock className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Room Selection */}
                <div>
                  <label
                    htmlFor="roomId"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Room
                  </label>
                  <div className="relative">
                    <select
                      id="roomId"
                      name="roomId"
                      value={formData.roomId}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    >
                      <option value="">Select a room</option>
                      {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaBuilding className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter contest description"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FaPlus className="mr-2 h-4 w-4" />
                    Add Contest
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterAddContest;
