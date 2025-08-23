import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';

import imageindex from '../../assets/images/imageindex';
import {ButtonCompt, InputCompt} from '../../components';
import {Colors} from '../../theme/Colors';

import styles from './login.style';
import LoginController from './LoginController';

const Login = ({navigation}) => {
  const {isLoading, handleAppSubmit, AppValidationSchema} = LoginController();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <StatusBar backgroundColor={Colors.WHITE} barStyle={'dark-content'} />
          <Image source={imageindex.logo} style={styles.logo} />
          <Text style={styles.descriptiontext}>
            Manage your healthcare information, services, and account in one
            place.
          </Text>
          <Formik
            validationSchema={AppValidationSchema}
            initialValues={{email: '', password: ''}}
            onSubmit={handleAppSubmit}>
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
                  leftImage={imageindex.mail}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <InputCompt
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  label="Password"
                  placeholder="Enter your password"
                  iconName="lock-outline"
                  leftImage={imageindex.lock}
                  rightImage={true}
                  isPassword={true}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <TouchableOpacity
                  style={{alignSelf: 'flex-end'}}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.forgottext}>Forget Password ?</Text>
                </TouchableOpacity>

                <ButtonCompt
                  title="Login"
                  onPress={handleSubmit}
                  isLoading={isLoading}
                />
              </>
            )}
          </Formik>
          {/* <Text
        style={{
          color: Colors.BLACK,
          fontSize: 16,
          textAlign: 'center',
          marginTop: 20,
        }}>
        Don’t have an Account?{'  '}
        <Text
          onPress={() => navigation.navigate('Signup')}
          style={{color: Colors.APPCOLOR, fontSize: 14}}>
          Register
        </Text>
      </Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
