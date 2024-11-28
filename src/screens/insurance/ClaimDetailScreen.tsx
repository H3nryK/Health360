import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

const ClaimDetailsScreen = ({ route, navigation }) => {
  const { claim } = route.params;
  const [processing, setProcessing] = useState(false);

  const handleClaimAction = (action: 'approve' | 'reject') => {
    setProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setProcessing(false);
      Alert.alert(
        'Success',
        `Claim ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }, 1500);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Claim Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Claim ID:</Text>
          <Text style={styles.value}>{claim.id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Patient:</Text>
          <Text style={styles.value}>{claim.patientName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>${claim.amount.toFixed(2)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{claim.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Status:</Text>
          <Text style={[styles.value, styles[claim.status]]}>
            {claim.status.toUpperCase()}
          </Text>
        </View>
      </View>

      {claim.status === 'pending' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.approveButton]}
            onPress={() => handleClaimAction('approve')}
            disabled={processing}
          >
            <Text style={styles.buttonText}>Approve Claim</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            onPress={() => handleClaimAction('reject')}
            disabled={processing}
          >
            <Text style={styles.buttonText}>Reject Claim</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 15,
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
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    color: '#666',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  actionButtons: {
    padding: 15,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#28a745',
  },
  rejectButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  pending: {
    color: '#856404',
  },
  approved: {
    color: '#155724',
  },
  rejected: {
    color: '#721C24',
  },
});

export default ClaimDetailsScreen;