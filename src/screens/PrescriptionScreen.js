import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const prescriptions = [
  {
    id: '1',
    medication: 'Amoxicillin 500mg',
    doctor: 'Dr. Sarah Smith',
    date: '2024-01-15',
    status: 'Active',
    refills: 2,
    instructions: 'Take 1 capsule 3 times daily'
  },
  // Add more prescriptions
];

export default function PrescriptionsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={prescriptions}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.prescriptionCard}>
            <View style={styles.header}>
              <Text style={styles.medicationName}>{item.medication}</Text>
              <View style={[styles.statusBadge, 
                { backgroundColor: item.status === 'Active' ? '#4CAF50' : '#FF9800' }]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
            <Text style={styles.doctor}>{item.doctor}</Text>
            <Text style={styles.instructions}>{item.instructions}</Text>
            <View style={styles.footer}>
              <Text style={styles.refills}>Refills remaining: {item.refills}</Text>
              <TouchableOpacity style={styles.refillButton}>
                <Text style={styles.refillButtonText}>Request Refill</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
// Previous imports and data remain the same

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  prescriptionCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  doctor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  instructions: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  refills: {
    fontSize: 14,
    color: '#666',
  },
  refillButton: {
    backgroundColor: '#FFC947',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  refillButtonText: {
    color: '#fff',
    fontWeight: '500',
  }
});
