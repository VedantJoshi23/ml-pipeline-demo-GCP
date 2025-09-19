import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Surface, Text, Button } from 'react-native-paper';

const ResultsScreen = ({ route, navigation }) => {
  const { prediction, features } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Surface style={styles.surface}>
        <Text style={styles.title}>Prediction Results</Text>

        <View style={styles.resultContainer}>
          <Text style={styles.label}>Prediction:</Text>
          <Text style={styles.prediction}>{prediction.toFixed(4)}</Text>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.subtitle}>Input Features:</Text>
          {Object.entries(features).map(([key, value]) => (
            <View key={key} style={styles.featureRow}>
              <Text style={styles.featureLabel}>{key}:</Text>
              <Text style={styles.featureValue}>{value.toFixed(4)}</Text>
            </View>
          ))}
        </View>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('Input')}
          style={styles.button}
        >
          Make Another Prediction
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
  resultContainer: {
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#e3f2fd',
    borderRadius: 8
  },
  label: {
    fontSize: 18,
    marginBottom: 8
  },
  prediction: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1976d2'
  },
  featuresContainer: {
    marginBottom: 24
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: 'bold'
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  featureLabel: {
    fontSize: 16,
    color: '#666'
  },
  featureValue: {
    fontSize: 16,
    fontWeight: '500'
  },
  button: {
    marginTop: 16
  }
});

export default ResultsScreen;