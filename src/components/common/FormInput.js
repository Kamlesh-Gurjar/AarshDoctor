// src/components/FormInput.js
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Fonts from '../../theme/Fonts';
import {Colors} from '../../theme/Colors';

const FormInput = ({label, formik, fieldName, ...props}) => {
  const isError = formik.touched[fieldName] && formik.errors[fieldName];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, isError && styles.errorBorder]}
        onChangeText={formik.handleChange(fieldName)}
        onBlur={formik.handleBlur(fieldName)}
        value={formik.values[fieldName]}
        placeholderTextColor={Colors.GRAY}
        {...props}
      />
      {isError && (
        <Text style={styles.errorText}>{formik.errors[fieldName]}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.BLACK,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: Fonts.PoppinsRegular,
    backgroundColor: '#fff',
  },
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default FormInput;
