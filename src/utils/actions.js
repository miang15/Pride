import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocalStorage = async (key, val) => {
  return await AsyncStorage.setItem(key, val);
};

export const getLocalStorage = async key => {
  return await AsyncStorage.getItem(key);
};

export const clearLocalStorage = async () => {
  return await AsyncStorage.clear();
};
