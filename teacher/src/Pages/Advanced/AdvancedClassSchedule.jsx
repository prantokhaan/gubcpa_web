import React from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaChalkboardTeacher,
  FaFileAlt,
} from "react-icons/fa";
import AdvancedSidebar from "../Shared/AdvancedSidebar";

const AdvancedClassSchedule = () => {
  // Sample class schedule data
  const classSchedules = [
    {
      id: 1,
      name: "Advanced Batch Class",
      date: "2023-10-15",
      time: "09:00 AM - 11:00 AM",
      room: "Room 301",
      instructor: "Dr. Smith",
    },
    {
      id: 2,
      name: "Intermediate Algorithms",
      date: "2023-10-16",
      time: "10:00 AM - 12:00 PM",
      room: "Room 205",
      instructor: "Prof. Johnson",
    },
    {
      id: 3,
      name: "Beginner Programming",
      date: "2023-10-17",
      time: "02:00 PM - 04:00 PM",
      room: "Room 101",
      instructor: "Ms. Williams",
    },
    {
      id: 4,
      name: "Advanced Data Structures",
      date: "2023-10-18",
      time: "11:00 AM - 01:00 PM",
      room: "Room 302",
      instructor: "Dr. Brown",
    },
    {
      id: 5,
      name: "Competitive Programming",
      date: "2023-10-19",
      time: "03:00 PM - 05:00 PM",
      room: "Lab 2",
      instructor: "Prof. Davis",
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
                      {schedule.instructor}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                    {schedule.id === 1 ? "Your Class" : "Other Batch"}
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
                    <span className="text-gray-700">{schedule.time}</span>
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

export default AdvancedClassSchedule;
