import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export function PrescriptionCard({ prescription, onOrder }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.medicationName, { color: theme.colors.text }]}>
          {prescription.medication}
        </Text>
        <Text style={styles.status}>
          {prescription.status}
        </Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.dosage}>Dosage: {prescription.dosage}</Text>
        <Text style={styles.duration}>Duration: {prescription.duration}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.orderButton, { backgroundColor: theme.colors.primary }]}
        onPress={onOrder}
      >
        <Text style={styles.orderButtonText}>Order Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  medicationName: {
    fontSize: 18,
    fontWeight: '600'
  },
  status: {
    fontSize: 14,
    color: '#666'
  },
  details: {
    marginBottom: 16
  },
  dosage: {
    fontSize: 16,
    marginBottom: 4
  },
  duration: {
    fontSize: 16
  },
  orderButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  orderButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500'
  }
});
