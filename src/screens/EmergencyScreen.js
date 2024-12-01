import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const emergencyContacts = [
  { name: 'Ambulance', number: '999', icon: 'ambulance' },
  { name: 'Police', number: '999', icon: 'police-badge' },
  { name: 'Fire', number: '999', icon: 'fire-truck' },
  { name: 'Poison Control', number: '0800 730 999', icon: 'alert-circle' }
];

export default function EmergencyScreen() {
  const handleEmergencyCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sosButton}>
        <TouchableOpacity 
          style={styles.sosInner}
          onPress={() => handleEmergencyCall('999')}
        >
          <MaterialCommunityIcons name="phone-alert" size={48} color="#FFF" />
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contactsList}>
        {emergencyContacts.map((contact, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.contactCard}
            onPress={() => handleEmergencyCall(contact.number)}
          >
            <MaterialCommunityIcons name={contact.icon} size={32} color="#FF4757" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactNumber}>{contact.number}</Text>
            </View>
            <MaterialCommunityIcons name="phone" size={24} color="#4CAF50" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  sosButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  sosInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FF4757',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#FF4757',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  sosText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  contactsList: {
    padding: 16,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  contactNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  }
});
