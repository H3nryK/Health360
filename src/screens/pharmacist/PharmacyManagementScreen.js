import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PharmacyManagementScreen = ({ navigation }) => {
  const [pharmacies] = useState([
    {
      id: '1',
      name: 'HealthCare Pharmacy',
      location: 'Downtown',
      status: 'verified',
      claimsProcessed: 156,
      rating: 4.8
    },
    {
      id: '2',
      name: 'MediCare Plus',
      location: 'Westside',
      status: 'pending',
      claimsProcessed: 0,
      rating: 0
    }
  ]);

  const renderPharmacyCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('PharmacyDetails', { pharmacy: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.pharmacyName}>{item.name}</Text>
        <View style={[styles.statusBadge, 
          { backgroundColor: item.status === 'verified' ? '#28a745' : '#ffc107' }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <Text style={styles.location}>📍 {item.location}</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Ionicons name="document-text" size={20} color="#666" />
          <Text style={styles.statText}>{item.claimsProcessed} Claims</Text>
        </View>
        
        <View style={styles.stat}>
          <Ionicons name="star" size={20} color="#666" />
          <Text style={styles.statText}>{item.rating} Rating</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Partner Pharmacies</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddPharmacy')}
        >
          <Ionicons name="add-circle" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={pharmacies}
        renderItem={renderPharmacyCard}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#003366',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#005599',
    padding: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 5,
  },
  listContainer: {
    padding: 15,
  },
  card: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  location: {
    color: '#666',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 5,
    color: '#666',
  }
});

export default PharmacyManagementScreen;