import React, { useState } from "react";
import Sidebar from "../Shared/Sidebar";
import axios from "../api/axios";
import Swal from "sweetalert2";

const AdminChangePassword = () => {
  const adminData = JSON.parse(localStorage.getItem("adminData") || "{}");
  const adminId = adminData.id;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all fields.",
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "New password and confirmation do not match.",
      });
      return;
    }

    setSubmitting(true);

    try {
      await axios.put(
        `/admin/changeAdminPassword/${adminId}`,
        {
          oldPassword,
          newPassword,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password changed successfully!",
      });

      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text:
          error.response?.data?.message ||
          "Failed to change password. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="ml-64 p-8 max-w-md">
        <h1 className="text-2xl font-bold mb-6">Admin Change Password</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="oldPassword" className="block mb-1 font-semibold">
              Old Password
            </label>
            <input
              id="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block mb-1 font-semibold">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
              minLength={6}
              disabled={submitting}
            />
          </div>

          <div>
            <label
              htmlFor="confirmNewPassword"
              className="block mb-1 font-semibold"
            >
              Confirm New Password
            </label>
            <input
              id="confirmNewPassword"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
              minLength={6}
              disabled={submitting}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded disabled:opacity-70"
          >
            {submitting ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminChangePassword;
