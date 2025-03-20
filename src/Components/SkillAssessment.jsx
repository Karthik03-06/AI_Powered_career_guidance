import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const SkillAssessment = () => {
  const location = useLocation();
  const { jobTitle = "General", requiredSkills = [] } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  // Fetch questions based on selected skills
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/generate-questions", {
        skills: requiredSkills.length > 0 ? requiredSkills : ["AI & Machine Learning"],
        jobTitle: jobTitle,
      });

      if (response.data && response.data.questions.length > 0) {
        setQuestions(response.data.questions.slice(0, 10)); // Ensure exactly 10 questions
        setStarted(true);
      } else {
        alert("No questions received from API. Please check the server.");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to load questions. Please try again.");
    }
    setLoading(false);
  };

  // Fetch recommendations based on score
  useEffect(() => {
    if (showResults) {
      axios
        .post("http://localhost:5000/api/get-recommendations", {
          jobTitle: jobTitle,
          score: score,
        })
        .then((response) => {
          setRecommendations(response.data.recommendations);
        })
        .catch((error) => {
          console.error("Error fetching recommendations:", error);
        });
    }
  }, [showResults, jobTitle, score]);

  // Handle Answer Selection
  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-6">
      {!started ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg p-8 text-center max-w-lg"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">🧠 Skill Assessment - {jobTitle}</h2>
          <p className="text-gray-600">
            This test will assess your knowledge in <b>{jobTitle}</b>. You will get <b>10 multiple-choice questions</b>.
          </p>

          <button
            onClick={fetchQuestions}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300"
          >
            {loading ? "Loading..." : "🎯 Begin Assessment"}
          </button>
        </motion.div>
      ) : showResults ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg p-8 text-center max-w-lg"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Assessment Completed!</h2>
          <p className="text-gray-700 text-lg">
            Your Score: <b className="text-blue-600">{score} / {questions.length}</b>
          </p>
          <p className="text-gray-600 mt-2">
            {score > 7
              ? "🔥 Great job! You have strong skills in this area."
              : score > 4
              ? "😊 Good effort! Keep learning and improving."
              : "📚 Keep practicing! You can do better next time."}
          </p>

          {/* Display recommendations from ML model */}
          {recommendations && (
            <div className="mt-6 bg-gray-100 p-4 rounded-md text-left">
              <h3 className="font-semibold text-gray-700 mb-2">🎯 Career Recommendations:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                {recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            🔄 Retake Test
          </button>
        </motion.div>
      ) : (
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">
              📝 Question {currentQuestion + 1} / {questions.length}
            </h2>
            <div className="text-sm text-gray-600">{jobTitle}</div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          <p className="text-gray-700 mt-6 text-lg">{questions[currentQuestion]?.question}</p>
          <div className="mt-4">
            {questions[currentQuestion]?.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(option.isCorrect)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block w-full bg-gray-200 hover:bg-blue-500 hover:text-white text-black font-medium py-2 px-4 rounded-lg mt-2 transition duration-300"
              >
                {option.text}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SkillAssessment;
