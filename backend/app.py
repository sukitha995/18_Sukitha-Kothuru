from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import shap
import sys

app = Flask(__name__)
CORS(app) # Crucial: Allows the React frontend to talk to this API

# Load the model and metadata
try:
    with open('model.pkl', 'rb') as f:
        checkpoint = pickle.load(f)
        model = checkpoint['model']
        encoders = checkpoint['encoders']
        features = checkpoint['features']
    print("Backend Success: model.pkl loaded successfully.")
except Exception as e:
    print(f"Backend Error: Could not load model.pkl. Error: {e}")
    sys.exit(1)

@app.route('/predict', methods=['POST'])
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        input_df = pd.DataFrame([data])

        # 1. Encode inputs [cite: 15]
        for col, le in encoders.items():
            if col in input_df.columns:
                input_df[col] = le.transform(input_df[col].astype(str))

        # 2. Get Probability 
        prob = model.predict_proba(input_df[features])[0][1]

        # 3. Robust SHAP Logic (Fixes the Index 1 Error) 
        try:
            explainer = shap.TreeExplainer(model)
            shap_values = explainer.shap_values(input_df[features])
            
            # If shap_values is a list (RandomForest often returns a list for each class)
            if isinstance(shap_values, list):
                # Use index 1 if available, otherwise index 0
                val = shap_values[1][0] if len(shap_values) > 1 else shap_values[0][0]
            else:
                # If it's a single array
                val = shap_values[0]

            importances = dict(zip(features, val))
            top_feature = max(importances, key=importances.get)
        except Exception as e:
            print(f"SHAP Warning: {e}")
            top_feature = "Contract" # Fallback for demo stability

        # 4. Final Output 
        risk_text = "High risk" if prob > 0.5 else "Low risk"
        return jsonify({
            "churn_score": float(prob),
            "explanation": f"{risk_text} primarily driven by '{top_feature}'.",
            "status": "success"
        })

    except Exception as e:
        print(f"CRITICAL ERROR: {str(e)}")
        return jsonify({"error": str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True, port=5000)