import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaLink,
  FaEdit,
  FaTrash,
  FaPlus,
  FaUsers,
} from "react-icons/fa";
import { MdDoneAll } from "react-icons/md";
import Sidebar from "../Shared/Sidebar";
import Swal from "sweetalert2";
import axios from "../api/axios"; // Adjust the path to your axios instance

const AllIUPC = () => {
  const [iupcContests, setIupcContests] = useState([]);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);
  const [numberOfTeams, setNumberOfTeams] = useState(1);
  const [teamsData, setTeamsData] = useState([]);
  const [showTeamList, setShowTeamList] = useState(false);
  const [selectedTeamList, setSelectedTeamList] = useState([]);
  const [editingContest, setEditingContest] = useState({
    id: null,
    name: "",
    contestDate: "",
    registrationDeadline: "",
    totalTeams: 0,
    gubRank: 0,
  });

  useEffect(() => {
    axios
      .get("/admin/getAllIUPC")
      .then((res) => {
        setIupcContests(res.data.iupcs);
      })
      .catch((err) => {
        console.error("Failed to fetch IUPC contests", err);
        Swal.fire("Error", "Failed to load contests", "error");
      });
  }, []);

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateTimeString).toLocaleDateString("en-US", options);
  };

  const handleMoveToPast = (id) => {
    Swal.fire({
      title: "Move to Past?",
      text: "This will mark the contest as completed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, move it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`/admin/changeIupcStatus/${id}`, {
            status: "Past",
          })
          .then(() => {
            setIupcContests((prev) =>
              prev.map((c) => (c.id === id ? { ...c, status: "Past" } : c))
            );
            Swal.fire(
              "Moved!",
              "The contest has been marked as past.",
              "success"
            );
          })
          .catch(() =>
            Swal.fire("Error", "Failed to change contest status", "error")
          );
      }
    });
  };

  const handleDelete = (id) => {
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
          .delete(`/admin/deleteIUPC/${id}`)
          .then(() => {
            setIupcContests((prev) => prev.filter((c) => c.id !== id));
            Swal.fire("Deleted!", "The contest has been deleted.", "success");
          })
          .catch(() => Swal.fire("Error", "Failed to delete contest", "error"));
      }
    });
  };

  const handleEdit = (contest) => {
    setEditingContest({
      id: contest.id,
      name: contest.name,
      contestDate: contest.contestDate,
      registrationDeadline: contest.registrationDeadline,
      totalTeams: contest.totalTeams,
      gubRank: contest.gubRank,
    });
  };

  const handleUpdateContest = () => {
    axios
      .put(`/admin/editIUPC/${editingContest.id}`, {
        name: editingContest.name,
        contestDate: editingContest.contestDate,
        registrationDeadline: editingContest.registrationDeadline,
        totalTeams: editingContest.totalTeams,
        gubRank: editingContest.gubRank,
      })
      .then(() => {
        setIupcContests((prev) =>
          prev.map((contest) =>
            contest.id === editingContest.id
              ? { ...contest, ...editingContest }
              : contest
          )
        );
        setEditingContest({
          id: null,
          name: "",
          contestDate: "",
          registrationDeadline: "",
          totalTeams: 0,
          gubRank: 0,
        });
        Swal.fire("Updated!", "The contest has been updated.", "success");
      })
      .catch(() => Swal.fire("Error", "Failed to update contest", "error"));
  };

  const handleAddTeams = (contest) => {
    setSelectedContest(contest);
    Swal.fire({
      title: "Add Teams",
      html: `
        <div class="text-left">
          <label class="block text-sm font-medium text-gray-700 mb-1">Number of Teams to Add</label>
          <input 
            type="number" 
            id="teamCount" 
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
            min="1" 
            value="1"
          >
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Continue",
      preConfirm: () => {
        const count = parseInt(document.getElementById("teamCount").value);
        if (count < 1) {
          Swal.showValidationMessage("Please enter at least 1 team");
          return false;
        }
        return count;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setNumberOfTeams(result.value);
        initializeTeamData(result.value);
        setShowTeamModal(true);
      }
    });
  };

  const handleViewTeams = (contest) => {
    setSelectedTeamList(contest.teamInfo || []);
    setShowTeamList(true);
  };

  const initializeTeamData = (count) => {
    const newTeams = [];
    for (let i = 0; i < count; i++) {
      newTeams.push({
        id: Date.now() + i,
        member1: "",
        member2: "",
        member3: "",
        coach: "",
        university: "",
      });
    }
    setTeamsData(newTeams);
  };

  const handleTeamInputChange = (teamIndex, field, value) => {
    const updatedTeams = [...teamsData];
    updatedTeams[teamIndex][field] = value;
    setTeamsData(updatedTeams);
  };

  const submitTeams = () => {
    const isValid = teamsData.every(
      (team) =>
        team.member1 &&
        team.member2 &&
        team.member3 &&
        team.coach &&
        team.university
    );

    if (!isValid) {
      Swal.fire(
        "Error",
        "Please fill all team member and coach fields",
        "error"
      );
      return;
    }

    axios
      .put(`/admin/editIUPCTeam/${selectedContest.id}`, {
        teams: teamsData,
      })
      .then(() => {
        const updatedContests = iupcContests.map((contest) => {
          if (contest.id === selectedContest.id) {
            const updatedTeams = [...(contest.teamInfo || []), ...teamsData];
            return {
              ...contest,
              totalTeams: updatedTeams.length,
              teamInfo: updatedTeams,
            };
          }
          return contest;
        });

        setIupcContests(updatedContests);
        setShowTeamModal(false);
        Swal.fire(
          "Success",
          `${teamsData.length} teams added successfully!`,
          "success"
        );
      })
      .catch(() => Swal.fire("Error", "Failed to add teams", "error"));
  };

  return (
    <>
      <Sidebar />
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            All IUPC Contests
          </h1>
          <a
            href="/admin/add-iupc"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaPlus className="mr-2" />
            Add New IUPC
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contest Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contest Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Reg. Deadline
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Teams
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    GUB Rank
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {iupcContests.map((contest) => (
                  <tr key={contest.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {contest.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        <a
                          href={contest.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <FaLink className="inline mr-1" /> Registration Link
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaCalendarAlt className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" />
                        <div className="text-sm text-gray-500">
                          {formatDateTime(contest.contestDate)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaCalendarAlt className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" />
                        <div className="text-sm text-gray-500">
                          {formatDateTime(contest.registrationDeadline)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewTeams(contest)}
                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                      >
                        {contest.totalTeams} teams
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contest.gubRank === "-"
                        ? "-"
                        : `${contest.gubRank}${
                            contest.gubRank === 1
                              ? "st"
                              : contest.gubRank === 2
                              ? "nd"
                              : contest.gubRank === 3
                              ? "rd"
                              : "th"
                          }`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          contest.status === "upcoming"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {contest.status === "upcoming" ? "Upcoming" : "Past"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {contest.status === "upcoming" && (
                          <button
                            onClick={() => handleMoveToPast(contest.id)}
                            className="text-indigo-600 hover:text-indigo-900 p-1"
                            title="Move to Past"
                          >
                            <MdDoneAll className="h-5 w-5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleAddTeams(contest)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Add Teams"
                        >
                          <FaUsers className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(contest)}
                          className="text-yellow-600 hover:text-yellow-900 p-1"
                          title="Edit"
                        >
                          <FaEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(contest.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete"
                        >
                          <FaTrash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Contest Modal */}
      {editingContest.id && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Edit Contest</h3>
              <button
                onClick={() => setEditingContest({ id: null })}
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

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contest Name
                </label>
                <input
                  type="text"
                  value={editingContest.name}
                  onChange={(e) =>
                    setEditingContest({
                      ...editingContest,
                      name: e.target.value,
                    })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Contest name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contest Date
                </label>
                <input
                  type="datetime-local"
                  value={editingContest.contestDate}
                  onChange={(e) =>
                    setEditingContest({
                      ...editingContest,
                      contestDate: e.target.value,
                    })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Deadline
                </label>
                <input
                  type="datetime-local"
                  value={editingContest.registrationDeadline}
                  onChange={(e) =>
                    setEditingContest({
                      ...editingContest,
                      registrationDeadline: e.target.value,
                    })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Teams
                </label>
                <input
                  type="number"
                  value={editingContest.totalTeams}
                  onChange={(e) =>
                    setEditingContest({
                      ...editingContest,
                      totalTeams: e.target.value,
                    })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GUB Rank
                </label>
                <input
                  type="text"
                  value={editingContest.gubRank}
                  onChange={(e) =>
                    setEditingContest({
                      ...editingContest,
                      gubRank: e.target.value,
                    })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setEditingContest({ id: null })}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdateContest}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Contest
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllIUPC;
