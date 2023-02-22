import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';

export const initSocket = async () => {
  try {
    const token = await AsyncStorage.getItem('loggedIn');
    if (token) {
      console.log('token helper: ', token);
      const socket = io(
        `http://ec2-3-109-4-176.ap-south-1.compute.amazonaws.com:5000/`,
        {
          query: {token: token},
        },
      );
      return socket;
    }
  } catch (error) {
    console.log(error, 'here error');
    return null;
  }
};
