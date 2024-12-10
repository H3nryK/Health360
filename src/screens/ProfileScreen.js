import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Avatar, ListItem, Button, Icon } from '@rneui/themed';

const ProfileScreen = () => {
  const userInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    insuranceId: 'INS-123456',
    bloodType: 'A+',
    allergies: 'None',
  };
  

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['token', 'pharmacyData']);
      navigation.replace('PharmacyLogin');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };
  

  const menuItems = [
    {
      title: 'Personal Information',
      icon: 'person',
      onPress: () => {},
    },
    {
      title: 'Insurance Details',
      icon: 'shield',
      onPress: () => {},
    },
    {
      title: 'Medical History',
      icon: 'history',
      onPress: () => {},
    },
    {
      title: 'Payment Methods',
      icon: 'payment',
      onPress: () => {},
    },
    {
      title: 'Notifications',
      icon: 'notifications',
      onPress: () => {},
    },
    {
      title: 'Privacy Settings',
      icon: 'security',
      onPress: () => {},
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar
          size={100}
          rounded
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          containerStyle={styles.avatar}
        >
          <Avatar.Accessory size={24} />
        </Avatar>
        <Text h4>{userInfo.name}</Text>
        <Text style={styles.subText}>{userInfo.email}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Quick Information</Text>
        <View style={styles.infoGrid}>
          <InfoItem title="Insurance ID" value={userInfo.insuranceId} />
          <InfoItem title="Blood Type" value={userInfo.bloodType} />
          <InfoItem title="Phone" value={userInfo.phone} />
          <InfoItem title="Allergies" value={userInfo.allergies} />
        </View>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <ListItem key={index} onPress={item.onPress} bottomDivider>
            <Icon name={item.icon} />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>

      <Button
        title="Sign Out"
        buttonStyle={styles.signOutButton}
        titleStyle={styles.signOutText}
        icon={{
          name: 'logout',
          color: '#FF3B30',
        }}
      />
    </ScrollView>
  );
};

const InfoItem = ({ title, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoTitle}>{title}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    marginBottom: 10,
  },
  subText: {
    color: '#666',
    marginTop: 5,
  },
  infoCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    marginBottom: 15,
  },
  infoTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuSection: {
    backgroundColor: '#fff',
    marginVertical: 15,
  },
  signOutButton: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  signOutText: {
    color: '#FF3B30',
  },
});

export default ProfileScreen;