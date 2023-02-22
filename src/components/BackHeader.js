import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Images} from '../constants/Images';
import {responsiveSize, theme} from '../utils/theme';

const BackHeader = ({onBackButton}) => {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={onBackButton}>
        <Image source={Images.back} resizeMode="cover" />
      </TouchableOpacity>
      <Image source={Images.minilogo} resizeMode="cover" />
      <View style={{marginRight: responsiveSize(20)}} />
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.black,
    justifyContent: 'space-between',
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(5),
  },
});
