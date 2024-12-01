import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Patient" component={PatientNavigator} />
        <Stack.Screen name="Pharmacist" component={PharmacistNavigator} />
        <Stack.Screen name="Insurance" component={InsuranceNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}