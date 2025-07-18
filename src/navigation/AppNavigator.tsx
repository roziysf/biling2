import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import InternetPackagesScreen from '../screens/InternetPackagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PaymentDetailsScreen from '../screens/PaymentDetailsScreen';
import PaymentHistoryScreen from '../screens/PaymentHistoryScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccess';
import AdminScreen from '../screens/AdminScreen';
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Dashboard: undefined;
  InternetPackages:undefined;
  Profile:undefined;
  PaymentDetails:undefined
  PaymentHistory:undefined
  PaymentMetods:undefined
  PaymentSuccess:undefined
  AdminScreen:undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="InternetPackages" component={InternetPackagesScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="PaymentDetails" component={PaymentDetailsScreen} />
        <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
        <Stack.Screen name="PaymentMetods" component={PaymentMethodsScreen} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
