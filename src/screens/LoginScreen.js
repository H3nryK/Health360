import { useState, useContext } from 'react';
import { View, TextInput, StyleSheet,Text } from 'react-native';
import { Button } from '../components/Button';
import { AuthContext } from '../context/AuthContext';

import { useTheme } from '../context/ThemeContext';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { color: theme.colors.text }]}>
        Welcome Back
      </Text>

      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />

      <Button 
        title="Login" 
        onPress={() => navigation.navigate('PatientHome')} 
      />

      <Text 
        style={styles.registerText}
        onPress={() => navigation.navigate('Register')}
      >
        Don't have an account? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center'
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16
  },
  registerText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#007AFF'
  }
});
