import React from 'react';
import { View, ScrollView } from 'react-native';
import { StatsCard } from '../components/StatsCard';
import { OrderList } from '../components/OrderList';

export default function PharmacyDashboardScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.statsContainer}>
        <StatsCard title="Today's Orders" value="12" />
        <StatsCard title="Pending" value="5" />
        <StatsCard title="Completed" value="7" />
      </View>
      
      <OrderList title="Recent Orders" />
      
      <Button
        title="Manage Inventory"
        onPress={() => navigation.navigate('Inventory')}
      />
    </ScrollView>
  );
}
