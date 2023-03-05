import React, {useEffect, useState} from 'react';
import Index from './src/navigation/Index';
import {LogBox, Linking, Platform} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {CustomToast} from './src/components/CustomToast/CustomToast';
import FlashMessage from 'react-native-flash-message';
import PushNotification from 'react-native-push-notification';
import {initSocket} from './src/utils/socketHelper';
import {
  APP_ACTION_TYPES,
  showPushNotification,
} from './src/redux/AppRedux/appactions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import {navigationRef} from './src/navigation/RootNavigator';

const App = () => {
  const [first, setFirst] = useState(false);
  LogBox.ignoreLogs(['VirtualizedLists should never be nested inside']);

  useEffect(() => {
    AsyncStorage.getItem('loggedIn')
      .then(token => {
        console.log('then');
        const socket = io(
          `http://ec2-3-109-4-176.ap-south-1.compute.amazonaws.com:5000/`,
          {
            query: {token: token},
          },
        );
        PushNotification.createChannel(
          {
            channelId: 'channel-id', // (required)
            channelName: 'Pride', // (required)
            channelDescription: 'Pride Notification', // (optional) default: undefined.
            playSound: true, // (optional) default: true
            soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
            // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
          },
          created => console.log(`createChannel bottom'${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
        );
        PushNotification.configure({
          onNotification: function (notification) {
            navigationRef.current?.navigate('BottomTab', {screen: 'Home'});
          },
          permissions: {
            alert: true,
            badge: true,
            sound: true,
          },

          popInitialNotification: true,
          requestPermissions: Platform.OS == 'ios',
        });
        if (!first) {
          setFirst(true);
          socket.on('notification', (Message, url) => {
            showPushNotification(Message, url);
            store.dispatch({
              type: APP_ACTION_TYPES.SET_NOTIFICATION,
              payload: {Message: Message, url: url},
            });
          });
        }
        return () => {
          socket.disconnect();
        };
      })
      .catch(error => {
        console.log('Error retrieving token from AsyncStorage:', error);
      });
  }, []);

  return (
    <Provider store={store}>
      <Index />
      <FlashMessage position={'top'} />
    </Provider>
  );
};

export default App;
