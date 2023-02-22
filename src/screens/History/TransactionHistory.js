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

const TransactionHistory = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getTransactionHistory();
    });
  }, []);

  const getTransactionHistory = async () => {
    setLoading(true);
    const history = await http.get('user/allhistory');

    if (history?.data) {
      setHistory(history?.data?.history);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <AppLoader loading={loading} />
      <Text style={styles.heading}>TRANSACTION HISTORY</Text>
      {history?.length ? (
        <FlatList
          style={{marginTop: responsiveSize(10)}}
          data={history}
          renderItem={({item, index}) => {
            return (
              <View style={styles.column}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={Images.Graph} />
                    <Text numberOfLines={1} style={styles.index}>
                      {item?.type}
                    </Text>
                  </View>
                  <Text style={styles.amount}>{`${item?.amount} COINS`}</Text>
                </View>
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

export default TransactionHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.black,
  },
  column: {
    marginVertical: responsiveSize(8),
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(15),
    borderRadius: 12,
    backgroundColor: theme.dullpurple,
  },
  index: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(12),
    marginRight: responsiveSize(10),
    textTransform: 'uppercase',
    marginLeft: responsiveSize(10),
    width: responsiveSize(200),
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
});
