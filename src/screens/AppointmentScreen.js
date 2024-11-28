import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Card, Icon, Overlay, Input } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';

const AppointmentScreen = () => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [appointments] = useState([
    {
      id: 1,
      doctor: 'Dr. Sarah Smith',
      specialty: 'Cardiologist',
      date: '2024-01-20',
      time: '10:00 AM',
      location: 'Medical Center',
      status: 'upcoming',
    },
    {
      id: 2,
      doctor: 'Dr. John Davis',
      specialty: 'Dermatologist',
      date: '2024-01-25',
      time: '2:30 PM',
      location: 'Health Clinic',
      status: 'upcoming',
    },
  ]);

  return (
    <View style={styles.container}>
      <Button
        title="Schedule New Appointment"
        icon={{ name: 'add', color: 'white' }}
        buttonStyle={styles.scheduleButton}
        onPress={() => setVisible(true)}
      />

      <ScrollView>
        {appointments.map((appointment) => (
          <Card key={appointment.id} containerStyle={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <Text h4>{appointment.doctor}</Text>
              <Text style={styles.specialty}>{appointment.specialty}</Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="event" size={16} />
              <Text style={styles.detailText}>
                {appointment.date} at {appointment.time}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="location-on" size={16} />
              <Text style={styles.detailText}>{appointment.location}</Text>
            </View>

            <View style={styles.actionButtons}>
              <Button
                title="Reschedule"
                type="outline"
                buttonStyle={styles.actionButton}
              />
              <Button
                title="Cancel"
                type="outline"
                buttonStyle={[styles.actionButton, styles.cancelButton]}
                titleStyle={styles.cancelButtonText}
              />
            </View>
          </Card>
        ))}
      </ScrollView>

      <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <View style={styles.overlay}>
          <Text h4>Schedule Appointment</Text>
          <Input
            placeholder="Select Doctor"
            leftIcon={{ name: 'person', type: 'material' }}
          />
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => setDate(selectedDate)}
          />
          <Button
            title="Confirm Appointment"
            onPress={() => setVisible(false)}
            buttonStyle={styles.confirmButton}
          />
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scheduleButton: {
    margin: 15,
    borderRadius: 8,
  },
  appointmentCard: {
    borderRadius: 8,
    marginBottom: 10,
  },
  appointmentHeader: {
    marginBottom: 10,
  },
  specialty: {
    color: '#666',
    fontSize: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  detailText: {
    marginLeft: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  actionButton: {
    width: '48%',
    borderRadius: 8,
  },
  cancelButton: {
    borderColor: '#FF3B30',
  },
  cancelButtonText: {
    color: '#FF3B30',
  },
  overlay: {
    width: 300,
    padding: 20,
  },
  confirmButton: {
    marginTop: 20,
    borderRadius: 8,
  },
});

export default AppointmentScreen;

