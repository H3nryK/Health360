import React, { useState ,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

import MapView, { Marker } from 'react-native-maps';
//import Geolocation from '@react-native-community/geolocation';
import * as Location from 'expo-location';

import axios from 'axios';

  export default function PharmacyRegistrationScreen({ navigation }) {
    const [formData, setFormData] = useState({
      pharmacyName: '',
      licenseNumber: '',
      ownerName: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      confirmPassword: '',
      latitude: null,
      longitude: null,
    });
  
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState(null);
    const [errors, setErrors] = useState({}); // State to track errors
  
    const getAddressFromCoordinates = async (latitude, longitude) => {
      try {
        const location = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (location && location[0]) {
          const address = `${location[0].street || ''}, ${location[0].district || ''}, ${location[0].city || ''}, ${location[0].region || ''}, ${location[0].country || ''}`;
          setFormData((prev) => ({ ...prev, address }));
        }
      } catch (error) {
        console.log('Error getting address:', error);
      }
    };
  
    const getCurrentLocation = async () => {
      try {
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const { latitude, longitude } = currentLocation.coords;
        setLocation({ latitude, longitude });
        setFormData((prev) => ({ ...prev, latitude, longitude }));
        await getAddressFromCoordinates(latitude, longitude);
      } catch (error) {
        Alert.alert('Error', 'Could not update location');
      }
    };
  
    useEffect(() => {
      const getLocation = async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permission denied', 'Location permission is required');
            return;
          }
  
          const currentLocation = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = currentLocation.coords;
          setLocation({ latitude, longitude });
          setFormData((prev) => ({ ...prev, latitude, longitude }));
          await getAddressFromCoordinates(latitude, longitude);
        } catch (error) {
          Alert.alert('Error', 'Could not get location');
        }
      };
  
      getLocation();
    }, []);
  
    const validateForm = () => {
      const licenseRegex = /^PH[A-Z]{2}\d{6}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      const newErrors = {};
  
      if (!formData.pharmacyName.trim()) {
        newErrors.pharmacyName = 'Pharmacy name is required';
      }
      if (!licenseRegex.test(formData.licenseNumber)) {
        newErrors.licenseNumber = 'Invalid pharmacy license number (Format: PHXX000000)';
      }
      if (!formData.ownerName.trim()) {
        newErrors.ownerName = 'Owner name is required';
      }
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      }
      if (!formData.address.trim()) {
        newErrors.address = 'Address is required';
      }
      if (!passwordRegex.test(formData.password)) {
        newErrors.password = 'Password must be at least 8 characters long and contain both letters and numbers';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.latitude || !formData.longitude) {
        newErrors.location = 'Location is required. Please update your location.';
      }
  
      setErrors(newErrors);
  
      return Object.keys(newErrors).length === 0;
    };
    const handleRegister = async () => {
      if (!validateForm()) return;
    
      const registrationData = {
        licenseNumber: formData.licenseNumber,
        password: formData.password,
        pharmacy_name: formData.pharmacyName,
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
        owner_name: formData.ownerName,
        location: {
          latitude: formData.latitude,
          longitude: formData.longitude
        }
      };
    
      setLoading(true);
      
      try {
        const response = await axios.post(
          'http://192.168.0.11:5000/pharmacies', 
          registrationData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
    
        setLoading(false);
        Alert.alert(
          'Success', 
          'Registration successful!',
          [
            {
              text: 'OK',
              onPress: () => navigation.replace('PharmacyLogin')
            }
          ]
        );
    
      } catch (error) {
        setLoading(false);
        console.error('Registration error:', error.response?.data || error.message);
        Alert.alert(
          'Registration Failed',
          error.response?.data?.message || 'Network error occurred'
        );
      }
    };

 /*  const handleRegister = () => {
    // Validate license number format
    const licenseRegex = /^PH[A-Z]{2}\d{6}$/;
    if (!licenseRegex.test(formData.licenseNumber)) {
      Alert.alert('Invalid License', 'Please enter a valid pharmacy license number');
      return;
    } */

    // Add your registration logic here
  /*   console.log('Registering pharmacy:', formData);
  };
 */
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Register Your Pharmacy</Text>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Pharmacy Information</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Pharmacy Name"
            value={formData.pharmacyName}
            onChangeText={(text) => setFormData({...formData, pharmacyName: text})}
          />
 {errors.pharmacyName && <Text style={styles.errorText}>{errors.pharmacyName}</Text>}
          <TextInput
            style={styles.input}
            placeholder="License Number (Format: PHXX000000)"
            value={formData.licenseNumber}
            onChangeText={(text) => setFormData({ ...formData, licenseNumber: text })}
            autoCapitalize="characters"
          />
          {errors.licenseNumber && <Text style={styles.errorText}>{errors.licenseNumber}</Text>}


          <TextInput
            style={styles.input}
            placeholder="Owner's Full Name"
            value={formData.ownerName}
            onChangeText={(text) => setFormData({...formData, ownerName: text})}
          />
           {errors.ownerName && <Text style={styles.errorText}>{errors.ownerName}</Text>}
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
            keyboardType="email-address"
          />
  {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={formData.phone}
            onChangeText={(text) => setFormData({...formData, phone: text})}
            keyboardType="phone-pad"
          />
 {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Physical Address"
            value={formData.address}
            onChangeText={(text) => setFormData({...formData, address: text})}
            multiline
          />
        </View><View style={styles.formSection}>
  <Text style={styles.sectionTitle}>Security</Text>
  
  <TextInput
    style={styles.input}
    placeholder="Password"
    value={formData.password}
    onChangeText={(text) => setFormData({...formData, password: text})}
    secureTextEntry
  />

  <TextInput
    style={styles.input}
    placeholder="Confirm Password"
    value={formData.confirmPassword}
    onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
    secureTextEntry
  />
</View>


        
 {/* Add Map View */}
 <View style={styles.mapContainer}>
          <Text style={styles.sectionTitle}>Location</Text>
          {location && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title={formData.pharmacyName || 'Pharmacy Location'}
              />
            </MapView>
          )}
          <TouchableOpacity 
            style={styles.locationButton}
            onPress={getCurrentLocation}
          >
            <Icon name="my-location" size={24} color="#FFC947" />
            <Text style={styles.locationButtonText}>Update Location</Text>
          </TouchableOpacity>
        </View>
        {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}
        <TouchableOpacity 
  style={[styles.registerButton, loading && styles.disabledButton]}
  onPress={handleRegister}
  disabled={loading}
>
  <LinearGradient
    colors={['#FFC947', '#FFB830']}
    style={styles.buttonGradient}
  >
    {loading ? (
      <ActivityIndicator color="#FFF" size="small" />
    ) : (
      <Text style={styles.buttonText}>Register Pharmacy</Text>
    )}
  </LinearGradient>
</TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
    },
    header: {
      height: 180,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 24,
      textAlign: 'center',
    },
    formSection: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#444',
      marginBottom: 16,
    },
    input: {
      backgroundColor: '#F5F5F5',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#E0E0E0',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      borderRadius: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#E0E0E0',
    },
    inputIcon: {
      padding: 12,
    },
    registerButton: {
      height: 56,
      borderRadius: 28,
      overflow: 'hidden',
      marginVertical: 24,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonGradient: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    infoText: {
      fontSize: 14,
      color: '#666',
      marginTop: 8,
      marginBottom: 16,
    },
    errorText: {
      color: '#FF3B30',
      fontSize: 14,
      marginTop: -8,
      marginBottom: 16,
      marginLeft: 4,
    },
    successMessage: {
      backgroundColor: '#4CD964',
      padding: 16,
      borderRadius: 12,
      marginBottom: 24,
    },
    successText: {
      color: '#FFF',
      fontSize: 16,
      textAlign: 'center',
    },
    linkText: {
      color: '#FFC947',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
      marginTop: 16,
    },
    requiredField: {
      color: '#FF3B30',
      marginLeft: 4,
    },
    uploadButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F5F5F5',
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      marginBottom: 16,
    },
    uploadButtonText: {
      color: '#666',
      fontSize: 16,
      marginLeft: 8,
    },
    documentPreview: {
      width: '100%',
      height: 200,
      backgroundColor: '#F5F5F5',
      borderRadius: 12,
      marginBottom: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },

    mapContainer: {
      marginVertical: 20,
      borderRadius: 12,
      overflow: 'hidden',
    },
    map: {
      height: 200,
      borderRadius: 12,
    },
    locationButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
      backgroundColor: '#F5F5F5',
      borderRadius: 8,
      marginTop: 8,
    },
    locationButtonText: {
      marginLeft: 8,
      color: '#666',
      fontSize: 16,
    },
    disabledButton: {
      opacity: 0.7,
    },
  
  });
  