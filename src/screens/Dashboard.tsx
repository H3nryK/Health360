import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const PatientDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <View style={styles.container}>
      {/* Dashboard content */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
});

export { PatientDashboard };