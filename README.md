# Telecom Customer Churn Prediction

## Problem Statement
Telecom companies face high customer churn due to:
- Rising tariffs
- Poor network or service quality
- Availability of better competitor plans

Customer churn directly impacts revenue and long-term business growth.

---

## Objective
To build a system that:
- Predicts customer churn probability using Machine Learning
- Provides human-readable explanations for churn predictions using Large Language Models (LLMs)

---

## Dataset Description
- Dataset Name: IBM Telco Customer Churn Dataset
- Source: Kaggle
- Format: CSV / Excel
- Target Variable: Churn (Yes / No)

---

## Dataset Features
- Customer Demographics
  - Gender
  - Senior citizen
  - Dependents

- Contract Information
  - Tenure
  - Contract type
  - Payment method

- Subscribed Services
  - Internet service
  - Online security
  - Streaming services
  - Tech support

- Billing Details
  - Monthly charges
  - Total charges

The dataset contains 7,000+ customer records and is suitable for churn prediction tasks.

---

## Project Workflow

### Step 1: Data Preprocessing
- Load the dataset
- Handle missing values
- Encode categorical features
- Scale numerical features
- Save the cleaned dataset

---

### Step 2: Model Training
- A Random Forest model is initialized.
- Random Forest is chosen because it can capture non-linear relationships, handle mixed feature types, and provide robust performance for churn prediction problems.
- Split data into training and testing sets
- Train a churn prediction model
- Generate churn probability scores
- if time permits we use LightGBM 

---

### Step 3: Model Evaluation
- Evaluate model performance using:
  - Accuracy
  - Precision
  - Recall
- Display:
  - Confusion Matrix
  - ROC-AUC score

---

### Step 4: Explainability Using SHAP
- Compute global SHAP values
- Compute local SHAP values for individual customers
- Identify top churn-driving features
- Improve model transparency and trust

---

### Step 5: LLM-Based Explanation
- Pass SHAP feature contributions to an LLM
- Convert technical outputs into business-friendly explanations
- Generate plain-English reasons for churn prediction

---

## Input and Output Details

### Input
- Customer demographic data
- Service subscription details
- Billing and contract information

### Output

#### Churn Prediction
- 0 → Not likely to churn
- 1 → Likely to churn

#### Churn Probability
- Example: 0.82 (82% chance of churn)

#### LLM Explanation
- Plain-language reason for churn prediction

---

## Technology Stack
- Programming Language: Python
- Environment: JupyterLab
- Machine Learning: Scikit-learn
- Explainability: SHAP
- LLM Integration: OpenAI API (or equivalent)
- Data Processing: Pandas, NumPy

---

## Machine Learning Model

### Primary Model: Logistic Regression

Why this model?
- Interpretable and transparent
- Efficient for tabular datasets
- Widely used in churn prediction problems

Optional comparison with Random Forest can be added if time permits.

---

## Explainability (SHAP)
SHAP (SHapley Additive exPlanations) is used to:
- Understand feature contributions
- Explain individual customer predictions
- Increase trust and transparency in ML decisions

Top 3–5 contributing features are extracted per customer.

---

## LLM Integration
A Large Language Model translates technical SHAP outputs into natural-language explanations.

### Example

#### Model Output
- High monthly charges
- Month-to-month contract
- No online security

#### LLM Explanation
"The customer is likely to churn because they are on a month-to-month contract with high monthly charges and lack online security services. Customers with similar profiles often switch providers for better pricing and bundled services."

---

## Evaluation Metrics
The following metrics are used:
- Accuracy
- Precision
- Recall
- Confusion Matrix
- ROC-AUC (optional)

These metrics help evaluate performance on an imbalanced churn dataset.

---

## Conclusion
This project combines Machine Learning, Explainable AI, and LLMs to deliver accurate churn predictions along with clear, business-friendly explanations, enabling data-driven customer retention strategies.


