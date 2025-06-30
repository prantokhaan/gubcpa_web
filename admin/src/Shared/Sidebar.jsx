import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  FaCalendarPlus,
  FaClipboardList,
  FaUsersCog,
  FaBars,
  FaTimes,
  FaCalendarAlt,
  FaTrophy,
  FaUserTie,
  FaUserGraduate,
  FaLock,
  FaCalendarCheck,
  FaClipboardCheck,
  FaUserFriends,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize the state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "Add Student", path: "/add-student", icon: FaUserGraduate },
    { name: "Add Admin", path: "/add-admin", icon: FaUserShield },
    { name: "Add Teacher", path: "/add-teacher", icon: FaChalkboardTeacher },
    { name: "Add Event", path: "/add-event", icon: FaCalendarPlus },
    { name: "All Events", path: "/all-events", icon: FaCalendarAlt },
    { name: "Student List", path: "/student-list", icon: FaListAlt },
    { name: "Teacher List", path: "/teacher-list", icon: FaUserTie },
    { name: "Approve Student", path: "/approve-student", icon: FaUserCheck },
    {
      name: "Confirmed Student",
      path: "/confirmed-student",
      icon: FaUserCheck,
    },
    { name: "Change Password", path: "/change-password", icon: FaLock },
    {
      name: "Add Upcoming IUPC",
      path: "/add-upcoming-iupc",
      icon: FaTrophy,
    },
    { name: "All IUPC", path: "/all-iupc", icon: FaClipboardCheck },
    {
      name: "Add Teams To IUPC",
      path: "/add-teams-to-iupc",
      icon: FaUserFriends,
    },
    { name: "All Teams", path: "/all-teams", icon: FaUsersCog },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white shadow-lg md:hidden"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-40 transform transition-all duration-300 ease-in-out ${
          isMobile
            ? isOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }`}
      >
        <div className="flex items-center justify-center h-16 px-4 bg-indigo-600">
          <h1 className="text-white font-bold text-xl">Admin Panel</h1>
        </div>

        <div className="flex flex-col h-full">
          {/* Scrollable navigation area */}
          <div className="overflow-y-auto flex-1 py-2">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => isMobile && setIsOpen(false)}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-2 transition-colors duration-200 ${
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
          </div>

          {/* Footer with logout button */}
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <FaSignOutAlt className="h-5 w-5 mr-3 text-red-500" />
              Logout
            </button>

            <div className="flex items-center mt-4">
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

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
