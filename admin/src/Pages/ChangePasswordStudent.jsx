import React, { useState } from "react";
import { FaLock, FaUnlock } from "react-icons/fa";
import Sidebar from "../Shared/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ChangePasswordStudent = () => {
  const { studentId } = useParams();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    setSuccessMsg("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.newPassword || formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await axios.put(
        `http://localhost:5000/admin/changeStudentPassword/${studentId}`,
        { newPassword: formData.newPassword }
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Password has been changed successfully.",
        confirmButtonText: "OK",
      }).then(() => {
        setFormData({ newPassword: "", confirmPassword: "" });
        setErrors({});
      });
    } catch (error) {
      setSuccessMsg("");
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrors({ apiError: error.response.data.message });
      } else {
        setErrors({ apiError: "Something went wrong. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <Sidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold mb-6">Change Student Password</h1>

        <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 max-w-xl">
          <form onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="mb-5">
              <label className="block mb-1 font-medium text-gray-700">
                New Password *
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 py-2 border ${
                    errors.newPassword ? "border-red-400" : "border-gray-300"
                  } rounded-md`}
                  placeholder="Enter new password"
                  disabled={loading}
                />
              </div>
              {errors.newPassword && (
                <p className="text-red-600 text-sm">{errors.newPassword}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-5">
              <label className="block mb-1 font-medium text-gray-700">
                Confirm Password *
              </label>
              <div className="relative">
                <FaUnlock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 py-2 border ${
                    errors.confirmPassword
                      ? "border-red-400"
                      : "border-gray-300"
                  } rounded-md`}
                  placeholder="Confirm new password"
                  disabled={loading}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            {/* API error message */}
            {errors.apiError && (
              <p className="text-red-600 mb-4 font-medium">{errors.apiError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-75"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>

            {successMsg && (
              <p className="text-green-600 mt-4 font-medium">{successMsg}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordStudent;
