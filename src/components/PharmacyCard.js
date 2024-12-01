import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export function PharmacyCard({ pharmacy, onPress }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: theme.colors.card }]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Text style={[styles.name, { color: theme.colors.text }]}>
          {pharmacy.name}
        </Text>
        
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="map-marker" size={16} color={theme.colors.primary} />
          <Text style={styles.address}>{pharmacy.address}</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="clock" size={16} color={theme.colors.primary} />
          <Text style={styles.hours}>{pharmacy.hours}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    gap: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  address: {
    fontSize: 14,
    color: '#666',
  },
  hours: {
    fontSize: 14,
    color: '#666',
  },
});
