import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import pickle

# 1. Load Data [cite: 13, 15]
# Ensure the filename matches your Excel file exactly
df = pd.read_excel('Telco_customer_churn.xlsx')

# 2. Data Cleaning & Encoding [cite: 15]
# We select a subset of meaningful features to avoid 'Overfitting'
cat_cols = [
    'Gender', 'Senior Citizen', 'Partner', 'Dependents', 
    'Phone Service', 'Multiple Lines', 'Internet Service', 
    'Online Security', 'Online Backup', 'Device Protection', 
    'Tech Support', 'Streaming TV', 'Streaming Movies', 
    'Contract', 'Paperless Billing', 'Payment Method'
]

# Numerical columns updated to match your field list
num_cols = ['Tenure Months', 'Monthly Charges', 'Total Charges']

# Target column updated to match your 'Churn Value' (which is already 1/0)
target_col = 'Churn Value'

# Handle 'Total Charges' potentially being read as text if there are spaces
df['Total Charges'] = pd.to_numeric(df['Total Charges'], errors='coerce').fillna(0)

# Encode Categorical features [cite: 15]
encoders = {}
for col in cat_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col].astype(str))
    encoders[col] = le

# 3. Training [cite: 16, 20]
# Combine features and handle any missing values
features = cat_cols + num_cols
X = df[features].fillna(0)
y = df[target_col]

# Split data: 80% training, 20% testing [cite: 16]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Use Random Forest as per hackathon plan [cite: 16, 20]
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 4. Save model and metadata [cite: 16]
# We save encoders and feature names so the Flask API knows how to process new data
with open('model.pkl', 'wb') as f:
    pickle.dump({
        'model': model, 
        'encoders': encoders, 
        'features': features
    }, f)

print("Success: model.pkl created with correct IBM Telco fields!")