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
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Product name is required');
      return false;
    }
    if (!formData.price || isNaN(parseFloat(formData.price))) {
      Alert.alert('Error', 'Valid price is required');
      return false;
    }
    if (!formData.quantity || isNaN(parseInt(formData.quantity))) {
      Alert.alert('Error', 'Valid quantity is required');
      return false;
    }
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
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
  if (status !== 'granted') {
    Alert.alert('Permission needed', 'Please grant camera roll permissions');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }
};

// Update handleSubmit to include image upload
const handleSubmit = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    // If there's an image, convert it to base64
    let imageData = null;
    if (formData.image_url) {
      const base64 = await FileSystem.readAsStringAsync(formData.image_url, {
        encoding: FileSystem.EncodingType.Base64,
      });
      imageData = `data:image/jpeg;base64,${base64}`;
    }

    await axios.post(
      'http://192.168.0.11:5000/createproduct',
      { ...formData, image_url: imageData },
      { headers: { Authorization: `Bearer ${token}` }}
    );
    
    Alert.alert('Success', 'Product added successfully');
    navigation.goBack();
  } catch (err) {
    Alert.alert('Error', 'Failed to add product');
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
