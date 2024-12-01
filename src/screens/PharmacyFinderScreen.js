import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FindPharmacyScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);

  const nearbyPharmacies = [
    {
      id: '1',
      name: 'HealthPlus Pharmacy',
      distance: '0.8 km',
      rating: 4.8,
      address: 'Karen Road, Nairobi',
      image: require('../../assets/dovey.png'),
      coordinates: {
        latitude: -1.2921,
        longitude: 36.8219,
      },
      openingHours: '8:00 AM - 10:00 PM',
      services: ['Prescription', 'OTC Medicines', 'Consultation'],
      contact: '+254 712 345 678'
    },
    // Add more pharmacies here
  ];

  useEffect(() => {
    getUserLocation();
    setFilteredPharmacies(nearbyPharmacies);
  }, []);

  useEffect(() => {
    filterPharmacies();
  }, [searchQuery]);

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error('Error getting location:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPharmacies = () => {
    const filtered = nearbyPharmacies.filter(pharmacy =>
      pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPharmacies(filtered);
  };

  const handlePharmacySelect = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    navigation.navigate('PharmacyDetails', { pharmacy });
  };

  const renderPharmacyCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.pharmacyCard}
      onPress={() => handlePharmacySelect(item)}
    >
      <Image source={item.image} style={styles.pharmacyImage} />
      <View style={styles.pharmacyInfo}>
        <Text style={styles.pharmacyName}>{item.name}</Text>
        <Text style={styles.pharmacyAddress}>{item.address}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
          <Text style={styles.distance}>{item.distance}</Text>
        </View>
        <Text style={styles.hours}>{item.openingHours}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFC947" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={24} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search pharmacies nearby"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={userLocation || {
          latitude: -1.2921,
          longitude: 36.8219,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {filteredPharmacies.map((pharmacy) => (
          <Marker
            key={pharmacy.id}
            coordinate={pharmacy.coordinates}
            title={pharmacy.name}
            description={pharmacy.address}
            onPress={() => handlePharmacySelect(pharmacy)}
          />
        ))}
      </MapView>

      <FlatList
        data={filteredPharmacies}
        renderItem={renderPharmacyCard}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFC947',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 20,
    fontSize: 16,
  },
  map: {
    height: 200,
  },
  pharmacyCard: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  pharmacyImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  pharmacyInfo: {
    flex: 1,
    marginLeft: 16,
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pharmacyAddress: {
    color: '#666',
    marginVertical: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  rating: {
    marginRight: 16,
    color: '#FFB800',
  },
  distance: {
    color: '#666',
  },
  hours: {
    color: '#4CAF50',
    fontSize: 12,
  }
});
