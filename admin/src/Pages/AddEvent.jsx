import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaHeading,
  FaListAlt,
  FaImage,
  FaPlus,
  FaCalendarDay,
} from "react-icons/fa";
import Sidebar from "../Shared/Sidebar";
import axios from "../api/axios";
import Swal from "sweetalert2";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "orientation",
    status: "upcoming",
    date: "",
    bgImage: null,
  });

  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        bgImage: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Event title is required";
    if (!formData.date) newErrors.date = "Event date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Show loading alert
      Swal.fire({
        title: "Adding Event...",
        text: "Please wait while your event is being created.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      let bgImageLink = null;

      // Upload image if provided
      if (formData.status === "past" && formData.bgImage) {
        const base64Image = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(formData.bgImage);
          reader.onload = () => resolve(reader.result.split(",")[1]);
          reader.onerror = (error) => reject(error);
        });

        const uploadRes = await axios.post("/student/upload-image", {
          imageBase64: base64Image,
        });

        console.log("Image uploaded successfully:", uploadRes.data);

        bgImageLink = uploadRes.data?.data?.data?.url;
      }

      const payload = {
        title: formData.title,
        type: formData.type,
        status: formData.status,
        date: formData.date,
        ...(bgImageLink && { bgImageLink }),
      };

      await axios.post("/admin/addEvent", payload);

      // Close the loading popup
      Swal.close();

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Event Added Successfully",
        text: "Your event has been successfully saved.",
      });

      // Reset form
      setFormData({
        title: "",
        type: "orientation",
        status: "upcoming",
        date: "",
        bgImage: null,
      });
      setPreviewImage(null);
      setErrors({});
    } catch (error) {
      console.error(error);
      Swal.close(); // Close the loading popup
      Swal.fire({
        icon: "error",
        title: "Failed to Add Event",
        text: "Something went wrong while submitting the event.",
      });
    }
  };
  

  return (
    <>
      <Sidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Add New Event</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Event Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Title *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaHeading className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.title ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="Event title"
                    />
                  </div>
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                {/* Event Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Date *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarDay className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.date ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                  </div>
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                  )}
                </div>

                {/* Event Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Type *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaListAlt className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="orientation">Orientation</option>
                      <option value="exam">Exam</option>
                      <option value="contest">Contest</option>
                      <option value="ceremony">Ceremony</option>
                      <option value="workshop">Workshop</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                </div>

                {/* Event Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Status *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="past">Past</option>
                    </select>
                  </div>
                </div>

                {/* Background Image Upload */}
                {formData.status === "past" && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Background Image
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaImage className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="file"
                        name="bgImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full pl-10 pr-3 py-2 opacity-0 absolute z-10 cursor-pointer"
                      />
                      <div className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white">
                        {previewImage ? (
                          <div className="flex items-center">
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="h-10 w-10 object-cover rounded mr-2"
                            />
                            <span>{formData.bgImage.name}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">
                            Choose an image...
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Optional: Upload an event background image (JPEG, PNG)
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaPlus className="mr-2 h-4 w-4" />
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEvent;
