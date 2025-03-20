import { useNavigate } from "react-router-dom";

const ShowJobs = ({ data }) => {
    const navigate = useNavigate();

    if (!data) {
        return <p className="text-gray-400 text-center">No job data available.</p>;
    }

    const { jobTitle, industry, requiredSkills = [], demandLevel } = data;

    const handleTakeAssessment = () => {
        navigate("/skill-assessment", { state: { jobTitle, requiredSkills } });
    };

    const handleAIRecommendation = () => {
        navigate("/ai-recommendation", { state: { jobTitle, requiredSkills } });
    };

    return (
        <div className="p-6 border border-white/20 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-purple-300 mb-2">{jobTitle} 🚀</h2>
            <p className="text-black font-bold">Industry: {industry}</p>
            <p className="text-black font-bold">
                <strong>Demand:</strong> 
                <span className={`px-2 py-1 ml-2 rounded-md font-bold ${
                    demandLevel === "High" ? "bg-green-500 text-white" :
                    demandLevel === "Medium" ? "bg-yellow-500 text-black" :
                    "bg-red-500 text-white"
                }`}>
                    {demandLevel}
                </span>
            </p>

            <div className="mt-4">
                <h3 className="text-lg font-bold text-red-600 mb-2">Required Skills:</h3>
                <ul className="list-disc list-inside text-red-400 space-y-1">
                    {requiredSkills.length > 0 ? (
                        requiredSkills.map((skill, i) => (
                            <li key={i} className="ml-3">{skill}</li>
                        ))
                    ) : (
                        <li>No skills listed</li>
                    )}
                </ul>
            </div>

            {/* Buttons Section */}
            <div className="mt-4 flex gap-4">
                {/* Take Assessment Button */}
                <button
                    onClick={handleTakeAssessment}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition duration-300"
                >
                    Take Assessment
                    
                </button>

                {/* AI Recommendation Button */}
                <button
                    onClick={handleAIRecommendation}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded transition duration-300"
                >
                    AI Recommendation
                </button>
            </div>
        </div>
    );
};

export default ShowJobs;
