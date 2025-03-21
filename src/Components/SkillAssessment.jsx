import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { setQuestions } from "../utils/questionSlice";

const SkillAssessment = () => {
  const location = useLocation();
  const { jobTitle = "General" } = location.state || {};
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [correctAnswersMap, setCorrectAnswersMap] = useState({});
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [fetchingRecommendations, setFetchingRecommendations] = useState(false);

  const fetchQuestionsFromGemini = async () => {
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyDeHIvhgrDFHe9tJqccl49FHNalD4R01Oo");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Generate 10 multiple-choice questions on ${jobTitle} skills. Each question should have 4 options, with one correct answer. Return JSON like:
      {
        "questions": [
          {
            "question": "What is JavaScript?",
            "options": ["A language", "A database", "An OS", "A browser"],
            "correctAnswer": "A language"
          }
        ]
      }`;

      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      console.log("API Response:", responseText);

      const match = responseText.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("Invalid JSON response");

      const data = JSON.parse(match[0]);

      if (data?.questions?.length) {
        dispatch(setQuestions(data.questions.slice(0, 10)));
        const answersMap = {};
        data.questions.forEach((q) => (answersMap[q.question] = q.correctAnswer));
        setCorrectAnswersMap(answersMap);
        setStarted(true);
      } else {
        alert("No questions received from API.");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to load questions.");
    }
    setLoading(false);
  };

  const fetchCareerRecommendations = async () => {
    setFetchingRecommendations(true);
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyDeHIvhgrDFHe9tJqccl49FHNalD4R01Oo");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      let performance = "";
      if (percentageScore > 80) performance = "high";
      else if (percentageScore > 50) performance = "medium";
      else performance = "low";

      const prompt = `Based on a ${performance} performance in a ${jobTitle} skill assessment, suggest 5 alternative career paths they might consider. Return JSON like:
      {
        "jobs": [
          "Software Engineer",
          "Data Analyst",
          "Cybersecurity Specialist",
          "Cloud Architect",
          "AI Researcher"
        ]
      }`;

      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      console.log("Career Recommendation API Response:", responseText);

      const match = responseText.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("Invalid JSON response");

      const data = JSON.parse(match[0]);

      if (data?.jobs?.length) {
        setRecommendedJobs(data.jobs);
      } else {
        setRecommendedJobs(["No recommendations available."]);
      }
    } catch (error) {
      console.error("Error fetching career recommendations:", error);
      alert("Failed to fetch career recommendations.");
    }
    setFetchingRecommendations(false);
  };

  const handleAnswer = (selectedOption) => {
    const currentQ = questions[currentQuestion];
    const isCorrect = selectedOption === correctAnswersMap[currentQ?.question];

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectAnswers((prev) => [...prev, currentQ]);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const percentageScore = questions.length ? ((correctCount / questions.length) * 100).toFixed(2) : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      {!started ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center bg-gray-800 p-10 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold mb-4">🧠 Skill Assessment - {jobTitle}</h2>
          <button onClick={fetchQuestionsFromGemini} className="mt-6 bg-blue-600 hover:bg-blue-700 py-3 px-6 rounded-full shadow-lg text-lg">
            {loading ? "Loading..." : "🎯 Start Assessment"}
          </button>
        </motion.div>
      ) : showResults ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-800 p-10 rounded-xl text-center shadow-lg">
          <h2 className="text-3xl font-bold">🎉 Assessment Completed!</h2>
          <p className="text-xl mt-4">Your Score: <span className="text-green-400">{correctCount} / {questions.length}</span></p>
          <p className="text-xl">Percentage: <span className="text-blue-400">{percentageScore}%</span></p>

          <button onClick={fetchCareerRecommendations} className="mt-6 bg-purple-600 hover:bg-purple-700 py-3 px-6 rounded-full shadow-lg text-lg">
            {fetchingRecommendations ? "Fetching..." : "💡 Get AI Career Recommendations"}
          </button>

          {recommendedJobs.length > 0 && (
            <div className="mt-6 text-left bg-gray-700 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-400">🔎 Recommended Careers:</h3>
              <ul className="list-disc ml-6 mt-2">
                {recommendedJobs.map((job, index) => (
                  <li key={index} className="text-white">{job}</li>
                ))}
              </ul>
            </div>
          )}

          <button onClick={() => window.location.reload()} className="mt-6 bg-blue-600 hover:bg-blue-700 py-3 px-6 rounded-full shadow-lg text-lg">
            🔄 Retake Test
          </button>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">Question {currentQuestion + 1}: {questions[currentQuestion]?.question}</h2>
          <div className="grid grid-cols-2 gap-4">
            {questions[currentQuestion]?.options.map((option, index) => (
              <motion.button key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAnswer(option)} className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg shadow-md">
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SkillAssessment;