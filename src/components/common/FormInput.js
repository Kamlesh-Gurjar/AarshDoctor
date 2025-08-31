// src/components/FormInput.js
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Fonts from '../../theme/Fonts';
import {Colors} from '../../theme/Colors';

const FormInput = ({label, formik, fieldName, placeholder, ...props}) => {
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
        placeholder={placeholder}
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
    fontFamily: Fonts.PoppinsMedium,
    color: Colors.BLACK,
    marginBottom: 8,
  },
  input: {
    borderWidth: 0.5,
    borderColor: Colors.GRAY,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: Fonts.PoppinsRegular,
    backgroundColor: Colors.WHITE,
    color: Colors.BLACK,
  },
  errorBorder: {
    borderColor: Colors.RED,
  },
  errorText: {
    color: Colors.RED,
    fontSize: 12,
    marginTop: 5,
    fontFamily: Fonts.PoppinsRegular,
  },
});

export default FormInput;
