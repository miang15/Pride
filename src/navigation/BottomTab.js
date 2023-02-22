import {StyleSheet, Text, Linking, Platform, Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import Ranking from '../screens/Ranking/Ranking';
import MyMatches from '../screens/MyMatches/MyMatches';
import {Images} from '../constants/Images';
import {responsiveSize, theme} from '../utils/theme';
import {useDispatch} from 'react-redux';
import {getFavoriteAction} from '../redux/Favorite/favoriteAction';
import {
  getAllStreamerAction,
  getAllUserAction,
  getMyProfileAction,
} from '../redux/Auth/authactions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../redux/store';
import {initSocket} from '../utils/socketHelper';
import PushNotification from 'react-native-push-notification';
import {
  APP_ACTION_TYPES,
  showPushNotification,
} from '../redux/AppRedux/appactions';

const Tab = createBottomTabNavigator();

const BottomTab = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavoriteAction());
    dispatch(getMyProfileAction());
    dispatch(getAllStreamerAction());
    dispatch(getAllUserAction());
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.secondary,
          height: responsiveSize(50),
          paddingBottom: responsiveSize(3),
          borderColor: theme.secondary,
        },
        tabBarLabelStyle: {
          color: theme.white,
          fontFamily: theme.interbold,
          textTransform: 'uppercase',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                tintColor: focused ? theme.tabicon : theme.white,
              }}
              source={Images.home}
              resizeMode="contain"
            />
          ),
          tabBarShowLabel: true,
          tabBarLabel: 'HOME',
        }}
      />
      <Tab.Screen
        name="MyMatches"
        component={MyMatches}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                tintColor: focused ? theme.tabicon : theme.white,
              }}
              source={Images.gametab}
              resizeMode="contain"
            />
          ),
          tabBarShowLabel: true,
          tabBarLabel: 'MY MATCHES',
        }}
      />
      <Tab.Screen
        name="Ranking"
        component={Ranking}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                tintColor: focused ? theme.tabicon : theme.white,
              }}
              source={Images.ranking}
              resizeMode="contain"
            />
          ),
          tabBarShowLabel: true,
          tabBarLabel: 'RANKING',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                tintColor: focused ? theme.tabicon : theme.white,
              }}
              source={Images.profiletab}
              resizeMode="contain"
            />
          ),
          tabBarShowLabel: true,
          tabBarLabel: 'PROFILE',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
