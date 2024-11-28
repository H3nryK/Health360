import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface FilterBarProps {
  filters: string[];
  selectedFilter: string;
  onFilterSelect: (filter: string) => void;
}

const FilterBar = ({ filters, selectedFilter, onFilterSelect }: FilterBarProps) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.filterButton,
            selectedFilter === filter && styles.selectedFilter
          ]}
          onPress={() => onFilterSelect(filter)}
        >
          <Text style={[
            styles.filterText,
            selectedFilter === filter && styles.selectedFilterText
          ]}>
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedFilter: {
    backgroundColor: '#003366',
    borderColor: '#003366',
  },
  filterText: {
    color: '#666',
  },
  selectedFilterText: {
    color: '#fff',
  },
});

export default FilterBar;