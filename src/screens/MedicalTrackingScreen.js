import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon, Switch, Badge } from '@rneui/themed';

const MedicationTrackingScreen = () => {
  const [medications] = useState([
    {
      id: 1,
      name: 'Amoxicillin',
      dosage: '500mg',
      frequency: '3 times daily',
      timeSlots: ['8:00 AM', '2:00 PM', '8:00 PM'],
      remainingPills: 15,
      refillReminder: true,
      taken: [true, false, false],
    },
    {
      id: 2,
      name: 'Vitamin D',
      dosage: '1000 IU',
      frequency: 'Once daily',
      timeSlots: ['9:00 AM'],
      remainingPills: 30,
      refillReminder: true,
      taken: [true],
    },
  ]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text h4>Medication Schedule</Text>
        <Button
          icon={{ name: 'add', color: 'white' }}
          buttonStyle={styles.addButton}
        />
      </View>

      {medications.map((med) => (
        <Card key={med.id} containerStyle={styles.medCard}>
          <View style={styles.medHeader}>
            <Text h4>{med.name}</Text>
            <Badge 
              value={`${med.remainingPills} left`}
              status={med.remainingPills < 10 ? 'error' : 'success'}
            />
          </View>

          <Text style={styles.dosageText}>
            {med.dosage} - {med.frequency}
          </Text>

          <View style={styles.timeSlots}>
            {med.timeSlots.map((time, index) => (
              <View key={index} style={styles.timeSlot}>
                <Text>{time}</Text>
                <Switch
                  value={med.taken[index]}
                  onValueChange={() => {}}
                />
              </View>
            ))}
          </View>

          <Button
            title="Refill Medication"
            type="outline"
            buttonStyle={styles.refillButton}
          />
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  addButton: {
    borderRadius: 8,
  },
  medCard: {
    borderRadius: 8,
    marginBottom: 10,
  },
  medHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dosageText: {
    color: '#666',
    marginBottom: 15,
  },
  timeSlots: {
    marginVertical: 10,
  },
  timeSlot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  refillButton: {
    marginTop: 10,
    borderRadius: 8,
  },
});

export default MedicationTrackingScreen;