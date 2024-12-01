import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Dimensions,
  StatusBar 
} from 'react-native';
import { Button, Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');

const LoadingSpinner = () => {
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Icon name="medical-services" size={50} color="#fff" />
    </Animated.View>
  );
};

export default function WelcomeScreen({ navigation }) {
  const [showContent, setShowContent] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {!showContent ? (
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
          <Text style={styles.loadingText}>HealthPharma</Text>
        </View>
      ) : (
        <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
          <View style={styles.header}>
            <Icon name="medical-services" size={80} color="#FFC947" />
            <Text style={styles.title}>HealthPharma</Text>
            <Text style={styles.subtitle}>Your Health, Our Priority</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Continue with App"
              icon={{
                name: 'arrow-forward',
                size: 20,
                color: 'white',
              }}
              iconRight
              buttonStyle={styles.primaryButton}
              containerStyle={styles.buttonWrapper}
              onPress={() => navigation.navigate('Login')}
            />

            <Button
              title="Use USSD Service"
              type="outline"
              buttonStyle={styles.secondaryButton}
              containerStyle={styles.buttonWrapper}
              titleStyle={{ color: '#FFC947' }}
              onPress={() => navigation.navigate('USSDInfo')}
            />

            <Button
              title="Register as Pharmacy"
              type="clear"
              titleStyle={{ color: '#666' }}
              containerStyle={styles.buttonWrapper}
              onPress={() => navigation.navigate('PharmacyRegistration')}
            />
          </View>

          <Text style={styles.footer}>
            Connecting patients with pharmacies
          </Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: width * 0.2,
    marginBottom: width * 0.1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 8,
  },
  buttonContainer: {
    marginTop: width * 0.1,
  },
  buttonWrapper: {
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#FFC947',
    borderRadius: 8,
    padding: 15,
  },
  secondaryButton: {
    borderColor: '#FFC947',
    borderRadius: 8,
    padding: 15,
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    color: '#666',
  },
});
