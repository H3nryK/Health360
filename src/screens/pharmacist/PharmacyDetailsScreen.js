import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PharmacyDetailsScreen = ({ route, navigation }) => {
  const { pharmacy } = route.params;
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const VerificationModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showVerificationModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Verify Pharmacy</Text>
          <Text style={styles.modalText}>
            Are you sure you want to verify this pharmacy? This will allow them to process insurance claims.
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.approveButton]}
              onPress={() => {
                // Handle verification logic
                setShowVerificationModal(false);
                navigation.goBack();
              }}
            >
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowVerificationModal(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
        <View style={[styles.statusBadge, 
          { backgroundColor: pharmacy.status === 'verified' ? '#28a745' : '#ffc107' }]}>
          <Text style={styles.statusText}>{pharmacy.status}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.infoRow}>
          <Ionicons name="location" size={20} color="#666" />
          <Text style={styles.infoText}>{pharmacy.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call" size={20} color="#666" />
          <Text style={styles.infoText}>+1 234-567-8900</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="mail" size={20} color="#666" />
          <Text style={styles.infoText}>contact@pharmacy.com</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Metrics</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{pharmacy.claimsProcessed}</Text>
            <Text style={styles.metricLabel}>Claims Processed</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{pharmacy.rating}</Text>
            <Text style={styles.metricLabel}>Rating</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>98%</Text>
            <Text style={styles.metricLabel}>Accuracy</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>24h</Text>
            <Text style={styles.metricLabel}>Avg Response</Text>
          </View>
        </View>
      </View>

      {pharmacy.status === 'pending' && (
        <TouchableOpacity 
          style={styles.verifyButton}
          onPress={() => setShowVerificationModal(true)}
        >
          <Text style={styles.verifyButtonText}>Verify Pharmacy</Text>
        </TouchableOpacity>
      )}

      <VerificationModal />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#003366',
  },
  pharmacyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#003366',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#444',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
  },
  metricLabel: {
    color: '#666',
    marginTop: 5,
  },
  verifyButton: {
    backgroundColor: '#28a745',
    margin: 15,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  approveButton: {
    backgroundColor: '#28a745',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default PharmacyDetailsScreen;