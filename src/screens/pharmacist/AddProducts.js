import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddProductScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    brand: '',
    threshold: '',
    image_url: ''
  });

  const validateForm = () => {
    console.log('Validating form...');
    console.log('Current form data:', formData);
  
    if (!formData.name.trim()) {
      console.log('Validation failed: Name missing');
      Alert.alert('Error', 'Product name is required');
      return false;
    }
    if (!formData.price || isNaN(parseFloat(formData.price))) {
      console.log('Validation failed: Invalid price');
      Alert.alert('Error', 'Valid price is required');
      return false;
    }
    if (!formData.quantity || isNaN(parseInt(formData.quantity))) {
      console.log('Validation failed: Invalid quantity');
      Alert.alert('Error', 'Valid quantity is required');
      return false;
    }
    
    console.log('Validation passed');
    return true;
  };
  

 /*  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(
        'http://192.168.0.11:5000/inventory',
        formData,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      Alert.alert('Success', 'Product added successfully');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', 'Failed to add product');
    }
  }; */



  //
  // Add image picker function
  const pickImage = async () => {
    console.log('Starting image picker...');
    
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log('Permission status:', status);
    
    if (status !== 'granted') {
      console.log('Permission denied');
      Alert.alert('Permission needed', 'Please grant camera roll permissions');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log('Image picker result:', result);
  
    if (!result.canceled) {
      console.log('Image selected:', result.assets[0].uri);
      return result.assets[0].uri;
    }
  };
  

// Update handleSubmit to include image upload


const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    // Get credentials
    const token = await AsyncStorage.getItem('token');
    const pharmacyId = await AsyncStorage.getItem('pharmacyId');

    console.log('Submitting with:', { token: !!token, pharmacyId });

    // Prepare form data
    const productData = {
      ...formData,
      pharmacy_id: pharmacyId,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      threshold: parseInt(formData.threshold) || 10
    };

    console.log('Product data:', productData);

    const response = await axios.post(
      'http://192.168.0.11:5000/createproduct', // Change to match backend route
      productData,
      { 
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Response:', response.data);

    Alert.alert(
      'Success', 
      'Product added successfully',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('PharmacyDashboard')
        }
      ]
    );

  } catch (err) {
    console.error('Full error:', err);
    console.error('Response data:', err.response?.data);
    Alert.alert(
      'Error', 
      err.response?.data?.message || 'Failed to add product'
    );
  }
};



  return (
    <ScrollView style={styles.container}>
      

      <View style={styles.form}>
      <TouchableOpacity 
        style={styles.imagePickerButton}
        onPress={async () => {
          const imageUri = await pickImage();
          if (imageUri) {
            setFormData({...formData, image_url: imageUri});
          }
        }}
      >
        {formData.image_url ? (
          <Image 
            source={{ uri: formData.image_url }} 
            style={styles.previewImage}
          />
        ) : (
          <>
            <Ionicons name="camera" size={24} color="#666" />
            <Text style={styles.imagePickerText}>Add Product Image</Text>
          </>
        )}
      </TouchableOpacity>
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => setFormData({...formData, name: text})}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          value={formData.description}
          onChangeText={(text) => setFormData({...formData, description: text})}
        />

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          value={formData.price}
          onChangeText={(text) => setFormData({...formData, price: text})}
        />

        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.quantity}
          onChangeText={(text) => setFormData({...formData, quantity: text})}
        />

        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={formData.category}
          onChangeText={(text) => setFormData({...formData, category: text})}
        />

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Add Product</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePickerButton: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imagePickerText: {
    marginTop: 10,
    color: '#666',
  }
});

export default AddProductScreen;
