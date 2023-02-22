import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {responsiveSize, theme} from '../utils/theme';

const CustomButton = ({customStyle, title, labelStyle, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={[styles.container, customStyle]}>
      <Text style={[styles.label, labelStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.primary,
    width: '92%',
    alignSelf: 'center',
    marginVertical: responsiveSize(5),
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },
  label: {
    color: theme.white,
    fontSize: responsiveSize(14),
    fontFamily: theme.interbold,
  },
});
