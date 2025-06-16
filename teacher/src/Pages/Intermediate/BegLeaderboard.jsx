import React, { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import BegSidebar from "../Shared/BegSidebar";

const BegLeaderboard = () => {
  const [contests, setContests] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "http://localhost:5000/teacher/getAllMarksByBatchForLeaderboard/Beginner"
        );
        if (!res.ok) throw new Error("Failed to fetch marks");
        const data = await res.json();

        // Extract distinct contests
        const contestMap = new Map();
        data.marks.forEach((entry) => {
          const key = entry.contestName + "|" + entry.contestDate;
          if (!contestMap.has(key)) {
            contestMap.set(key, {
              contestName: entry.contestName,
              contestDate: entry.contestDate,
              key,
            });
          }
        });
        const contestsArr = Array.from(contestMap.values());

        // Extract distinct students and map marks by contest key
        const studentMap = new Map();
        data.marks.forEach((entry) => {
          if (!studentMap.has(entry.studentName)) {
            studentMap.set(entry.studentName, {
              studentName: entry.studentName,
              attendance: entry.attendance,
              marksByContest: {},
            });
          }
          studentMap.get(entry.studentName).marksByContest[
            entry.contestName + "|" + entry.contestDate
          ] = entry.marks;
          // Optional: update attendance to max if multiple records per student
          if (entry.attendance > studentMap.get(entry.studentName).attendance) {
            studentMap.get(entry.studentName).attendance = entry.attendance;
          }
        });
        const studentsArr = Array.from(studentMap.values());

        setContests(contestsArr);
        setStudents(studentsArr);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, []);

  // Compute total marks per student = sum contest marks + class marks
  const computeTotal = (student) => {
    const contestSum = contests.reduce(
      (acc, contest) => acc + (student.marksByContest[contest.key] || 0),
      0
    );
    const classMarks = student.attendance * 15;
    return contestSum + classMarks;
  };

  // Sort students descending by total for rank
  const sortedStudents = students
    .map((s) => ({ ...s, total: computeTotal(s) }))
    .sort((a, b) => b.total - a.total);

  // Calculate stats
  const highestScore = sortedStudents.length ? sortedStudents[0].total : 0;
  const averageScore = sortedStudents.length
    ? (
        sortedStudents.reduce((acc, s) => acc + s.total, 0) /
        sortedStudents.length
      ).toFixed(1)
    : 0;
  const participants = sortedStudents.length;

  if (loading) {
    return (
      <>
        <BegSidebar />
        <div className="ml-64 p-8">Loading leaderboard...</div>
      </>
    );
  }

  return (
    <>
      <BegSidebar />
      <div className="ml-64 p-8">
        <div className="flex items-center mb-6">
          <FaTrophy className="text-2xl text-yellow-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                {contests.map((contest) => (
                  <th
                    key={contest.key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {contest.contestName}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {sortedStudents.map((student, idx) => (
                <tr key={student.studentName} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {idx < 3 ? (
                        <FaTrophy
                          className={`text-xl mr-2 ${
                            idx === 0
                              ? "text-yellow-500"
                              : idx === 1
                              ? "text-gray-400"
                              : "text-amber-700"
                          }`}
                        />
                      ) : null}
                      <span className="font-medium">{idx + 1}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.studentName}
                  </td>
                  {contests.map((contest) => (
                    <td
                      key={contest.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {student.marksByContest[contest.key] || 0}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.attendance * 15}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-600">
                    {student.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-indigo-800">
              Highest Score
            </h3>
            <p className="mt-1 text-2xl font-semibold text-indigo-600">
              {highestScore}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-800">
              Average Score
            </h3>
            <p className="mt-1 text-2xl font-semibold text-green-600">
              {averageScore}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-yellow-800">
              Participants
            </h3>
            <p className="mt-1 text-2xl font-semibold text-yellow-600">
              {participants}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BegLeaderboard;
