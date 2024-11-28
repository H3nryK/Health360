import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import PatientNavigator from './PatientNavigator';
import PharmacistNavigator from './PharmacistNavigator';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Auth" component={LoginScreen} />
        ) : (
          <>
            {user.role === 'patient' && (
              <Stack.Screen name="PatientFlow" component={PatientNavigator} />
            )}
            {user.role === 'pharmacist' && (
              <Stack.Screen name="PharmacistFlow" component={PharmacistNavigator} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}