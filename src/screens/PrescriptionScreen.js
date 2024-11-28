import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon, Divider } from '@rneui/themed';

const PrescriptionScreen = () => {
  const prescriptions = [
    {
      id: 1,
      medicine: 'Amoxicillin',
      dosage: '500mg',
      frequency: '3 times daily',
      duration: '7 days',
      doctor: 'Dr. Smith',
      date: '2024-01-15',
      status: 'active',
    },
    {
      id: 2,
      medicine: 'Ibuprofen',
      dosage: '400mg',
      frequency: 'As needed',
      duration: '5 days',
      doctor: 'Dr. Johnson',
      date: '2024-01-10',
      status: 'completed',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text h4>My Prescriptions</Text>
        <Button
          icon={<Icon name="add" color="white" />}
          title="Add New"
          buttonStyle={styles.addButton}
        />
      </View>

      {prescriptions.map((prescription) => (
        <Card key={prescription.id} containerStyle={styles.prescriptionCard}>
          <View style={styles.prescriptionHeader}>
            <Text h4>{prescription.medicine}</Text>
            <Text
              style={[
                styles.status,
                {
                  color: prescription.status === 'active' ? '#4CAF50' : '#666',
                },
              ]}
            >
              {prescription.status}
            </Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.prescriptionDetails}>
            <DetailRow icon="medical-services" label="Dosage" value={prescription.dosage} />
            <DetailRow icon="schedule" label="Frequency" value={prescription.frequency} />
            <DetailRow icon="event" label="Duration" value={prescription.duration} />
            <DetailRow icon="person" label="Doctor" value={prescription.doctor} />
            <DetailRow icon="calendar-today" label="Date" value={prescription.date} />
          </View>

          <Button
            title="Refill Prescription"
            buttonStyle={styles.refillButton}
            disabled={prescription.status !== 'active'}
          />
        </Card>
      ))}
    </ScrollView>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <View style={styles.detailRow}>
    <Icon name={icon} size={16} color="#666" />
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  addButton: {
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  prescriptionCard: {
    borderRadius: 8,
    marginBottom: 8,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  divider: {
    marginVertical: 12,
  },
  prescriptionDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  label: {
    marginLeft: 8,
    fontWeight: 'bold',
    width: 80,
  },
  value: {
    flex: 1,
  },
  refillButton: {
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: '#2089dc',
  },
});

export default PrescriptionScreen;