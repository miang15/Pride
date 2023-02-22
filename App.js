import React, {useEffect} from 'react';
import Index from './src/navigation/Index';
import {LogBox, Platform} from 'react-native';
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

const App = () => {
  LogBox.ignoreLogs(['VirtualizedLists should never be nested inside']);
  useEffect(() => {
    NotifyListener();
  }, []);

  const NotifyListener = async () => {
    const socket = await initSocket();

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
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: Platform.OS == 'ios',
    });
    socket.on('notification', (Message, url) => {
      showPushNotification(Message);
      store.dispatch({
        type: APP_ACTION_TYPES.SET_NOTIFICATION,
        payload: {Message: Message, url: url},
      });
    });
  };
  return (
    <Provider store={store}>
      <Index />
      <FlashMessage position={'top'} />
    </Provider>
  );
};

export default App;
