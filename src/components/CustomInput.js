import {StyleSheet, TextInput, Image, View} from 'react-native';
import React from 'react';
import {Images} from '../constants/Images';
import {responsiveSize, theme} from '../utils/theme';

const CustomInput = ({
  flag,
  onChangeText,
  placeholder,
  keyboardType,
  max,
  value,
  placeholderTextColor,
  customStyle,
  customInput,
  editable,
}) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      width: '92%',
      borderWidth: 1,
      borderColor: theme.white,
      borderRadius: 10,
      paddingHorizontal: 15,
      marginVertical: responsiveSize(5),
    },
    input: {
      width: flag ? '90%' : '95%',
      marginLeft: flag ? responsiveSize(5) : null,
      paddingVertical: 0,
      height: responsiveSize(40),
      color: theme.white,
      fontSize: responsiveSize(14),
      fontFamily: theme.interbold,
    },
  });
  return (
    <View style={[styles.container, customStyle]}>
      {flag ? <Image source={Images.flag} /> : null}
      <TextInput
        style={[styles.input, customInput]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={max}
        editable={editable}
      />
    </View>
  );
};

export default CustomInput;
