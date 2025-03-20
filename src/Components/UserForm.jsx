import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";  // Import useDispatch
import { addTrends } from "../utils/userDataSlice"; // Import the Redux action
import { GoogleGenerativeAI } from "@google/generative-ai";

const schema = {
  "description": "Top 10 Job Trends with Required Skills",
  "type": "object",
  "properties": {
    "userProfile": {
      "type": "object",
      "properties": {
        "education": { "type": "string" },
        "interest": { "type": "string" },
        "experience": { "type": "string" },
        "goals": { "type": "string" }
      }
    },
    "jobTrends": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "jobTitle": { "type": "string" },
          "industry": { "type": "string" },
          "demandLevel": { "type": "string", "enum": ["High", "Medium", "Low"] },
          "requiredSkills": {
            "type": "array",
            "items": { "type": "string" }
          },
          "recommendedCertifications": {
            "type": "array",
            "items": { "type": "string" }
          }
        }
      }
    }
  }
};

const UserForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize Redux dispatcher

  const [userData, setUserData] = useState({
    name: "",
    age: "",
    email: "",
    education: "",
    interest: "",
    experience: "",
    goal: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const genAI = new GoogleGenerativeAI("AIzaSyDeHIvhgrDFHe9tJqccl49FHNalD4R01Oo");
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: schema
        }
      });

      const prompt = `Act as a career guidance expert. Provide the top 10 job trends and required skills based on:
      - Highest Education: ${userData.education}
      - Interest: ${userData.interest}
      - Experience: ${userData.experience}
      - Goals: ${userData.goal}`;

      const result = await model.generateContent(prompt);
      const responseData = JSON.parse(result.response.text()); // Parse AI response to JSON

      if (responseData && responseData.jobTrends) {
        dispatch(addTrends(responseData.jobTrends)); // Store AI data in Redux
      }

      navigate("/dashboard", { state: userData }); // Navigate after storing data
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 via-purple-700 to-pink-600 text-white">
      <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-lg text-center animate-fade-in">
      <h1 className="text-3xl font-bold mb-4 text-black">🚀 Enhance Your Future: AI-Powered Career Guidance
</h1>

        <p className="text-lg mb-6 text-red-200">
          Let’s get to know you! Answer the questions below to receive personalized career insights.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input type="text" name="name" placeholder="Enter your Full Name" onChange={handleChange} required className="p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-purple-400 transition" />
          <input type="number" name="age" placeholder="Enter your Age" onChange={handleChange} required className="p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-purple-400 transition" />
          <input type="email" name="email" placeholder="Enter your Email" onChange={handleChange} required className="p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-purple-400 transition" />
          
          <select name="education" onChange={handleChange} required className="p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-purple-400 transition">
            <option value="">Select Your Highest Education Level</option>
            <option value="High School">High School</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="Diploma">Diploma</option>
          </select>

          <input type="text" name="interest" placeholder="Enter Your Career Interest (e.g., AI, Web Development)" onChange={handleChange} required className="p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-purple-400 transition" />
          <input type="text" name="experience" placeholder="Years of Experience (Enter 0 if Fresher)" onChange={handleChange} required className="p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-purple-400 transition" />
          <textarea name="goal" placeholder="Describe Your Career Goal in a Few Sentences" onChange={handleChange} required className="p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-purple-400 transition resize-none"></textarea>

          <button type="submit" className="bg-purple-600 hover:bg-purple-700 transition-all text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-purple-400">
            Submit & Explore Career Insights 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
