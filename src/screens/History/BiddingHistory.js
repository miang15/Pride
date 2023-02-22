import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {responsiveSize, theme} from '../../utils/theme';
import {Images} from '../../constants/Images';
import {AppLoader} from '../../components/AppLoader/AppLoader';
import http from '../../api/http';
import BackHeader from '../../components/BackHeader';
import Header from '../../components/Header';

const BiddingHistory = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([
    {
      id: 1,
      amount: 400,
    },
    {
      id: 2,
      amount: 250,
    },
    {
      id: 3,
      amount: 350,
    },
  ]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getBiddingHistory();
    });
  }, []);

  const getBiddingHistory = async () => {
    setLoading(true);
    const history = await http.get('user/mybids');
    console.log('bidd: ', history?.data?.bids);
    if (history?.data) {
      setHistory(history?.data?.bids);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <AppLoader loading={loading} />
      <Text style={styles.heading}>PREDICTION HISTORY</Text>
      <View style={styles.labelrow}>
        <Text style={styles.label1} numberOfLines={1}>
          MATCH NAME
        </Text>
        <Text style={styles.label2} numberOfLines={1}>
          COINS SPENT
        </Text>
        <Text style={styles.label3} numberOfLines={1}>
          COINS WON
        </Text>
        <Text style={styles.label4} numberOfLines={1}>
          RESULT
        </Text>
      </View>
      {history?.length ? (
        <FlatList
          style={{marginTop: responsiveSize(10)}}
          data={history}
          renderItem={({item, index}) => {
            return (
              <View style={styles.labelrow2}>
                <Text style={styles.label1} numberOfLines={1}>
                  {item?.stream_id?.title}
                </Text>
                <Text style={styles.label2} numberOfLines={1}>
                  {item?.amount}
                </Text>
                <Text style={styles.label3} numberOfLines={1}>
                  {item?.amount_won}
                </Text>
                <Text style={styles.label4} numberOfLines={1}>
                  {item?.status}
                </Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
        />
      ) : (
        <Text style={styles.nodata}>No History Found</Text>
      )}
    </SafeAreaView>
  );
};

export default BiddingHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.black,
  },
  row: {
    borderWidth: 1,
    borderColor: theme.white,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: responsiveSize(8),
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(15),
    borderRadius: 12,
  },
  index: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(12),
    marginRight: responsiveSize(10),
  },
  amount: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(12),
  },
  nodata: {
    color: theme.white,
    fontFamily: theme.interbold,
    textAlign: 'center',
    marginVertical: responsiveSize(25),
  },
  header: {
    alignSelf: 'center',
    marginTop: responsiveSize(5),
  },
  heading: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(15),
    marginHorizontal: responsiveSize(15),
    marginTop: responsiveSize(30),
  },
  labelrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: responsiveSize(3),
    marginTop: responsiveSize(10),
    width: responsiveSize(365),
    alignSelf: 'center',
  },
  labelrow2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: responsiveSize(5),
    width: responsiveSize(360),
    alignSelf: 'center',
    backgroundColor: theme.dullpurple,
    paddingVertical: responsiveSize(15),
    borderRadius: 8,
  },
  label1: {
    color: theme.white,
    fontSize: responsiveSize(11),
    fontFamily: theme.interbold,
    width: responsiveSize(100),
    textAlign: 'center',
  },
  label2: {
    color: theme.white,
    fontSize: responsiveSize(11),
    fontFamily: theme.interbold,
    width: responsiveSize(80),
    textAlign: 'center',
  },
  label3: {
    color: theme.white,
    fontSize: responsiveSize(11),
    fontFamily: theme.interbold,
    width: responsiveSize(80),
    textAlign: 'center',
  },
  label4: {
    color: theme.white,
    fontSize: responsiveSize(11),
    fontFamily: theme.interbold,
    width: responsiveSize(80),
    textAlign: 'center',
  },
});
