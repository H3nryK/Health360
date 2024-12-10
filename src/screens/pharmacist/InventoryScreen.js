import React, { useState, useEffect } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const InventoryManagementScreen = ({ navigation }) => {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch inventory data
  const fetchInventory = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://192.168.0.11:5000/inventory', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInventory(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load inventory');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // Update stock function
  const handleUpdateStock = async (id, newQuantity) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.patch(`http://192.168.0.11:5000/inventory/${id}`, 
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      fetchInventory();
    } catch (err) {
      Alert.alert('Error', 'Failed to update stock');
    }
  };

  const renderInventoryItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.itemCard, 
        item.quantity <= item.threshold && styles.lowStockCard
      ]}
      onPress={() => navigation.navigate('MedicationDetails', { medication: item })}
    >
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        {item.quantity <= item.threshold && (
          <View style={styles.warningBadge}>
            <Text style={styles.warningText}>Low Stock</Text>
          </View>
        )}
      </View>

      <View style={styles.itemDetails}>
        <View style={styles.detailColumn}>
          <Text style={styles.detailLabel}>Quantity</Text>
          <Text style={styles.detailValue}>{item.quantity} units</Text>
        </View>
        <View style={styles.detailColumn}>
          <Text style={styles.detailLabel}>Price</Text>
          <Text style={styles.detailValue}>${item.price}</Text>
        </View>
        <View style={styles.detailColumn}>
          <Text style={styles.detailLabel}>Category</Text>
          <Text style={styles.detailValue}>{item.category}</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.updateButton]}
          onPress={() => navigation.navigate('UpdateStock', { medication: item })}
        >
          <Ionicons name="refresh" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Update Stock</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.orderButton]}
          onPress={() => navigation.navigate('PlaceOrder', { medication: item })}
        >
          <Ionicons name="cart" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Order More</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search medications..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
  style={styles.addButton}
  onPress={() => navigation.navigate('AddProduct')}
>
  <Ionicons name="add" size={24} color="#fff" />
</TouchableOpacity>
        
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          <FlatList
            data={inventory.filter(item => 
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            renderItem={renderInventoryItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={fetchInventory} />
            }
          />

          <View style={styles.summaryBar}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Items</Text>
              <Text style={styles.summaryValue}>{inventory.length}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Low Stock</Text>
              <Text style={styles.summaryValue}>
                {inventory.filter(item => item.quantity <= item.threshold).length}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};


    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginRight: 10,
  },
  searchIcon: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 15,
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lowStockCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  warningBadge: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  warningText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailColumn: {
    flex: 1,
  },
  detailLabel: {
    color: '#666',
    fontSize: 12,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  updateButton: {
    backgroundColor: '#28a745',
  },
  orderButton: {
    backgroundColor: '#007AFF',
  },
  actionButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: '500',
  },
  summaryBar: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#666',
    fontSize: 12,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default InventoryManagementScreen;