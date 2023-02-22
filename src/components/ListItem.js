import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import React from 'react';
import {Images} from '../constants/Images';
import {responsiveSize, theme} from '../utils/theme';
import FastImage from 'react-native-fast-image';

const ListItem = ({customStyle, title, num, img, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.row, customStyle]}>
      {num ? <Text style={styles.num}>{num}</Text> : null}
      {img ? <Image source={img} /> : null}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  row: {
    backgroundColor: theme.dullpurple,
    alignSelf: 'center',
    width: responsiveSize(330),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(12),
    marginVertical: responsiveSize(3),
  },
  title: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(13),
    marginLeft: responsiveSize(10),
  },
  num: {
    color: theme.white,
    fontSize: responsiveSize(14),
    fontFamily: theme.interbold,
  },
});
