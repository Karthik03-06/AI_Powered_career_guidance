const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Route to fetch AI-generated questions
app.post("/api/generate-questions", async (req, res) => {
  const { topic } = req.body;

  try {
    const response = await axios.post(
      "https://api.google.com/gemini/generate",
      {
        prompt: `Generate 10 multiple-choice questions related to ${topic}. Each question should have four options and one correct answer.`,
        model: "gemini-pro",
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
        },
      }
    );

    const generatedText = response.data.choices[0].text;
    const questions = JSON.parse(generatedText);

    res.json({ questions });
  } catch (error) {
    console.error("Error fetching questions from Gemini API:", error);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
