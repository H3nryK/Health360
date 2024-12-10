import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pharmacyData, setPharmacyData] = useState(null);

  const login = async (token, pharmacy) => {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('pharmacyData', JSON.stringify(pharmacy));
    setPharmacyData(pharmacy);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('pharmacyData');
    setPharmacyData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      pharmacyData, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
