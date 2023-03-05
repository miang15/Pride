import {
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Linking,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import {responsiveSize, theme} from '../../utils/theme';
import {Images} from '../../constants/Images';
import {useSelector} from 'react-redux';
import {AppLoader} from '../../components/AppLoader/AppLoader';
import http from '../../api/http';
import Swiper from 'react-native-swiper';

const MyMatches = ({navigation}) => {
  const myFavorite = useSelector(state => state.FavoriteReducer.favorite);
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getThirdBanner();
  }, []);

  const getThirdBanner = async () => {
    setLoading(true);
    const bannerRes = await http.get('user/getbannerthird');
    console.log('bannner: third', bannerRes?.data);
    if (bannerRes?.data?.success) {
      setBanner(bannerRes?.data?.banner);
    }
    setLoading(false);
  };

  const openBanner = async val => {
    try {
      await Linking.openURL(val); // This will throw a LinkingException error
    } catch (error) {
      if (error.message.includes('No handler for URL')) {
        Alert.alert('Error', 'Invalid URL');
      } else {
        Alert.alert('Error', 'Failed to open URL');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header
        onBell={() => navigation.navigate('Notify')}
        profile={true}
        bell={true}
        balance={2000}
      />
      <AppLoader loading={loading} />
      <View
        style={{
          height: responsiveSize(110),
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {banner?.length ? (
          <Swiper
            loop={false}
            collapsable={true}
            height={'auto'}
            dotColor={theme.white}
            activeDotColor={theme.text.red}
            pagingEnabled>
            {banner?.map(item => (
              <TouchableOpacity
                key={item}
                onPress={() => openBanner(item?.link)}
                style={styles.bannerView}>
                <Image
                  source={{uri: item?.url}}
                  resizeMode="cover"
                  style={styles.img}
                />
              </TouchableOpacity>
            ))}
          </Swiper>
        ) : null}
      </View>
      <Text style={styles.heading}>MY MATCHES</Text>
      {myFavorite?.length ? (
        <FlatList
          data={myFavorite}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: responsiveSize(5),
            marginVertical: responsiveSize(5),
          }}
          numColumns={2}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Questionair', {
                    streamData: item,
                  })
                }
                style={styles.thumbnail}>
                <Image
                  style={styles.img}
                  source={{uri: item?.thumbnail?.url}}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
        />
      ) : (
        <Text style={styles.nodata}>No Matches Found</Text>
      )}
    </View>
  );
};

export default MyMatches;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.black,
  },
  bannerView: {
    alignSelf: 'center',
    width: responsiveSize(320),
    height: responsiveSize(110),
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.3,
    borderColor: theme.text.gray,
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  heading: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(13),
    marginHorizontal: responsiveSize(15),
    marginVertical: responsiveSize(8),
    fontWeight: 'bold',
  },
  nodata: {
    color: theme.white,
    fontFamily: theme.interbold,
    textAlign: 'center',
    marginVertical: responsiveSize(25),
  },
  thumbnail: {
    width: responsiveSize(165),
    height: responsiveSize(100),
    marginVertical: responsiveSize(2),
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.white,
    marginStart: responsiveSize(5),
  },
});
