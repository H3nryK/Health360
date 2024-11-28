import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Patient Screens
import PatientDashboard from '../screens/patient/PatientDashboard';
import PrescriptionScreen from '../screens/patient/PrescriptionScreen';
import PharmacyLocatorScreen from '../screens/patient/PharmacyLocator';

// Pharmacist Screens
import PharmacistDashboard from '../screens/pharmacist/PharmacistDashboard';
import InventoryScreen from '../screens/pharmacist/InventoryScreen';
import OrdersScreen from '../screens/pharmacist/OrdersScreen';

// Insurance Provider Screens
import InsuranceProviderDashboard from '../screens/insurance/InsuranceProviderDashboard';
import ClaimsScreen from '../screens/insurance/ClaimScreen';
import PolicyScreen from '../screens/insurance/PolicyScreen';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';

const Stack = createStackNavigator();
const PatientTab = createBottomTabNavigator();
const PharmacistTab = createBottomTabNavigator();
const InsuranceTab = createBottomTabNavigator();

const PatientTabNavigator = () => (
  <PatientTab.Navigator>
    <PatientTab.Screen name="Dashboard" component={PatientDashboard} />
    <PatientTab.Screen name="Prescriptions" component={PrescriptionScreen} />
    <PatientTab.Screen name="Pharmacies" component={PharmacyLocatorScreen} />
  </PatientTab.Navigator>
);

const PharmacistTabNavigator = () => (
  <PharmacistTab.Navigator>
    <PharmacistTab.Screen name="Dashboard" component={PharmacistDashboard} />
    <PharmacistTab.Screen name="Inventory" component={InventoryScreen} />
    <PharmacistTab.Screen name="Orders" component={OrdersScreen} />
  </PharmacistTab.Navigator>
);

const InsuranceTabNavigator = () => (
  <InsuranceTab.Navigator>
    <InsuranceTab.Screen name="Dashboard" component={InsuranceProviderDashboard} />
    <InsuranceTab.Screen name="Claims" component={ClaimsScreen} />
    <InsuranceTab.Screen name="Policies" component={PolicyScreen} />
  </InsuranceTab.Navigator>
);

const AppNavigator = () => {
  // This would come from your authentication context
  const userRole = 'patient'; // 'patient' | 'pharmacist' | 'insurance'

  const getRoleBasedNavigator = () => {
    switch (userRole) {
      case 'patient':
        return PatientTabNavigator;
      case 'pharmacist':
        return PharmacistTabNavigator;
      case 'insurance':
        return InsuranceTabNavigator;
      default:
        return PatientTabNavigator;
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen 
          name="MainApp" 
          component={getRoleBasedNavigator()}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;