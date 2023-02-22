import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Images} from '../constants/Images';
import {responsiveSize, theme} from '../utils/theme';
import {useSelector} from 'react-redux';

const Header = ({onDrawer, bell, onBell, onWallet, balance, profile}) => {
  const user = useSelector(state => state.AuthReducer.user);
  return (
    <View style={styles.row}>
      <Image source={Images.minilogo} />
      {profile ? (
        <View style={styles.row2}>
          {bell ? (
            <TouchableOpacity
              style={{marginRight: responsiveSize(10)}}
              onPress={onBell}
              activeOpacity={0.6}>
              <Image source={Images.Notification} />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity onPress={onWallet} style={styles.walletRow}>
            <Image source={Images.wallet} />
            <Text numberOfLines={1} style={styles.balance}>
              {user?.balance || 0}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  row: {
    backgroundColor: theme.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(3),
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',

    alignSelf: 'center',
    width: '35%',
    overflow: 'hidden',
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.primary,
    paddingHorizontal: responsiveSize(4),
    paddingVertical: responsiveSize(2),
    borderRadius: 5,
    overflow: 'hidden',
    width: '55%',
    marginRight: responsiveSize(5),
  },
  balance: {
    color: theme.white,
    fontSize: responsiveSize(10),
    fontFamily: theme.interbold,
    width: '75%',
    marginHorizontal: responsiveSize(3),
    overflow: 'hidden',
  },
});
