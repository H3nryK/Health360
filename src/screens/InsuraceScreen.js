import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const insuranceInfo = {
  provider: 'HealthGuard Insurance',
  policyNumber: 'HG-123456789',
  coverage: 'Premium Health Plan',
  validUntil: '2024-12-31',
  memberSince: '2020',
  benefits: [
    'Prescription Coverage - 80%',
    'Hospital Coverage - 100%',
    'Specialist Visits - 70%',
    'Emergency Services - 100%',
    'Dental Coverage - 50%',
    'Vision Care - 60%'
  ]
};

export default function InsuranceScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Insurance Details</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Image 
            source={require('../../assets/icons8-insurance-64.png')} 
            style={styles.logo}
          />
          <MaterialCommunityIcons name="shield-check" size={24} color="#4CAF50" />
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.provider}>{insuranceInfo.provider}</Text>
          <Text style={styles.coverage}>{insuranceInfo.coverage}</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Policy Number</Text>
            <Text style={styles.value}>{insuranceInfo.policyNumber}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Valid Until</Text>
            <Text style={styles.value}>{insuranceInfo.validUntil}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Member Since</Text>
            <Text style={styles.value}>{insuranceInfo.memberSince}</Text>
          </View>
        </View>
      </View>

      <View style={styles.benefitsSection}>
        <Text style={styles.benefitsTitle}>Coverage Benefits</Text>
        {insuranceInfo.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <MaterialCommunityIcons 
              name="check-circle" 
              size={24} 
              color="#4CAF50" 
              style={styles.benefitIcon}
            />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Need Help?</Text>
        <View style={styles.contactCard}>
          <MaterialCommunityIcons name="phone" size={24} color="#FFC947" />
          <Text style={styles.contactText}>24/7 Support: 0800 123 456</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#FFC947',
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  cardBody: {
    padding: 16,
  },
  provider: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  coverage: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  benefitsSection: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  benefitIcon: {
    marginRight: 12,
  },
  benefitText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  contactSection: {
    margin: 16,
    marginBottom: 32,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  contactCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  }
});
