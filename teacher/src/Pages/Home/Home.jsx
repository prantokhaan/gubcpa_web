import React, { useState, useEffect } from "react";
import {
  FaUserGraduate,
  FaArrowUp,
  FaArrowRight,
  FaArrowDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const batchTypes = [
    {
      name: "Advanced Batch",
      level: "advanced",
      description:
        "For experienced programmers with strong problem-solving skills",
      icon: <FaArrowUp className="text-4xl text-green-500" />,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-800",
      link: "a-students-list",
    },
    {
      name: "Intermediate Batch",
      level: "intermediate",
      description: "For programmers with basic knowledge looking to improve",
      icon: <FaArrowRight className="text-4xl text-blue-500" />,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      link: "i-students-list",
    },
    {
      name: "Beginner Batch",
      level: "beginner",
      description: "For newcomers starting their programming journey",
      icon: <FaArrowDown className="text-4xl text-yellow-500" />,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-800",
      link: "b-students-list",
    },
  ];

  const [counts, setCounts] = useState({
    advanced: 0,
    intermediate: 0,
    beginner: 0,
  });

  useEffect(() => {
    batchTypes.forEach(async (batch) => {
      try {
        const res = await axios.get(
          `http://localhost:5000/teacher/studentCount/${batch.level}`
        );
        setCounts((prev) => ({
          ...prev,
          [batch.level]: res.data.count ?? 0,
        }));
      } catch (error) {
        console.error(`Failed to fetch count for ${batch.level}:`, error);
        // Optionally set to 0 or leave previous
      }
    });
  }, []);

  return (
    <div className="p-8">
      <div className="flex items-center mb-8">
        <FaUserGraduate className="text-3xl text-indigo-500 mr-3" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Programming Batches
          </h1>
          <p className="text-gray-600">
            Select a batch to manage students and activities
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {batchTypes.map((batch) => (
          <div
            key={batch.level}
            className={`${batch.bgColor} rounded-xl shadow-sm p-6 border ${batch.borderColor} hover:shadow-md transition-shadow cursor-pointer`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">{batch.icon}</div>
              <h2 className={`text-xl font-bold ${batch.textColor} mb-2`}>
                {batch.name}
              </h2>
              <p className="text-gray-600 mb-4">{batch.description}</p>
              <Link
                to={`/${batch.link}`}
                className={`px-4 py-2 rounded-md ${batch.bgColor.replace(
                  "50",
                  "100"
                )} border ${batch.borderColor} ${
                  batch.textColor
                } font-medium hover:${batch.bgColor.replace(
                  "50",
                  "100"
                )} transition-colors`}
              >
                Manage {batch.name}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-12 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Batch Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-sm font-medium text-green-800">
              Advanced Students
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {counts.advanced}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-sm font-medium text-blue-800">
              Intermediate Students
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {counts.intermediate}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="text-sm font-medium text-yellow-800">
              Beginner Students
            </h3>
            <p className="text-2xl font-bold text-yellow-600">
              {counts.beginner}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
