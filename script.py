import os
import json
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from google.cloud import storage
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
import pickle

# Load environment variables
load_dotenv()

# Set up GCP credentials
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.getenv('GCP_CREDENTIALS_PATH')

class DataProcessor:
    def __init__(self):
        self.scaler = StandardScaler()
        
    def sanitize_input(self, data):
        """Remove invalid or missing values from the input data."""
        # Convert to DataFrame if not already
        if not isinstance(data, pd.DataFrame):
            data = pd.DataFrame(data)
            
        # Remove rows with missing values
        data = data.dropna()
        
        # Remove duplicates
        data = data.drop_duplicates()
        
        # Convert numeric columns to float
        numeric_columns = data.select_dtypes(include=['int64', 'float64']).columns
        data[numeric_columns] = data[numeric_columns].astype(float)
        
        return data
    
    def preprocess_data(self, data):
        """Scale and preprocess the input data."""
        # Separate features and target
        X = data.drop('target', axis=1)
        y = data['target']
        
        # Scale features
        X_scaled = self.scaler.fit_transform(X)
        
        return pd.DataFrame(X_scaled, columns=X.columns), y

class GCPHandler:
    def __init__(self, bucket_name):
        self.storage_client = storage.Client()
        self.bucket_name = bucket_name
        self.bucket = self.storage_client.bucket(bucket_name)
    
    def read_data_from_gcs(self, blob_name):
        """Read data from GCP Cloud Storage."""
        blob = self.bucket.blob(blob_name)
        data = blob.download_as_string()
        return pd.read_json(data)
    
    def upload_model_to_gcs(self, model, blob_name):
        """Upload trained model to GCP Cloud Storage."""
        blob = self.bucket.blob(blob_name)
        with blob.open('wb') as f:
            pickle.dump(model, f)

class ModelTrainer:
    def __init__(self):
        self.model = LinearRegression()
        
    def train_model(self, X, y):
        """Train the regression model."""
        # Split data into train and test sets
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Train the model
        self.model.fit(X_train, y_train)
        
        # Make predictions on test set
        y_pred = self.model.predict(X_test)
        
        # Calculate metrics
        mse = mean_squared_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        
        print(f"Model Performance:")
        print(f"Mean Squared Error: {mse:.4f}")
        print(f"R² Score: {r2:.4f}")
        
        return self.model
    
    def predict(self, X):
        """Make predictions using the trained model."""
        return self.model.predict(X)

# Initialize components
data_processor = DataProcessor()
gcp_handler = GCPHandler('demo-bucket-ml-pipeline')
model_trainer = ModelTrainer()

# Create sample data and train the model
sample_data = pd.DataFrame({
    'feature1': np.random.random(100),
    'feature2': np.random.random(100),
    'feature3': np.random.random(100),
    'target': np.random.random(100)
})

# Process data and train model
clean_data = data_processor.sanitize_input(sample_data)
X_processed, y = data_processor.preprocess_data(clean_data)
model = model_trainer.train_model(X_processed, y)

# Define input data model
class InputData(BaseModel):
    features: dict

# Create FastAPI app
app = FastAPI(title="ML Model API")

@app.post("/predict")
async def predict(data: InputData):
    try:
        # Convert input data to DataFrame
        input_df = pd.DataFrame([data.features])
        
        # Preprocess the input
        input_clean = data_processor.sanitize_input(input_df)
        
        # Scale the input using the fitted scaler
        X_input = pd.DataFrame(
            data_processor.scaler.transform(input_clean), 
            columns=input_clean.columns
        )
        
        # Make prediction
        prediction = model_trainer.predict(X_input)
        
        return {"prediction": float(prediction[0])}
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/model-info")
async def model_info():
    """Endpoint for dashboard to get model information."""
    return {
        "model_type": "Linear Regression",
        "features": list(data_processor.scaler.feature_names_in_),
        "model_parameters": {
            "coefficients": model_trainer.model.coef_.tolist(),
            "intercept": float(model_trainer.model.intercept_)
        }
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
