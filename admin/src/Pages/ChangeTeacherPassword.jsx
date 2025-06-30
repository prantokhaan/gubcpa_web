import React, { useState } from "react";
import Sidebar from "../Shared/Sidebar";
import { useParams } from "react-router-dom";
import axios from "../api/axios"; // Adjust path if needed
import Swal from "sweetalert2";

const ChangeTeacherPassword = () => {
  const { teacherId } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        `/admin/changeTeacherPassword/${teacherId}`,
        { newPassword: password }
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Password updated successfully!",
      });

      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Failed to update password. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="ml-64 p-8 max-w-xl">
        <h1 className="text-3xl font-bold mb-6">Change Teacher Password</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">New Password</label>
            <input
              type="password"
              className="w-full border px-4 py-2 rounded"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              minLength={6}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-full border px-4 py-2 rounded"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangeTeacherPassword;
