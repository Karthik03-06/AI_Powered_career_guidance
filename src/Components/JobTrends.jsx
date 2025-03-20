import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FaBriefcase, FaSpinner, FaArrowLeft } from "react-icons/fa";

const JobTrends = () => {
  const location = useLocation();
  const interest = location.state?.interest || "AI";

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJobTrends() {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${interest}`);
        setJobs(response.data.jobs || []);
      } catch (error) {
        console.error("Error fetching job trends:", error);
        setError("Failed to load job trends. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchJobTrends();
  }, [interest]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex flex-col items-center p-6">
      <h2 className="text-4xl font-extrabold text-white mb-6 text-center">
        Carrer Path for <span className="text-yellow-300">{interest}</span>
      </h2>

      <div className="bg-white shadow-xl rounded-lg p-6 max-w-4xl w-full">
        {loading ? (
          <div className="flex justify-center items-center">
            <FaSpinner className="animate-spin text-blue-500 text-4xl" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-700 text-center">No job trends found for {interest}.</p>
        ) : (
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaBriefcase className="text-blue-500 mr-2" /> Trending Jobs
            </h3>
            <ul className="space-y-4">
              {jobs.map((job, index) => (
                <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold text-gray-900">{job.title}</h4>
                  <p className="text-gray-700">{job.description}</p>
                  <p className="mt-2 text-blue-500 font-semibold">Skills Required:</p>
                  <ul className="list-disc list-inside text-gray-700">
                    {job.skills.map((skill, i) => (
                      <li key={i} className="ml-4">{skill}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={() => window.history.back()}
        className="mt-6 flex items-center bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-lg transition duration-300"
      >
        <FaArrowLeft className="mr-2" /> Go Back
      </button>
    </div>
  );
};

export default JobTrends;
