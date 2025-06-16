import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaUser, FaTrophy, FaCheck, FaPlus } from "react-icons/fa";
import Sidebar from "../Shared/Sidebar";
import Swal from "sweetalert2";

const AddTeamToIUPC = () => {
  const [formData, setFormData] = useState({
    iupcId: "",
    name: "",
    member1: "",
    member2: "",
    member3: "",
    coach: "",
    rank: "",
    solved: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [iupcOptions, setIupcOptions] = useState([]);

  useEffect(() => {
    // Fetch IUPC options from API
    axios
      .get("http://localhost:5000/admin/getAllIUPC")
      .then((response) => {
        // Extract iupcs array from the response
        if (response.data && response.data.iupcs) {
          setIupcOptions(response.data.iupcs); // Store the list of IUPC contests
        }
      })
      .catch((error) => {
        console.error("There was an error fetching IUPC data:", error);
      });
  }, []);

  console.log("IUPC Options:", iupcOptions);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form (you can improve this by adding more validation rules)
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        validationErrors[key] = `${key} is required`;
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Sending data to create IUPC team
        await axios.post(
          "http://localhost:5000/admin/createIupcTeam",
          formData
        );

        // Show success message
        Swal.fire({
          title: "Success!",
          text: "Team added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Clear form
        setFormData({
          iupcId: "",
          name: "",
          member1: "",
          member2: "",
          member3: "",
          coach: "",
          rank: "",
          solved: "",
        });
      } catch (error) {
        console.error("There was an error creating the team:", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error adding the team.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <>
      <Sidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Add Team to IUPC
        </h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                {/* IUPC Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select IUPC Contest *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUsers className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="iupcId"
                      value={formData.iupcId}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.iupcId ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    >
                      <option value="">Select an IUPC contest</option>
                      {iupcOptions?.map((iupc) => (
                        <option key={iupc.id} value={iupc.id}>
                          {iupc.name} -{" "}
                          {new Date(iupc.contestDate).toLocaleDateString()}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.iupcId && (
                    <p className="mt-1 text-sm text-red-600">{errors.iupcId}</p>
                  )}
                </div>

                {/* Team Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Team Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUsers className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.name ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="Team Name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Member Inputs (Member 1, Member 2, Member 3) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Member 1 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Member 1 *
                    </label>
                    <input
                      type="text"
                      name="member1"
                      value={formData.member1}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.member1 ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="Member 1 Name"
                    />
                    {errors.member1 && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.member1}
                      </p>
                    )}
                  </div>

                  {/* Member 2 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Member 2 *
                    </label>
                    <input
                      type="text"
                      name="member2"
                      value={formData.member2}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.member2 ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="Member 2 Name"
                    />
                    {errors.member2 && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.member2}
                      </p>
                    )}
                  </div>

                  {/* Member 3 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Member 3 *
                    </label>
                    <input
                      type="text"
                      name="member3"
                      value={formData.member3}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.member3 ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="Member 3 Name"
                    />
                    {errors.member3 && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.member3}
                      </p>
                    )}
                  </div>
                </div>

                {/* Coach */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coach Name *
                  </label>
                  <input
                    type="text"
                    name="coach"
                    value={formData.coach}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Coach Name"
                    required
                  />
                </div>

                {/* Rank */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rank *
                  </label>
                  <input
                    type="number"
                    name="rank"
                    value={formData.rank}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      errors.rank ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="Team Rank"
                    min="1"
                  />
                  {errors.rank && (
                    <p className="mt-1 text-sm text-red-600">{errors.rank}</p>
                  )}
                </div>

                {/* Solved */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Problems Solved *
                  </label>
                  <input
                    type="number"
                    name="solved"
                    value={formData.solved}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      errors.solved ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="Number of problems solved"
                    min="0"
                  />
                  {errors.solved && (
                    <p className="mt-1 text-sm text-red-600">{errors.solved}</p>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaPlus className="mr-2" />
                  Add Team to IUPC
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTeamToIUPC;
