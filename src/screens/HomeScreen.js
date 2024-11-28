
import React,{useState} from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity,TextInput } from 'react-native';
import { Text, Card, Button, Icon, Badge, Overlay } from '@rneui/themed';
import { theme } from '../theme/theme';
import { LineChart } from 'react-native-chart-kit';



    const HomeScreen = ({ navigation }) => {
        const [showCostForecast, setShowCostForecast] = useState(false);
      
        // Add this section right after the insurance card
        const CostForecastCard = () => (
          <Card containerStyle={styles.forecastCard}>
            <View style={styles.forecastHeader}>
              <Text style={styles.cardTitle}>Cost Forecast</Text>
              <Button
                title="Details"
                type="clear"
                onPress={() => setShowCostForecast(true)}
              />
            </View>
            <LineChart
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                  data: [150, 180, 165, 170, 160, 175]
                }]
              }}
              width={300}
              height={150}
              chartConfig={{
                backgroundColor: theme.colors.background,
                backgroundGradientFrom: theme.colors.background,
                backgroundGradientTo: theme.colors.background,
                color: (opacity = 1) => `rgba(81, 150, 240, ${opacity})`,
              }}
              bezier
              style={styles.chart}
            />
          </Card>
        );
      
        // Add this section after Quick Actions
        const BenefitsTracker = () => (
          <Card containerStyle={styles.benefitsCard}>
            <Text style={styles.cardTitle}>Benefits Utilization</Text>
            <View style={styles.benefitsGrid}>
              <BenefitItem 
                label="Prescription"
                used={750}
                total={1500}
                icon="medication"
              />
              <BenefitItem 
                label="Medical"
                used={2500}
                total={5000}
                icon="medical-services"
              />
            </View>
          </Card>
        );
      
  return (
    <ScrollView style={styles.container}>
      {/* Insurance Status Card */}
      <Card containerStyle={styles.insuranceCard}>
        <View style={styles.insuranceHeader}>
          <View>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.insuranceProvider}>BlueCross BlueShield</Text>
          </View>
          <Badge value="Active" status="success" />
        </View>
        <View style={styles.insuranceDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Deductible Met</Text>
            <Text style={styles.detailValue}>$750/$1,500</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Next Refill</Text>
            <Text style={styles.detailValue}>2 Days</Text>
          </View>
        </View>
      </Card>



      <CostForecastCard />
      
      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <ActionButton 
          title="Refill Rx"
          icon="refresh"
          color={theme.colors.primary}
          onPress={() => navigation.navigate('Pharmacy')}
        />
        <ActionButton 
          title="Insurance"
          icon="shield"
          color={theme.colors.secondary}
          onPress={() => navigation.navigate('Insurance')}
        />
        <ActionButton 
          title="Find Pharmacy"
          icon="location-on"
          color={theme.colors.success}
          onPress={() => navigation.navigate('Pharmacy')}
        />
        <ActionButton 
          title="Emergency"
          icon="emergency"
          color={theme.colors.danger}
          onPress={() => {}}
        />
      </View>

      {/* Medications Due Today */}
      <Card containerStyle={styles.medicationCard}>
        <Text style={styles.cardTitle}>Today's Medications</Text>
        {['Amoxicillin - 500mg', 'Lisinopril - 10mg'].map((med, index) => (
          <View key={index} style={styles.medicationItem}>
            <Icon name="medication" color={theme.colors.primary} />
            <Text style={styles.medicationName}>{med}</Text>
            <Button
              title="Take"
              type="outline"
              size="sm"
              buttonStyle={styles.takeButton}
            />
          </View>
        ))}
      </Card>

      {/* Pharmacy Savings */}
      <Card containerStyle={styles.savingsCard}>
        <Text style={styles.cardTitle}>Pharmacy Savings</Text>
        <View style={styles.savingsContent}>
          <Icon name="card-membership" size={40} color={theme.colors.primary} />
          <View style={styles.savingsInfo}>
            <Text style={styles.savingsTitle}>Savings Card Available</Text>
            <Text style={styles.savingsDescription}>Save up to 80% on prescriptions</Text>
          </View>
          <Button
            title="View"
            type="clear"
            onPress={() => navigation.navigate('Insurance')}
          />
        </View>
      </Card>
      <BenefitsTracker />
      
      <PriceCheckerCard />
      <PreferredPharmacyCard />
      {/* Recent Activity */}
      <Card containerStyle={styles.activityCard}>
        <Text style={styles.cardTitle}>Recent Activity</Text>
        {[
          { text: 'Prescription filled at HealthCare Pharmacy', time: '2h ago' },
          { text: 'Insurance claim processed', time: '1d ago' },
        ].map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <Text style={styles.activityText}>{activity.text}</Text>
            <Text style={styles.activityTime}>{activity.time}</Text>
          </View>
        ))}
      </Card>


       {/* Add new Prescription Analytics */}
       <Card containerStyle={styles.analyticsCard}>
        <Text style={styles.cardTitle}>Prescription Analytics</Text>
        <View style={styles.analyticsGrid}>
          <AnalyticItem 
            value="85%" 
            label="Adherence"
            trend="+5%"
          />
          <AnalyticItem 
            value="$127" 
            label="Savings"
            trend="+$23"
          />
        </View>
      </Card>

      {/* Add Medication Schedule */}
      <Card containerStyle={styles.scheduleCard}>
        <Text style={styles.cardTitle}>Today's Schedule</Text>
        {[
          { time: '8:00 AM', med: 'Amoxicillin', taken: true },
          { time: '2:00 PM', med: 'Lisinopril', taken: false },
          { time: '8:00 PM', med: 'Amoxicillin', taken: false }
        ].map((schedule, index) => (
          <View key={index} style={styles.scheduleItem}>
            <Text style={styles.scheduleTime}>{schedule.time}</Text>
            <Text style={styles.scheduleMed}>{schedule.med}</Text>
            <Badge 
              value={schedule.taken ? "Taken" : "Due"} 
              status={schedule.taken ? "success" : "warning"}
            />
          </View>
        ))}
      </Card>



      <CostForecastOverlay 
        visible={showCostForecast} 
        onClose={() => setShowCostForecast(false)}
      />
    </ScrollView>
  );
};
// Add these new component implementations
const BenefitItem = ({ label, used, total, icon }) => (
    <View style={styles.benefitItem}>
      <Icon name={icon} color={theme.colors.primary} size={24} />
      <Text style={styles.benefitLabel}>{label}</Text>
      <Text style={styles.benefitAmount}>${used} / ${total}</Text>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progress, 
            { width: `${(used/total) * 100}%` }
          ]} 
        />
      </View>
    </View>
  );
  
  const AnalyticItem = ({ value, label, trend }) => (
    <View style={styles.analyticItem}>
      <Text style={styles.analyticValue}>{value}</Text>
      <Text style={styles.analyticLabel}>{label}</Text>
      <Text style={[
        styles.analyticTrend, 
        { color: trend.includes('+') ? theme.colors.success : theme.colors.danger }
      ]}>
        {trend}
      </Text>
    </View>
  );
  
  const CostForecastOverlay = ({ visible, onClose }) => (
    <Overlay isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.overlayContent}>
        <Text style={styles.overlayTitle}>Cost Forecast Details</Text>
        {/* Add detailed forecast content */}
        <Button
          title="Close"
          onPress={onClose}
          buttonStyle={styles.overlayButton}
        />
      </View>
    </Overlay>
  );


// New Preferred Pharmacy Network
const PreferredPharmacyCard = () => (
    <Card containerStyle={styles.pharmacyCard}>
      <Text style={styles.cardTitle}>Your Pharmacy Network</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[
          { name: 'HealthCare Pharmacy', distance: '0.5 mi', savings: '15%' },
          { name: 'MediCare Plus', distance: '1.2 mi', savings: '20%' },
          { name: 'PharmaCare', distance: '2.1 mi', savings: '10%' }
        ].map((pharmacy, index) => (
          <View key={index} style={styles.pharmacyItem}>
            <Icon name="local-pharmacy" color={theme.colors.primary} size={24} />
            <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
            <Text style={styles.pharmacyDistance}>{pharmacy.distance}</Text>
            <Badge value={`Save ${pharmacy.savings}`} status="success" />
          </View>
        ))}
      </ScrollView>
    </Card>
  );
const PriceCheckerCard = () => (
    <Card containerStyle={styles.priceCheckerCard}>
      <Text style={styles.cardTitle}>Quick Price Check</Text>
      <View style={styles.searchContainer}>
        <Icon name="search" color={theme.colors.primary} />
        <TextInput 
          placeholder="Enter medication name"
          style={styles.searchInput}
        />
        <Button
          title="Check"
          type="solid"
          size="sm"
        />
      </View>
      <Text style={styles.recentSearches}>Recent: Amoxicillin, Lisinopril</Text>
    </Card>
  );
const ActionButton = ({ title, icon, color, onPress }) => (
  <TouchableOpacity style={[styles.actionButton, { backgroundColor: color }]} onPress={onPress}>
    <Icon name={icon} color="white" size={24} />
    <Text style={styles.actionText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  insuranceCard: {
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: 15,
    marginTop: 15,
  },
  insuranceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 14,
    color: theme.colors.subtext,
  },
  insuranceProvider: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  insuranceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
    padding: 15,
    borderRadius: theme.borderRadius.md,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: theme.colors.subtext,
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
  },
  actionButton: {
    width: '48%',
    padding: 15,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    color: 'white',
    marginTop: 5,
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  medicationName: {
    flex: 1,
    marginLeft: 10,
  },
  takeButton: {
    borderRadius: theme.borderRadius.sm,
  },
  savingsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: 15,
    borderRadius: theme.borderRadius.md,
  },
  savingsInfo: {
    flex: 1,
    marginLeft: 15,
  },
  savingsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  savingsDescription: {
    color: theme.colors.subtext,
  },
  activityItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  activityText: {
    fontSize: 14,
  },
  activityTime: {
    fontSize: 12,
    color: theme.colors.subtext,
    marginTop: 5,
  },





  
    priceCheckerCard: {
      marginHorizontal: 15,
      borderRadius: theme.borderRadius.lg,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      padding: 10,
      borderRadius: theme.borderRadius.md,
    },
    searchInput: {
      flex: 1,
      marginHorizontal: 10,
    },
    recentSearches: {
      marginTop: 10,
      color: theme.colors.subtext,
      fontSize: 12,
    },
    pharmacyCard: {
      marginHorizontal: 15,
      borderRadius: theme.borderRadius.lg,
    },
    pharmacyItem: {
      width: 150,
      padding: 15,
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.md,
      marginRight: 10,
      alignItems: 'center',
    },
    pharmacyName: {
      marginTop: 10,
      fontWeight: '600',
      textAlign: 'center',
    },
    pharmacyDistance: {
      color: theme.colors.subtext,
      marginVertical: 5,
    },
  });
  <><PriceCheckerCard /><PreferredPharmacyCard /></>

export default HomeScreen;