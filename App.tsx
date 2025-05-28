import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {Amplify} from 'aws-amplify';
import outputs from './amplify_outputs.json';
import type {Schema} from './amplify/data/resource';
import {generateClient} from 'aws-amplify/data';

Amplify.configure(outputs);
const client = generateClient<Schema>();
const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const {width} = Dimensions.get('window');

  const [services, setServices] = useState<Schema['Service']['type'][]>([]);

  const fetchServices = async () => {
    const {data: items, errors} = await client.models.Service.list();
    setServices(items);
  };
  useEffect(() => {
    fetchServices();
  }, []);

  const data = [
    {title: 'Amplify', description: 'Build full-stack web & mobile apps'},
    {title: 'AppSync', description: 'Managed GraphQL service'},
    {title: 'Cognito', description: 'Authentication & user management'},
    {title: 'Pinpoint', description: 'User engagement & communications'},
    {title: 'Location Service', description: 'Maps & location features'},
    {title: 'Device Farm', description: 'Test on real devices'},
  ];

  const createServices = async () => {
    for (var i = 0; i < data.length; i++) {
      await client.models.Service.create(data[i]);
    }
    fetchServices();
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#232F3E' : '#FFFFFF', // AWS dark blue or white
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* Hero Section */}
        <View style={[styles.heroSection, isDarkMode && styles.darkSection]}>
          <Text style={[styles.heroTitle, isDarkMode && styles.lightText]}>
            Welcome to the Demo
          </Text>
          <Text
            style={[styles.heroDescription, isDarkMode && styles.lightText]}>
            Explore AWS services for building exceptional mobile and web
            experiences
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              accessible={true}
              accessibilityRole="button"
              testID="get_started_button"
              accessibilityLabel="get_started_button"
              onPress={() => {
                Alert.alert('Button Pressed!');
              }}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessible={true}
              accessibilityRole="button"
              testID="learn_more_button"
              accessibilityLabel="learn_more_button"
              style={styles.secondaryButton}
              onPress={() => {
                createServices();
              }}>
              <Text style={styles.secondaryButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Services Section */}
        <View
          style={[styles.servicesContainer, isDarkMode && styles.darkSection]}>
          <Text
            accessible={true}
            accessibilityRole="text"
            testID="our_services_label"
            accessibilityLabel="our_services_label"
            style={[styles.sectionTitle, isDarkMode && styles.lightText]}>
            Our Services
          </Text>
          <View style={styles.servicesGrid}>
            {services.map((service, index) => (
              <TouchableOpacity
                onPress={async () => {
                  await client.models.Service.delete({id: service.id});
                  fetchServices();
                }}
                key={index}
                style={[
                  styles.serviceCard,
                  isDarkMode ? styles.darkCard : styles.lightCard,
                  {width: width / 2 - 24},
                ]}>
                <View style={styles.serviceIconPlaceholder}>
                  <Text style={styles.serviceIconText}>
                    {service.title!.charAt(0)}
                  </Text>
                </View>
                <Text
                  style={[styles.serviceName, isDarkMode && styles.lightText]}>
                  {service.title!}
                </Text>
                <Text
                  style={[
                    styles.serviceDescription,
                    isDarkMode && styles.lightText,
                  ]}>
                  {service.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Footer Section */}

        <View style={[styles.footer, isDarkMode && styles.darkFooter]}>
          <Text style={[styles.footerText, isDarkMode && styles.lightText]}>
            Built with AWS Amplify
          </Text>
          <Text
            style={[styles.footerCopyright, isDarkMode && styles.lightText]}>
            © {new Date().getFullYear()} Amazon Web Services
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FF9900', // AWS orange
  },
  logoContainer: {
    marginBottom: 16,
  },
  awsLogo: {
    backgroundColor: '#FF9900', // AWS orange
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  awsLogoText: {
    color: '#232F3E', // AWS dark blue
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  heroSection: {
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#FF9900', // AWS orange
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginRight: 12,
  },
  buttonText: {
    color: '#232F3E', // AWS dark blue
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#FF9900', // AWS orange
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  secondaryButtonText: {
    color: '#FF9900', // AWS orange
    fontWeight: 'bold',
    fontSize: 16,
  },
  servicesContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 4,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lightCard: {
    backgroundColor: '#FFFFFF',
  },
  darkCard: {
    backgroundColor: '#1A232E',
  },
  serviceIconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF9900', // AWS orange
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceIconText: {
    color: '#232F3E', // AWS dark blue
    fontWeight: 'bold',
    fontSize: 18,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  darkFooter: {
    borderTopColor: '#3A4553',
  },
  footerText: {
    fontSize: 14,
    marginBottom: 8,
  },
  footerCopyright: {
    fontSize: 12,
    opacity: 0.7,
  },
  darkSection: {
    borderBottomColor: '#3A4553',
  },
  lightText: {
    color: '#FFFFFF',
  },
});

export default App;
