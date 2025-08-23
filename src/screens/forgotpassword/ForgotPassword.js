import {Alert, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ButtonCompt, HeaderCompt, InputCompt} from '../../components';
import ApiRequest from '../../network/ApiRequest';
import {Formik} from 'formik';
import * as yup from 'yup';
import Fonts from '../../theme/Fonts';
import imageindex from '../../assets/images/imageindex';
import {Colors} from '../../theme/Colors';
import {ApiRoutes} from '../../utils/ApiRoutes';
import {decryptData} from '../../utils/encryptionUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showErrorToast, showSuccessToast} from '../../utils/HelperFuntions';

const ForgotPassword = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
  });

  const handleResetPassword = async values => {
    const req = {
      email: values.email,
    };

    try {
      setIsLoading(true);

      const response = await ApiRequest({
        BASEURL: ApiRoutes.forgotPassword,
        method: 'POST',
        req: req,
      });

      const resData = await decryptData(response.data);

      if (resData?.code === 200 || resData?.code === 201) {
        // await AsyncStorage.setItem('userToken', token);
        showSuccessToast(
          'success',
          'Send Successful! Please check your mail.',
          'Please check your mail.',
        );
        navigation.navigate('VerifyOtp', {userData: resData?.data});
        console.log('-----handleResetPassword--------', resData?.data);
        setIsLoading(false);
      } else {
        showErrorToast('Failed', resData?.message);
        Alert.alert(resData?.message || 'Login failed');
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Login Error:', error?.message || error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderCompt />
      <View style={styles.container}>
        <Image source={imageindex.logo} style={styles.logo} />

        <Text style={styles.descriptiontext}>
          Enter your registered email address and we’ll send you instructions to
          reset your password.
        </Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{email: ''}}
          onSubmit={handleResetPassword}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <InputCompt
                label="Email"
                placeholder="Enter your email"
                iconName="email-outline"
                onChangeText={handleChange('email')}
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <ButtonCompt
                title="Reset Password"
                onPress={handleSubmit}
                isLoading={isLoading}
              />
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  descriptiontext: {
    textAlign: 'left',
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.GRAY,
  },
  logo: {alignSelf: 'center', height: 100, width: 200, resizeMode: 'center'},
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
    fontFamily: Fonts.PoppinsRegular,
  },
});
