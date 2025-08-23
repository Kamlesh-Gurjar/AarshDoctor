import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {ButtonCompt, HeaderCompt} from '../../components';
import ApiRequest from '../../network/ApiRequest';
import {ApiRoutes} from '../../utils/ApiRoutes';
import {decryptData} from '../../utils/encryptionUtils';
import {Colors} from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import {showSuccessToast} from '../../utils/HelperFuntions';

// Yup के साथ वैलिडेशन स्कीमा
const OTPSchema = Yup.object().shape({
  otp: Yup.string()
    .required('OTP is required')
    .length(6, 'OTP must be exactly 6 digits'),
});

const VerifyOtpScreen = ({navigation, route}) => {
  const user_Id = route?.params?.userData?.user?._id;
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const pin5Ref = useRef(null);
  const pin6Ref = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVarifyOtp = async values => {
    console.log('------otp----------', values?.otp);
    const req = {
      otp: values?.otp,
      id: user_Id,
    };

    try {
      setIsLoading(true);

      const response = await ApiRequest({
        BASEURL: ApiRoutes.varifyForgetOtp,
        method: 'POST',
        req: req,
      });

      const resData = await decryptData(response.data);

      if (resData?.code === 200 || resData?.code === 201) {
        // await AsyncStorage.setItem('userToken', token);
        showSuccessToast('success', 'Verification Successful!', '');
        navigation.navigate('ResetPassword', {user_Id: user_Id});
        console.log('-----handleVarifyOtp--------', resData);
        setIsLoading(false);
      } else {
        showErrorToast('Failed', resData?.message);

        // Alert.alert(resData?.message || 'Login failed');
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Login Error:', error?.message || error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderCompt />
      <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
        <View style={styles.header}>
          <Text style={styles.title}>Verify OTP</Text>
        </View>

        <Text style={styles.subtitle}>
          Enter the OTP sent to your registered email to verify.
        </Text>

        <Formik
          initialValues={{otp: ''}}
          validationSchema={OTPSchema}
          onSubmit={(values, {setSubmitting}) => {
            console.log('Submitted OTP:', values.otp);
            handleVarifyOtp(values);

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
              <View style={styles.otpContainer}>
                <View style={styles.otpInputContainer}>
                  <TextInput
                    ref={pin1Ref}
                    style={styles.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={text => {
                      handleChange('otp')(
                        values.otp.slice(0, 0) + text + values.otp.slice(1),
                      );
                      if (text) pin2Ref.current.focus();
                    }}
                    onBlur={handleBlur('otp')}
                    value={values.otp[0]}
                  />
                  <TextInput
                    ref={pin2Ref}
                    style={styles.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={text => {
                      handleChange('otp')(
                        values.otp.slice(0, 1) + text + values.otp.slice(2),
                      );
                      if (text) pin3Ref.current.focus();
                      else pin1Ref.current.focus();
                    }}
                    onBlur={handleBlur('otp')}
                    value={values.otp[1]}
                  />
                  <TextInput
                    ref={pin3Ref}
                    style={styles.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={text => {
                      handleChange('otp')(
                        values.otp.slice(0, 2) + text + values.otp.slice(3),
                      );
                      if (text) pin4Ref.current.focus();
                      else pin2Ref.current.focus();
                    }}
                    onBlur={handleBlur('otp')}
                    value={values.otp[2]}
                  />
                  <TextInput
                    ref={pin4Ref}
                    style={styles.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={text => {
                      handleChange('otp')(
                        values.otp.slice(0, 3) + text + values.otp.slice(4),
                      );
                      if (text) pin5Ref.current.focus();
                      else pin3Ref.current.focus();
                    }}
                    onBlur={handleBlur('otp')}
                    value={values.otp[3]}
                  />
                  <TextInput
                    ref={pin5Ref}
                    style={styles.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={text => {
                      handleChange('otp')(
                        values.otp.slice(0, 4) + text + values.otp.slice(5),
                      );
                      if (text) pin6Ref.current.focus();
                      else pin4Ref.current.focus();
                    }}
                    onBlur={handleBlur('otp')}
                    value={values.otp[4]}
                  />
                  <TextInput
                    ref={pin6Ref}
                    style={styles.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={text => {
                      handleChange('otp')(
                        values.otp.slice(0, 5) + text + values.otp.slice(6),
                      );
                      if (!text) pin5Ref.current.focus();
                    }}
                    onBlur={handleBlur('otp')}
                    value={values.otp[5]}
                  />
                </View>
              </View>

              {errors.otp && touched.otp && (
                <Text style={styles.errorText}>{errors.otp}</Text>
              )}

              {/* <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.submittingButton]}
              onPress={handleSubmit}
              disabled={isSubmitting || !!errors.otp}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity> */}

              <ButtonCompt
                title={'Submit'}
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
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsSemiBold,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    fontFamily: Fonts.PoppinsRegular,
  },
  otpContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  otpInput: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsSemiBold,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#00A99D', // Teal color from the image
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  submittingButton: {
    backgroundColor: '#99E2DD',
  },
  submitButtonText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VerifyOtpScreen;
