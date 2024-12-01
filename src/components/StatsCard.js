import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export function StatsCard({ title, value, icon }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
      <View style={styles.content}>
        <Text style={[styles.value, { color: theme.colors.primary }]}>
          {value}
        </Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    margin: 8,
    borderRadius: 12,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  content: {
    alignItems: 'center'
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  title: {
    fontSize: 14,
    textAlign: 'center'
  }
});
