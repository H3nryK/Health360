import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon, Input } from '@rneui/themed';
import { LineChart } from 'react-native-chart-kit';

const HealthTrackingScreen = () => {
  const [metrics] = useState({
    bloodPressure: {
      data: [120, 118, 122, 119, 121, 117, 120],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    weight: {
      current: '70 kg',
      goal: '65 kg',
      progress: 75,
    },
    steps: {
      today: '8,456',
      goal: '10,000',
      progress: 84,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.chartCard}>
        <Card.Title>Blood Pressure (Last 7 Days)</Card.Title>
        <LineChart
          data={{
            labels: metrics.bloodPressure.labels,
            datasets: [{ data: metrics.bloodPressure.data }],
          }}
          width={320}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(32, 137, 220, ${opacity})`,
          }}
          style={styles.chart}
        />
      </Card>

      <Card containerStyle={styles.metricCard}>
        <Card.Title>Weight Tracking</Card.Title>
        <View style={styles.metricRow}>
          <Text>Current: {metrics.weight.current}</Text>
          <Text>Goal: {metrics.weight.goal}</Text>
        </View>
        <Button
          title="Log Weight"
          buttonStyle={styles.logButton}
        />
      </Card>

      <Card containerStyle={styles.metricCard}>
        <Card.Title>Daily Steps</Card.Title>
        <View style={styles.metricRow}>
          <Text>Today: {metrics.steps.today}</Text>
          <Text>Goal: {metrics.steps.goal}</Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progress, 
              { width: `${metrics.steps.progress}%` }
            ]} 
          />
        </View>
      </Card>

      <Button
        title="Add New Health Metric"
        icon={{ name: 'add', color: 'white' }}
        buttonStyle={styles.addButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chartCard: {
    borderRadius: 8,
    padding: 10,
  },
  chart: {
    borderRadius: 8,
    marginVertical: 10,
  },
  metricCard: {
    borderRadius: 8,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  logButton: {
    borderRadius: 8,
    marginTop: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginTop: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#2089dc',
    borderRadius: 5,
  },
  addButton: {
    margin: 15,
    borderRadius: 8,
  },
});

export default HealthTrackingScreen;