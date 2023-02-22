import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Images} from '../constants/Images';
import {responsiveSize, theme} from '../utils/theme';
import {getLocalStorage} from '../utils/actions';
import {useSelector} from 'react-redux';

const Splash = ({navigation}) => {
  useEffect(() => {
    navigation.addListener('focus', () => {
      handleSession();
    });
  }, []);

  const handleSession = async () => {
    const token = await getLocalStorage('loggedIn');
    setTimeout(() => {
      if (token) {
        navigation.replace('BottomTab');
      } else {
        navigation.replace('Login');
      }
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.black} barStyle={'light-content'} />
      <ImageBackground style={styles.container} source={Images.splash}>
        <Image style={styles.logo} source={Images.blacklogo} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  logo: {
    marginBottom: responsiveSize(30),
    alignSelf: 'center',
  },
});
