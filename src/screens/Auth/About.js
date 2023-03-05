import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {responsiveSize, theme} from '../../utils/theme';
import {Images} from '../../constants/Images';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialButton from '../../components/SocialButton';
import http from '../../api/http';
import {setLocalStorage} from '../../utils/actions';
import {useDispatch} from 'react-redux';
import {setLoadingAction} from '../../redux/AppRedux/appactions';
import {getOTPAction, userLoggedAction} from '../../redux/Auth/authactions';
import {AppLoader} from '../../components/AppLoader/AppLoader';
import PhoneInput from 'react-native-phone-number-input';
import Header from '../../components/Header';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';

const About = ({navigation}) => {
  const dispatch = useDispatch();
  const phoneInputRef = useRef();
  const [value, setValue] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagePic, setImagePic] = useState('');
  const [picBase64, setPicBase64] = useState('');
  const [name, setName] = useState('');
  const [bankName, setBankName] = useState('');
  const [branch, setBranch] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [account, setAccount] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({type: '', msg: ''});
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleRegister = async () => {
    setError({type: '', msg: ''});
    if (!imagePic) {
      setError({
        type: 'pic',
        msg: 'Profile photo is Required.',
      });
    } else if (!name) {
      setError({
        type: 'name',
        msg: 'Name is Required.',
      });
    } else if (!phone) {
      setError({
        type: 'phone',
        msg: 'Phone Number is Required.',
      });
    } else if (!email) {
      setError({
        type: 'email',
        msg: 'Email is Required',
      });
    } else if (!email.match(emailRegex)) {
      setError({
        type: 'email',
        msg: 'Email is Invalid',
      });
    } else if (!bankName) {
      setError({
        type: 'bank',
        msg: 'Bank Name is Required',
      });
    } else if (!branch) {
      setError({
        type: 'branch',
        msg: 'Branch is Required',
      });
    } else if (!ifsc) {
      setError({
        type: 'ifsc',
        msg: 'IFSC Code is Required',
      });
    } else if (!account) {
      setError({
        type: 'account',
        msg: 'Account Number is Required',
      });
    } else if (!password) {
      setError({
        type: 'password',
        msg: 'Password is Required',
      });
    } else if (password?.length < 6) {
      setError({
        type: 'password',
        msg: 'Password must be 6 character long.',
      });
    } else {
      setLoading(true);
      var num = phone.substring(1);
      const data = {
        name: name,
        mobile: num,
        email: email,
        profile: picBase64,
        Bank_Name: bankName,
        Branch: branch,
        ifsc_code: ifsc,
        account_Number: account,
        password: password,
      };
      const registerRes = await http.post('user/register', data);
      console.log('registerRes', registerRes?.data);
      if (registerRes?.data?.token) {
        dispatch(userLoggedAction(true));
        setLocalStorage('token', registerRes?.data?.token);
        setLocalStorage('loggedIn', registerRes?.data?.token);
        navigation.replace('BottomTab');
      }
      setLoading(false);
    }
  };

  const handleImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
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
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.black} barStyle={'light-content'} />
      <AppLoader loading={loading} />
      <Header />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>REGISTER TO CONTINUE</Text>
        <TouchableOpacity onPress={handleImage} style={styles.uploadview}>
          {imagePic ? (
            <Image
              source={{uri: imagePic}}
              style={styles.img}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.upload}>UPLOAD{'\n'}PHOTO</Text>
          )}
        </TouchableOpacity>
        {error?.type == 'pic' ? (
          <Text style={{...styles.errorMsg, textAlign: 'center'}}>
            {error?.msg}
          </Text>
        ) : null}
        <Text style={styles.desc}>ENTER YOUR FULL NAME</Text>
        <CustomInput
          flag={false}
          placeholder={'Jhon Doe'}
          placeholderTextColor={theme.text.gray}
          value={name}
          onChangeText={setName}
        />
        {error?.type == 'name' ? (
          <Text style={styles.errorMsg}>{error?.msg}</Text>
        ) : null}
        <Text style={styles.desc}>ENTER YOUR WHATSAPP PHONE NUMBER</Text>
        <PhoneInput
          ref={phoneInputRef}
          textInputStyle={{
            color: theme.black,
            paddingVertical: 0,
          }}
          codeTextStyle={{
            color: theme.black,
            marginRight: 5,
          }}
          textContainerStyle={{
            paddingVertical: 0,
            height: 40,
            borderBottomWidth: 0,
            paddingHorizontal: 5,
            borderColor: theme.black,
            backgroundColor: theme.white,
            overflow: 'hidden',
          }}
          flagButtonStyle={{
            borderRightWidth: 1,
            alignSelf: 'flex-start',
            width: '18%',
            borderColor: theme.black,
          }}
          containerStyle={[
            {
              paddingVertical: 0,
              borderWidth: 1,
              borderColor: theme.black,
              alignSelf: 'center',
              width: '94%',
              height: responsiveSize(40),
              marginVertical: '3%',
              borderRadius: 10,
              overflow: 'hidden',
            },
          ]}
          defaultValue={value}
          defaultCode={'IN'}
          layout="first"
          onChangeFormattedText={val => {
            const checkValid = phoneInputRef.current?.isValidNumber(val);

            if (checkValid) {
              setPhone(val);
              setError({
                type: '',
                msg: '',
              });
            } else {
              setError({
                type: 'phone',
                msg: 'Phone Number is Invalid',
              });
            }
          }}
        />
        {error?.type == 'phone' ? (
          <Text style={styles.errorMsg}>{error?.msg}</Text>
        ) : null}
        <Text style={styles.desc}>ENTER YOUR EMAIL.</Text>
        <CustomInput
          placeholder={'xyz@gmail.com'}
          placeholderTextColor={theme.text.gray}
          value={email}
          onChangeText={setEmail}
        />
        {error?.type == 'email' ? (
          <Text style={styles.errorMsg}>{error?.msg}</Text>
        ) : null}
        <Text style={styles.desc}>ENTER YOUR BANK NAME.</Text>
        <CustomInput
          placeholder={'Bank_Name'}
          placeholderTextColor={theme.text.gray}
          value={bankName}
          onChangeText={setBankName}
        />
        {error?.type == 'bank' ? (
          <Text style={styles.errorMsg}>{error?.msg}</Text>
        ) : null}
        <Text style={styles.desc}>ENTER BRANCH</Text>
        <CustomInput
          placeholder={'Branch'}
          placeholderTextColor={theme.text.gray}
          value={branch}
          onChangeText={setBranch}
        />
        {error?.type == 'branch' ? (
          <Text style={styles.errorMsg}>{error?.msg}</Text>
        ) : null}
        <Text style={styles.desc}>ENTER IFSC CODE</Text>
        <CustomInput
          placeholder={'IFSC Code'}
          placeholderTextColor={theme.text.gray}
          value={ifsc}
          onChangeText={setIfsc}
        />
        {error?.type == 'ifsc' ? (
          <Text style={styles.errorMsg}>{error?.msg}</Text>
        ) : null}
        <Text style={styles.desc}>ENTER ACCOUNT NUMBER</Text>
        <CustomInput
          placeholder={'account_number'}
          placeholderTextColor={theme.text.gray}
          value={account}
          onChangeText={setAccount}
        />
        {error?.type == 'account' ? (
          <Text style={styles.errorMsg}>{error?.msg}</Text>
        ) : null}
        <Text style={styles.desc}>ENTER PASSWORD</Text>
        <CustomInput
          placeholder={'* * * * * *'}
          placeholderTextColor={theme.text.gray}
          value={password}
          onChangeText={setPassword}
        />
        {error?.type == 'password' ? (
          <Text style={styles.errorMsg}>{error?.msg}</Text>
        ) : null}

        <CustomButton
          onPress={handleRegister}
          title={'REGISTER'}
          customStyle={{marginTop: '5%'}}
        />
        <Text
          onPress={() => navigation.navigate('Login')}
          style={styles.account}>
          EXISTING USER ? LOGIN NOW
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.black,
  },
  uploadview: {
    borderWidth: 2,
    borderColor: theme.secondary,
    width: responsiveSize(100),
    height: responsiveSize(100),
    borderRadius: 100,
    alignSelf: 'center',
    overflow: 'hidden',
    marginTop: responsiveSize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  upload: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(12),
    textAlign: 'center',
  },
  heading: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(20),
    marginTop: responsiveSize(25),
    marginHorizontal: responsiveSize(15),
  },
  account: {
    color: theme.white,
    fontFamily: theme.interbold,
    textAlign: 'center',
    margin: responsiveSize(15),
    fontSize: responsiveSize(12),
  },
  desc: {
    color: theme.white,
    fontFamily: theme.interbold,
    marginTop: responsiveSize(15),
    marginHorizontal: responsiveSize(15),
    fontSize: responsiveSize(12),
  },

  errorMsg: {
    marginHorizontal: responsiveSize(15),
    fontSize: responsiveSize(10),
    color: theme.text.red,
    fontFamily: theme.interbold,
  },
});
