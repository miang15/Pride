import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Login from '../screens/Auth/Login';
import About from '../screens/Auth/About';
import Home from '../screens/Home/Home';
import Questionair from '../screens/Home/Questionair';
import Profile from '../screens/Profile/Profile';
import VerifyOTP from '../screens/Auth/VerifyOTP';
import {navigationRef} from './RootNavigator';
import BiddingHistory from '../screens/History/BiddingHistory';
import TransactionHistory from '../screens/History/TransactionHistory';
import {Platform} from 'react-native';
import Notify from '../screens/Notification/Notify';
import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator();
const Index = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Questionair" component={Questionair} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
        <Stack.Screen name="BiddingHistory" component={BiddingHistory} />
        <Stack.Screen name="Notify" component={Notify} />
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistory}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
