// screens/Profile/CertificationsScreen.js (adjust path as needed)
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert, // Using Alert for better user feedback on errors
} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import DocumentPicker from '@react-native-documents/picker'; // Using the specified package
import Icon from '@react-native-vector-icons/material-icons';
import {ButtonCompt, HeaderCompt} from '../../components'; // Adjust path
import {Colors} from '../../theme/Colors'; // Adjust path
import Fonts from '../../theme/Fonts';     // Adjust path

// Validation Schema remains the same
const CertificationsSchema = Yup.object().shape({
  idProof: Yup.array()
    .min(1, 'ID Proof is required')
    .required('ID Proof is required'),
  qualification: Yup.array()
    .min(1, 'At least one Qualification Certificate is required')
    .required('Qualification Certificate is required'),
});

// Reusable component to display a picked file
const FileDisplay = ({file, onRemove}) => (
  <View style={styles.fileDisplayContainer}>
    <Icon name="attachment" size={20} color={Colors.PRIMARY} />
    <Text style={styles.fileName} numberOfLines={1}>
      {file.name}
    </Text>
    <Pressable onPress={onRemove}>
      <Icon name="close" size={22} color={Colors.GRAY_DARK} />
    </Pressable>
  </View>
);

const CertificationsScreen = () => {
  const formik = useFormik({
    initialValues: {
      idProof: [],
      qualification: [],
    },
    validationSchema: CertificationsSchema,
    onSubmit: (values, {setSubmitting}) => {
      console.log('Submitting Certifications:', values);
      // Here you would typically format the data for a multipart/form-data API request
      setTimeout(() => {
        setSubmitting(false);
        Alert.alert('Success', 'Certifications have been updated.');
      }, 1500);
    },
  });

  // Updated function to use the new library's API
  const handleChooseFile = async (fieldName, allowMultiple = false) => {
    try {
      const pickerOptions = {
        presentationStyle: 'fullScreen', // Recommended for iOS
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
        allowMultiSelection: allowMultiple,
      };

      // Call the picker function. The result is an array even for single selection.
      const results = await DocumentPicker.pick(pickerOptions);

      const currentFiles = formik.values[fieldName];

      if (allowMultiple) {
        // Append all new files
        formik.setFieldValue(fieldName, [...currentFiles, ...results]);
      } else {
        // Replace the current file (or add if none exists)
        formik.setFieldValue(fieldName, results);
      }

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker dialog
        console.log('User cancelled the file picker.');
      } else {
        // An unknown error occurred
        console.error('An error occurred while picking the file:', err);
        Alert.alert('Error', 'Could not pick the file. Please try again.');
      }
    }
  };

  const removeFile = (fieldName, indexToRemove) => {
    const updatedFiles = formik.values[fieldName].filter(
      (_, index) => index !== indexToRemove,
    );
    formik.setFieldValue(fieldName, updatedFiles);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderCompt title={'Update Certifications'} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        {/* ID Proof Section */}
        <View style={styles.formSection}>
          <Text style={styles.label}>ID Proof (Single File)</Text>
          {formik.values.idProof.map((file, index) => (
            <FileDisplay
              key={index}
              file={file}
              onRemove={() => removeFile('idProof', index)}
            />
          ))}
          <Pressable
            style={styles.chooseFileButton}
            onPress={() => handleChooseFile('idProof', false)}>
            <Text style={styles.chooseFileText}>Choose File</Text>
          </Pressable>
          {formik.touched.idProof && formik.errors.idProof && (
            <Text style={styles.errorText}>{formik.errors.idProof}</Text>
          )}
        </View>

        {/* Qualification Section */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Qualification Certificate (Multiple Files)</Text>
          {formik.values.qualification.map((file, index) => (
            <FileDisplay
              key={index}
              file={file}
              onRemove={() => removeFile('qualification', index)}
            />
          ))}
          <Pressable
            style={styles.chooseFileButton}
            onPress={() => handleChooseFile('qualification', true)}>
            <Text style={styles.chooseFileText}>Choose Files</Text>
          </Pressable>
           {formik.touched.qualification && formik.errors.qualification && (
             <Text style={styles.errorText}>{formik.errors.qualification}</Text>
          )}
        </View>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          {formik.isSubmitting ? (
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
          ) : (
            <ButtonCompt title={'Update'} onPress={formik.handleSubmit} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: Colors.WHITE},
  scrollContainer: {padding: 20, paddingBottom: 50},
  formSection: {marginBottom: 25},
  label: {
    fontSize: 16,
    fontFamily: Fonts.PoppinsMedium,
    color: Colors.BLACK,
    marginBottom: 10,
  },
  chooseFileButton: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    marginTop: 10,
  },
  chooseFileText: {
    color: Colors.PRIMARY,
    fontFamily: Fonts.PoppinsRegular,
  },
  fileDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  fileName: {
    flex: 1,
    marginLeft: 10,
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.BLACK,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: Fonts.PoppinsRegular,
    marginTop: 5,
  },
  buttonContainer: {marginTop: 20},
});

export default CertificationsScreen;