import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const UpdateStockScreen = ({ route, navigation }) => {
  const { medication } = route.params;
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');

  const handleUpdateStock = () => {
    if (!quantity || !reason) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Update stock logic here
    Alert.alert(
      'Success',
      'Stock updated successfully',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Stock</Text>
      <Text style={styles.medicationName}>{medication.name}</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Current Stock: {medication.quantity}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new quantity"
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Reason for Update</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter reason for stock update"
          multiline
          numberOfLines={4}
          value={reason}
          onChangeText={setReason}
        />
      </View>

      <TouchableOpacity 
        style={styles.updateButton}
        onPress={handleUpdateStock}
      >
        <Text style={styles.buttonText}>Update Stock</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  medicationName: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  updateButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UpdateStockScreen;