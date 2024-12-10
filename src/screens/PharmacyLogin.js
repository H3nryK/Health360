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

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function PharmacyLoginScreen({ navigation }) {

  const [licenseNumber, setLicenseNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  //verify token
  const verifyToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.replace('PharmacyDashboard');
      }
    } catch (error) {
      console.log('Token verification error:', error);
    }
  };
  

  const [errors, setErrors] = useState({
    licenseNumber: '',
    password: ''
  });
  

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.0.11:5000/pharmacylogin', {
        license_number: licenseNumber.trim(),
        password: password.trim()
      });
  
      if (response.data?.success && response.data?.token) {
        // Store credentials
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('pharmacyId', response.data.pharmacy.id.toString());
        
        // Debug log
        console.log('Stored credentials:', {
          token: response.data.token,
          pharmacyId: response.data.pharmacy.id
        });
  
        // Navigate to dashboard
        navigation.replace('PharmacyDashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Login Failed',
        error.response?.data?.message || 'Connection error'
      );
    }
  };
  
  
  

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#FFC947', '#FFB830']} style={styles.header}>
        <Icon name="store" size={50} color="#FFF" />
        <Text style={styles.headerTitle}>Pharmacy Portal</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to manage your pharmacy</Text>

          <View style={styles.inputContainer}>
            <Icon name="badge" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
  style={[styles.input, errors.licenseNumber && styles.inputError]}
  placeholder="Pharmacy License Number"
  value={licenseNumber}
  onChangeText={(text) => {
    const trimmed = text.trim().toUpperCase();
    setLicenseNumber(trimmed);
    setErrors(prev => ({...prev, licenseNumber: ''}));
    console.log('License Number changed:', trimmed); // Debug log
  }}
  autoCapitalize="characters"
  autoCorrect={false}
  onBlur={() => {
    if (!licenseNumber.trim()) {
      setErrors(prev => ({...prev, licenseNumber: 'License number is required'}));
    }
  }}
/>
{errors.licenseNumber ? (
  <Text style={styles.errorText}>{errors.licenseNumber}</Text>
) : null}
</View>
<View style={styles.inputContainer}>
<TextInput
  style={[styles.input, errors.password && styles.inputError]}
  placeholder="Password"
  value={password}
  onChangeText={(text) => {
    setPassword(text.trim());
    setErrors(prev => ({...prev, password: ''}));
    console.log('Password changed:', text.trim()); // Debug log
  }}
  secureTextEntry
  onBlur={() => {
    if (!password.trim()) {
      setErrors(prev => ({...prev, password: 'Password is required'}));
    }
  }}
/>
{errors.password ? (
  <Text style={styles.errorText}>{errors.password}</Text>
) : null}

          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <LinearGradient
              colors={['#FFC947', '#FFB830']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity> */}

<TouchableOpacity 
        style={[styles.loginButton, loading && styles.disabledButton]}
        onPress={handleLogin}
        disabled={loading}
      >
        <LinearGradient
          colors={['#FFC947', '#FFB830']}
          style={styles.buttonGradient}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
      
          <TouchableOpacity 
            style={styles.registerButton}
            onPress={() => navigation.navigate('PharmacyRegistration')}
          >
            <Text style={styles.registerText}>
              New to Health360? Register your pharmacy
            </Text>
          </TouchableOpacity>
        </View>
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
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    headerTitle: {
      fontSize: 28,
      color: '#FFF',
      fontWeight: 'bold',
      marginTop: 12,
      letterSpacing: 0.5,
    },
    content: {
      flex: 1,
    },
    formContainer: {
      padding: 24,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: '#666',
      marginBottom: 32,
      letterSpacing: 0.3,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F8F8F8',
      borderRadius: 15,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      paddingHorizontal: 12,
    },
    inputIcon: {
      padding: 12,
    },
    input: {
      flex: 1,
      height: 55,
      fontSize: 16,
      color: '#333',
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginBottom: 24,
      paddingVertical: 8,
    },
    forgotPasswordText: {
      color: '#FFC947',
      fontSize: 15,
      fontWeight: '600',
    },
    loginButton: {
      height: 56,
      borderRadius: 28,
      overflow: 'hidden',
      marginBottom: 24,
      elevation: 3,
      shadowColor: '#FFC947',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
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
      letterSpacing: 0.5,
    },
    registerButton: {
      alignItems: 'center',
      paddingVertical: 12,
    },
    registerText: {
      color: '#666',
      fontSize: 15,
      textDecorationLine: 'underline',
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

    inputError: {
      borderColor: '#FF3B30',
    },
    errorText: {
      color: '#FF3B30',
      fontSize: 12,
      marginTop: -12,
      marginBottom: 8,
      marginLeft: 12,
    }
  });
  