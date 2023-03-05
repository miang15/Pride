import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {responsiveSize, theme} from '../../utils/theme';
import {Images} from '../../constants/Images';
import PhoneInput from 'react-native-phone-number-input';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialButton from '../../components/SocialButton';
import {AppLoader} from '../../components/AppLoader/AppLoader';
import http from '../../api/http';
import {setLocalStorage} from '../../utils/actions';
import Header from '../../components/Header';
import {userLoggedAction} from '../../redux/Auth/authactions';
import {useDispatch} from 'react-redux';

const Login = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const phoneInputRef = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({type: '', msg: ''});

  const handleGetOTP = async () => {
    if (!phone) {
      setError({
        type: 'phone',
        msg: 'Phone Number is Required.',
      });
    } else if (!password) {
      setError({
        type: 'password',
        msg: 'Password is Required',
      });
    } else {
      setLoading(true);
      var num = phone.substring(1);
      console.log('passowrd', password);
      const data = {
        mobile: num,
        password: password,
      };
      const loginRes = await http.post('user/login', data);
      console.log('loginRes', loginRes?.data);
      if (loginRes?.data?.token) {
        dispatch(userLoggedAction(true));
        setLocalStorage('token', loginRes?.data?.token);
        setLocalStorage('loggedIn', loginRes?.data?.token);
        navigation.replace('BottomTab');
      }
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.black} barStyle={'light-content'} />
      <AppLoader loading={loading} />
      <Header />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>LOGIN TO CONTINUE</Text>
        <Text style={styles.desc}>ENTER YOUR PHONE NUMBER</Text>
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
        <Text style={styles.desc}>ENTER YOUR PASSWORD</Text>
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
          onPress={handleGetOTP}
          title={'LOGIN'}
          customStyle={{marginTop: '5%'}}
        />
        <Text
          onPress={() => navigation.navigate('About')}
          style={styles.account}>
          NEW USER ? REGISTER NOW!
        </Text>
        {/* <View style={styles.bottomView}>
          <Text style={styles.text}>ALSO VALIDATE USING</Text>
          <SocialButton icon={Images.google} title={'CONTINUE WITH GOOGLE'} />
          <SocialButton
            icon={Images.facebook}
            title={'CONTINUE WITH FACEBOOK'}
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.black,
  },
  heading: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(20),
    marginTop: responsiveSize(25),
    marginHorizontal: responsiveSize(15),
  },
  desc: {
    color: theme.white,
    fontFamily: theme.interbold,
    marginTop: responsiveSize(15),
    marginHorizontal: responsiveSize(15),
    fontSize: responsiveSize(12),
  },
  bottomView: {
    marginTop: responsiveSize(80),
    paddingHorizontal: 15,
  },
  text: {
    color: theme.black,
    fontSize: responsiveSize(11),
    textAlign: 'center',
    marginHorizontal: responsiveSize(10),
    fontFamily: theme.interbold,
    borderBottomWidth: 1,
    borderColor: theme.text.gray,
  },
  errorMsg: {
    marginHorizontal: responsiveSize(15),
    fontSize: responsiveSize(10),
    color: theme.text.red,
    fontFamily: theme.interbold,
  },
  account: {
    color: theme.white,
    fontFamily: theme.interbold,
    textAlign: 'center',
    margin: responsiveSize(15),
    fontSize: responsiveSize(12),
  },
});
