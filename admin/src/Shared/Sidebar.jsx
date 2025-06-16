import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // ✅ add useNavigate
import {
  FaHome,
  FaUserPlus,
  FaUserShield,
  FaChalkboardTeacher,
  FaListAlt,
  FaUsers,
  FaUserCheck,
  FaKey,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ hook for redirection

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/login");
  };

  const navItems = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "Add Student", path: "/add-student", icon: FaUserPlus },
    { name: "Add Admin", path: "/add-admin", icon: FaUserShield },
    { name: "Add Teacher", path: "/add-teacher", icon: FaChalkboardTeacher },
    { name: "Student List", path: "/student-list", icon: FaListAlt },
    { name: "Teacher List", path: "/teacher-list", icon: FaUsers },
    { name: "Approve Student", path: "/approve-student", icon: FaUserCheck },
    { name: "Change Password", path: "/change-password", icon: FaKey },
    { name: "Add Upcoming IUPC", path: "/add-upcoming-iupc", icon: FaUserPlus },
    { name: "All IUPC", path: "/all-iupc", icon: FaListAlt },
    { name: "Add Teams To IUPC", path: "/add-teams-to-iupc", icon: FaListAlt },
    { name: "All Teams", path: "/all-teams", icon: FaListAlt },
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-10">
      <div className="flex items-center justify-center h-16 px-4 bg-indigo-600">
        <h1 className="text-white font-bold text-xl">Admin Page</h1>
      </div>

      <div className="flex flex-col h-full p-4">
        <nav className="flex-1 space-y-2 mt-6">
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

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 mt-4"
          >
            <FaSignOutAlt className="h-5 w-5 mr-3 text-red-500" />
            Logout
          </button>
        </nav>

        {/* Footer */}
        <div className="pb-4 px-4 mt-auto">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <FaUser className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Admin</p>
              <p className="text-xs text-gray-500">Logged In</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
