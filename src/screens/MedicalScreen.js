
import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon, ListItem, Badge } from '@rneui/themed';

const MedicalScreen = () => {
  const [activeTab, setActiveTab] = useState('prescriptions');

  return (
    <View style={styles.container}>
      {/* Top Quick Actions */}
      <View style={styles.quickActions}>
        <Button
          title="Emergency"
          icon={{ name: 'emergency', color: 'white' }}
          buttonStyle={[styles.emergencyButton, styles.actionButton]}
        />
        <Button
          title="Find Pharmacy"
          icon={{ name: 'local-pharmacy', color: 'white' }}
          buttonStyle={[styles.pharmacyButton, styles.actionButton]}
        />
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TabButton 
          title="Prescriptions" 
          active={activeTab === 'prescriptions'}
          onPress={() => setActiveTab('prescriptions')}
          icon="description"
        />
        <TabButton 
          title="Medications" 
          active={activeTab === 'medications'}
          onPress={() => setActiveTab('medications')}
          icon="medical-services"
        />
      </View>

      <ScrollView>
        {activeTab === 'prescriptions' ? (
          <PrescriptionsView />
        ) : (
          <MedicationsView />
        )}
      </ScrollView>
    </View>
  );
};

const TabButton = ({ title, active, onPress, icon }) => (
  <Button
    title={title}
    icon={{ name: icon, color: active ? 'white' : '#2089dc' }}
    type={active ? 'solid' : 'outline'}
    buttonStyle={styles.tabButton}
    onPress={onPress}
  />
);

const PrescriptionsView = () => (
  <View style={styles.contentContainer}>
    <Card containerStyle={styles.card}>
      <Card.Title>Active Prescriptions</Card.Title>
      {['Amoxicillin', 'Vitamin D', 'Ibuprofen'].map((med, index) => (
        <ListItem key={index} bottomDivider>
          <Icon name="medication" color="#2089dc" />
          <ListItem.Content>
            <ListItem.Title>{med}</ListItem.Title>
            <ListItem.Subtitle>Prescribed on Jan 15, 2024</ListItem.Subtitle>
          </ListItem.Content>
          <Button
            title="Refill"
            type="outline"
            size="sm"
          />
        </ListItem>
      ))}
    </Card>

    <Card containerStyle={styles.card}>
      <Card.Title>Nearby Pharmacies</Card.Title>
      {['HealthCare Pharmacy', 'MediCare Plus'].map((pharmacy, index) => (
        <ListItem key={index} bottomDivider>
          <Icon name="local-pharmacy" color="#2089dc" />
          <ListItem.Content>
            <ListItem.Title>{pharmacy}</ListItem.Title>
            <ListItem.Subtitle>0.5 km away</ListItem.Subtitle>
          </ListItem.Content>
          <Badge value="Open" status="success" />
        </ListItem>
      ))}
    </Card>
  </View>
);

const MedicationsView = () => (
  <View style={styles.contentContainer}>
    <Card containerStyle={styles.card}>
      <View style={styles.medicationHeader}>
        <Text h4>Today's Schedule</Text>
        <Button
          icon={{ name: 'add', color: 'white' }}
          buttonStyle={styles.addButton}
        />
      </View>
      
      {[
        { time: '9:00 AM', med: 'Vitamin D', taken: true },
        { time: '2:00 PM', med: 'Amoxicillin', taken: false },
        { time: '8:00 PM', med: 'Ibuprofen', taken: false },
      ].map((schedule, index) => (
        <ListItem key={index} bottomDivider>
          <Text style={styles.timeText}>{schedule.time}</Text>
          <ListItem.Content>
            <ListItem.Title>{schedule.med}</ListItem.Title>
          </ListItem.Content>
          <Icon
            name={schedule.taken ? 'check-circle' : 'radio-button-unchecked'}
            color={schedule.taken ? '#4CAF50' : '#666'}
          />
        </ListItem>
      ))}
    </Card>

    <Card containerStyle={styles.card}>
      <Card.Title>Medication Inventory</Card.Title>
      {[
        { name: 'Amoxicillin', remaining: 15 },
        { name: 'Vitamin D', remaining: 30 },
        { name: 'Ibuprofen', remaining: 5 },
      ].map((med, index) => (
        <ListItem key={index} bottomDivider>
          <Icon name="medication" color="#2089dc" />
          <ListItem.Content>
            <ListItem.Title>{med.name}</ListItem.Title>
            <ListItem.Subtitle>{med.remaining} pills remaining</ListItem.Subtitle>
          </ListItem.Content>
          {med.remaining < 10 && (
            <Button
              title="Reorder"
              type="outline"
              size="sm"
            />
          )}
        </ListItem>
      ))}
    </Card>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  actionButton: {
    width: '48%',
    borderRadius: 8,
  },
  emergencyButton: {
    backgroundColor: '#FF3B30',
  },
  pharmacyButton: {
    backgroundColor: '#2089dc',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  tabButton: {
    width: 150,
    borderRadius: 8,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  card: {
    borderRadius: 8,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  medicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButton: {
    borderRadius: 8,
    width: 40,
    height: 40,
    padding: 0,
  },
  timeText: {
    width: 70,
    color: '#666',
  },
});

export default MedicalScreen;