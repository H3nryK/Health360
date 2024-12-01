import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const orders = [
  {
    id: '1',
    date: '2024-01-20',
    pharmacy: 'HealthPlus Pharmacy',
    items: [
      { name: 'Paracetamol 500mg', quantity: 2, price: 500 },
      { name: 'Vitamin C', quantity: 1, price: 300 }
    ],
    status: 'Delivered',
    total: 1300
  },
  // Add more orders
];

export default function OrderHistoryScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>Order #{item.id}</Text>
              <Text style={styles.orderDate}>{item.date}</Text>
            </View>
            <Text style={styles.pharmacy}>{item.pharmacy}</Text>
            {item.items.map((product, index) => (
              <View key={index} style={styles.productItem}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.quantity}>x{product.quantity}</Text>
                <Text style={styles.price}>KES {product.price}</Text>
              </View>
            ))}
            <View style={styles.orderFooter}>
              <Text style={styles.total}>Total: KES {item.total}</Text>
              <View style={[styles.statusBadge, 
                { backgroundColor: item.status === 'Delivered' ? '#4CAF50' : '#FF9800' }]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  orderCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  orderHeader: {
    backgroundColor: '#FFC947',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  orderDate: {
    fontSize: 14,
    color: '#fff',
  },
  pharmacy: {
    fontSize: 18,
    fontWeight: '500',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  quantity: {
    fontSize: 16,
    color: '#666',
    marginRight: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  orderFooter: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  }
});
