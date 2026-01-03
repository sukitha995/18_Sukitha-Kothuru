import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // 1. State must match the 19 features in your train_model.py exactly [cite: 15]
  const [formData, setFormData] = useState({
    "Gender": "Female",
    "Senior Citizen": "No",
    "Partner": "No",
    "Dependents": "No",
    "Phone Service": "Yes",
    "Multiple Lines": "No",
    "Internet Service": "Fiber optic",
    "Online Security": "No",
    "Online Backup": "No",
    "Device Protection": "No",
    "Tech Support": "No",
    "Streaming TV": "No",
    "Streaming Movies": "No",
    "Contract": "Month-to-month",
    "Paperless Billing": "Yes",
    "Payment Method": "Electronic check",
    "Tenure Months": 1,
    "Monthly Charges": 70.0,
    "Total Charges": 70.0
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      // 2. Points to your Flask backend port
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      setResult(response.data);
    } catch (err) {
      // 3. Catches the "Missing columns" or connection errors from app.py
      const errorMsg = err.response?.data?.error || "Server not responding. Check if app.py is running.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    // Helper to update state
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div style={{ padding: '30px', maxWidth: '700px', margin: 'auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#003366' }}>Telecom Churn Prediction (ML + LLM)</h1>
      <p style={{ textAlign: 'center' }}>Analyze individual customer churn risk based on account attributes.</p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', background: '#f4f7f6', padding: '20px', borderRadius: '8px' }}>
        
        {/* Core Prediction Inputs */}
        <div style={{ gridColumn: 'span 2' }}><h3>Customer Account Details</h3></div>
        
        <label>Tenure (Months):</label>
        <input type="number" value={formData["Tenure Months"]} 
          onChange={(e) => handleChange("Tenure Months", parseInt(e.target.value))} />

        <label>Monthly Charges ($):</label>
        <input type="number" step="0.01" value={formData["Monthly Charges"]} 
          onChange={(e) => handleChange("Monthly Charges", parseFloat(e.target.value))} />

        <label>Contract Type:</label>
        <select value={formData["Contract"]} onChange={(e) => handleChange("Contract", e.target.value)}>
          <option value="Month-to-month">Month-to-month</option>
          <option value="One year">One year</option>
          <option value="Two year">Two year</option>
        </select>

        <label>Internet Service:</label>
        <select value={formData["Internet Service"]} onChange={(e) => handleChange("Internet Service", e.target.value)}>
          <option value="Fiber optic">Fiber optic</option>
          <option value="DSL">DSL</option>
          <option value="No">No</option>
        </select>

        <label>Payment Method:</label>
        <select value={formData["Payment Method"]} onChange={(e) => handleChange("Payment Method", e.target.value)}>
          <option value="Electronic check">Electronic check</option>
          <option value="Mailed check">Mailed check</option>
          <option value="Bank transfer (automatic)">Bank transfer (automatic)</option>
          <option value="Credit card (automatic)">Credit card (automatic)</option>
        </select>

        <button type="submit" disabled={loading} style={{ gridColumn: 'span 2', padding: '12px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>
          {loading ? "Analyzing Data..." : "Analyze Churn Risk"}
        </button>
      </form>

      {/* Error Output */}
      {error && (
        <div style={{ marginTop: '20px', padding: '15px', color: '#721c24', background: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Prediction Output [cite: 11, 22] */}
      {result && (
        <div style={{ marginTop: '20px', padding: '20px', borderLeft: '5px solid #28a745', background: '#e9f7ef', borderRadius: '4px' }}>
          <h2 style={{ marginTop: 0 }}>Prediction Result</h2>
          <p style={{ fontSize: '1.2rem' }}><strong>Churn Probability:</strong> {(result.churn_score * 100).toFixed(1)}%</p>
          <p><strong>Reason:</strong> {result.explanation}</p>
          <p style={{ fontSize: '0.9rem', color: '#666' }}><em>Metric used: SHAP Explainability Feature Importance.</em></p>
        </div>
      )}
    </div>
  );
}

export default App;