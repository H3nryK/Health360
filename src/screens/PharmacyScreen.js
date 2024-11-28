
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon, SearchBar,Badge } from '@rneui/themed';
import { theme } from '../theme/theme';

const PharmacyScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const prescriptions = [
    {
      id: 1,
      name: 'Amoxicillin',
      dosage: '500mg',
      refillsLeft: 2,
      nextRefill: '2024-01-25',
      pharmacy: 'HealthCare Pharmacy',
      status: 'active',
      price: '$15.99'
    },
    {
      id: 2,
      name: 'Lisinopril',
      dosage: '10mg',
      refillsLeft: 5,
      nextRefill: '2024-02-01',
      pharmacy: 'MediCare Plus',
      status: 'active',
      price: '$25.99'
    }
  ];

  const nearbyPharmacies = [
    {
      id: 1,
      name: 'HealthCare Pharmacy',
      distance: '0.5 miles',
      address: '123 Health St',
      status: 'Open',
      hours: '9AM - 9PM'
    },
    {
      id: 2,
      name: 'MediCare Plus',
      distance: '1.2 miles',
      address: '456 Care Ave',
      status: 'Open',
      hours: '24 hours'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <SearchBar
        placeholder="Search medications or pharmacies..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        containerStyle={styles.searchContainer}
      />

      {/* Active Prescriptions */}
      <Card containerStyle={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Active Prescriptions</Text>
        {prescriptions.map(prescription => (
          <View key={prescription.id} style={styles.prescriptionItem}>
            <View style={styles.prescriptionHeader}>
              <Text style={styles.medicationName}>{prescription.name}</Text>
              <Badge 
                value={`${prescription.refillsLeft} refills left`}
                status={prescription.refillsLeft > 2 ? 'success' : 'warning'}
              />
            </View>
            <Text style={styles.dosage}>Dosage: {prescription.dosage}</Text>
            <Text style={styles.pharmacy}>Pharmacy: {prescription.pharmacy}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{prescription.price}</Text>
              <Text style={styles.insuranceNote}>Insurance coverage applied</Text>
            </View>
            <Button
              title="Request Refill"
              type="outline"
              buttonStyle={styles.refillButton}
              icon={{ name: 'refresh', color: theme.colors.primary }}
            />
          </View>
        ))}
      </Card>

      {/* Nearby Pharmacies */}
      <Card containerStyle={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Nearby Pharmacies</Text>
        {nearbyPharmacies.map(pharmacy => (
          <View key={pharmacy.id} style={styles.pharmacyItem}>
            <View style={styles.pharmacyHeader}>
              <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
              <Badge 
                value={pharmacy.status}
                status={pharmacy.status === 'Open' ? 'success' : 'error'}
              />
            </View>
            <Text style={styles.pharmacyAddress}>{pharmacy.address}</Text>
            <Text style={styles.pharmacyDistance}>{pharmacy.distance}</Text>
            <Text style={styles.pharmacyHours}>{pharmacy.hours}</Text>
            <Button
              title="Transfer Prescription"
              type="outline"
              buttonStyle={styles.transferButton}
            />
          </View>
        ))}
      </Card>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Button
          title="Insurance Coverage"
          icon={{ name: 'shield', color: 'white' }}
          buttonStyle={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
        />
        <Button
          title="Price Compare"
          icon={{ name: 'compare-arrows', color: 'white' }}
          buttonStyle={[styles.actionButton, { backgroundColor: theme.colors.secondary }]}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 15,
  },
  sectionCard: {
    borderRadius: theme.borderRadius.md,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  prescriptionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dosage: {
    color: theme.colors.subtext,
    marginBottom: 5,
  },
  pharmacy: {
    color: theme.colors.subtext,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginRight: 10,
  },
  insuranceNote: {
    color: theme.colors.success,
    fontSize: 12,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 20,
  },
  actionButton: {
    width: '48%',
    borderRadius: theme.borderRadius.md,
  },
});

export default PharmacyScreen;