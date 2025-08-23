// screens/Profile/BankDetailsScreen.js (adjust path as needed)
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import FormInput from '../../components/common/FormInput';
import {ButtonCompt, HeaderCompt} from '../../components';
import { Colors } from '../../theme/Colors';

// Validation Schema with Yup
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

const BankDetailsScreen = () => {
  const formik = useFormik({
    initialValues: {
      accountHolderName: 'Vardaan Singh',
      accountNumber: '44444466',
      bankName: 'SBI',
      branchName: 'Navlakhs',
      ifscCode: 'HDFC121324',
    },
    validationSchema: BankDetailsSchema,
    onSubmit: (values, {setSubmitting}) => {
      console.log('Submitting Bank Details:', values);
      setTimeout(() => {
        // API call would go here
        setSubmitting(false);
        alert('Bank Details Updated!');
      }, 1000);
    },
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
          />
          <FormInput
            label="Account Number"
            formik={formik}
            fieldName="accountNumber"
            keyboardType="numeric"
          />
          <FormInput label="Bank Name" formik={formik} fieldName="bankName" />
          <FormInput
            label="Branch Name"
            formik={formik}
            fieldName="branchName"
          />
          <FormInput
            label="IFSC Code"
            formik={formik}
            fieldName="ifscCode"
            autoCapitalize="characters"
          />

          <View style={styles.buttonContainer}>
            {formik.isSubmitting ? (
              <ActivityIndicator size="large" color={Colors.PRIMARY} />
            ) : (
              <ButtonCompt title={'Update'} onPress={formik.handleSubmit} />
            )}
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
