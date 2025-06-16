import React, { useState, useEffect } from "react";
import {
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaPlus,
} from "react-icons/fa";
import BegSidebar from "../Shared/BegSidebar";
import axios from "axios";
import Swal from "sweetalert2";

const BegAddClass = () => {
  const [instructors, setInstructors] = useState([]);
  const [loadingInstructors, setLoadingInstructors] = useState(true);

  const [formData, setFormData] = useState({
    className: "",
    instructorId: "",
    date: "",
    startTime: "",
    endTime: "",
    room: "",
    description: "",
  });

  const [submitting, setSubmitting] = useState(false);

  // Fetch instructors on mount
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/teacher/getAllTeachers"
        );
        if (res.data && Array.isArray(res.data.teachers)) {
          setInstructors(res.data.teachers);
        } else {
          setInstructors([]);
        }
      } catch (error) {
        console.error("Failed to fetch instructors:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load instructors. Please try again later.",
        });
      } finally {
        setLoadingInstructors(false);
      }
    };

    fetchInstructors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Find instructor name by id
    const selectedInstructor = instructors.find(
      (inst) => inst.id.toString() === formData.instructorId.toString()
    );

    const payload = {
      batch: "Beginner",
      name: formData.className,
      instructor: selectedInstructor ? selectedInstructor.name : "",
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      room: formData.room,
      description: formData.description,
    };

    try {
      await axios.post("http://localhost:5000/teacher/addClass", payload);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Class added successfully!",
      });
      setFormData({
        className: "",
        instructorId: "",
        date: "",
        startTime: "",
        endTime: "",
        room: "",
        description: "",
      });
    } catch (error) {
      console.error("Failed to add class:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to add class. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <BegSidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Class</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Class Name */}
                <div>
                  <label
                    htmlFor="className"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Class Name
                  </label>
                  <input
                    type="text"
                    id="className"
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter class name"
                    required
                    disabled={submitting}
                  />
                </div>

                {/* Instructor Selection */}
                <div>
                  <label
                    htmlFor="instructorId"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Instructor
                  </label>
                  <div className="relative">
                    <select
                      id="instructorId"
                      name="instructorId"
                      value={formData.instructorId}
                      onChange={handleChange}
                      className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      required
                      disabled={submitting || loadingInstructors}
                    >
                      <option value="">
                        {loadingInstructors
                          ? "Loading instructors..."
                          : "Select an instructor"}
                      </option>
                      {instructors.map((instructor) => (
                        <option key={instructor.id} value={instructor.id}>
                          {instructor.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FaChalkboardTeacher className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Date */}
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        required
                        disabled={submitting}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Start Time */}
                  <div>
                    <label
                      htmlFor="startTime"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Start Time
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        required
                        disabled={submitting}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <FaClock className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* End Time */}
                  <div>
                    <label
                      htmlFor="endTime"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      End Time
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        id="endTime"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        required
                        disabled={submitting}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <FaClock className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Room Text Input */}
                <div>
                  <label
                    htmlFor="room"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Room
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="room"
                      name="room"
                      value={formData.room}
                      onChange={handleChange}
                      className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      placeholder="Enter room name or number"
                      required
                      disabled={submitting}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter class description"
                    disabled={submitting}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70"
                  >
                    <FaPlus className="mr-2 h-4 w-4" />
                    {submitting ? "Adding..." : "Add Class"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BegAddClass;
