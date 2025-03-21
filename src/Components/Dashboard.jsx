import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center p-12 bg-gradient-to-r from-blue-900 via-purple-800 to-pink-700 text-white">
      
      {/* Dashboard Heading */}
      <h1 className="text-5xl font-extrabold mb-8">🚀 Career Dashboard</h1>
      <p className="text-lg mb-10 text-gray-300">Welcome, {state.name}! Explore career insights tailored to your interests.</p>

      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        
        {/* Job Trends */}
        <div className="bg-white bg-opacity-30 p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
          <h2 className="text-2xl font-bold text-black mb-3">📚 Job Trends</h2>
          <p className="text-gray-800 mb-4">View the top in-demand jobs in {state.interest}.</p>
          <button onClick={() => navigate("/job-trends")} className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 px-6 rounded-lg">Explore</button>
        </div>

        {/* Skills Required */}
        <div className="bg-white bg-opacity-30 p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
          <h2 className="text-2xl font-bold text-black mb-3">📊 Carrer Path </h2>
          <p className="text-gray-800 mb-4">Discover key skills needed for {state.interest} jobs.</p>
          <button onClick={() => navigate("/SkillsNeed")} className="bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 px-6 rounded-lg">View</button>
        </div>

        {/* Skill Assessment
        <div className="bg-white bg-opacity-30 p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
          <h2 className="text-2xl font-bold text-black mb-3">📝 Skill Assessment</h2>
          <p className="text-gray-800 mb-4">Test your knowledge in {state.interest}.</p>
          <button onClick={() => navigate("/assessment")} className="bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-3 px-6 rounded-lg">Start Test</button>
        </div> */}

      </div>
    </div>
  );
};

export default Dashboard;
