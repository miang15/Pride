import {
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header';
import {responsiveSize, theme} from '../../utils/theme';
import {Images} from '../../constants/Images';
import {useSelector} from 'react-redux';

const MyMatches = ({navigation}) => {
  const myFavorite = useSelector(state => state.FavoriteReducer.favorite);
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

  return (
    <View style={styles.container}>
      <Header
        onBell={() => navigation.navigate('Notify')}
        profile={true}
        bell={true}
        balance={2000}
      />
      <TouchableOpacity style={styles.bannerView}>
        <Image
          source={Images.bannerads}
          resizeMode="cover"
          style={styles.img}
        />
      </TouchableOpacity>
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
    height: responsiveSize(100),
    borderRadius: 10,
    marginVertical: responsiveSize(15),
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
