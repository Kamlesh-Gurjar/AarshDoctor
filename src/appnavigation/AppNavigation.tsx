import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {AddSlotsScreen, EditSlotsScreen, ForgotPassword, ResetPasswordScreen, VerifyOtpScreen} from '../screens';
import {SplashScreen} from '../screens';
import {Login} from '../screens';
import Appointments from '../screens/appointments/Appointments';
import AppointmentDetailsScreen from '../screens/appointmentdetails/AppointmentDetailsScreen';
import ProfileDetailsScreen from '../screens/profiledetails/ProfileDetailsScreen';
import Tabs from './Tabs';
import BankDetailsScreen from '../screens/bankdetails/BankDetailsScreen';
import CertificationsScreen from '../screens/certifications/CertificationsScreen';
import ManageSubscriptionScreen from '../screens/managesubscription/ManageSubscriptionScreen';

const AppNavigation = () => {
  // const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  // useEffect(() => {
  //   const checkFirstLaunch = async () => {
  //     const hasLaunched = await AsyncStorage.getItem('hasLaunched');
  //     if (hasLaunched === null) {
  //       await AsyncStorage.setItem('hasLaunched', 'true');
  //       setIsFirstLaunch(true);
  //     } else {
  //       setIsFirstLaunch(false);
  //     }
  //   };

  //   checkFirstLaunch();
  // }, []);

  // if (isFirstLaunch === null) {
  //   return null; // or a loading spinner
  // }
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Splash'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="BankDetails" component={BankDetailsScreen} />
        <Stack.Screen name="Certifications" component={CertificationsScreen} />
        <Stack.Screen
          name="ManageSubscription"
          component={ManageSubscriptionScreen}
        />

        <Stack.Screen name="Appointments" component={Appointments} />
        <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

        <Stack.Screen
          name="AppointmentDetails"
          component={AppointmentDetailsScreen}
        />

        <Stack.Screen
          name="EditSlots"
          component={EditSlotsScreen}
        /><Stack.Screen
          name="AddSlots"
          component={AddSlotsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
