import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaChalkboardTeacher,
  FaFileAlt,
} from "react-icons/fa";
import BegSidebar from "../Shared/BegSidebar";
import axios from "axios";
import Swal from "sweetalert2";

const BegClassSchedule = () => {
  const [classSchedules, setClassSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/teacher/getAllClasses"
        );
        if (res.data && Array.isArray(res.data.classes)) {
          setClassSchedules(res.data.classes);
        } else {
          setClassSchedules([]);
        }
      } catch (error) {
        console.error("Failed to fetch classes:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load classes. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return (
      <>
        <BegSidebar />
        <div className="ml-64 p-8 text-center text-gray-500">
          Loading classes...
        </div>
      </>
    );
  }

  if (classSchedules.length === 0) {
    return (
      <>
        <BegSidebar />
        <div className="ml-64 p-8 text-center text-gray-500">
          No classes found.
        </div>
      </>
    );
  }

  return (
    <>
      <BegSidebar />
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Class Schedule</h1>
        </div>

        <div className="space-y-6">
          {classSchedules.map((schedule) => (
            <div
              key={schedule.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {schedule.name}
                    </h2>
                    <p className="text-gray-600 mb-1 flex items-center">
                      <FaChalkboardTeacher className="h-5 w-5 mr-2 text-indigo-500" />
                      {/* Currently instructor is ID, display as is */}
                      {schedule.instructor}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      schedule.batch === "Beginner"
                        ? "bg-indigo-100 text-indigo-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {schedule.batch === "Beginner"
                      ? "Your Class"
                      : "Other Batch"}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="text-gray-700">
                      {formatDate(schedule.date)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="text-gray-700">
                      {formatTime(schedule.startTime)} -{" "}
                      {formatTime(schedule.endTime)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaFileAlt className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="text-gray-700">{schedule.room}</span>
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

export default BegClassSchedule;
