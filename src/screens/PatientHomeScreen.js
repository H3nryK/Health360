import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { Icon } from "@rneui/themed";
import { useTheme } from '../context/ThemeContext';

export default function PatientHomeScreen({ navigation }) {
  const { theme } = useTheme();

  const categories = [
    { 
      name: "Find Pharmacy", 
      icon: "store", 
      screen: "FindPharmacy", 
      color: "#FF9F43"
    },
    { 
      name: "My Prescriptions", 
      icon: "receipt", 
      screen: "Prescriptions", 
      color: "#4834D4"
    },
    { 
      name: "Insurance", 
      icon: "shield", 
      screen: "Insurance", 
      color: "#2ED573"
    },
    { 
      name: "Order History", 
      icon: "history", 
      screen: "Orders", 
      color: "#EA8685"
    },
    { 
      name: "My Profile", 
      icon: "person", 
      screen: "Profile", 
      color: "#686DE0"
    },
    { 
      name: "Emergency", 
      icon: "local-hospital", 
      screen: "Emergency", 
      color: "#FF6B6B"
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FFC947" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Image
            source={require('../../assets/icons8-male-user-100.png')}
            style={styles.profileImage}
          />
 
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search medicines or pharmacies"
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Icon name="shopping-cart" size={24} color="#FFC947" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.locationBar}>
        <Icon name="location-on" size={20} color="#FFC947" />
        <Text style={styles.locationText}>Nairobi, Kenya</Text>
        <TouchableOpacity>
          <Icon name="keyboard-arrow-down" size={24} color="#FFC947" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.categories}>
            {categories.map((category, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.categoryItem}
                onPress={() => navigation.navigate(category.screen)}
              >
                <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
                  <Icon name={category.icon} size={24} color="#FFF" />
                </View>
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.promotionCard}>
          <View style={styles.promotionContent}>
            <Text style={styles.promotionTitle}>24/7 Healthcare Support</Text>
            <Text style={styles.promotionSubtitle}>
              Connect with nearby pharmacies anytime
            </Text>
            <TouchableOpacity style={styles.promotionButton}>
              <Text style={styles.promotionButtonText}>Learn More</Text>
              <Icon name="arrow-forward" size={20} color="#FFC947" />
            </TouchableOpacity>
          </View>
         {/*  <Image
            source={require('../../assets/favicon.png')}
            style={styles.promotionImage}
          /> */}
           <Icon name="medical-services" size={40} color="#FFC947" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: StatusBar.currentHeight + 16,
    backgroundColor: "#FFC947",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#FFF",
    marginHorizontal: 12,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },
  cartButton: {
    width: 40,
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  locationText: {
    fontSize: 15,
    fontWeight: '500',
    marginHorizontal: 8,
    color: '#333',
  },
  categoriesContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryItem: {
    width: '30%',
    alignItems: "center",
    marginBottom: 24,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: "center",
    color: '#333',
  },
  promotionCard: {
    flexDirection: 'row',
    margin: 16,
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  promotionContent: {
    flex: 1,
    justifyContent: 'center',
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  promotionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  promotionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promotionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFC947',
    marginRight: 4,
  },
  promotionImage: {
    width: 100,
    height: 100,
  },
});
