import React, { useState } from "react";
import {
  FaUsers,
  FaTrophy,
  FaUserTie,
  FaUniversity,
  FaPlus,
  FaUser,
  FaTrash,
} from "react-icons/fa";
import AdvancedSidebar from "../Shared/AdvancedSidebar";
import InterSidebar from "../Shared/InterSidebar";

const InterPickContestTeam = () => {
  // Contest types
  const contestTypes = ["IUPC", "ICPC", "Other"];

  // State for form
  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState({
    name: "",
    contestType: "IUPC",
    university: "",
    member1: "",
    member2: "",
    member3: "",
    coach: "",
  });
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTeam((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTeam = (e) => {
    e.preventDefault();
    if (
      !currentTeam.name ||
      !currentTeam.university ||
      !currentTeam.member1 ||
      !currentTeam.coach
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const newTeam = {
      id: Date.now(),
      name: currentTeam.name,
      contest: `${currentTeam.contestType} Team`,
      university: currentTeam.university,
      members: [
        currentTeam.member1 + " (Captain)",
        currentTeam.member2,
        currentTeam.member3,
      ].filter(Boolean),
      coach: currentTeam.coach,
    };

    setTeams([...teams, newTeam]);
    setCurrentTeam({
      name: "",
      contestType: "IUPC",
      university: "",
      member1: "",
      member2: "",
      member3: "",
      coach: "",
    });
    setShowForm(false);
  };

  const handleRemoveTeam = (id) => {
    setTeams(teams.filter((team) => team.id !== id));
  };

  return (
    <>
      <InterSidebar />
      <div className="ml-64 p-8">
        <div className="flex items-center mb-8">
          <FaTrophy className="text-3xl text-yellow-500 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Contest Team Management
            </h1>
            <p className="text-gray-600">
              Register and manage teams for programming contests
            </p>
          </div>
        </div>

        {/* Add Team Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <FaPlus className="mr-2" />
            {showForm ? "Cancel" : "Add New Team"}
          </button>
        </div>

        {/* Add Team Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Team Registration
            </h2>
            <form onSubmit={handleAddTeam}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Team Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Team Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={currentTeam.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contest Type *
                    </label>
                    <select
                      name="contestType"
                      value={currentTeam.contestType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      {contestTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      University *
                    </label>
                    <input
                      type="text"
                      name="university"
                      value={currentTeam.university}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                {/* Team Members */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Member 1 (Captain) *
                    </label>
                    <div className="flex items-center">
                      <FaUser className="mr-2 text-gray-500" />
                      <input
                        type="text"
                        name="member1"
                        value={currentTeam.member1}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Member 2
                    </label>
                    <div className="flex items-center">
                      <FaUser className="mr-2 text-gray-500" />
                      <input
                        type="text"
                        name="member2"
                        value={currentTeam.member2}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Member 3
                    </label>
                    <div className="flex items-center">
                      <FaUser className="mr-2 text-gray-500" />
                      <input
                        type="text"
                        name="member3"
                        value={currentTeam.member3}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Coach *
                    </label>
                    <div className="flex items-center">
                      <FaUserTie className="mr-2 text-gray-500" />
                      <input
                        type="text"
                        name="coach"
                        value={currentTeam.coach}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Register Team
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Teams List */}
        <div className="space-y-6">
          {teams.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">No teams registered yet</p>
            </div>
          ) : (
            teams.map((team) => (
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
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                        {team.contest}
                      </span>
                      <button
                        onClick={() => handleRemoveTeam(team.id)}
                        className="p-1 text-red-500 hover:text-red-700"
                        title="Remove team"
                      >
                        <FaTrash />
                      </button>
                    </div>
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

                  {/* Coach */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                      <FaUserTie className="mr-2 text-indigo-500" />
                      Coach
                    </h3>
                    <p className="text-gray-700">{team.coach}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Contest Info */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-3">
            Contest Information
          </h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-gray-700">Team Size:</span>
              <span className="font-medium">1-3 members</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-700">Registration Deadline:</span>
              <span className="font-medium">November 15, 2023</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-700">Required Fields:</span>
              <span className="font-medium">
                Team name, university, at least 1 member, and coach
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default InterPickContestTeam;
