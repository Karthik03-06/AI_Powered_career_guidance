from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

# Load Trained Model
model = joblib.load("career_recommendation_model.pkl")
label_encoder = joblib.load("label_encoder.pkl")

@app.route("/api/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    score = data.get("score", 5)  # Default to 5 if no score provided

    # Predict recommended career path
    prediction = model.predict([[score]])
    recommended_role = label_encoder.inverse_transform(prediction)[0]

    return jsonify({"recommended_role": recommended_role})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
