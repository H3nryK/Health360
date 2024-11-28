import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon, Avatar, SearchBar } from '@rneui/themed';
import { theme } from '../theme/theme';

const DoctorConsultationScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  const specialties = [
    { id: 1, name: 'Primary Care', icon: 'local-hospital' },
    { id: 2, name: 'Cardiology', icon: 'favorite' },
    { id: 3, name: 'Dermatology', icon: 'face' },
    { id: 4, name: 'Pediatrics', icon: 'child-care' },
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Smith',
      specialty: 'Primary Care',
      rating: 4.8,
      reviews: 124,
      nextAvailable: 'Today',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    // Add more doctors
  ];

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search doctors, specialties..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInput}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.specialtiesContainer}>
        {specialties.map((specialty) => (
          <SpecialtyCard
            key={specialty.id}
            specialty={specialty}
            selected={selectedSpecialty === specialty.id}
            onSelect={() => setSelectedSpecialty(specialty.id)}
          />
        ))}
      </ScrollView>

      <ScrollView style={styles.doctorsContainer}>
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onPress={() => {}}
          />
        ))}
      </ScrollView>

      <View style={styles.floatingButton}>
        <Button
          title="Emergency Consultation"
          icon={{ name: 'emergency', color: 'white' }}
          buttonStyle={styles.emergencyButton}
        />
      </View>
    </View>
  );
};

const SpecialtyCard = ({ specialty, selected, onSelect }) => (
  <TouchableOpacity 
    style={[styles.specialtyCard, selected && styles.selectedSpecialty]}
    onPress={onSelect}
  >
    <Icon name={specialty.icon} color={selected ? 'white' : theme.colors.primary} />
    <Text style={[styles.specialtyName, selected && styles.selectedText]}>
      {specialty.name}
    </Text>
  </TouchableOpacity>
);

const DoctorCard = ({ doctor, onPress }) => (
  <Card containerStyle={styles.doctorCard}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.doctorInfo}>
        <Avatar
          rounded
          size="medium"
          source={{ uri: doctor.image }}
        />
        <View style={styles.doctorDetails}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" color={theme.colors.warning} size={16} />
            <Text style={styles.rating}>{doctor.rating}</Text>
            <Text style={styles.reviews}>({doctor.reviews} reviews)</Text>
          </View>
        </View>
        <View style={styles.availabilityContainer}>
          <Text style={styles.nextAvailable}>Next Available</Text>
          <Text style={styles.availabilityTime}>{doctor.nextAvailable}</Text>
          <Button
            title="Book"
            size="sm"
            buttonStyle={styles.bookButton}
          />
        </View>
      </View>
    </TouchableOpacity>
  </Card>
);

const styles = StyleSheet.create({
  // Styles implementation
});

export default DoctorConsultationScreen;