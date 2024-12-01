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
