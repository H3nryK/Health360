import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContactPatientScreen = ({ route, navigation }) => {
  const { prescription } = route.params;
  const [message, setMessage] = useState('');

  const contactMethods = [
    { id: 'sms', icon: 'chatbubble', label: 'Send SMS' },
    { id: 'call', icon: 'call', label: 'Phone Call' },
    { id: 'email', icon: 'mail', label: 'Send Email' }
  ];

  const handleContact = (method: string) => {
    Alert.alert(
      'Contact Patient',
      `Contact ${prescription.patientName} via ${method}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Yes', 
          onPress: () => {
            // Handle contact logic
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>{prescription.patientName}</Text>
        <Text style={styles.prescriptionId}>Prescription #{prescription.id}</Text>
      </View>

      <View style={styles.contactMethods}>
        {contactMethods.map(method => (
          <TouchableOpacity
            key={method.id}
            style={styles.contactButton}
            onPress={() => handleContact(method.id)}
          >
            <Ionicons name={method.icon} size={24} color="#007AFF" />
            <Text style={styles.contactButtonText}>{method.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.messageSection}>
        <Text style={styles.sectionTitle}>Message</Text>
        <TextInput
          style={styles.messageInput}
          multiline
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={() => handleContact('message')}
        >
          <Text style={styles.sendButtonText}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  patientInfo: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  patientName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  prescriptionId: {
    color: '#666',
  },
  contactMethods: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  contactButton: {
    alignItems: 'center',
  },
  contactButtonText: {
    marginTop: 5,
    color: '#007AFF',
  },
  messageSection: {
    margin: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageInput: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactPatientScreen