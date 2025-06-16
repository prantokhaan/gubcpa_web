import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaUser, FaTrophy, FaSearch, FaFilter } from "react-icons/fa";
import Sidebar from "../Shared/Sidebar";

const AllTeams = () => {
  const [selectedIupc, setSelectedIupc] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [iupcOptions, setIupcOptions] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch IUPC options from API
    axios
      .get("http://localhost:5000/admin/getAllIUPC")
      .then((response) => {
        if (response.data && response.data.iupcs) {
          setIupcOptions(response.data.iupcs); // Store the list of IUPC contests
        }
      })
      .catch((error) => {
        console.error("There was an error fetching IUPC data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch teams based on selected IUPC contest
    if (selectedIupc) {
      axios
        .get(`http://localhost:5000/admin/teamsByIupcId/${selectedIupc}`)
        .then((response) => {
          if (response.data && response.data.teams) {
            setTeams(response.data.teams); // Store the teams for the selected IUPC
          }
        })
        .catch((error) => {
          console.error("There was an error fetching teams:", error);
        });
    } else {
      setTeams([]); // Clear teams if no IUPC is selected
    }
  }, [selectedIupc]);

  // Filter teams based on the search term
  const displayedTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Sidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">All Teams</h1>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mb-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* IUPC Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select IUPC Contest
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUsers className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={selectedIupc}
                  onChange={(e) => setSelectedIupc(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All IUPC Contests</option>
                  {iupcOptions.map((iupc) => (
                    <option key={iupc.id} value={iupc.id}>
                      {iupc.name} -{" "}
                      {new Date(iupc.contestDate).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Team */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Team
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search by team name"
                  disabled={!selectedIupc}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Teams Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          {selectedIupc ? (
            displayedTeams.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Team Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Members
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Coach
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Rank
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Solved
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {displayedTeams.map((team) => (
                      <tr key={team.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            {team.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {team.member1}
                          </div>
                          <div className="text-sm text-gray-900">
                            {team.member2}
                          </div>
                          <div className="text-sm text-gray-900">
                            {team.member3}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {team.coach}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {team.rank}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {team.solved} problems
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <FaFilter className="mx-auto h-12 w-12" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No teams found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm
                    ? "No teams match your search criteria"
                    : "No teams registered for this IUPC yet"}
                </p>
              </div>
            )
          ) : (
            <div className="p-8 text-center text-gray-500">
              <FaUsers className="mx-auto h-12 w-12" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Select an IUPC contest
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Choose an IUPC from the dropdown to view participating teams
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllTeams;
