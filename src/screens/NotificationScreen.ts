
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AlertService, { StockAlert } from '../../services/AlertService';

const AlertsScreen = () => {
  const [alerts, setAlerts] = useState<StockAlert[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadAlerts = () => {
    const alertService = AlertService.getInstance();
    setAlerts(alertService.getAlerts());
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadAlerts();
    setRefreshing(false);
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getIconName = (type: string) => {
    switch (type) {
      case 'low_stock': return 'warning';
      case 'expiring': return 'time';
      case 'price_change': return 'trending-up';
      default: return 'alert-circle';
    }
  };

  const renderAlert = ({ item }: { item: StockAlert }) => (
    <TouchableOpacity 
      style={[styles.alertCard, !item.isRead && styles.unreadCard]}
      onPress={() => {
        AlertService.getInstance().markAsRead(item.id);
        loadAlerts();
      }}
    >
      <View style={[styles.severityIndicator, { backgroundColor: getSeverityColor(item.severity) }]} />
      <View style={styles.alertContent}>
        <View style={styles.alertHeader}>
          <Ionicons name={getIconName(item.type)} size={24} color={getSeverityColor(item.severity)} />
          <Text style={styles.timestamp}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <Text style={styles.medicationName}>{item.medicationName}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={alerts}
        renderItem={renderAlert}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off" size={48} color="#666" />
            <Text style={styles.emptyText}>No alerts at this time</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  alertCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unreadCard: {
    backgroundColor: '#f8f9fa',
  },
  severityIndicator: {
    width: 4,
  },
  alertContent: {
    flex: 1,
    padding: 15,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    color: '#444',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
});

export default AlertsScreen;

AlertsScreen.tsx
Let's implement the push notification service:

import * as Notifications from 'expo-notifications';

class NotificationService {
  private static instance: NotificationService;

  private constructor() {
    this.initialize();
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private async initialize() {
    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }

  async requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  }

  async scheduleNotification(title: string, body: string, data?: any) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
      },
      trigger: null,
    });
  }

  async sendLowStockAlert(medicationName: string, currentQuantity: number) {
    await this.scheduleNotification(
      'Low Stock Alert',
      `${medicationName} is running low (${currentQuantity} units remaining)`,
      { type: 'low_stock', medicationName }
    );
  }
}

export default NotificationService;