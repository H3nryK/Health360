import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput } from 'react-native';
import ClaimCard from '../../components/shared/ClaimCard';
import FilterBar from '../../components/shared/FilterBar';

const ClaimsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const mockClaims = [
    {
      id: '1001',
      patientName: 'John Doe',
      amount: 250.00,
      date: '2024-01-15',
      status: 'pending',
    },
    {
      id: '1002',
      patientName: 'Jane Smith',
      amount: 175.50,
      date: '2024-01-14',
      status: 'approved',
    },
    // Add more mock data
  ];

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search claims..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      <FilterBar
        filters={['all', 'pending', 'approved', 'rejected']}
        selectedFilter={selectedFilter}
        onFilterSelect={setSelectedFilter}
      />

      <FlatList
        data={mockClaims}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClaimCard
            claimId={item.id}
            patientName={item.patientName}
            amount={item.amount}
            date={item.date}
            status={item.status}
            onPress={() => navigation.navigate('ClaimDetails', { claim: item })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default ClaimsScreen;