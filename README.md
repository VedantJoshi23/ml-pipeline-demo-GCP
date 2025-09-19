# ML Pipeline Demo with GCP Integration

A complete machine learning pipeline that integrates Google Cloud Platform services with FastAPI backend and React Native mobile application for real-time predictions.

## 🚀 Project Overview

This project demonstrates a production-ready ML pipeline featuring:

- **Data Processing**: Automated data sanitization and preprocessing
- **Machine Learning**: Linear regression model with scikit-learn
- **Cloud Integration**: Google Cloud Storage for data and model storage
- **API Service**: FastAPI-based REST API for model predictions
- **Mobile App**: React Native app for user-friendly predictions
- **Interactive Notebook**: Jupyter notebook for development and experimentation

## 📁 Project Structure

```
ml_pipeline/
├── ml_model.ipynb              # Jupyter notebook for ML development
├── script.py                   # Main ML pipeline and FastAPI server
├── run_server.py              # Server startup script
├── ml-pipeline-*.json         # GCP service account credentials
├── .env                       # Environment variables
├── mobile-app/               # React Native mobile application
│   ├── App.js                # Main app navigation
│   ├── package.json          # Mobile app dependencies
│   └── screens/
│       ├── InputScreen.js    # Feature input interface
│       └── ResultsScreen.js  # Prediction results display
└── README.md                 # This file
```

## 🛠 Technologies Used

### Backend & ML
- **Python 3.8+**
- **FastAPI** - Modern web framework for building APIs
- **scikit-learn** - Machine learning library
- **pandas & numpy** - Data manipulation and analysis
- **uvicorn** - ASGI server for FastAPI
- **Google Cloud Storage** - Cloud storage for data and models

### Mobile App
- **React Native** - Cross-platform mobile development
- **Expo** - Development platform for React Native
- **React Navigation** - Navigation library
- **React Native Paper** - Material Design components
- **Axios** - HTTP client for API requests

### Development
- **Jupyter Notebook** - Interactive development environment
- **Git** - Version control

## 📱 Mobile App Screenshots

### Input Screen
The mobile app provides an intuitive interface for entering model features:

<img src="Simulator Screenshot - iPhone 14 Pro Max - 2025-09-19 at 17.03.45.png" alt="Model Input Screen" width="250">

*Feature input screen with validation and Material Design components*

### Results Screen
After submitting features, users receive clear prediction results:

<img src="Simulator Screenshot - iPhone 14 Pro Max - 2025-09-19 at 17.03.55.png" alt="Model Output Screen" width="250">

*Prediction results display with input summary and formatted output*

## 🔧 Installation & Setup

### Prerequisites

1. **Python 3.8+** installed
2. **Node.js & npm** installed
3. **Google Cloud Platform** account with a project
4. **Expo CLI** installed globally: `npm install -g @expo/cli`

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ml_pipeline
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install google-cloud-storage scikit-learn pandas numpy fastapi uvicorn python-dotenv
   ```

4. **Setup Google Cloud Platform**
   - Create a GCP project
   - Enable Cloud Storage API
   - Create a service account and download the JSON key file
   - Place the JSON file in the project root
   - Create a `.env` file with:
     ```
     GCP_CREDENTIALS_PATH=./ml-pipeline-472504-04e7f4bc065c.json
     ```

5. **Create GCP Storage Bucket**
   ```bash
   gsutil mb gs://demo-bucket-ml-pipeline
   ```

### Mobile App Setup

1. **Navigate to mobile app directory**
   ```bash
   cd mobile-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Expo CLI (if not already installed)**
   ```bash
   npm install -g @expo/cli
   ```

## 🚀 Running the Application

### Start the Backend API

1. **From the project root directory:**
   ```bash
   python run_server.py
   ```
   
   The API will be available at `http://localhost:8000`

2. **API Documentation**
   - Swagger UI: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

### Start the Mobile App

1. **From the mobile-app directory:**
   ```bash
   npm start
   ```

2. **Choose your platform:**
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for web
   - Scan QR code with Expo Go app

### Using Jupyter Notebook

1. **Install Jupyter (if not installed)**
   ```bash
   pip install jupyter
   ```

2. **Start Jupyter**
   ```bash
   jupyter notebook ml_model.ipynb
   ```

## 📊 API Endpoints

### POST `/predict`
Make predictions using the trained model.

**Request Body:**
```json
{
  "features": {
    "feature1": 0.5,
    "feature2": 0.3,
    "feature3": 0.8
  }
}
```

**Response:**
```json
{
  "prediction": 0.6234
}
```

### GET `/model-info`
Get information about the trained model.

**Response:**
```json
{
  "model_type": "Linear Regression",
  "features": ["feature1", "feature2", "feature3"],
  "model_parameters": {
    "coefficients": [0.123, 0.456, 0.789],
    "intercept": 0.234
  }
}
```

## 🧪 Machine Learning Pipeline

### Data Processing
- **Data Sanitization**: Removes missing values and duplicates
- **Feature Scaling**: StandardScaler for feature normalization
- **Data Validation**: Type checking and format validation

### Model Training
- **Algorithm**: Linear Regression (scikit-learn)
- **Train/Test Split**: 80/20 split with random state 42
- **Metrics**: Mean Squared Error (MSE) and R² Score
- **Model Persistence**: Pickle serialization for model storage

### Cloud Integration
- **Data Storage**: Google Cloud Storage for dataset storage
- **Model Storage**: Cloud-based model versioning and storage
- **Credentials**: Service account-based authentication

## 📱 Mobile App Features

### Input Screen
- User-friendly form for entering model features
- Input validation for numeric values
- Error handling and user feedback
- Material Design interface

### Results Screen
- Clear display of prediction results
- Summary of input features used
- Navigation back to input screen
- Formatted numeric displays

## 🔒 Security & Configuration

### Environment Variables
Create a `.env` file with:
```
GCP_CREDENTIALS_PATH=./your-credentials-file.json
```

### GCP Security
- Service account with minimal required permissions
- Bucket-level access controls
- Secure credential file handling

## 🚀 Deployment

### Backend Deployment (Google Cloud Run)
1. **Build Docker image**
2. **Push to Google Container Registry**
3. **Deploy to Cloud Run**
4. **Configure environment variables**

### Mobile App Deployment
1. **Build for production**: `expo build:android` or `expo build:ios`
2. **Submit to app stores** or **create standalone APK**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Workflow

### Adding New Features
1. **Update the model** in `ml_model.ipynb`
2. **Modify the API** in `script.py`
3. **Update mobile screens** as needed
4. **Test end-to-end functionality**

### Model Updates
1. **Retrain model** with new data
2. **Update model endpoints**
3. **Version control** model artifacts
4. **Deploy updated API**

## 🐛 Troubleshooting

### Common Issues

**API Connection Errors**
- Ensure the backend server is running on port 8000
- Check firewall settings for localhost connections
- Verify network connectivity between mobile app and API

**GCP Authentication Errors**
- Verify credentials file path in `.env`
- Check service account permissions
- Ensure Cloud Storage API is enabled

**Mobile App Build Errors**
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Expo CLI version compatibility

**Model Performance Issues**
- Increase training data size
- Try different algorithms (Random Forest, XGBoost)
- Implement feature engineering
- Add cross-validation

## 📈 Performance Metrics

The current model achieves:
- **Training Time**: < 1 second on sample data
- **Prediction Latency**: < 100ms per request
- **Model Accuracy**: R² score varies based on data quality
- **API Response Time**: < 200ms average

## 🔮 Future Enhancements

- [ ] Add more sophisticated ML algorithms
- [ ] Implement model versioning and A/B testing
- [ ] Add real-time data streaming
- [ ] Implement user authentication
- [ ] Add model monitoring and drift detection
- [ ] Create web dashboard for model management
- [ ] Add batch prediction capabilities
- [ ] Implement automated model retraining



## 👥 Authors

- **Vedant** - Initial work - [VedantJoshi23](https://github.com/VedantJoshi23)

## 🙏 Acknowledgments

- Google Cloud Platform for cloud infrastructure
- FastAPI team for the excellent web framework
- React Native community for mobile development tools
- scikit-learn contributors for machine learning capabilities

---

For questions or support, please open an issue in the GitHub repository.