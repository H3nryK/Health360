import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking ,Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PharmacyDetailsScreen({ route, navigation }) {
  const { pharmacy } = route.params;
  const [selectedTab, setSelectedTab] = useState('info');

  const handleCall = () => {
    Linking.openURL(`tel:${pharmacy.contact}`);
  };

  const handleDirections = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${pharmacy.coordinates.latitude},${pharmacy.coordinates.longitude}`;
    const label = pharmacy.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Image source={pharmacy.image} style={styles.coverImage} />
      
      <View style={styles.header}>
        <Text style={styles.name}>{pharmacy.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {pharmacy.rating}</Text>
          <Text style={styles.reviews}>(120 reviews)</Text>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'info' && styles.activeTab]}
          onPress={() => setSelectedTab('info')}
        >
          <Text style={styles.tabText}>Info</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'services' && styles.activeTab]}
          onPress={() => setSelectedTab('services')}
        >
          <Text style={styles.tabText}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'reviews' && styles.activeTab]}
          onPress={() => setSelectedTab('reviews')}
        >
          <Text style={styles.tabText}>Reviews</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {selectedTab === 'info' && (
          <View>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="map-marker" size={24} color="#666" />
              <Text style={styles.infoText}>{pharmacy.address}</Text>
            </View>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="clock" size={24} color="#666" />
              <Text style={styles.infoText}>{pharmacy.openingHours}</Text>
            </View>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="phone" size={24} color="#666" />
              <Text style={styles.infoText}>{pharmacy.contact}</Text>
            </View>
          </View>
        )}

        {selectedTab === 'services' && (
          <View style={styles.servicesList}>
            {pharmacy.services.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <MaterialCommunityIcons name="check-circle" size={24} color="#4CAF50" />
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
          <MaterialCommunityIcons name="phone" size={24} color="#FFF" />
          <Text style={styles.actionButtonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.primaryButton]}
          onPress={handleDirections}
        >
          <MaterialCommunityIcons name="directions" size={24} color="#FFF" />
          <Text style={styles.actionButtonText}>Directions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    fontSize: 16,
    color: '#FFB800',
  },
  reviews: {
    marginLeft: 8,
    color: '#666',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFC947',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  servicesList: {
    gap: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceText: {
    marginLeft: 16,
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#666',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  primaryButton: {
    backgroundColor: '#FFC947',
  },
  actionButtonText: {
    color: '#FFF',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});
