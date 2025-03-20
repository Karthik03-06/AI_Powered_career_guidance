import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

# Sample Data (Score, Job Recommendation)
data = {
    "score": [9, 8, 7, 5, 4, 2, 10, 6, 3, 1],
    "recommended_role": [
        "AI Engineer", "Data Scientist", "Software Developer", "Frontend Developer",
        "Backend Developer", "IT Support", "ML Engineer", "Web Developer",
        "Data Entry", "Basic Computer Skills"
    ]
}

# Convert to DataFrame
df = pd.DataFrame(data)

# Encode target variable
le = LabelEncoder()
df["recommended_role"] = le.fit_transform(df["recommended_role"])

# Split data
X = df[["score"]]
y = df["recommended_role"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save Model
joblib.dump(model, "career_recommendation_model.pkl")
joblib.dump(le, "label_encoder.pkl")

print("✅ Model trained and saved successfully!")
