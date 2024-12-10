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
  RefreshControl,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InventoryManagementScreen = ({ navigation }) => {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isGridView, setIsGridView] = useState(false);

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="medical-outline" size={64} color="#ccc" />
      <Text style={styles.emptyStateTitle}>
        {searchQuery ? 'No matching products' : 'No products yet'}
      </Text>
      <Text style={styles.emptyStateDescription}>
        {searchQuery 
          ? 'Try adjusting your search' 
          : 'Tap the + button to add your first product'}
      </Text>
    </View>
  );

  // Fetch inventory data
  const fetchInventory = async () => {
    const token = await AsyncStorage.getItem('token');
    const pharmacyId = await AsyncStorage.getItem('pharmacyId');
  
    if (!token || !pharmacyId) {
      Alert.alert('Missing credentials', 'Token or Pharmacy ID is not found');
      return;
    }
  
    try {
      const response = await axios.get('http://192.168.0.11:5000/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          pharmacyId: pharmacyId
        }
      });
      setInventory(response.data);  // Update inventory state with fetched data
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
      setError('Failed to load inventory');
    }
  };

  useEffect(() => {
    console.log('Component Mounted - Fetching Inventory');
    fetchInventory();
    
    return () => {
      console.log('Component Unmounted');
    };
  }, []);

  useEffect(() => {
    console.log('Inventory Updated:', {
      count: inventory.length,
      lowStock: inventory.filter(item => item.quantity <= item.threshold).length
    });
  }, [inventory]);

  const renderGridItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.gridItem, 
        item.quantity <= item.threshold && styles.lowStockGrid
      ]}
      onPress={() => navigation.navigate('MedicationDetails', { medication: item })}
    >
      <Text style={styles.gridItemName}>{item.name}</Text>
      <Text style={styles.gridItemPrice}>${item.price}</Text>
      <Text style={styles.gridItemQuantity}>Qty: {item.quantity}</Text>
      {item.quantity <= item.threshold && (
        <View style={styles.gridWarningBadge}>
          <Text style={styles.warningText}>Low</Text>
        </View>
      )}
    </TouchableOpacity>
  );

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
  onPress={() => navigation.navigate('UpdateStock', { medication: item })}  // Pass item as parameter
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
    <SafeAreaView style={styles.container}>
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
          style={styles.viewToggle}
          onPress={() => setIsGridView(!isGridView)}
        >
          <Ionicons 
            name={isGridView ? "list" : "grid"} 
            size={24} 
            color="#007AFF" 
          />
        </TouchableOpacity>
        
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
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={fetchInventory}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            key={isGridView ? 'grid' : 'list'}
            data={inventory.filter(item =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            renderItem={isGridView ? renderGridItem : renderInventoryItem}
            numColumns={isGridView ? 2 : 1}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={[
              styles.listContainer,
              inventory.length === 0 && styles.emptyListContainer,
            ]}
            ListEmptyComponent={<EmptyState />}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={fetchInventory}
                colors={['#007AFF']}
              />
            }
          />

          {inventory.length > 0 && (
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
          )}
        </>
      )}
    </SafeAreaView>
  );
}

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
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  lowStockCard: {
    borderColor: '#FF6347',
    borderWidth: 2,
  },
  gridItem: {
    flex: 1,
    margin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  lowStockGrid: {
    borderColor: '#FF6347',
    borderWidth: 2,
  },
  gridItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  gridItemPrice: {
    fontSize: 14,
    marginBottom: 5,
  },
  gridItemQuantity: {
    fontSize: 14,
  },
  gridWarningBadge: {
    backgroundColor: '#FF6347',
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  warningText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  warningBadge: {
    backgroundColor: '#FF6347',
    padding: 5,
    borderRadius: 5,
  },
  itemDetails: {
    marginVertical: 10,
  },
  detailColumn: {
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: '#888',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: '48%',
  },
  updateButton: {
    backgroundColor: '#FFD700',
  },
  orderButton: {
    backgroundColor: '#007AFF',
  },
  actionButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
  errorContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  retryButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  emptyStateDescription: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  summaryBar: {
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#888',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  emptyListContainer: {
    marginTop: 100,
  },
});

export default InventoryManagementScreen;
