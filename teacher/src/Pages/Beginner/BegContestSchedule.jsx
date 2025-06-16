import React, { useEffect, useState } from "react";
import {
  FaTrophy,
  FaCalendarAlt,
  FaRegClock,
  FaBuilding,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BegSidebar from "../Shared/BegSidebar";
import axios from "axios";
import Swal from "sweetalert2";

const BegContestSchedule = () => {
  const [contestSchedules, setContestSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Format date to readable string
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Format time string "HH:mm:ss" to "hh:mm AM/PM"
  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hourStr, minuteStr] = timeString.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  };

  const fetchContests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/teacher/getAllContests"
      );
      if (res.data && Array.isArray(res.data.contests)) {
        setContestSchedules(res.data.contests);
      } else {
        setContestSchedules([]);
      }
    } catch (error) {
      console.error("Failed to fetch contests:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load contests. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/teacher/deleteContest/${id}`);
        Swal.fire("Deleted!", "Contest has been deleted.", "success");
        fetchContests(); // Refresh list
      } catch (error) {
        console.error("Failed to delete contest:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response?.data?.message ||
            "Failed to delete contest. Please try again.",
        });
      }
    }
  };

  if (loading) {
    return (
      <>
        <BegSidebar />
        <div className="ml-64 p-8 text-center text-gray-500">
          Loading contests...
        </div>
      </>
    );
  }

  if (contestSchedules.length === 0) {
    return (
      <>
        <BegSidebar />
        <div className="ml-64 p-8 text-center text-gray-500">
          No contests found.
        </div>
      </>
    );
  }

  return (
    <>
      <BegSidebar />
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
                    <span className="text-gray-700">
                      {formatTime(contest.startTime)} -{" "}
                      {formatTime(contest.endTime)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaBuilding className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="text-gray-700">{contest.room}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={() => navigate(`/edit-contest/${contest.id}`)}
                    className="inline-flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <FaEdit className="mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contest.id)}
                    className="inline-flex items-center px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <FaTrash className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BegContestSchedule;
