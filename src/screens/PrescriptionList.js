import { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { PrescriptionCard } from '../../components/PrescriptionCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPrescriptions } from '../../store/slices/prescriptionSlice';

const PrescriptionList = () => {
  const dispatch = useDispatch();
  const { prescriptions, loading } = useSelector((state) => state.prescriptions);

  useEffect(() => {
    dispatch(fetchPrescriptions());
  }, []);

  const renderItem = ({ item }) => (
    <PrescriptionCard prescription={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={prescriptions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export { PrescriptionList };