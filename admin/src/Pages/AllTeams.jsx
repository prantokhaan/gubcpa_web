import React, { useState, useEffect } from "react";
import axios from "../api/axios"; // Adjust path if needed
import {
  FaUsers,
  FaUser,
  FaTrophy,
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import Sidebar from "../Shared/Sidebar";
import Swal from "sweetalert2";
import Modal from "react-modal";

// Make sure to bind modal to your appElement
Modal.setAppElement("#root");

const AllTeams = () => {
  const [selectedIupc, setSelectedIupc] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [iupcOptions, setIupcOptions] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    member1: "",
    member2: "",
    member3: "",
    coach: "",
    rank: "",
    solved: "",
  });

  useEffect(() => {
    // Fetch IUPC options from API
    axios
      .get("/admin/getAllIUPC")
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
        .get(`/admin/teamsByIupcId/${selectedIupc}`)
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

  // Handle edit button click
  const handleEditClick = (team) => {
    setCurrentTeam(team);
    setEditFormData({
      name: team.name,
      member1: team.member1,
      member2: team.member2,
      member3: team.member3,
      coach: team.coach,
      rank: team.rank,
      solved: team.solved,
    });
    setIsEditModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleEditSubmit = (e) => {
    console.log("Submitting edit form:", editFormData);
    e.preventDefault();
    axios
      .put(`/admin/editIupcTeam/${currentTeam.id}`, editFormData)
      .then((response) => {
        if (response.data.success) {
          // Update the teams list with the edited team
          setTeams(
            teams.map((team) =>
              team.id === currentTeam.id ? { ...team, ...editFormData } : team
            )
          );
          setIsEditModalOpen(false);
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Team updated successfully",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      })
      .catch((error) => {
        console.error("Error updating team:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update team",
        });
      });
  };

  // Handle delete button click
  const handleDeleteClick = (teamId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/admin/deleteIupcTeam/${teamId}`)
          .then((response) => {
            if (response.data.success) {
              // Remove the team from the list
              setTeams(teams.filter((team) => team.id !== teamId));
              Swal.fire("Deleted!", "The team has been deleted.", "success");
            }
          })
          .catch((error) => {
            console.error("Error deleting team:", error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to delete team",
            });
          });
      }
    });
  };

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
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEditClick(team)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            <FaEdit className="inline mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(team.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash className="inline mr-1" /> Delete
                          </button>
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

      {/* Edit Team Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Edit Team</h2>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleEditSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Team Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={editFormData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="member1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Member 1
                </label>
                <input
                  type="text"
                  name="member1"
                  id="member1"
                  value={editFormData.member1}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="member2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Member 2
                </label>
                <input
                  type="text"
                  name="member2"
                  id="member2"
                  value={editFormData.member2}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="member3"
                  className="block text-sm font-medium text-gray-700"
                >
                  Member 3
                </label>
                <input
                  type="text"
                  name="member3"
                  id="member3"
                  value={editFormData.member3}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="coach"
                  className="block text-sm font-medium text-gray-700"
                >
                  Coach
                </label>
                <input
                  type="text"
                  name="coach"
                  id="coach"
                  value={editFormData.coach}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="rank"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rank
                </label>
                <input
                  type="number"
                  name="rank"
                  id="rank"
                  value={editFormData.rank}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="solved"
                  className="block text-sm font-medium text-gray-700"
                >
                  Problems Solved
                </label>
                <input
                  type="number"
                  name="solved"
                  id="solved"
                  value={editFormData.solved}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Add some styles for the modal */}
      <style jsx global>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal {
          background: white;
          border-radius: 0.5rem;
          outline: none;
        }
      `}</style>
    </>
  );
};

export default AllTeams;
