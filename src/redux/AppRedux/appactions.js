import {initSocket} from '../../utils/socketHelper';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

export const APP_ACTION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  SET_TOAST: 'SET_TOAST',
  SET_NOTIFICATION: 'SET_NOTIFICATION',
};

export const setLoadingAction = payload => {
  return dispatch => {
    return dispatch({
      type: APP_ACTION_TYPES.SET_LOADING,
      payload,
    });
  };
};

export const setToastAction = payload => {
  return dispatch => {
    return dispatch({
      type: APP_ACTION_TYPES.SET_TOAST,
      payload: payload,
    });
  };
};

export const showPushNotification = (message, url) => {
  console.log('show: ', message);

  PushNotification.localNotification({
    title: 'Pride',
    message: message,
    data: {
      link: url,
    },
    channelId: 'channel-id',
  });
};

export const socketMiddleware = store => next => async action => {
  if (action.type === 'INIT_SOCKET') {
    console.log('1111');
    // const socket = await initSocket();

    // PushNotification.createChannel(
    //   {
    //     channelId: 'channel-id', // (required)
    //     channelName: 'Pride', // (required)
    //     channelDescription: 'Pride Notification', // (optional) default: undefined.
    //     playSound: true, // (optional) default: true
    //     soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    //     // (optional) default: Importance.HIGH. Int value of the Android notification importance
    //     vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    //   },
    //   created => console.log(`createChannel bottom'${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    // );
    // PushNotification.configure({
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true,
    //   },

    //   popInitialNotification: true,
    //   requestPermissions: Platform.OS == 'ios',
    // });
    // socket.on('notification', (Message, url) => {
    //   showPushNotification(Message);
    //   store.dispatch({
    //     type: APP_ACTION_TYPES.SET_NOTIFICATION,
    //     payload: {Message: Message, url: url},
    //   });
    // });
  }
  return next(action);
};
