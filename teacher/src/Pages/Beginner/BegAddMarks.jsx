import React, { useState, useEffect } from "react";
import { FaPenAlt, FaSave, FaUserGraduate } from "react-icons/fa";
import Swal from "sweetalert2";
import BegSidebar from "../Shared/BegSidebar";

const BegAddMarks = () => {
  const [contests, setContests] = useState([]);
  const [students, setStudents] = useState([]);
  const [loadingContests, setLoadingContests] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    contestId: "",
    studentId: "",
    marks: "",
    batch: "Beginner"
  });

  // Fetch contests on mount
  useEffect(() => {
    const fetchContests = async () => {
      try {
        setLoadingContests(true);
        const res = await fetch("http://localhost:5000/teacher/getAllContests");
        if (!res.ok) throw new Error(`Error fetching contests: ${res.status}`);
        const data = await res.json();
        setContests(data.contests || []);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load contests", "error");
      } finally {
        setLoadingContests(false);
      }
    };
    fetchContests();
  }, []);

  // Fetch students on mount (batch = beginner)
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoadingStudents(true);
        const res = await fetch(
          "http://localhost:5000/teacher/getStudentByBatch/beginner"
        );
        if (!res.ok) throw new Error(`Error fetching students: ${res.status}`);
        const data = await res.json();
        setStudents(data.students || []);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load students", "error");
      } finally {
        setLoadingStudents(false);
      }
    };
    fetchStudents();
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

    if (!formData.contestId || !formData.studentId || formData.marks === "") {
      Swal.fire("Warning", "Please fill all fields", "warning");
      return;
    }

    if (formData.marks < 0) {
      Swal.fire("Warning", "Marks cannot be negative", "warning");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch(
        "http://localhost:5000/teacher/increaseMarksForStudent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: formData.studentId,
            contestId: formData.contestId,
            marks: Number(formData.marks),
            batch: formData.batch,
          }),
        }
      );
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to save marks: ${res.status}`
        );
      }
      await res.json(); // If API returns any useful info, can be used

      Swal.fire("Success", "Marks added successfully!", "success");
      // Reset form
      setFormData({
        contestId: "",
        studentId: "",
        marks: "",
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message || "Failed to save marks", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <BegSidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <FaUserGraduate /> Add Marks
        </h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Contest Selection */}
                <div>
                  <label
                    htmlFor="contestId"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Contest
                  </label>
                  <div className="relative">
                    <select
                      id="contestId"
                      name="contestId"
                      value={formData.contestId}
                      onChange={handleChange}
                      className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      required
                      disabled={loadingContests}
                    >
                      <option value="">
                        {loadingContests
                          ? "Loading contests..."
                          : "Select a contest"}
                      </option>
                      {contests.map((contest) => (
                        <option key={contest.id} value={contest.id}>
                          {contest.name} (
                          {new Date(contest.date).toLocaleDateString()})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Student Selection */}
                <div>
                  <label
                    htmlFor="studentId"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Student
                  </label>
                  <div className="relative">
                    <select
                      id="studentId"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      required
                      disabled={loadingStudents}
                    >
                      <option value="">
                        {loadingStudents
                          ? "Loading students..."
                          : "Select a student"}
                      </option>
                      {students.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.name} ({student.studentId})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Marks Input */}
                <div>
                  <label
                    htmlFor="marks"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Marks
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPenAlt className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="marks"
                      id="marks"
                      value={formData.marks}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                      placeholder="Enter marks"
                      required
                      min="0"
                      disabled={saving}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={saving || loadingContests || loadingStudents}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                      saving || loadingContests || loadingStudents
                        ? "bg-indigo-300 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    }`}
                  >
                    <FaSave className="mr-2 h-4 w-4" />
                    {saving ? "Saving..." : "Save Marks"}
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

export default BegAddMarks;
