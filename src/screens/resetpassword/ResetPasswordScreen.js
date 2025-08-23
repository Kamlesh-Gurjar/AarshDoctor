import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {ButtonCompt, HeaderCompt, InputCompt} from '../../components';
import imageindex from '../../assets/images/imageindex';
import Fonts from '../../theme/Fonts';
import ApiRequest from '../../network/ApiRequest';
import {ApiRoutes} from '../../utils/ApiRoutes';
import {decryptData} from '../../utils/encryptionUtils';
import {showSuccessToast} from '../../utils/HelperFuntions';

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const ResetPasswordScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = route?.params?.user_Id;
  const handleReset = async values => {
    const req = {
      id: userId,
      password: values?.password,
    };

    console.log('---------req----------', req);

    try {
      setIsLoading(true);

      const response = await ApiRequest({
        BASEURL: ApiRoutes.createForgetPassword,
        method: 'POST',
        req: req,
      });

      const resData = await decryptData(response.data);

      if (resData?.code === 200 || resData?.code === 201) {
        setIsLoading(false);
        showSuccessToast('success', 'Password updated Successfully!', '');
        navigation.navigate('Login');
      } else {
        setIsLoading(false);
        showErrorToast('Failed', resData?.message);

        Alert.alert(resData?.message || 'Login failed');
      }
    } catch (error) {
      setIsLoading(false);

      console.error('Login Error:', error?.message || error);
      // Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderCompt />
      <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
        <View style={styles.header}>
          <Text style={styles.title}>Reset Password</Text>
        </View>

        <Text style={styles.subtitle}>
          Enter your new password to reset your account
        </Text>

        <Formik
          initialValues={{password: '', confirmPassword: ''}}
          validationSchema={ResetPasswordSchema}
          onSubmit={(values, {setSubmitting}) => {
            console.log('Resetting password with:', values);

            handleReset(values);
            // Alert.alert(
            //   'Success',
            //   'Your password has been reset successfully!',
            // );
            // setSubmitting(false);
          }}>
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            errors,
            touched,
          }) => (
            <>
              <InputCompt
                label="New Password"
                placeholder="Enter your password"
                leftImage={imageindex.lock}
                rightImage={imageindex.show}
                isPassword={true}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                style={
                  errors.password && touched.password ? styles.errorInput : null
                }
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <InputCompt
                label="Confirm Password"
                placeholder="Enter confirm password"
                leftImage={imageindex.lock}
                rightImage={imageindex.show}
                isPassword={true}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                style={
                  errors.confirmPassword && touched.confirmPassword
                    ? styles.errorInput
                    : null
                }
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              {/* <TouchableOpacity
                style={[
                  styles.submitButton,
                  isSubmitting && styles.submittingButton,
                ]}
                onPress={handleSubmit}
                disabled={isSubmitting}>
                <Text style={styles.submitButtonText}>Reset</Text>
              </TouchableOpacity> */}
              <ButtonCompt
                title={'Reset'}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    fontFamily: Fonts.PoppinsBold,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    fontFamily: Fonts.PoppinsRegular,
  },
  errorInput: {},
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10,
    marginLeft: 5,
    fontFamily: Fonts.PoppinsRegular,
  },
  submitButton: {
    backgroundColor: '#00A99D',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  submittingButton: {
    backgroundColor: '#99E2DD',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: Fonts.PoppinsSemiBold,
  },
});

export default ResetPasswordScreen;
