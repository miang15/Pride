import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {responsiveSize, theme} from '../../utils/theme';
import Header from '../../components/Header';
import Winners from '../../components/Winners';
import ListItem from '../../components/ListItem';
import {useSelector} from 'react-redux';

const Ranking = ({navigation}) => {
  const [selected, setSelected] = useState(1);
  const streamers = useSelector(state => state.AuthReducer.allStreamer);
  const allUser = useSelector(state => state.AuthReducer.allUser);

  return (
    <View style={styles.container}>
      <Header
        onBell={() => navigation.navigate('Notify')}
        profile={true}
        bell={true}
        balance={2000}
      />
      <View style={styles.row}>
        <Text
          onPress={() => setSelected(1)}
          style={{
            ...styles.title,
            backgroundColor: selected == 1 ? theme.secondary : theme.dullpurple,
            color: selected == 1 ? theme.white : theme.text.gray,
          }}>
          CHANNEL
        </Text>
        <Text
          onPress={() => setSelected(2)}
          style={{
            ...styles.title,
            backgroundColor: selected == 2 ? theme.secondary : theme.dullpurple,
            color: selected == 2 ? theme.white : theme.text.gray,
          }}>
          USERS
        </Text>
      </View>
      {selected == 1 ? (
        <>
          <Winners data={streamers} />
          {streamers?.slice(3)?.length ? (
            <>
              <Text style={styles.text}>TOP 3 OF THIS MONTH</Text>
              <FlatList
                data={streamers?.slice(3)}
                renderItem={({item, index}) => {
                  return <ListItem title={item?.name} num={index + 4} />;
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index}
              />
            </>
          ) : null}
        </>
      ) : (
        <>
          <Winners data={allUser} />
          {allUser?.slice(3)?.length ? (
            <>
              <Text style={styles.text}>TOP 3 OF THIS MONTH</Text>
              <FlatList
                data={allUser.slice(3)}
                renderItem={({item, index}) => {
                  return <ListItem title={item?.name} num={index + 4} />;
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index}
              />
            </>
          ) : null}
        </>
      )}
    </View>
  );
};

export default Ranking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: responsiveSize(330),
    marginTop: responsiveSize(25),
  },
  title: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(13),
    backgroundColor: theme.dullpurple,
    width: '50%',
    textAlign: 'center',
    paddingVertical: responsiveSize(6),
    borderRadius: 8,
  },
  text: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(13),
    textAlign: 'center',
    marginHorizontal: responsiveSize(15),
    marginVertical: responsiveSize(15),
  },
});
