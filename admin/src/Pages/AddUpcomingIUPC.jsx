import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "../api/axios"; // Adjust path if needed
import { FaCalendarAlt, FaLink, FaInfoCircle, FaPlus } from "react-icons/fa";
import Sidebar from "../Shared/Sidebar";

const AddUpcomingIUPC = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    contestDate: "",
    registrationDeadline: "",
    registrationLink: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Contest name is required";

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 20) {
      newErrors.description = "Description should be at least 20 characters";
    }

    if (!formData.contestDate) {
      newErrors.contestDate = "Contest date is required";
    }

    if (!formData.registrationDeadline) {
      newErrors.registrationDeadline = "Registration deadline is required";
    } else if (
      new Date(formData.registrationDeadline) > new Date(formData.contestDate)
    ) {
      newErrors.registrationDeadline = "Deadline must be before contest date";
    }

    if (!formData.registrationLink.trim()) {
      newErrors.registrationLink = "Registration link is required";
    } else if (!/^https?:\/\/.+\..+/.test(formData.registrationLink)) {
      newErrors.registrationLink = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await axios.post("/admin/create-iupc", formData);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "IUPC contest added successfully!",
        });
        setFormData({
          name: "",
          description: "",
          contestDate: "",
          registrationDeadline: "",
          registrationLink: "",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response?.data?.message ||
            "Something went wrong. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <Sidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Add Upcoming IUPC
        </h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                {/* Contest Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contest Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaInfoCircle className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.name ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="IUPC Contest Name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`block w-full px-3 py-2 border ${
                      errors.description ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="Detailed description about the contest..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contest Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contest Date *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        name="contestDate"
                        value={formData.contestDate}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.contestDate
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    {errors.contestDate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.contestDate}
                      </p>
                    )}
                  </div>

                  {/* Registration Deadline */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Registration Deadline *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        name="registrationDeadline"
                        value={formData.registrationDeadline}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.registrationDeadline
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    {errors.registrationDeadline && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.registrationDeadline}
                      </p>
                    )}
                  </div>
                </div>

                {/* Registration Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Link *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLink className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      name="registrationLink"
                      value={formData.registrationLink}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.registrationLink
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="https://example.com/register"
                    />
                  </div>
                  {errors.registrationLink && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.registrationLink}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  <FaPlus className="mr-2" />
                  {isSubmitting ? "Submitting..." : "Add IUPC Contest"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUpcomingIUPC;
