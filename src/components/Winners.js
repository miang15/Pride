import {StyleSheet, Image, Text, View} from 'react-native';
import React from 'react';
import {Images} from '../constants/Images';
import {responsiveSize, theme} from '../utils/theme';
import {useSelector} from 'react-redux';

const Winners = ({data}) => {
  if (data?.length) {
    return (
      <View style={styles.row}>
        {data?.length >= 2 ? (
          <View style={styles.column1}>
            <Image
              style={{
                ...styles.king,
                tintColor: '#C6C6C6',
                left: responsiveSize(35),
              }}
              source={Images.crown}
            />
            <View style={styles.imgView}>
              <Image
                style={styles.img}
                source={data[1]?.url ? {uri: data[1]?.url} : Images.winner2}
                resizeMode="cover"
              />
            </View>
            <View style={styles.textview}>
              <Text numberOfLines={1} style={styles.name}>
                {data[1]?.name}
              </Text>
              <Text numberOfLines={1} style={styles.price}>
                {data[1]?.rank}
              </Text>
            </View>
          </View>
        ) : null}
        <View style={styles.column2}>
          <Image
            style={{...styles.king, tintColor: '#FFC233'}}
            source={Images.crown}
          />
          <View style={styles.imgView}>
            <Image
              style={styles.img}
              source={data[0]?.url ? {uri: data[0]?.url} : Images.winner1}
              resizeMode="cover"
            />
          </View>
          <View style={styles.textview}>
            <Text numberOfLines={1} style={styles.name}>
              {data[0]?.name}
            </Text>
            <Text numberOfLines={1} style={styles.price}>
              {data[0]?.rank}
            </Text>
          </View>
        </View>
        {data?.length >= 3 ? (
          <View style={styles.column3}>
            <Image
              style={{
                ...styles.king,
                tintColor: '#814A43',
                right: responsiveSize(40),
              }}
              source={Images.crown}
            />
            <View style={styles.imgView}>
              <Image
                style={styles.img}
                source={data[2]?.url ? {uri: data[2]?.url} : Images.winner3}
                resizeMode="cover"
              />
            </View>
            <View style={styles.textview}>
              <Text numberOfLines={1} style={styles.name}>
                {data[2]?.name}
              </Text>
              <Text numberOfLines={1} style={styles.price}>
                {data[2]?.rank}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  } else {
    return <Text style={styles.nodata}>No Winners Found</Text>;
  }
};

export default Winners;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: responsiveSize(330),
    height: responsiveSize(215),
    overflow: 'hidden',
    marginTop: responsiveSize(5),
    justifyContent: 'space-between',
  },
  nodata: {
    color: theme.white,
    fontFamily: theme.interbold,
    textAlign: 'center',
    marginVertical: responsiveSize(25),
  },
  king: {
    width: responsiveSize(45),
    height: responsiveSize(45),
    marginTop: responsiveSize(-45),
    zIndex: 9999,
    position: 'absolute',
    alignSelf: 'center',
  },
  column1: {
    width: '46%',
    alignSelf: 'flex-end',

    alignItems: 'flex-start',
  },
  column2: {
    alignItems: 'center',
    width: '46%',
    alignSelf: 'flex-end',

    position: 'absolute',
    zIndex: 9999,
    marginLeft: responsiveSize(88),
    top: responsiveSize(40),
  },
  column3: {
    width: '46%',
    alignSelf: 'flex-end',

    alignItems: 'flex-end',
  },
  imgView: {
    width: responsiveSize(120),
    height: responsiveSize(120),
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 100,
    borderColor: 'red',
    borderWidth: 1,
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  name: {
    color: theme.text.gray,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(11),
  },
  price: {
    color: theme.text.gray,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(11),
  },
  textview: {
    width: '80%',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
