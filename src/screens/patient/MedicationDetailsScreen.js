import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const MedicationDetailsScreen = ({ route, navigation }) => {
  const { medication } = route.params;
  
  const stockHistory = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      data: [300, 280, 200, 150, 100, medication.quantity]
    }]
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{medication.name}</Text>
        <Text style={styles.category}>{medication.category}</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{medication.quantity}</Text>
          <Text style={styles.statLabel}>Current Stock</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>${medication.price}</Text>
          <Text style={styles.statLabel}>Unit Price</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{medication.threshold}</Text>
          <Text style={styles.statLabel}>Min. Threshold</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>30</Text>
          <Text style={styles.statLabel}>Days Supply</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Stock Level Trend</Text>
        <LineChart
          data={stockHistory}
          width={350}
          height={200}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.updateButton]}
          onPress={() => navigation.navigate('UpdateStock', { medication })}
        >
          <Text style={styles.buttonText}>Update Stock</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.historyButton]}
          onPress={() => navigation.navigate('StockHistory', { medication })}
        >
          <Text style={styles.buttonText}>View History</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.settingsButton]}
          onPress={() => navigation.navigate('MedicationSettings', { medication })}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    color: '#666',
    marginTop: 5,
  },
  chartContainer: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  actionsContainer: {
    padding: 10,
  },
  actionButton: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: '#28a745',
  },
  historyButton: {
    backgroundColor: '#007AFF',
  },
  settingsButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MedicationDetailsScreen;