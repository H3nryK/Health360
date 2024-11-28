import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button, Overlay } from '@rneui/themed';
import { theme } from '../theme/theme';

const PrescriptionCostEstimator = ({ visible, onClose }) => {
  const [medication, setMedication] = useState('');
  const [quantity, setQuantity] = useState('');
  const [estimatedCost, setEstimatedCost] = useState(null);

  const calculateEstimate = () => {
    // Simulated cost calculation
    const basePrice = Math.random() * 100 + 20;
    const insuranceDiscount = basePrice * 0.7;
    setEstimatedCost({
      retail: basePrice.toFixed(2),
      withInsurance: insuranceDiscount.toFixed(2),
    });
  };

  return (
    <Overlay isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.container}>
        <Text h4 style={styles.title}>Cost Estimator</Text>
        
        <Input
          placeholder="Medication Name"
          value={medication}
          onChangeText={setMedication}
          leftIcon={{ name: 'medication', color: theme.colors.primary }}
        />

        <Input
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          leftIcon={{ name: 'format-list-numbered', color: theme.colors.primary }}
        />

        <Button
          title="Calculate Estimate"
          onPress={calculateEstimate}
          buttonStyle={styles.calculateButton}
        />

        {estimatedCost && (
          <View style={styles.resultContainer}>
            <Text style={styles.estimateLabel}>Estimated Costs:</Text>
            <Text style={styles.retailPrice}>
              Retail Price: ${estimatedCost.retail}
            </Text>
            <Text style={styles.insurancePrice}>
              With Insurance: ${estimatedCost.withInsurance}
            </Text>
          </View>
        )}
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    minWidth: 300,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  calculateButton: {
    marginVertical: 15,
    borderRadius: theme.borderRadius.md,
  },
  resultContainer: {
    backgroundColor: theme.colors.background,
    padding: 15,
    borderRadius: theme.borderRadius.md,
    marginTop: 10,
  },
  estimateLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  retailPrice: {
    color: theme.colors.subtext,
    marginBottom: 5,
  },
  insurancePrice: {
    color: theme.colors.success,
    fontWeight: '600',
  },
});

export default PrescriptionCostEstimator;