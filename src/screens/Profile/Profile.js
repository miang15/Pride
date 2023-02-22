import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../constants/Images';
import {responsiveSize, theme} from '../../utils/theme';
import ListItem from '../../components/ListItem';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {AppLoader} from '../../components/AppLoader/AppLoader';
import http from '../../api/http';
import {showMessage} from 'react-native-flash-message';
import {getMyProfileAction} from '../../redux/Auth/authactions';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';

const Profile = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.AuthReducer.user);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [imagePic, setImagePic] = useState('');
  const [picBase64, setPicBase64] = useState('');
  const [error, setError] = useState({
    type: '',
    msg: '',
  });

  const [select, setSelect] = useState('');

  const handleAddMoney = async () => {
    setError({type: '', msg: ''});
    if (!amount) {
      setError({
        type: 'amount',
        msg: 'Amount is Required.',
      });
    } else if (!imagePic) {
      setError({
        type: 'image',
        msg: 'Payment Screenshot Required.',
      });
    } else {
      setModalVisible(false);
      setLoading(true);

      const depositRes = await http.post('user/deposit', {
        amount: amount,
        proof: picBase64,
      });

      if (depositRes?.data?.success) {
        showMessage({
          message: 'Success!!!',
          description: 'Deposit request sent to successfully',
          type: 'success',
          duration: 1500,
        });
        dispatch(getMyProfileAction());
      }
      setLoading(false);
    }
  };

  const handleRedeemMoney = async () => {
    setError({type: '', msg: ''});
    if (!amount) {
      setError({
        type: 'amount',
        msg: 'Amount is Required',
      });
    } else if (amount > user?.balance) {
      setError({
        type: 'amount',
        msg: "You don't have enough balance for withdraw.",
      });
    } else if (amount < 200) {
      setError({
        type: 'amount',
        msg: 'Minimum withdraw is 200',
      });
    } else {
      setModalVisible(false);
      setLoading(true);
      const withdrawRes = await http.post('user/withdraw', {amount: amount});

      if (withdrawRes?.data?.success) {
        showMessage({
          message: 'Success!!!',
          description: 'Withdraw request sent to successfully',
          type: 'success',
          duration: 1500,
        });
        dispatch(getMyProfileAction());
      }
      setLoading(false);
    }
  };

  const handleImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async image => {
        const base64 = await RNFS.readFile(image?.path, 'base64');
        const readyImage = `data:${image?.mime};base64,` + base64;
        setImagePic(image?.path);
        setPicBase64(readyImage);
      })
      .catch(e => {
        console.log('e', e);
      });
  };

  return (
    <View style={styles.container}>
      <AppLoader loading={loading} />
      <View style={styles.row1}>
        <Image
          style={styles.img}
          source={user?.url ? {uri: user?.url} : Images.profile}
          resizeMode="cover"
        />
        <View style={styles.column}>
          <Text numberOfLines={1} style={styles.hey}>
            Hey!
          </Text>
          <Text numberOfLines={1} style={styles.name}>
            {user?.name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.clear();
            navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
          }}
          style={styles.logout}>
          <Image source={Images.logout} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          style={styles.ninja}
          source={Images.ninja}
          resizeMode="cover">
          <View style={styles.ninjaView}>
            <Text numberOfLines={1} style={styles.balance}>
              {user?.balance}
            </Text>
            <Text style={styles.pride}>PRIDE COINS</Text>
            <View style={styles.addView}>
              <Text
                onPress={() => {
                  setSelect('ADD');
                  setImagePic('');
                  setPicBase64('');
                  setAmount('');
                  setModalVisible(true);
                  setError({type: '', msg: ''});
                }}
                style={styles.add}>
                ADD
              </Text>
              <Text
                onPress={() => {
                  setSelect('REDEEM');
                  setAmount('');
                  setModalVisible(true);
                  setError({type: '', msg: ''});
                }}
                style={styles.redeem}>
                REDEEM
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.row2}>
          <View style={styles.column1}>
            <Text numberOfLines={1} style={styles.number}>
              {user?.mobile}
            </Text>
            <View style={styles.innerRow}>
              <Image source={Images.iphone} />
              <Text style={styles.phone}>PHONE</Text>
            </View>
          </View>
          <View style={styles.column1}>
            <Text numberOfLines={1} style={styles.number}>
              {user?.email}
            </Text>
            <View style={styles.innerRow}>
              <Image source={Images.mail} />
              <Text style={styles.phone}>MAIL</Text>
            </View>
          </View>
        </View>
        <ListItem
          onPress={() => navigation.navigate('TransactionHistory')}
          title={'Transaction History'}
          img={Images.Transaction}
        />
        <ListItem
          onPress={() => navigation.navigate('BiddingHistory')}
          title={'Prediction History'}
          img={Images.history}
        />
        <ListItem title={'Privacy & Policy'} img={Images.Documents} />
        <ListItem title={'Terms & Conditions'} img={Images.lock} />
        <ListItem
          title={'Contact Us'}
          customStyle={{marginBottom: responsiveSize(20)}}
          img={Images.phone}
        />
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{`${select} COINS`}</Text>
            <Text
              style={
                styles.text1
              }>{`ENTER THE COINS YOU WANT TO ${select}`}</Text>
            <CustomInput
              value={amount}
              onChangeText={setAmount}
              customStyle={{width: '100%'}}
              keyboardType={'number-pad'}
            />
            {error?.type == 'amount' ? (
              <Text style={styles.errorMsg}>{error?.msg}</Text>
            ) : null}
            {select == 'ADD' ? (
              <>
                <Text style={styles.text1}>
                  Note:Attach Payment screenshot.
                </Text>
                {error?.type == 'image' ? (
                  <Text style={styles.errorMsg}>{error?.msg}</Text>
                ) : null}
                <CustomButton
                  onPress={handleImage}
                  title={imagePic ? 'Uploaded' : 'Upload'}
                  customStyle={{width: '100%', marginTop: responsiveSize(20)}}
                />
              </>
            ) : null}
            <CustomButton
              onPress={() => {
                if (select == 'ADD') {
                  handleAddMoney();
                } else {
                  handleRedeemMoney();
                }
              }}
              title={select}
              customStyle={{width: '100%', marginTop: responsiveSize(20)}}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;

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
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  text1: {
    color: theme.white,
    fontSize: responsiveSize(10),
    fontFamily: theme.interbold,
    marginTop: responsiveSize(20),
  },
  modalText: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(15),
    textAlign: 'center',
  },
  modalView: {
    backgroundColor: '#110018',
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveSize(10),
    marginBottom: responsiveSize(10),
  },
  column: {
    width: responsiveSize(245),
    overflow: 'hidden',
  },
  hey: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(14),
  },
  name: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(14),
  },
  img: {
    width: responsiveSize(55),
    height: responsiveSize(55),
    marginRight: responsiveSize(10),
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  ninja: {
    width: responsiveSize(322),
    height: responsiveSize(222),
    alignSelf: 'center',
    marginVertical: responsiveSize(10),
  },
  ninjaView: {
    position: 'absolute',
    alignSelf: 'center',
    top: responsiveSize(90),
    right: responsiveSize(10),
    width: responsiveSize(140),
    overflow: 'hidden',
    paddingHorizontal: responsiveSize(5),
  },
  balance: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(14),
    textAlign: 'center',
  },
  pride: {
    color: theme.white,
    fontSize: responsiveSize(13),
    fontFamily: theme.interbold,
    textAlign: 'center',
  },
  addView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: responsiveSize(15),
    width: '100%',
  },
  add: {
    backgroundColor: theme.primary,
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(11),
    paddingHorizontal: responsiveSize(15),
    paddingVertical: responsiveSize(2),
    marginHorizontal: responsiveSize(5),
    textAlign: 'center',
    borderRadius: 5,
  },
  redeem: {
    backgroundColor: theme.primary,
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(11),
    paddingHorizontal: responsiveSize(5),
    textAlign: 'center',
    paddingVertical: responsiveSize(2),
    borderRadius: 5,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: responsiveSize(10),
    marginVertical: responsiveSize(6),
  },
  column1: {
    width: responsiveSize(160),
    height: responsiveSize(90),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.dullpurple,
    padding: 12,
    borderRadius: 15,
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    color: theme.white,
    fontSize: responsiveSize(13),
    fontFamily: theme.interbold,
  },
  phone: {
    color: theme.white,
    fontSize: responsiveSize(13),
    fontFamily: theme.interbold,
    marginLeft: responsiveSize(5),
  },
});
