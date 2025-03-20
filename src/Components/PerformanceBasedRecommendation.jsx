// import { useEffect, useState } from "react";

// const PerformanceBasedRecommendation = () => {
//     const [userScores, setUserScores] = useState({});
//     const [recommendations, setRecommendations] = useState([]);

//     useEffect(() => {
//         // Retrieve stored scores
//         const scores = JSON.parse(localStorage.getItem("userScores")) || {};
//         setUserScores(scores);
//         generateRecommendations(scores);
//     }, []);

//     const generateRecommendations = (scores) => {
//         if (Object.keys(scores).length === 0) return;

//         const jobRoles = [
//             { title: "Software Engineer", requiredSkills: ["JavaScript", "React", "Node.js"] },
//             { title: "Data Analyst", requiredSkills: ["Python", "SQL", "Data Visualization"] },
//             { title: "Cybersecurity Specialist", requiredSkills: ["Networking", "Ethical Hacking", "Cryptography"] },
//             { title: "AI Engineer", requiredSkills: ["Python", "Machine Learning", "Deep Learning"] },
//             { title: "Full Stack Developer", requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Node.js"] },
//         ];

//         const recommendedJobs = jobRoles.map(job => {
//             let matchCount = 0;
//             let weakSkills = [];

//             job.requiredSkills.forEach(skill => {
//                 const score = scores[skill] || 0;
//                 if (score >= 75) matchCount++;
//                 else weakSkills.push(skill);
//             });

//             return { ...job, matchCount, weakSkills };
//         });

//         // Sort by highest skill match
//         recommendedJobs.sort((a, b) => b.matchCount - a.matchCount);
//         setRecommendations(recommendedJobs);
//     };

//     return (
//         <div className="p-6 bg-white shadow-lg rounded-lg">
//             <h2 className="text-xl font-bold mb-4">📊 Performance-Based Job Recommendations</h2>

//             {recommendations.length > 0 ? (
//                 <ul className="mt-4 list-disc list-inside text-gray-700">
//                     {recommendations.map((job, index) => (
//                         <li key={index} className="mt-4">
//                             <strong className="text-blue-600">{job.title}</strong> 
//                             {job.matchCount >= job.requiredSkills.length * 0.7 ? (
//                                 <span className="text-green-600 ml-2">✅ Good Fit</span>
//                             ) : job.matchCount >= job.requiredSkills.length * 0.4 ? (
//                                 <span className="text-yellow-600 ml-2">⚠️ Needs Improvement</span>
//                             ) : (
//                                 <span className="text-red-600 ml-2">❌ Weak Match</span>
//                             )}
                            
//                             {job.weakSkills.length > 0 && (
//                                 <p className="text-sm text-gray-500 mt-1">
//                                     📌 You need to improve: {job.weakSkills.join(", ")}
//                                 </p>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p className="text-gray-500">No recommendations available.</p>
//             )}
//         </div>
//     );
// };

// export default PerformanceBasedRecommendation;
