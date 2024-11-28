
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Prescription {
  id: string;
  patientName: string;
  medication: string;
  status: 'pending' | 'processing' | 'ready' | 'completed';
  priority: 'normal' | 'urgent';
  submittedAt: Date;
  insurance: string;
}

const PrescriptionQueueScreen = ({ navigation }) => {
  const [prescriptions] = useState<Prescription[]>([
    {
      id: 'RX001',
      patientName: 'John Smith',
      medication: 'Amoxicillin 500mg',
      status: 'pending',
      priority: 'urgent',
      submittedAt: new Date(),
      insurance: 'BlueCross'
    },
    {
      id: 'RX002',
      patientName: 'Sarah Johnson',
      medication: 'Lisinopril 10mg',
      status: 'processing',
      priority: 'normal',
      submittedAt: new Date(),
      insurance: 'Aetna'
    }
  ]);

  const renderPrescriptionItem = ({ item }: { item: Prescription }) => (
    <TouchableOpacity 
      style={[styles.prescriptionCard, item.priority === 'urgent' && styles.urgentCard]}
      onPress={() => navigation.navigate('PrescriptionDetails', { prescription: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.rxNumber}>#{item.id}</Text>
        <View style={[styles.statusBadge, styles[item.status]]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>{item.patientName}</Text>
        <Text style={styles.medication}>{item.medication}</Text>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.insurance}>{item.insurance}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.submittedAt).toLocaleTimeString()}
        </Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.processButton]}
          onPress={() => navigation.navigate('ProcessPrescription', { prescription: item })}
        >
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.buttonText}>Process</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.contactButton]}
          onPress={() => navigation.navigate('ContactPatient', { prescription: item })}
        >
          <Ionicons name="call" size={20} color="#fff" />
          <Text style={styles.buttonText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Prescription Queue</Text>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Processing</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Ready</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={prescriptions}
        renderItem={renderPrescriptionItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
  },
  listContainer: {
    padding: 15,
  },
  prescriptionCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  urgentCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  rxNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  pending: {
    backgroundColor: '#ffc107',
  },
  processing: {
    backgroundColor: '#17a2b8',
  },
  ready: {
    backgroundColor: '#28a745',
  },
  completed: {
    backgroundColor: '#6c757d',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  patientInfo: {
    marginBottom: 10,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  medication: {
    color: '#666',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  insurance: {
    color: '#666',
    fontSize: 12,
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  processButton: {
    backgroundColor: '#28a745',
  },
  contactButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: '500',
  },
});

export default PrescriptionQueueScreen;