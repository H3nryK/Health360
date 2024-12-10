import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function USSDScreen() {
  const ussdSteps = [
    { id: 1, text: 'Dial *360#' },
    { id: 2, text: 'Select Option 1 for Health Services' },
    { id: 3, text: 'Choose your preferred service' },
    { id: 4, text: 'Follow the prompts to complete' },
  ];

  const services = [
    { icon: 'medical-services', title: 'Find Pharmacy', code: '*360*1#' },
    { icon: 'receipt', title: 'Prescription Refill', code: '*360*2#' },
    { icon: 'schedule', title: 'Appointments', code: '*360*3#' },
    { icon: 'local-hospital', title: 'Emergency Services', code: '*360*4#' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#FFC947', '#FFB830']} style={styles.header}>
        <Icon name="phone" size={50} color="#FFF" />
        <Text style={styles.headerTitle}>USSD Services</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>How to Use</Text>
        {ussdSteps.map((step) => (
          <View key={step.id} style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{step.id}</Text>
            </View>
            <Text style={styles.stepText}>{step.text}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Available Services</Text>
        <View style={styles.servicesGrid}>
          {services.map((service, index) => (
            <TouchableOpacity key={index} style={styles.serviceCard}>
              <Icon name={service.icon} size={30} color="#FFC947" />
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceCode}>{service.code}</Text>
            </TouchableOpacity>
          ))}
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
      height: 180,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    headerTitle: {
      fontSize: 24,
      color: '#FFF',
      fontWeight: 'bold',
      marginTop: 12,
    },
    content: {
      flex: 1,
      padding: 24,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
      marginTop: 12,
    },
    stepContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    stepNumber: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#FFC947',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    stepNumberText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    stepText: {
      flex: 1,
      fontSize: 16,
      color: '#666',
    },
    servicesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    serviceCard: {
      width: '48%',
      backgroundColor: '#F5F5F5',
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
      marginBottom: 16,
    },
    serviceTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
      marginTop: 12,
      marginBottom: 4,
    },
    serviceCode: {
      fontSize: 14,
      color: '#666',
    },
  });
  