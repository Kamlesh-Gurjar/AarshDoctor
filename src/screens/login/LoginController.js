import {Alert} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import ApiRequest from '../../network/ApiRequest';
import {ApiRoutes} from '../../utils/ApiRoutes';
import {decryptData} from '../../utils/encryptionUtils';
import {userLogin} from '../../redux/reducer/LoginReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {
  showErrorToast,
  showSuccessToast,
  showToast,
} from '../../utils/HelperFuntions';

const LoginController = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAppSubmit = async values => {
    const req = {
      email: values.email,
      password: values.password,
      isWeb: false,
    };

    try {
      setIsLoading(true);

      const response = await ApiRequest({
        BASEURL: ApiRoutes.login,
        method: 'POST',
        req: req,
      });

      const resData = await decryptData(response.data);
      const token = resData?.data?.token;

      console.log('------', token);

      if ((resData?.code === 200 || resData?.code === 201) && token) {
        setIsLoading(false);

        showSuccessToast(
          'Success',
          'Login Successful!',
          'You have been successfully logged in.',
        );
        dispatch(
          userLogin({
            data: {
              token: token,
              role: resData?.data?.role,
              permission: resData?.data?.permission,
              subDetail: resData?.data?.subDetail,
            },
            userData: resData?.data?.user,
          }),
        );

        await AsyncStorage.setItem('userToken', token);
        navigation.replace('Tabs');
      } else {
        setIsLoading(false);
        showErrorToast('Login Failed', resData?.message);
        // Alert.alert(resData?.message || 'Login failed');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Login Error:', error?.message || error);
      showErrorToast('Login Failed', error?.message);
      // Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const AppValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  return {
    isLoading,
    handleAppSubmit,
    AppValidationSchema,
  };
};

export default LoginController;
