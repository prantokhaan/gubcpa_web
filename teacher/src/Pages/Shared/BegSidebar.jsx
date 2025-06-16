import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaFileAlt,
  FaUserGraduate,
  FaCalendarAlt,
  FaClock,
  FaChartBar,
  FaUsers,
  FaClipboardCheck,
  FaPlusCircle,
  FaListAlt,
  FaUserEdit,
  FaSignOutAlt,
} from "react-icons/fa";

const BegSidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "Overview", path: "/b-overview", icon: FaFileAlt },
    { name: "Marks", path: "/b-marks", icon: FaUserGraduate },
    { name: "Class Schedule", path: "/b-class-schedule", icon: FaCalendarAlt },
    { name: "Contest Schedule", path: "/b-contest-schedule", icon: FaClock },
    { name: "Leaderboard", path: "/b-leaderboard", icon: FaChartBar },
    { name: "Contest Team", path: "/b-contest-team", icon: FaUsers },
    { name: "Attendance", path: "/b-attendance", icon: FaClipboardCheck },
    { name: "Add Marks", path: "/b-add-marks", icon: FaPlusCircle },
    { name: "Add Class", path: "/b-add-class", icon: FaPlusCircle },
    { name: "Add Contest", path: "/b-add-contest", icon: FaPlusCircle },
    {
      name: "Pick Contest Team",
      path: "/b-pick-contest-team",
      icon: FaUserEdit,
    },
    {
      name: "Take Attendance",
      path: "/b-take-attendance",
      icon: FaClipboardCheck,
    },
    { name: "All Students List", path: "/b-students-list", icon: FaListAlt },
    {
      name: "Update Attendance",
      path: "/b-update-attendance",
      icon: FaClipboardCheck,
    },
    { name: "Logout", path: "/logout", icon: FaSignOutAlt },
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-10">
      <div className="flex items-center justify-center h-16 px-4 bg-indigo-600">
        <h1 className="text-white font-bold text-xl">Beginner Portal</h1>
      </div>

      <div className="flex flex-col h-full p-4">
        {/* Scrollable Nav Section */}
        <nav className="flex-1 space-y-2 mt-6 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 mr-3 ${
                    isActive ? "text-indigo-600" : "text-gray-400"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="pt-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <FaUsers className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Student Name</p>
              <p className="text-xs text-gray-500">ID: 123456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BegSidebar;
