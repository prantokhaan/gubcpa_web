import React, { useState, useEffect } from "react";
import Sidebar from "../Shared/Sidebar";
import { useParams } from "react-router-dom";
import axios from "../api/axios"; // Adjust path if needed
import Swal from "sweetalert2";

const EditTeacher = () => {
  const { teacherId } = useParams();

  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    batch: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch single teacher data on mount
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(
          `/admin/getSingleTeacher/${teacherId}`
        );
        if (res.data && res.data.teacher) {
          setTeacher({
            name: res.data.teacher.name || "",
            email: res.data.teacher.email || "",
            batch: (res.data.teacher.batch || "").toLowerCase(), // Normalize here
          });
        }
      } catch (error) {
        console.error("Failed to fetch teacher:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to load teacher data.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [teacherId]);

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.put(
        `/admin/editTeacher/${teacherId}`,
        teacher
      );
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Teacher information updated successfully!",
      });
    } catch (error) {
      console.error("Failed to update teacher:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Failed to update teacher information. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Sidebar />
        <div className="ml-64 p-8 max-w-2xl">
          <p className="text-gray-500 text-center py-20">
            Loading teacher data...
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="ml-64 p-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Edit Teacher</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={teacher.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={teacher.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Batch</label>
            <select
              name="batch"
              value={
                ["beginner", "intermediate", "advanced"].includes(teacher.batch)
                  ? teacher.batch
                  : ""
              }
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
              disabled={submitting}
            >
              <option value="">Select Batch</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-70"
          >
            {submitting ? "Updating..." : "Update Teacher"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditTeacher;
