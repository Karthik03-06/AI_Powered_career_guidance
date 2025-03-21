import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const JobTrends = () => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const fetchJobTrends = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = "AIzaSyDeHIvhgrDFHe9tJqccl49FHNalD4R01Oo"; // ⚠️ Exposed API Key (Remove in production)
      const prompt = `Generate an analysis of current job trends. Provide:
        - Top 20 trending jobs 
        - Skills required for each job
        - Average salary in India and abroad
        - Best colleges to study for these jobs
        - The future scope of these jobs
        Return the response in JSON format like:
        {
          "jobs": [
            {
              "title": "Software Engineer",
              "skills": ["JavaScript", "React", "Node.js"],
              "salary": {"India": "₹10 LPA", "Abroad": "$100K"},
              "colleges": ["IIT Bombay", "Stanford University"],
              "scope": "High demand due to digital transformation"
            }
          ]
        }`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          }),
        }
      );

      const result = await response.json();
      const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const match = responseText.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("Invalid JSON response");

      const data = JSON.parse(match[0]);
      setJobData(data.jobs);
    } catch (err) {
      console.error("Error fetching job trends:", err);
      setError("Failed to fetch job trends.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchJobTrends();
  }, []);

  const totalPages = Math.ceil(jobData.length / jobsPerPage);
  const currentJobs = jobData.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-500 p-6 text-white">
      {loading ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-10 text-center max-w-lg text-gray-900"
        >
          <h2 className="text-4xl font-bold mb-6">📊 Fetching Job Trends...</h2>
          <p className="text-lg">Please wait while we gather the latest data.</p>
        </motion.div>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 text-gray-900 max-w-5xl w-full"
        >
          <h2 className="text-4xl font-bold mb-4 text-center">🚀 Trending Jobs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentJobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-5 bg-gray-100 rounded-lg shadow-md"
              >
                <h3 className="text-2xl font-semibold">{job.title}</h3>
                <p className="mt-2"><b>Skills:</b> {job.skills.join(", ")}</p>
                <p className="mt-2"><b>Avg Salary:</b> India - {job.salary.India}, Abroad - {job.salary.Abroad}</p>
                <p className="mt-2"><b>Top Colleges:</b> {job.colleges.join(", ")}</p>
                <p className="mt-2"><b>Scope:</b> {job.scope}</p>
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l-md"
            >
              ⬅️ Prev
            </button>
            <span className="px-4 font-bold text-lg">{currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md"
            >
              Next ➡️
            </button>
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchJobTrends}
            className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 text-lg"
          >
            🔄 Refresh Data
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default JobTrends;
