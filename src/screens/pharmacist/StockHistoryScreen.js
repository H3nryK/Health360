
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const StockHistoryScreen = ({ route }) => {
  const { medication } = route.params;
  
  const stockHistory = [
    {
      id: '1',
      date: '2024-01-15',
      type: 'addition',
      quantity: 100,
      reason: 'New stock arrival',
      updatedBy: 'John Doe'
    },
    {
      id: '2',
      date: '2024-01-14',
      type: 'reduction',
      quantity: 25,
      reason: 'Prescription fulfillment',
      updatedBy: 'Jane Smith'
    }
  ];

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{item.date}</Text>
        <View style={[
          styles.typeBadge,
          { backgroundColor: item.type === 'addition' ? '#28a745' : '#dc3545' }
        ]}>
          <Text style={styles.typeText}>
            {item.type === 'addition' ? '+' : '-'}{item.quantity}
          </Text>
        </View>
      </View>
      
      <Text style={styles.reason}>{item.reason}</Text>
      <Text style={styles.updatedBy}>Updated by: {item.updatedBy}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{medication.name}</Text>
        <Text style={styles.subtitle}>Stock History</Text>
      </View>

      <FlatList
        data={stockHistory}
        renderItem={renderHistoryItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  listContainer: {
    padding: 15,
  },
  historyCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: '500',
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  typeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  reason: {
    fontSize: 14,
    marginBottom: 5,
  },
  updatedBy: {
    fontSize: 12,
    color: '#666',
  },
});

export default StockHistoryScreen;