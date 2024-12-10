import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import PatientHomeScreen from '../screens/PatientHomeScreen';
import FindPharmacyScreen from '../screens/PharmacyFinderScreen';
import PrescriptionsScreen from '../screens/PrescriptionScreen';
import PharmacyDetails from '../screens/PharmacyDetailsScreen';
import InventoryScreen from '../screens/pharmacist/InventoryScreen';
import InsuranceDashboardScreen from '../screens/InsuraceScreen';
import PharmacyDetailsScreen from '../screens/PharmacyDetailsScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import ProfileScreen from '../screens/ProfileScreen';
import USSDScreen from '../screens/USSDScreen';
import PharmacyRegistrationScreen from '../screens/PharmacyRegistration';
import PharmacyLogin from "../screens/PharmacyLogin"
import PharmacyDashboard from '../screens/PharmacyDashboard';
import AddProductScreen from '../screens/pharmacist/AddProducts';


const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      {/* Public Screens */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      
      {/* Patient Screens */}
      <Stack.Screen name="PatientHome" component={PatientHomeScreen} />
      <Stack.Screen name="FindPharmacy" component={FindPharmacyScreen} />
      <Stack.Screen name="Prescriptions" component={PrescriptionsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />


      
      {/* Pharmacist Screens */}
      <Stack.Screen name="PharmacyDetails" component={PharmacyDetails} />
      <Stack.Screen name="Inventory" component={InventoryScreen} />
      <Stack.Screen name="Emergency" component={EmergencyScreen} />
      <Stack.Screen name="PharmacyDashboard" component={PharmacyDashboard}/>
      <Stack.Screen name="AddProduct" component={AddProductScreen}/>
      
      {/* Insurance Screens */}
      <Stack.Screen name="Insurance" component={InsuranceDashboardScreen} />
      <Stack.Screen name="USSD" component={USSDScreen} />
      <Stack.Screen name="PharmacyRegistration" component={PharmacyRegistrationScreen} />
      <Stack.Screen name="PharmacyLogin" component={PharmacyLogin} />
    
    </Stack.Navigator>
  );
}
