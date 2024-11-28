import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ClaimCardProps {
  claimId: string;
  patientName: string;
  amount: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  onPress: () => void;
}

const ClaimCard = ({ claimId, patientName, amount, date, status, onPress }: ClaimCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.claimId}>Claim #{claimId}</Text>
        <Text style={[styles.status, styles[status]]}>{status.toUpperCase()}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.patientName}>{patientName}</Text>
        <Text style={styles.amount}>${amount.toFixed(2)}</Text>
      </View>
      <Text style={styles.date}>{date}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  claimId: {
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  pending: {
    backgroundColor: '#FFF3CD',
    color: '#856404',
  },
  approved: {
    backgroundColor: '#D4EDDA',
    color: '#155724',
  },
  rejected: {
    backgroundColor: '#F8D7DA',
    color: '#721C24',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  patientName: {
    fontSize: 14,
    color: '#666',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003366',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});

export default ClaimCard;