import React, { useEffect,useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Animated,
  Platform,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
//import { useFonts, Poppins_700Bold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { 
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
 /*  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_500Medium,
  }); */


   // 1. Load fonts
   let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  });

  // 2. Create animation values using useState
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  // 3. Handle animations in useEffect
  useEffect(() => {
    if (fontsLoaded) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [fontsLoaded]);

  // 4. Remove duplicate font check
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#FFC947', '#FFB830']}
        style={styles.gradientBackground}
      >
        <View style={styles.header}>
          <Image
            source={require('../../assets/icons8-insurance-64.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Animated.View 
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.content}>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.title}>Health360</Text>
            <Text style={styles.subtitle}>
              Your Health, Our Priority
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.mainButton}
                onPress={() => navigation.navigate('Login')}
              >
                <LinearGradient
                  colors={['#FFC947', '#FFB830']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Go to App</Text>
                  <Icon name="arrow-forward" size={20} color="#FFF" />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.outlineButton}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.outlineButtonText}>Sign In</Text>
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.line} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.line} />
              </View>

              <View style={styles.alternativeButtons}>
                <TouchableOpacity 
                  style={styles.altButton}
                  onPress={() => navigation.navigate('USSD')}
                >
                  <Icon name="phone" size={24} color="#FFC947" />
                  <Text style={styles.altButtonText}>USSD</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.altButton}
                  onPress={() => navigation.navigate('PharmacyLogin')}
                >
                  <Icon name="store" size={24} color="#FFC947" />
                  <Text style={styles.altButtonText}>Pharmacy Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text style={styles.footerText}>
            By continuing, you agree to our Terms & Privacy Policy
          </Text>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color:'transparent'
  },
  gradientBackground: {
    flex: 1,
  },
  header: {
    height: height * 0.22,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
  },
  logo: {
    width: width * 0.4,
    height: height * 0.15,
  },
  contentContainer: {
    flex: 1.8,
    backgroundColor: '#fff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  content: {
    flex: 1,
  },
  welcomeText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 26,
    color: '#555',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 42,
    color: '#222',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,
    color: '#666',
    marginBottom: 32,
  },
  buttonContainer: {
    marginTop: 32,
    gap: 16,
  },
  mainButton: {
    height: 54,
    borderRadius: 27,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#FFC947',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontFamily: 'Poppins_700Bold',
    color: '#FFF',
    fontSize: 18,
  },
  outlineButton: {
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: '#FFC947',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineButtonText: {
    fontFamily: 'Poppins_500Medium',
    color: '#FFC947',
    fontSize: 18,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E1E1E1',
  },
  dividerText: {
    fontFamily: 'Poppins_500Medium',
    color: '#666',
    paddingHorizontal: 16,
  },
  alternativeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  altButton: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFF8E7',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 0.47,
  },
  altButtonText: {
    fontFamily: 'Poppins_500Medium',
    color: '#FFC947',
    fontSize: 14,
  },
  footerText: {
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginTop: 24,
  },
});
