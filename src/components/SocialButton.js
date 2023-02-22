import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Images} from '../constants/Images';
import {responsiveSize, theme} from '../utils/theme';

const SocialButton = ({onPress, icon, title}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={styles.row}>
      <Image source={icon} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '92%',
    alignSelf: 'center',
    backgroundColor: theme.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingHorizontal: 15,
    paddingVertical: responsiveSize(14),
    marginVertical: responsiveSize(10),
    borderRadius: 10,
  },
  title: {
    color: theme.black,
    fontSize: responsiveSize(11),
    fontFamily: theme.interbold,
    marginLeft: responsiveSize(15),
  },
});
