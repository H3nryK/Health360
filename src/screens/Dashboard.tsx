import { View } from 'react-native';
import { InventoryManager } from '../../components/InventoryManager';
import { OrdersList } from '../../components/OrdersList';
import { Analytics } from '../../components/Analytics';

export default function PharmacyDashboard() {
  return (
    <View style={styles.container}>
      <InventoryManager />
      <OrdersList />
      <Analytics />
    </View>
  );
}
