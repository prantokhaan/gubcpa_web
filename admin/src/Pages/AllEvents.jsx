import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaListAlt,
  FaImage,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Sidebar from "../Shared/Sidebar";
import axios from "../api/axios";
import Swal from "sweetalert2";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: "",
    type: "",
    date: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/admin/getAllEvents");
      setEvents(response.data.events);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Failed to load events",
        text: "Something went wrong while fetching events.",
      });
    }
  };

  const handleMakePast = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStatusChange = async (eventId) => {
    const event = events.find((e) => e.id === eventId);

    if (event.status === "upcoming") {
      // Ask for image upload instead of direct change
      setSelectedEvent(event);
      setIsModalOpen(true); // Open image modal to make it past
    } else {
      // Directly change past → upcoming
      try {
        const result = await Swal.fire({
          title: "Change Status",
          text: "Are you sure you want to change the status of this event?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes, change it!",
        });

        if (result.isConfirmed) {
          await axios.put(`/admin/changeEventStatus/${eventId}`, {
            status: "upcoming",
          });

          Swal.fire({
            icon: "success",
            title: "Status Changed",
            text: "Event status has been updated to Upcoming.",
          });

          fetchEvents();
        }
      } catch (error) {
        console.error("Error changing status:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to change status",
          text: "Something went wrong while changing the status.",
        });
      }
    }
  };
  

  const handleSubmitImage = async () => {
    try {
      if (!imageFile) {
        Swal.fire({
          icon: "error",
          title: "No Image Selected",
          text: "Please select an image to proceed.",
        });
        return;
      }

      Swal.fire({
        title: "Uploading Image...",
        text: "Please wait while we upload your image.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
      });

      const uploadRes = await axios.post("/student/upload-image", {
        imageBase64: base64Image,
      });

      const bgImageLink = uploadRes.data?.data?.data?.url;

      await axios.put(`/admin/changeEventStatus/${selectedEvent.id}`, {
        status: "past",
        bgImageLink,
      });

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Event Updated",
        text: "Event has been marked as past with the provided image.",
      });

      setIsModalOpen(false);
      setImagePreview(null);
      setImageFile(null);
      fetchEvents();
    } catch (error) {
      console.error("Error submitting image:", error);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Something went wrong while uploading the image.",
      });
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setEditFormData({
      title: event.title,
      type: event.type,
      date: event.date.split("T")[0],
    });
    setEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      Swal.fire({
        title: "Updating Event...",
        text: "Please wait while we update your event.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const payload = {
        ...selectedEvent, // includes id, status, bgImageLink, etc.
        ...editFormData, // updated title/type/date
      };

      await axios.put(`/admin/editEvent/${selectedEvent.id}`, payload);

      Swal.fire({
        icon: "success",
        title: "Event Updated",
        text: "Event has been updated successfully.",
      });

      setEditModalOpen(false);
      fetchEvents();
    } catch (error) {
      console.error("Error updating event:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the event.",
      });
    }
  };
  

  const handleDelete = async (eventId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`/admin/deleteEvent/${eventId}`);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Event has been deleted.",
        });

        fetchEvents();
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Something went wrong while deleting the event.",
      });
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <>
        <Sidebar />
        <div className="ml-64 p-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">All Events</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {event.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 capitalize">
                        {event.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(event.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          event.status === "upcoming"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                        <button
                          onClick={() => handleStatusChange(event.id)}
                          className={
                            event.status === "upcoming"
                              ? "text-yellow-600 hover:text-yellow-900"
                              : "text-blue-600 hover:text-blue-900"
                          }
                          title={
                            event.status === "upcoming"
                              ? "Mark as Past"
                              : "Mark as Upcoming"
                          }
                        >
                          {event.status === "upcoming" ? (
                            <FaToggleOff />
                          ) : (
                            <FaToggleOn />
                          )}
                        </button>
                        {event.status === "upcoming" && (
                          <button
                            onClick={() => handleMakePast(event)}
                            className="text-purple-600 hover:text-purple-900"
                            title="Make Past with Image"
                          >
                            <FaImage />
                          </button>
                        )}
                        {event.status === "past" && event.bgImageLink && (
                          <button
                            onClick={() => {
                              Swal.fire({
                                imageUrl: event.bgImageLink,
                                imageAlt: event.title,
                                showConfirmButton: false,
                                showCloseButton: true,
                              });
                            }}
                            className="text-green-600 hover:text-green-900"
                            title="View Image"
                          >
                            <FaEye />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Image Upload Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="modal"
          overlayClassName="modal-overlay"
        >
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">
              Upload Image for {selectedEvent?.title}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Background Image
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Choose Image
                </label>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="ml-4 h-10 w-10 object-cover rounded"
                  />
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Image will be used as background for the past event.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setImagePreview(null);
                  setImageFile(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitImage}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </div>
        </Modal>

        {/* Edit Event Modal */}
        <Modal
          isOpen={editModalOpen}
          onRequestClose={() => setEditModalOpen(false)}
          className="modal"
          overlayClassName="modal-overlay"
        >
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Edit Event</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Title
              </label>
              <input
                type="text"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={editFormData.title}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, title: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Type
              </label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={editFormData.type}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, type: e.target.value })
                }
              >
                <option value="orientation">Orientation</option>
                <option value="exam">Exam</option>
                <option value="contest">Contest</option>
                <option value="ceremony">Ceremony</option>
                <option value="workshop">Workshop</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Date
              </label>
              <input
                type="date"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={editFormData.date}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, date: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AllEvents;
