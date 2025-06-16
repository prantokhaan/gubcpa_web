import React, { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaChartLine,
  FaUserGraduate,
} from "react-icons/fa";
import BegSidebar from "../Shared/BegSidebar";

const BegMarks = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data and group by contests
  useEffect(() => {
    const fetchMarks = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "http://localhost:5000/teacher/getAllMarksByBatch/Beginner"
        );
        if (!res.ok) throw new Error("Failed to fetch marks");
        const data = await res.json();

        // Group marks by contestName and contestDate
        const grouped = data.marks.reduce((acc, mark) => {
          const key = mark.contestName + "|" + mark.contestDate;
          if (!acc[key]) {
            acc[key] = {
              id: key,
              name: mark.contestName,
              date: mark.contestDate,
              students: [],
            };
          }
          acc[key].students.push({
            id: mark.id,
            name: mark.studentName,
            marks: mark.marks,
          });
          return acc;
        }, {});

        // Convert grouped object to array
        let contestsArr = Object.values(grouped);

        // Sort students inside each contest by marks descending
        contestsArr = contestsArr.map((contest) => {
          const sortedStudents = [...contest.students].sort(
            (a, b) => b.marks - a.marks
          );
          return {
            ...contest,
            students: sortedStudents,
            maxMarks: sortedStudents.length ? sortedStudents[0].marks : 100,
            isOpen: false,
          };
        });

        // Sort contests by date descending (newest first)
        contestsArr.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setContests(contestsArr);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMarks();
  }, []);

  const toggleContest = (contestId) => {
    setContests((prev) =>
      prev.map((contest) =>
        contest.id === contestId
          ? { ...contest, isOpen: !contest.isOpen }
          : contest
      )
    );
  };

  if (loading) {
    return (
      <>
        <BegSidebar />
        <div className="ml-64 p-8">
          <p>Loading marks...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="p-8 bg-gray-50 min-h-screen">
        <BegSidebar />
        <div className="max-w-6xl mx-auto ml-64">
          <div className="flex items-center mb-8">
            <FaChartLine className="text-indigo-600 text-2xl mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Student Marks</h1>
          </div>

          {contests.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <FaChartLine className="inline-block text-4xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-700">
                No marks data available
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Student marks will appear here when contests are completed.
              </p>
            </div>
          )}

          <div className="space-y-4">
            {contests.map((contest) => (
              <div
                key={contest.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleContest(contest.id)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {contest.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Date: {new Date(contest.date).toLocaleDateString()} •
                      Participants: {contest.students.length}
                    </p>
                  </div>
                  {contest.isOpen ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </button>

                {contest.isOpen && (
                  <div className="border-t border-gray-200 px-6 py-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Rank
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Student Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Marks
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Percentage
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {contest.students.map((student, idx) => (
                            <tr key={student.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    idx === 0
                                      ? "bg-green-100 text-green-800"
                                      : idx <= 2
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {idx + 1}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                                <FaUserGraduate className="text-indigo-500 mr-2" />
                                {student.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {student.marks}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {contest.maxMarks > 0
                                  ? Math.round(
                                      (student.marks / contest.maxMarks) * 100
                                    )
                                  : 0}
                                %
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BegMarks;
