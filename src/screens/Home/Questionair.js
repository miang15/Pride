import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import {theme} from '../../utils/theme';
// import {Images} from '../../constants/Images';
import {responsiveSize} from '../../utils/theme';
// import Swiper from 'react-native-swiper';
// import {Dropdown} from 'react-native-element-dropdown';
import CustomButton from '../../components/CustomButton';
import {useRoute} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import YoutubePlayer from 'react-native-youtube-iframe';
import http from '../../api/http';
import CustomInput from '../../components/CustomInput';
import {AppLoader} from '../../components/AppLoader/AppLoader';
import VideoPlayer from 'react-native-video-player';
import {Images} from '../../constants/Images';
import Swiper from 'react-native-swiper';
import {useDispatch, useSelector} from 'react-redux';
import {
  AddFavoriteAction,
  removeFavoriteAction,
} from '../../redux/Favorite/favoriteAction';
import {showMessage} from 'react-native-flash-message';
import {getMyProfileAction} from '../../redux/Auth/authactions';

const Questionair = ({navigation}) => {
  const favorite = useSelector(state => state.FavoriteReducer.favoriteIDs);
  const favoriteData = useSelector(state => state.FavoriteReducer.favorite);
  const [gift, setGift] = useState('');
  const [error, setError] = useState({type: '', msg: ''});
  // const [amountList, setAmountList] = useState([
  //   {
  //     label: '100',
  //     value: '100',
  //   },
  //   {
  //     label: '150',
  //     value: '150',
  //   },
  //   {
  //     label: '200',
  //     value: '200',
  //   },
  // ]);
  const [data, setData] = useState([
    {
      id: 1,
      title: 'A',
    },
    {
      id: 2,
      title: 'B',
    },
    {
      id: 3,
      title: 'C',
    },
    {
      id: 4,
      title: 'D',
    },
    {
      id: 5,
      title: 'E',
    },
    {
      id: 6,
      title: 'F',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [question, setQuestion] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [banner, setBanner] = useState('');
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState('');
  const [value, setValue] = useState('29');
  const route = useRoute();
  const streamData = route?.params?.streamData;
  const url = streamData?.url;
  const newurl = url?.split('?').shift().split('/').pop();

  useEffect(() => {
    if (streamData) {
      getQuestions(streamData?._id);
    }
  }, [streamData]);

  const getQuestions = async val => {
    setLoading(true);
    const allQuestions = await http.post('user/questionbyid', {
      id: val,
    });

    if (allQuestions?.data) {
      setQuestion(allQuestions?.data?.questions);
    }

    const bannerRes = await http.get('user/getbannersecond');
    console.log('bannner: ', bannerRes?.data);
    if (bannerRes?.data?.success) {
      setBanner(bannerRes?.data?.banner);
    }
    setLoading(false);
  };

  const handlePlaceBid = async () => {
    setError({
      type: '',
      msg: '',
    });
    if (!value) {
      setError({
        type: 'bid',
        msg: 'Bid Amount is Required.',
      });
    } else {
      setModalVisible(false);
      setLoading(true);
      const data = {
        amount: value,
        stream_id: streamData?._id,
        answer_id: answer?._id,
        question_id: currentQuestion?._id,
        answer: answer?.value,
      };

      const bidRes = await http.post('user/bid', data);

      setLoading(false);
      if (bidRes?.data?.success) {
        showMessage({
          message: 'Success!!!',
          description: 'Bid Placed Successfully',
          type: 'success',
          duration: 1500,
        });
        dispatch(getMyProfileAction());
      }
    }
  };

  const handleAddRemoveFavorite = async () => {
    setLoading(true);
    if (favorite?.includes(streamData?._id)) {
      console.log('if');
      dispatch(removeFavoriteAction(streamData?._id));
      setLoading(false);
    } else {
      console.log('else');
      dispatch(AddFavoriteAction(streamData));
      setLoading(false);
    }
  };

  const handleGift = async () => {
    setError({
      type: '',
      msg: '',
    });

    if (!gift) {
      setError({
        type: 'gift',
        msg: 'Amount is Required.',
      });
    } else {
      setLoading(true);
      const data = {
        amount: gift,
        streamer_id: streamData?.streamer_id,
      };

      const giftRes = await http.post('user/giftstreamer', data);
      console.log('giftRes: ', giftRes?.data);
      setLoading(false);
      if (giftRes?.data?.success) {
        showMessage({
          message: 'Success!!!',
          description: 'Gift sent to streamer',
          type: 'success',
          duration: 1500,
        });
        dispatch(getMyProfileAction());
      }
    }
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
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.black} barStyle={'light-content'} />
      <Header profile={true} bell={false} balance={2000} />
      <AppLoader loading={loading} />
      {streamData?.url ? (
        <>
          <View style={styles.streamView}>
            <YoutubePlayer
              webViewStyle={{opacity: 0.99}}
              webViewProps={{
                renderToHardwareTextureAndroid: true,
                androidLayerType:
                  Platform.OS === 'android' && Platform.Version <= 22
                    ? 'hardware'
                    : 'none',
              }}
              width={386}
              height={300}
              play={true}
              videoId={newurl}
              fullscreen={false}
            />
          </View>
        </>
      ) : (
        <View style={styles.imgView}>
          <Image
            source={{uri: streamData?.thumbnail?.url}}
            resizeMode="cover"
            style={styles.img}
          />
        </View>
      )}
      <View style={styles.titleRow}>
        <Text numberOfLines={2} style={styles.question}>
          {streamData?.title}
        </Text>
        <TouchableOpacity onPress={handleAddRemoveFavorite}>
          <Image
            source={Images.Heart}
            style={{
              tintColor: favorite?.includes(streamData?._id)
                ? null
                : theme.text.gray,
            }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        {question?.length ? (
          <Swiper
            containerStyle={{flexGrow: 0}}
            loop={false}
            height={responsiveSize(220)}
            dotColor={theme.white}
            horizontal={true}
            activeDotColor={theme.text.purple}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}>
            {question?.map((val, index) => {
              return (
                <View key={index} style={styles.questionBox}>
                  <Text style={styles.choose}>{`QUESTIONNAIRE ${
                    index + 1
                  }`}</Text>
                  <Text numberOfLines={2} style={styles.questiontitle}>
                    {val?.question}
                  </Text>
                  <View style={styles.optionView}>
                    {val?.answer?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setCurrentQuestion(val);
                            setAnswer(item);
                            setModalVisible(true);
                          }}
                          style={styles.option}>
                          <Text numberOfLines={1} style={styles.answer}>
                            {item?.value}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </Swiper>
        ) : (
          <Text style={styles.nodata}>No Questions Found</Text>
        )}
        <Text style={styles.pride}>SEND PRIDE TO THE STREAMER</Text>
        <View style={styles.giftrow}>
          <CustomInput
            value={gift}
            onChangeText={setGift}
            customStyle={{paddingVertical: responsiveSize(5), width: '70%'}}
            placeholder={'ENTER THE AMOUNT'}
            keyboardType={'number-pad'}
            placeholderTextColor={theme.text.gray}
          />
          <TouchableOpacity onPress={handleGift} style={styles.giftview}>
            <Text style={styles.gift}>GIFT</Text>
          </TouchableOpacity>
        </View>
        {error?.type == 'gift' ? (
          <Text style={styles.errorMsg}>{error?.msg}</Text>
        ) : null}
        {banner?.length ? (
          <Swiper
            loop={false}
            height={'auto'}
            dotColor={theme.white}
            activeDotColor={theme.text.red}
            pagingEnabled>
            {banner?.map(item => (
              <TouchableOpacity
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

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text numberOfLines={1} style={styles.modalText}>
                BID
              </Text>
              <CustomInput
                editable={false}
                value={value}
                onChangeText={setValue}
                placeholder={'BID AMOUNT'}
                placeholderTextColor={theme.white}
                customStyle={styles.input}
                customInput={{color: theme.white}}
                keyboardType={'number-pad'}
              />
              {error?.type == 'bid' ? (
                <Text style={styles.errorMsg}>{error?.msg}</Text>
              ) : null}
              <View style={styles.row}>
                <Text numberOfLines={1} style={styles.amount}>
                  BID AMOUNT :
                </Text>
                <Text numberOfLines={1} style={styles.value}>
                  {value || 0}
                </Text>
              </View>
              <CustomButton
                onPress={handlePlaceBid}
                labelStyle={{color: theme.black}}
                title={'PLACE BID'}
                customStyle={styles.btn}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Questionair;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.black,
  },
  errorMsg: {
    marginHorizontal: responsiveSize(15),
    fontSize: responsiveSize(10),
    color: theme.text.red,
    fontFamily: theme.interbold,
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
  giftrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: responsiveSize(15),
  },
  giftview: {
    backgroundColor: theme.secondary,
    width: responsiveSize(80),
    height: responsiveSize(50),
    justifyContent: 'center',
    marginLeft: responsiveSize(10),
    borderRadius: 8,
  },
  gift: {
    textAlign: 'center',
    color: theme.white,
    fontFamily: theme.interbold,
  },
  pride: {
    color: theme.white,
    fontSize: responsiveSize(11),
    fontFamily: theme.interbold,
    marginHorizontal: responsiveSize(15),
    fontWeight: 'bold',
  },
  answer: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(12),
  },
  videoTitle: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(14),
    width: '100%',
  },
  nodata: {
    color: theme.white,
    fontFamily: theme.interbold,
    textAlign: 'center',
    marginVertical: responsiveSize(25),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    alignSelf: 'center',
    backgroundColor: '#110018',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: responsiveSize(320),
    height: responsiveSize(260),
    padding: responsiveSize(15),
  },
  btn: {
    paddingVertical: 8,
    width: responsiveSize(270),
    position: 'absolute',
    bottom: '5%',
  },
  modalText: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: 18,
    alignSelf: 'center',
  },
  inputSearchStyle: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(13),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: responsiveSize(270),
    alignSelf: 'center',
    marginTop: responsiveSize(12),
  },
  amount: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(12),
    width: '70%',
    overflow: 'hidden',
  },
  value: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(12),
    textAlign: 'right',
    width: '30%',
    overflow: 'hidden',
  },
  dropdown: {
    height: responsiveSize(39),
    width: responsiveSize(270),
    borderColor: theme.white,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginVertical: responsiveSize(10),
    marginTop: responsiveSize(20),
    color: theme.white,
    alignSelf: 'center',
  },
  placeholderStyle: {
    fontSize: responsiveSize(12),
    color: theme.white,
    fontFamily: theme.interbold,
  },
  selectedTextStyle: {
    fontSize: responsiveSize(13),
    color: theme.white,
    fontFamily: theme.interbold,
  },
  imgView: {
    overflow: 'hidden',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: responsiveSize(20),
    width: '95%',
    height: '25%',

    borderRadius: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: responsiveSize(5),
    marginVertical: responsiveSize(3),
    paddingRight: responsiveSize(10),
  },
  question: {
    color: theme.white,
    fontSize: responsiveSize(13),
    fontFamily: theme.interbold,
    textAlign: 'left',
    width: responsiveSize(280),
  },
  streamView: {
    overflow: 'hidden',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: responsiveSize(20),
    width: 386,
    height: 178,
    borderWidth: 1,
    borderColor: theme.secondary,
    borderRadius: 10,
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  questionBox: {
    backgroundColor: theme.mediumgray,
    width: responsiveSize(320),
    height: responsiveSize(160),
    alignSelf: 'center',
    paddingVertical: responsiveSize(10),
    paddingHorizontal: responsiveSize(15),
    borderRadius: 15,
    marginTop: responsiveSize(15),
    overflow: 'scroll',
  },
  choose: {
    color: theme.text.purple,
    fontSize: responsiveSize(14),
    fontFamily: theme.interbold,
  },
  questiontitle: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(13),
    marginTop: responsiveSize(8),
    textTransform: 'uppercase',
  },
  textrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveSize(30),
    paddingHorizontal: responsiveSize(15),
  },
  label: {
    color: theme.white,
    fontSize: responsiveSize(14),
    fontFamily: theme.interbold,
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
  list: {
    flexGrow: 0,
    paddingStart: responsiveSize(10),
    marginVertical: responsiveSize(10),
  },
  thumbnail: {
    width: responsiveSize(168),
    height: responsiveSize(100),
    marginVertical: responsiveSize(2),
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: responsiveSize(12),
  },
  optionView: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: responsiveSize(8),
  },
  option: {
    backgroundColor: theme.darkgray,
    width: 80,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: responsiveSize(4),
    marginVertical: responsiveSize(6),
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.white,
    fontSize: responsiveSize(10),
  },
  title: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(9),
  },
});
