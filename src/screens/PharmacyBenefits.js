
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { theme } from '../theme/theme';

const PharmacyBenefits = () => {
  const savingsPrograms = [
    {
      id: 1,
      name: 'Prescription Savings Card',
      discount: 'Up to 80%',
      accepted: '65,000+ pharmacies',
      icon: 'card-membership'
    },
    {
      id: 2,
      name: 'Mail Order Program',
      discount: '90-day supply',
      accepted: 'Home delivery',
      icon: 'local-shipping'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.savingsCard}>
        <Text style={styles.cardTitle}>Available Savings Programs</Text>
        {savingsPrograms.map(program => (
          <View key={program.id} style={styles.programItem}>
            <Icon name={program.icon} color={theme.colors.primary} size={24} />
            <View style={styles.programInfo}>
              <Text style={styles.programName}>{program.name}</Text>
              <Text style={styles.programDetails}>Save {program.discount}</Text>
              <Text style={styles.acceptedAt}>Accepted at {program.accepted}</Text>
            </View>
            <Button
              title="Activate"
              type="outline"
              size="sm"
              buttonStyle={styles.activateButton}
            />
          </View>
        ))}
      </Card>

      <Card containerStyle={styles.benefitsCard}>
        <Text style={styles.cardTitle}>Your Pharmacy Benefits</Text>
        <BenefitItem
          title="Generic Medications"
          description="$10 copay for 30-day supply"
          icon="local-pharmacy"
        />
        <BenefitItem
          title="Brand Medications"
          description="$25 copay for 30-day supply"
          icon="medication"
        />
        <BenefitItem
          title="Specialty Medications"
          description="20% coinsurance"
          icon="science"
        />
      </Card>
    </ScrollView>
  );
};

const BenefitItem = ({ title, description, icon }) => (
  <View style={styles.benefitItem}>
    <Icon name={icon} color={theme.colors.primary} size={24} />
    <View style={styles.benefitInfo}>
      <Text style={styles.benefitTitle}>{title}</Text>
      <Text style={styles.benefitDescription}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  savingsCard: {
    borderRadius: theme.borderRadius.md,
    marginHorizontal: 15,
    marginTop: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  programItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  programInfo: {
    flex: 1,
    marginLeft: 15,
  },
  programName: {
    fontSize: 16,
    fontWeight: '600',
  },
  programDetails: {
    color: theme.colors.success,
    marginTop: 4,
  },
  acceptedAt: {
    color: theme.colors.subtext,
    fontSize: 12,
    marginTop: 2,
  },
  activateButton: {
    borderRadius: theme.borderRadius.sm,
  },
  benefitsCard: {
    borderRadius: theme.borderRadius.md,
    marginHorizontal: 15,
    marginTop: 15,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  benefitInfo: {
    marginLeft: 15,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  benefitDescription: {
    color: theme.colors.subtext,
    marginTop: 4,
  },
});

export default PharmacyBenefits;