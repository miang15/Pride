import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import {theme} from '../../utils/theme';
import {Images} from '../../constants/Images';
import {responsiveSize} from '../../utils/theme';
import Swiper from 'react-native-swiper';
import http from '../../api/http';
import FastImage from 'react-native-fast-image';
import {AppLoader} from '../../components/AppLoader/AppLoader';

const Home = ({navigation}) => {
  const [data, setData] = useState([
    {
      id: 1,
      img: Images.game1,
    },
    {
      id: 2,
      img: Images.game2,
    },
    {
      id: 3,
      img: Images.game3,
    },
    {
      id: 4,
      img: Images.game4,
    },
  ]);
  const [data2, setData2] = useState([
    {
      id: 1,
      img: Images.thumbnail1,
    },
    {
      id: 2,
      img: Images.thumbnail3,
    },
    {
      id: 3,
      img: Images.thumbnail4,
    },
    {
      id: 4,
      img: Images.thumbnail5,
    },
    {
      id: 5,
      img: Images.thumbnail2,
    },
    {
      id: 6,
      img: Images.thumbnail1,
    },
  ]);
  const [refreshing, setRefreshing] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [selected, setSelected] = useState('ALL');
  const [allStreams, setAllStreams] = useState([]);
  const [allStreamBanner, setAllStreamBanners] = useState([]);
  const [nowStreaming, setNowStreaming] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCategory();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getAllCategory();
    }, 2000);
  }, []);

  const getAllCategory = async () => {
    setLoading(true);
    const allCatgRes = await http.get('admin/allcategory');

    if (allCatgRes?.data) {
      setAllCategory(allCatgRes?.data?.category);
    }

    const allBanner = await http.get('user/getbannermain');

    if (allBanner?.data?.success) {
      setAllStreamBanners(allBanner?.data?.banner);
    }

    getAllStreamData();
    setLoading(false);
  };

  const getAllStreamData = async () => {
    setLoading(true);
    const allStreamRes = await http.get('user/streams');
    if (allStreamRes?.data?.success) {
      setSelected('ALL');
      const arr = allStreamRes?.data?.streams?.filter(item => item?.url);
      setNowStreaming(arr);
      setAllStreams(allStreamRes?.data?.streams);
    }
    setLoading(false);
  };

  const getAllStream = async val => {
    setLoading(true);
    const data = {
      category: val,
    };
    const allStreams = await http.post('user/streambycategory', data);

    if (allStreams?.data) {
      setAllStreams(allStreams?.data?.streams);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.black} barStyle={'light-content'} />
      <AppLoader loading={loading} />
      <Header
        onBell={() => navigation.navigate('Notify')}
        bell={true}
        balance={2000}
        profile={true}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        {allStreamBanner?.length ? (
          <Swiper
            loop={false}
            height={responsiveSize(178)}
            dotColor={theme.white}
            activeDotColor={theme.text.red}
            pagingEnabled>
            {allStreamBanner?.map(item => (
              <View style={styles.imgView}>
                <Image
                  style={styles.img}
                  source={{uri: item?.url}}
                  resizeMode="cover"
                />
              </View>
            ))}
          </Swiper>
        ) : null}
        {nowStreaming?.length ? (
          <>
            <Text style={styles.label}>NOW STREAMING</Text>
            <FlatList
              style={{marginTop: responsiveSize(10)}}
              data={nowStreaming}
              scrollEnabled={true}
              nestedScrollEnabled={true}
              horizontal
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Questionair', {
                        streamData: item,
                      })
                    }
                    style={{
                      ...styles.thumbnail,
                      marginRight: responsiveSize(10),
                    }}>
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
          </>
        ) : (
          <Text style={styles.nodata}>No Live Stream Found</Text>
        )}
        <Text style={styles.choose}>Choose Your Game</Text>

        {allCategory?.length ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                setSelected('ALL');
                getAllStreamData();
              }}
              activeOpacity={0.6}
              style={{
                ...styles.all,
                borderWidth: selected == 'ALL' ? 2 : 1,
                borderColor: selected == 'ALL' ? theme.secondary : theme.white,
              }}>
              <Text style={styles.alltext}>ALL</Text>
            </TouchableOpacity>
            <FlatList
              style={{flexGrow: 0}}
              contentContainerStyle={styles.content}
              horizontal
              data={allCategory}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected(item?._id);
                      getAllStream(item?._id);
                    }}
                    activeOpacity={0.6}
                    style={{
                      ...styles.game,
                      borderWidth: selected == item?._id ? 2 : 1,
                      borderColor:
                        selected == item?._id ? theme.secondary : theme.white,
                    }}>
                    <Image
                      resizeMode="cover"
                      style={{
                        width: '100%',
                        height: '100%',
                        alignSelf: 'center',
                      }}
                      source={{uri: item?.image?.url}}
                    />
                  </TouchableOpacity>
                );
              }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index}
            />
          </View>
        ) : (
          <Text style={styles.nodata}>No Game Found</Text>
        )}

        <View
          style={{
            marginTop: responsiveSize(10),
            height: responsiveSize(280),
          }}>
          {allStreams?.length ? (
            <FlatList
              data={allStreams}
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
            <Text style={styles.nodata}>No Stream Found</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.black,
  },
  nodata: {
    color: theme.white,
    fontFamily: theme.interbold,
    textAlign: 'center',
    marginVertical: responsiveSize(25),
  },
  imgView: {
    width: 380,
    height: 168,
    overflow: 'hidden',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: responsiveSize(20),
    borderWidth: 1,
    borderColor: theme.white,
    borderRadius: 10,
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  content: {
    marginStart: responsiveSize(15),
  },
  game: {
    marginRight: responsiveSize(20),
    borderRadius: 8,
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.white,
  },
  all: {
    marginLeft: responsiveSize(20),
    borderRadius: 8,
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.white,
  },
  alltext: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(14),
    textAlign: 'center',
  },
  choose: {
    color: theme.white,
    fontSize: responsiveSize(12),
    margin: responsiveSize(15),
    fontFamily: theme.interbold,
    fontWeight: 'bold',
  },
  textrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: responsiveSize(15),
  },
  label: {
    color: theme.white,
    fontSize: responsiveSize(12),
    fontFamily: theme.interbold,
    marginHorizontal: responsiveSize(15),
    marginTop: responsiveSize(15),
    fontWeight: 'bold',
  },
  seeall: {
    backgroundColor: theme.yellow,
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(11),
    paddingHorizontal: responsiveSize(6),
    justifyContent: 'center',
    textAlign: 'center',
  },
  thumbnail: {
    width: responsiveSize(165),
    height: responsiveSize(100),
    marginVertical: responsiveSize(2),
    borderRadius: 10,
    overflow: 'hidden',
    marginStart: responsiveSize(10),
    borderWidth: 1,
    borderColor: theme.white,
  },
});
