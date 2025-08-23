// import React, {useState} from 'react';
// import {View, StyleSheet, Text, ScrollView, Image} from 'react-native';
// import {Formik} from 'formik';
// import * as yup from 'yup';

// import CountryPicker from 'react-native-country-picker-modal';
// import {ButtonCompt, InputCompt} from '../../components';
// import Fonts from '../../theme/Fonts';
// import {Colors} from '../../theme/Colors';
// import imageindex from '../../assets/images/imageindex';

// const signupValidationSchema = yup.object().shape({
//   firstName: yup.string().required('First name is required'),
//   lastName: yup.string().required('Last name is required'),
//   email: yup
//     .string()
//     .email('Please enter a valid email')
//     .required('Email is required'),
//   contactNo: yup
//     .string()
//     .matches(/^[0-9]+$/, 'Must be only digits')
//     .min(10, 'Must be exactly 10 digits')
//     .max(10, 'Must be exactly 10 digits')
//     .required('Contact number is required'),
// });

// const Signup = () => {
//   const [countryCode, setCountryCode] = useState('US');
//   const [callingCode, setCallingCode] = useState('1');

//   const onSelect = country => {
//     setCountryCode(country.cca2);
//     setCallingCode(country.callingCode[0]);
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
//         <Formik
//           validationSchema={signupValidationSchema}
//           initialValues={{
//             firstName: '',
//             lastName: '',
//             email: '',
//             contactNo: '',
//           }}
//           onSubmit={values => {
//             const fullContact = `+${callingCode}${values.contactNo}`;
//             console.log({...values, contactNo: fullContact});
//             // Handle OTP sending logic here
//           }}>
//           {({
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             values,
//             errors,
//             touched,
//           }) => (
//             <>
//                   <Image source={imageindex.logo} style={styles.logo} />
            
//               <Text style={styles.title}>Create Your Account</Text>
//               <Text style={styles.subtitle}>
//                 Start your journey with secure access to your healthcare
//                 services.
//               </Text>
//               <InputCompt
//                 label={'First Name'}
//                 placeholder="Enter your first name"
//                 onChangeText={handleChange('firstName')}
//                 onBlur={handleBlur('firstName')}
//                 value={values.firstName}
//               />
//               {errors.firstName && touched.firstName && (
//                 <Text style={styles.errorText}>{errors.firstName}</Text>
//               )}
//               <InputCompt
//                 label={'Last Name'}
//                 placeholder="Enter your last name"
//                 onChangeText={handleChange('lastName')}
//                 onBlur={handleBlur('lastName')}
//                 value={values.lastName}
//               />
//               {errors.lastName && touched.lastName && (
//                 <Text style={styles.errorText}>{errors.lastName}</Text>
//               )}

//               <InputCompt
//                 label={'Email'}
//                 placeholder="Enter your email"
//                 onChangeText={handleChange('email')}
//                 onBlur={handleBlur('email')}
//                 value={values.email}
//                 keyboardType="email-address"
//               />
//               {errors.email && touched.email && (
//                 <Text style={styles.errorText}>{errors.email}</Text>
//               )}
//               <Text
//                 style={{
//                   color: Colors.BLACK,
//                   fontSize: 14,
//                   opacity: 0.8,
//                   fontFamily: Fonts.PoppinsSemiBold,
//                   marginTop: 5,
//                 }}>
//                 Contact No.
//               </Text>
//               <View style={styles.contactRow}>
//                 <CountryPicker
//                   {...{
//                     countryCode,
//                     withFilter: true,
//                     withFlag: true,
//                     withCountryNameButton: false,
//                     withAlphaFilter: true,
//                     withCallingCode: true,
//                     withEmoji: true,
//                     onSelect,
//                   }}
//                   containerButtonStyle={styles.countryPicker}
//                 />
//                 <View style={styles.contactInput}>
//                   <InputCompt
//                     // label={'Contact No.'}
//                     placeholder="Enter your contact No."
//                     onChangeText={handleChange('contactNo')}
//                     onBlur={handleBlur('contactNo')}
//                     value={values.contactNo}
//                     keyboardType="phone-pad"
//                     maxLength={10}
//                   />
//                 </View>
//               </View>
//               {errors.contactNo && touched.contactNo && (
//                 <Text style={styles.errorText}>{errors.contactNo}</Text>
//               )}

//               <ButtonCompt title="SEND OTP" onPress={handleSubmit} />
//             </>
//           )}
//         </Formik>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 8,
//     fontFamily: Fonts.PoppinsSemiBold,
//     color: Colors.BLACK,
//   },
//   subtitle: {
//     color: 'gray',
//     marginBottom: 20,
//     fontFamily: Fonts.PoppinsRegular,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   inputWrap: {
//     flex: 1,
//     marginHorizontal: 2,
//   },
//   contactRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//   },
//   countryPicker: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     // height: 50,
//     justifyContent: 'center',
//     marginBottom: 4,
//   },
//   contactInput: {
//     flex: 1,
//   },
//   errorText: {
//     fontSize: 12,
//     color: 'red',
//     marginBottom: 5,
//   },
//     logo: {alignSelf: 'center', height: 100, width: 200,resizeMode:"center"},

// });

// export default Signup;

import { View, Text } from 'react-native'
import React from 'react'

const Signup = () => {
  return (
    <View>
      <Text>Signup</Text>
    </View>
  )
}

export default Signup