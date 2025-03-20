import { useSelector } from "react-redux";
import ShowJobs from "./ShowJobs";

const SkillsNeed = () => {
    const selector = useSelector(store => store.userData);

    console.log(selector);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-pink-700 p-6 flex flex-col items-center">
            <h1 className="text-4xl font-extrabold text-white mb-6">🔥 In-Demand Job Trends & Skills</h1>

            <div className="w-full max-w-4xl bg-white bg-opacity-10 backdrop-blur-md shadow-lg rounded-2xl p-6 text-white space-y-4">
                {selector?.questions?.[0]?.length > 0 ? (
                    selector.questions[0].map((q, i) => 
                        q ? <ShowJobs key={i} data={q} /> : null
                    )
                ) : (
                    <p className="text-center text-gray-200">No job trends available yet. Please provide your details first!</p>
                )}
            </div>
        </div>
    );
};

export default SkillsNeed;
