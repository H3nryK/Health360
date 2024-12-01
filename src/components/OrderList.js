import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const OrderItem = ({ order }) => {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.orderItem, { backgroundColor: theme.colors.card }]}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderNumber}>#{order.id}</Text>
        <Text style={[styles.status, { 
          backgroundColor: order.status === 'Pending' ? '#FFF3CD' : '#D4EDDA',
          color: order.status === 'Pending' ? '#856404' : '#155724'
        }]}>
          {order.status}
        </Text>
      </View>
      
      <Text style={styles.medication}>{order.medication}</Text>
      <Text style={styles.customer}>{order.customerName}</Text>
      <Text style={styles.time}>{order.orderTime}</Text>
    </View>
  );
};

export function OrderList({ title, orders = [] }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderItem order={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16
  },
  orderItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '500'
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12
  },
  medication: {
    fontSize: 16,
    marginBottom: 4
  },
  customer: {
    fontSize: 14,
    color: '#666'
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginTop: 8
  }
});
