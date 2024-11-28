import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Dimensions,TouchableOpacity } from 'react-native';
import { Text, Card, Button, Icon ,} from '@rneui/themed';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { theme } from '../theme/theme';

const HealthHubScreen = () => {
  const [activeMetric, setActiveMetric] = useState('weekly');

  const healthData = {
    weekly: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: [65, 68, 66, 67, 69, 70, 68],
          color: () => theme.colors.primary,
        },
      ],
    },
    vitals: {
      bloodPressure: '120/80',
      heartRate: '72 bpm',
      temperature: '98.6°F',
      oxygen: '98%',
    },
  };
  const VitalCard = ({ title, value, icon, trend }) => (
    <View style={styles.vitalCard}>
      <Icon name={icon} color={theme.colors.primary} size={24} />
      <Text style={styles.vitalValue}>{value}</Text>
      <Text style={styles.vitalTitle}>{title}</Text>
      <Icon 
        name={trend === 'up' ? 'trending-up' : 'trending-flat'} 
        color={trend === 'up' ? theme.colors.success : theme.colors.primary}
        size={16}
      />
    </View>
  );
  
  const PeriodButton = ({ title, active, onPress }) => (
    <TouchableOpacity 
      style={[styles.periodButton, active && styles.activePeriod]}
      onPress={onPress}
    >
      <Text style={[styles.periodText, active && styles.activePeriodText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
  
  const ActivityMetric = ({ icon, value, label, goal }) => (
    <View style={styles.activityMetric}>
      <Icon name={icon} color={theme.colors.primary} size={24} />
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricGoal}>Goal: {goal}</Text>
    </View>
  );
  
  const GoalItem = ({ title, progress, current, goal }) => (
    <View style={styles.goalItem}>
      <View style={styles.goalHeader}>
        <Text style={styles.goalTitle}>{title}</Text>
        <Text style={styles.goalProgress}>{current} / {goal}</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Vitals Dashboard */}
      <View style={styles.vitalsGrid}>
        <VitalCard 
          title="Blood Pressure"
          value={healthData.vitals.bloodPressure}
          icon="favorite"
          trend="up"
        />
        <VitalCard 
          title="Heart Rate"
          value={healthData.vitals.heartRate}
          icon="heartbeat"
          trend="stable"
        />
        <VitalCard 
          title="Temperature"
          value={healthData.vitals.temperature}
          icon="thermostat"
          trend="stable"
        />
        <VitalCard 
          title="Oxygen"
          value={healthData.vitals.oxygen}
          icon="air"
          trend="up"
        />
      </View>
      

      {/* Health Trends */}
      <Card containerStyle={styles.chartCard}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Health Trends</Text>
          <View style={styles.periodToggle}>
            <PeriodButton 
              title="Week"
              active={activeMetric === 'weekly'}
              onPress={() => setActiveMetric('weekly')}
            />
            <PeriodButton 
              title="Month"
              active={activeMetric === 'monthly'}
              onPress={() => setActiveMetric('monthly')}
            />
          </View>
        </View>
        <LineChart
          data={healthData.weekly}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: theme.colors.card,
            backgroundGradientFrom: theme.colors.card,
            backgroundGradientTo: theme.colors.card,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      </Card>

      {/* Activity Summary */}
      <Card containerStyle={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Today's Activity</Text>
        <View style={styles.activityGrid}>
          <ActivityMetric 
            icon="directions-walk"
            value="8,456"
            label="Steps"
            goal="10,000"
          />
          <ActivityMetric 
            icon="local-fire-department"
            value="1,200"
            label="Calories"
            goal="2,000"
          />
          <ActivityMetric 
            icon="timer"
            value="45"
            label="Active Minutes"
            goal="60"
          />
        </View>
      </Card>

      {/* Health Goals */}
      <Card containerStyle={styles.goalsCard}>
        <Text style={styles.goalsTitle}>Health Goals</Text>
        <GoalItem 
          title="Daily Steps"
          progress={0.85}
          current="8,456"
          goal="10,000"
        />
        <GoalItem 
          title="Sleep Hours"
          progress={0.75}
          current="6h"
          goal="8h"
        />
        <GoalItem 
          title="Water Intake"
          progress={0.6}
          current="1.8L"
          goal="3L"
        />
        <Button
          title="Set New Goal"
          icon={{ name: 'add', color: 'white' }}
          buttonStyle={styles.newGoalButton}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  
});

export default HealthHubScreen;