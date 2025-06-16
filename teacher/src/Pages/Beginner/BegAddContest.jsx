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
import BegSidebar from "../Shared/BegSidebar";
import axios from "axios";
import Swal from "sweetalert2";

const BegAddContest = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    contestName: "",
    contestType: "Team",
    date: "",
    startTime: "",
    endTime: "",
    room: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      const payload = {
        batch: "Beginner",
        name: formData.contestName,
        type: formData.contestType,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        room: formData.room,
        description: formData.description,
      };

      await axios.post("http://localhost:5000/teacher/addContest", payload);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Contest added successfully!",
      });

      // Reset form
      setFormData({
        contestName: "",
        contestType: "Team",
        date: "",
        startTime: "",
        endTime: "",
        room: "",
        description: "",
      });
    } catch (error) {
      console.error("Failed to add contest:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to add contest. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <BegSidebar />
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
                      disabled={submitting}
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
                        disabled={submitting}
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
                        disabled={submitting}
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
                        disabled={submitting}
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
                        disabled={submitting}
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
                        disabled={submitting}
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaClock className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Room Text Input */}
                <div>
                  <label
                    htmlFor="room"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Room
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="room"
                      name="room"
                      value={formData.room}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter room name or number"
                      required
                      disabled={submitting}
                    />
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
                    disabled={submitting}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70"
                  >
                    <FaPlus className="mr-2 h-4 w-4" />
                    {submitting ? "Adding..." : "Add Contest"}
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

export default BegAddContest;
