// // screens/Profile/BankDetailsScreen.js (adjust path as needed)
// import React, {useState} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   ActivityIndicator,
// } from 'react-native';
// import {useFormik} from 'formik';
// import * as Yup from 'yup';
// import FormInput from '../../components/common/FormInput';
// import {ButtonCompt, HeaderCompt} from '../../components';
// import {Colors} from '../../theme/Colors';
// import ApiRequest from '../../network/ApiRequest';
// import {ApiRoutes} from '../../utils/ApiRoutes';
// import {decryptData} from '../../utils/encryptionUtils';
// import {showErrorToast, showSuccessToast} from '../../utils/HelperFuntions';

// // Validation Schema with Yup
// const BankDetailsSchema = Yup.object().shape({
//   accountHolderName: Yup.string().required('Account holder name is required'),
//   accountNumber: Yup.string()
//     .matches(/^[0-9]+$/, 'Must be only digits')
//     .min(9, 'Must be at least 9 digits')
//     .required('Account number is required'),
//   bankName: Yup.string().required('Bank name is required'),
//   branchName: Yup.string().required('Branch name is required'),
//   ifscCode: Yup.string()
//     .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code format')
//     .required('IFSC code is required'),
// });

// const BankDetailsScreen = () => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handlBankDetailsSubmit = async values => {
//     console.log('------------value------', values);
//     const req = {
//       account_holder_name: '',
//       account_number: '',
//       bank_name: '',
//       branch_name: '',
//       ifsc_code: '',
//     };

//     try {
//       setIsLoading(true);

//       const response = await ApiRequest({
//         BASEURL: ApiRoutes.addDoctorBankDetail,
//         method: 'POST',
//         req: req,
//       });

//       const resData = await decryptData(response.data);

//       if (resData?.code === 200 || resData?.code === 201) {
//         setIsLoading(false);
//         showSuccessToast('Success', 'Bank Details Updated Successful!');
//       } else {
//         setIsLoading(false);
//         showErrorToast('Failed', resData?.message);
//       }
//     } catch (error) {
//       setIsLoading(false);
//       console.error(' Bank Details Updated Error:', error?.message || error);
//       showErrorToast(' Failed', error?.message);
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       accountHolderName: 'Vardaan Singh',
//       accountNumber: '44444466',
//       bankName: 'SBI',
//       branchName: 'Navlakhs',
//       ifscCode: 'HDFC121324',
//     },
//     validationSchema: BankDetailsSchema,
//     onSubmit: (values, {setSubmitting}) => {
//       () => handlBankDetailsSubmit(values);
//       // console.log('Submitting Bank Details:', values);
//       // setTimeout(() => {
//       //   // API call would go here
//       //   setSubmitting(false);
//       //   // alert('Bank Details Updated!');
//       // }, 1000);
//     },
//   });

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <HeaderCompt title={'Update Bank Details'} />
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         keyboardShouldPersistTaps="handled">
//         <View style={styles.formContainer}>
//           <FormInput
//             label="Account Holder Name"
//             formik={formik}
//             fieldName="accountHolderName"
//             placeholder={'Enter account holder name'}
//           />
//           <FormInput
//             label="Account Number"
//             formik={formik}
//             fieldName="accountNumber"
//             keyboardType="numeric"
//             placeholder={'Enter account number'}
//           />
//           <FormInput
//             label="Bank Name"
//             formik={formik}
//             fieldName="bankName"
//             placeholder={'Enter bank name'}
//           />
//           <FormInput
//             label="Branch Name"
//             formik={formik}
//             fieldName="branchName"
//             placeholder={'Enter branch name'}
//           />
//           <FormInput
//             label="IFSC Code"
//             formik={formik}
//             fieldName="ifscCode"
//             autoCapitalize="characters"
//             placeholder={'Enter IFSC code'}
//           />

//           {/* <View style={styles.buttonContainer}>
//             {formik.isSubmitting ? (
//               <ActivityIndicator size="large" color={Colors.PRIMARY} />
//             ) : (
//               <ButtonCompt title={'Update'} onPress={formik.handleSubmit} />
//             )}
//           </View> */}
//           <ButtonCompt
//             isLoading={isLoading}
//             title={'Update'}
//             onPress={formik.handleSubmit}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {flex: 1, backgroundColor: Colors.WHITE},
//   scrollContainer: {flexGrow: 1},
//   formContainer: {padding: 20},
//   buttonContainer: {marginTop: 20},
// });

// export default BankDetailsScreen;

// screens/Profile/BankDetailsScreen.js
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import FormInput from '../../components/common/FormInput';
import {ButtonCompt, HeaderCompt} from '../../components';
import {Colors} from '../../theme/Colors';
import ApiRequest from '../../network/ApiRequest';
import {ApiRoutes} from '../../utils/ApiRoutes';
import {decryptData} from '../../utils/encryptionUtils';
import {showErrorToast, showSuccessToast} from '../../utils/HelperFuntions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setDoctorDetails} from '../../redux/redux_slice/DoctorDetailsSlice';

// ✅ Validation Schema with Yup
const BankDetailsSchema = Yup.object().shape({
  accountHolderName: Yup.string().required('Account holder name is required'),
  accountNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(9, 'Must be at least 9 digits')
    .required('Account number is required'),
  bankName: Yup.string().required('Bank name is required'),
  branchName: Yup.string().required('Branch name is required'),
  ifscCode: Yup.string()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code format')
    .required('IFSC code is required'),
});

const BankDetailsScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const doctorDetails = useSelector(state => state.doctorDetails);

  const BankDetails = doctorDetails?.bankDetails;

  // console.log('-----------doctorDetails--------', doctorDetails);

  const [isLoading, setIsLoading] = useState(false);

  // ✅ Submit Function
  const handleBankDetailsSubmit = async values => {
    const token = await AsyncStorage.getItem('userToken');

    const req = {
      accountHolderName: values.accountHolderName,
      accountNumber: values.accountNumber,
      bankName: values.bankName,
      branchName: values.branchName,
      ifscCode: values.ifscCode,
    };

    try {
      setIsLoading(true);

      const response = await ApiRequest({
        BASEURL: ApiRoutes.addDoctorBankDetail,
        method: 'POST',
        req: req,
        token: token,
      });

      const resData = await decryptData(response.data);

      console.log('------------resData-------', resData);

      if (resData?.code === 200 || resData?.code === 201) {
        showSuccessToast('Success', resData?.message);
        dispatch(setDoctorDetails(resData?.data));
        navigation.goBack();
      } else {
        showErrorToast('Failed', resData?.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Bank Details Update Error:', error?.message || error);
      showErrorToast('Failed', error?.message || 'Error updating bank details');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: {
      accountHolderName: BankDetails?.accountHolderName || '',
      accountNumber: BankDetails?.accountNumber || '',
      bankName: BankDetails?.bankName || '',
      branchName: BankDetails?.branchName || '',
      ifscCode: BankDetails?.ifscCode || '',
    },
    validationSchema: BankDetailsSchema,
    onSubmit: handleBankDetailsSubmit, // ✅ Correct direct call
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderCompt title={'Update Bank Details'} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <FormInput
            label="Account Holder Name"
            formik={formik}
            fieldName="accountHolderName"
            placeholder="Enter account holder name"
          />
          <FormInput
            label="Account Number"
            formik={formik}
            fieldName="accountNumber"
            keyboardType="numeric"
            placeholder="Enter account number"
          />
          <FormInput
            label="Bank Name"
            formik={formik}
            fieldName="bankName"
            placeholder="Enter bank name"
          />
          <FormInput
            label="Branch Name"
            formik={formik}
            fieldName="branchName"
            placeholder="Enter branch name"
          />
          <FormInput
            label="IFSC Code"
            formik={formik}
            fieldName="ifscCode"
            autoCapitalize="characters"
            placeholder="Enter IFSC code"
          />

          <View style={styles.buttonContainer}>
            <ButtonCompt
              isLoading={isLoading}
              title="Update"
              onPress={formik.handleSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: Colors.WHITE},
  scrollContainer: {flexGrow: 1},
  formContainer: {padding: 20},
  buttonContainer: {marginTop: 20},
});

export default BankDetailsScreen;
