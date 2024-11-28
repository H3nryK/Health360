import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon, ListItem, Avatar } from '@rneui/themed';

const EmergencyContactsScreen = () => {
  const [contacts] = useState([
    {
      id: 1,
      name: 'Jane Smith',
      relation: 'Spouse',
      phone: '+1 234-567-8900',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: 2,
      name: 'Dr. Michael Brown',
      relation: 'Primary Doctor',
      phone: '+1 234-567-8901',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  ]);

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.emergencyCard}>
        <Card.Title>Emergency Services</Card.Title>
        <Button
          title="Call Emergency (911)"
          icon={{ name: 'emergency', color: 'white' }}
          buttonStyle={styles.emergencyButton}
        />
      </Card>

      <View style={styles.contactsHeader}>
        <Text h4>Emergency Contacts</Text>
        <Button
          icon={{ name: 'add', color: 'white' }}
          buttonStyle={styles.addButton}
        />
      </View>

      <ScrollView>
        {contacts.map((contact) => (
          <ListItem key={contact.id} bottomDivider>
            <Avatar rounded source={{ uri: contact.avatar }} />
            <ListItem.Content>
              <ListItem.Title>{contact.name}</ListItem.Title>
              <ListItem.Subtitle>{contact.relation}</ListItem.Subtitle>
              <Text style={styles.phone}>{contact.phone}</Text>
            </ListItem.Content>
            <View style={styles.contactActions}>
              <Icon
                name="phone"
                color="#2089dc"
                onPress={() => {}}
              />
              <Icon
                name="message"
                color="#2089dc"
                onPress={() => {}}
              />
            </View>
          </ListItem>
        ))}
      </ScrollView>

      <Card containerStyle={styles.medicalInfoCard}>
        <Card.Title>Quick Medical Info</Card.Title>
        <Text>Blood Type: A+</Text>
        <Text>Allergies: Penicillin</Text>
        <Text>Medical Conditions: None</Text>
        <Button
          title="Edit Medical Info"
          type="outline"
          buttonStyle={styles.editButton}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emergencyCard: {
    borderRadius: 8,
    marginBottom: 10,
  },
  emergencyButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
  },
  contactsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  addButton: {
    borderRadius: 8,
  },
  phone: {
    color: '#666',
    marginTop: 5,
  },
  contactActions: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'space-between',
  },
  medicalInfoCard: {
    borderRadius: 8,
    marginTop: 10,
  },
  editButton: {
    marginTop: 10,
    borderRadius: 8,
  },
});

export default EmergencyContactsScreen;