import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button, Icon } from '@rneui/themed';

const MedicationReminder = () => {
  const upcomingMeds = [
    {
      id: 1,
      name: 'Amoxicillin',
      time: '2:00 PM',
      dosage: '1 tablet',
    },
    {
      id: 2,
      name: 'Vitamin D',
      time: '4:00 PM',
      dosage: '2 tablets',
    },
  ];

  return (
    <Card containerStyle={styles.container}>
      <Card.Title>Today's Medication</Card.Title>
      {upcomingMeds.map((med) => (
        <View key={med.id} style={styles.medicationItem}>
          <Icon name="medication" color="#2089dc" size={24} />
          <View style={styles.medicationInfo}>
            <Text style={styles.medName}>{med.name}</Text>
            <Text style={styles.medTime}>{med.time} - {med.dosage}</Text>
          </View>
          <Button
            icon={{ name: 'check', color: 'white' }}
            buttonStyle={styles.markButton}
          />
        </View>
      ))}
      <Button
        title="Set New Reminder"
        icon={{ name: 'add-alarm', color: 'white' }}
        buttonStyle={styles.addButton}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    margin: 15,
  },
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  medicationInfo: {
    flex: 1,
    marginLeft: 10,
  },
  medName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  medTime: {
    color: '#666',
  },
  markButton: {
    borderRadius: 20,
    width: 40,
    height: 40,
    padding: 0,
  },
  addButton: {
    marginTop: 15,
    borderRadius: 8,
  },
});

export default MedicationReminder;