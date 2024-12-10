import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateStockScreen = ({ route, navigation }) => {
  const { medication } = route.params;
  const [name, setName] = useState(medication.name);
  const [price, setPrice] = useState(medication.price.toString());
  const [quantity, setQuantity] = useState(medication.quantity.toString());
  const [category, setCategory] = useState(medication.category);

  const handleUpdate = async () => {
    const token = await AsyncStorage.getItem('token');
    const pharmacyId = await AsyncStorage.getItem('pharmacyId');

    if (!token || !pharmacyId) {
      Alert.alert('Missing credentials', 'Token or Pharmacy ID is not found');
      return;
    }

    try {
      const response = await axios.put(`http://192.168.0.11:5000/products/${medication.id}`, 
        {
          name,
          price: parseFloat(price),
          quantity: parseInt(quantity),
          category
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            pharmacyId: pharmacyId
          }
        }
      );
      
      if (response.status === 200) {
        Alert.alert('Success', 'Product updated successfully');
        navigation.goBack();  // Go back to the previous screen
      }
    } catch (error) {
      console.error('Error updating product:', error);
      Alert.alert('Error', 'Failed to update product');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Product</Text>

      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Ionicons name="checkmark-circle" size={24} color="#fff" />
        <Text style={styles.buttonText}>Update</Text>
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
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
  },
  updateButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default UpdateStockScreen;
