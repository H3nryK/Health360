import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function PharmacyDashboard({ route, navigation }) {
  const { licenseNumber } = route.params;

  const menuItems = [
    { icon: 'receipt', title: 'Orders', count: '12', route: 'Orders' },
    { icon: 'inventory', title: 'Inventory', count: '486', route: 'Inventory' },
    { icon: 'people', title: 'Customers', count: '1.2k', route: 'Customers' },
    { icon: 'analytics', title: 'Analytics', count: '', route: 'Analytics' },
    { icon: 'payments', title: 'Payments', count: '8', route: 'Payments' },
    { icon: 'settings', title: 'Settings', count: '', route: 'Settings' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#FFC947', '#FFB830']} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.pharmacyName}>Health360 Pharmacy</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Icon name="person" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₦125,000</Text>
            <Text style={styles.statLabel}>Today's Sales</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>48</Text>
            <Text style={styles.statLabel}>Pending Orders</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={styles.menuIconContainer}>
                <Icon name={item.icon} size={28} color="#FFC947" />
                {item.count && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.count}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="add-circle" size={24} color="#FFF" />
            <Text style={styles.actionButtonText}>Add New Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="qr-code-scanner" size={24} color="#FFF" />
            <Text style={styles.actionButtonText}>Scan Prescription</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.9,
  },
  pharmacyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 15,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  menuItem: {
    width: (width - 60) / 2,
    height: 120,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIconContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  menuTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  quickActions: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC947',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});
