import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Surface, Text } from 'react-native-paper';
import axios from 'axios';

const InputScreen = ({ navigation }) => {
  const [features, setFeatures] = useState({
    feature1: '',
    feature2: '',
    feature3: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Convert string values to numbers
      const numericFeatures = {
        feature1: parseFloat(features.feature1),
        feature2: parseFloat(features.feature2),
        feature3: parseFloat(features.feature3)
      };

      // Validate input
      if (Object.values(numericFeatures).some(isNaN)) {
        throw new Error('Please enter valid numbers for all features');
      }

      // When using SSH tunnel or adb reverse, localhost will work
      const response = await axios.post('http://0.0.0.0:8000/predict', {
        features: numericFeatures
      });

      navigation.navigate('Results', {
        prediction: response.data.prediction,
        features: numericFeatures
      });
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Surface style={styles.surface}>
        <Text style={styles.title}>Enter Model Features</Text>
        
        <TextInput
          label="Feature 1"
          value={features.feature1}
          onChangeText={(text) => setFeatures(prev => ({ ...prev, feature1: text }))}
          keyboardType="numeric"
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Feature 2"
          value={features.feature2}
          onChangeText={(text) => setFeatures(prev => ({ ...prev, feature2: text }))}
          keyboardType="numeric"
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Feature 3"
          value={features.feature3}
          onChangeText={(text) => setFeatures(prev => ({ ...prev, feature3: text }))}
          keyboardType="numeric"
          style={styles.input}
          mode="outlined"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Get Prediction
        </Button>
      </Surface>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  surface: {
    padding: 16,
    borderRadius: 10,
    elevation: 4
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    marginBottom: 16
  },
  button: {
    marginTop: 16
  },
  error: {
    color: 'red',
    marginTop: 8
  }
});

export default InputScreen;