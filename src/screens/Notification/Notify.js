import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  View,
  FlatList,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {responsiveSize, theme} from '../../utils/theme';
import Header from '../../components/Header';
import {Images} from '../../constants/Images';
import http, {BASE_URL} from '../../api/http';
import io from 'socket.io-client';
import {getLocalStorage} from '../../utils/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppLoader} from '../../components/AppLoader/AppLoader';
import {useSelector} from 'react-redux';
import {showPushNotification} from '../../redux/AppRedux/appactions';
import CustomButton from '../../components/CustomButton';

const Notify = ({navigation}) => {
  const [allNotifications, setAllNotifications] = useState([]);
  const notifications = useSelector(state => state.AppReducer.notifications);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (notifications?.length) {
      setAllNotifications([...allNotifications, ...notifications]);
    }
  }, [notifications]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getAllNotify();
    });
  }, []);

  const getAllNotify = async () => {
    setLoading(true);
    const notifyRes = await http.get('user/getallnotification');
    if (notifyRes?.data?.success) {
      setAllNotifications(notifyRes?.data?.notification);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Header />
      <AppLoader loading={loading} />
      <View style={styles.row}>
        <Text style={styles.heading}>NOTIFICATIONS</Text>
        <CustomButton
          customStyle={{width: '25%', paddingVertical: 5, borderRadius: 5}}
          onPress={() => setAllNotifications([])}
          title={'Clear All'}
        />
      </View>

      {allNotifications?.length ? (
        <FlatList
          style={{marginVertical: '5%'}}
          data={allNotifications}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => Linking.openURL(item?.url)}
                style={styles.notifyview}>
                <View style={styles.imgview}>
                  <Image
                    style={styles.img}
                    source={item?.url ? {uri: item?.url} : Images.offer}
                    resizeMode="cover"
                  />
                </View>
                <Text numberOfLines={2} style={styles.notify}>
                  {item?.Message}
                </Text>
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
        />
      ) : null}
    </View>
  );
};

export default Notify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.black,
  },
  row: {
    marginHorizontal: responsiveSize(15),
    marginTop: responsiveSize(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(13),
    fontWeight: 'bold',
  },
  clear: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(13),
  },
  imgview: {
    alignSelf: 'center',
    width: '100%',
    height: responsiveSize(100),
    overflow: 'hidden',
    borderRadius: 10,
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  notifyview: {
    backgroundColor: theme.darkgray,
    alignSelf: 'center',
    width: responsiveSize(330),
    paddingVertical: responsiveSize(15),
    paddingHorizontal: responsiveSize(12),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: responsiveSize(15),
  },
  notify: {
    color: theme.white,
    fontSize: responsiveSize(13),
    fontFamily: theme.interbold,
    marginVertical: responsiveSize(4),
  },
});
