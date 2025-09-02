// screens/Profile/CertificationsScreen.js
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import DocumentPicker from '@react-native-documents/picker'; // Using the specified package
import Icon from '@react-native-vector-icons/material-icons';
import {Picker} from '@react-native-picker/picker'; // <-- dropdown
import {ButtonCompt, HeaderCompt} from '../../components';
import {Colors} from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiRequest from '../../network/ApiRequest';
import {ApiRoutes} from '../../utils/ApiRoutes';
import {showErrorToast, showSuccessToast} from '../../utils/HelperFuntions';
import {decryptData} from '../../utils/encryptionUtils';
import {setDoctorDetails} from '../../redux/redux_slice/DoctorDetailsSlice';

// Validation schema
const CertificationsSchema = Yup.object().shape({
  idProof: Yup.array().min(1, 'ID Proof is required'),
  qualification: Yup.array().min(1, 'Qualification is required'),
  otherDocuments: Yup.array().of(
    Yup.object().shape({
      selectedDocumentType: Yup.string().required('Document type required'),
      otherDocumentFile: Yup.array().min(1, 'File is required'),
    }),
  ),
});

// File Display
const FileDisplay = ({file, onRemove}) => (
  <View style={styles.fileDisplayContainer}>
    <Icon name="attachment" size={20} color={Colors.BLACK} />
    <Text style={styles.fileName} numberOfLines={1}>
      {file.name || file.uri}
    </Text>
    <Pressable onPress={onRemove}>
      <Icon name="close" size={22} color={Colors.GRAY_DARK} />
    </Pressable>
  </View>
);

const CertificationsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [docTypes] = useState([
    {label: 'Medical Council Registration', value: 'registration'},
    {label: 'Experience Certificate', value: 'experience'},
    {label: 'Other', value: 'other'},
  ]);

  const doctorDetails = useSelector(
    state => state.doctorDetails?.profileVerification,
  );

  console.log('---doctorDetails---', doctorDetails);

  // Utility function to normalize file
  const mapFile = url => ({
    uri: url,
    name: url.split('/').pop(),
    type: url.endsWith('.pdf') ? 'application/pdf' : 'image/png',
  });

  const formik = useFormik({
    initialValues: {
      idProof: doctorDetails?.identityProof?.map(mapFile) || [],
      qualification: doctorDetails?.educationCertificate?.map(mapFile) || [],
      otherDocuments:
        doctorDetails?.otherDocuments?.map(doc => ({
          ...doc,
          // backend me string hota hai → UI ke liye array bana diya
          otherDocumentFile: Array.isArray(doc.otherDocumentFile)
            ? doc.otherDocumentFile.map(mapFile)
            : [mapFile(doc.otherDocumentFile)],
        })) || [],
    },
    validationSchema: CertificationsSchema,
    // onSubmit: (values, {setSubmitting}) => {
    //   console.log('Submitting:', values);

    //   // 🚀 Backend ko bhejne ke liye wapas string format banado
    //   const payload = {
    //     idProof: values.idProof.map(f => f.uri),
    //     qualification: values.qualification.map(f => f.uri),
    //     otherDocuments: values.otherDocuments.map(doc => ({
    //       ...doc,
    //       otherDocumentFile: doc.otherDocumentFile[0]?.uri || '', // string bhejna hai
    //     })),
    //   };

    //   console.log('Payload:', payload);

    //   setTimeout(() => {
    //     setSubmitting(false);
    //     Alert.alert('Success', 'Certifications updated.');
    //   }, 1200);
    // },

    onSubmit: async (values, {setSubmitting}) => {
      console.log('Submitting:', values);

      // ✅ Transform to backend format
      const payload = {
        identityProof: values.idProof.map(f => f.uri), // array of strings
        educationCertificate: values.qualification.map(f => f.uri), // array of strings
        otherDocuments: values.otherDocuments.map(doc => ({
          _id: doc._id || undefined, // if id exists
          otherDocumentFile: doc.otherDocumentFile[0]?.uri || '', // backend needs string
          otherDocumentName: doc.otherDocumentName || '',
          selectedDocumentType: doc.selectedDocumentType,
        })),
      };

      console.log('Payload--------------------:', payload);

      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await ApiRequest({
          BASEURL: ApiRoutes.addDoctorDocument,
          method: 'POST',
          req: payload,
          token,
        });

        const resData = await decryptData(response.data);

        console.log('----------------', resData);

        // handle API response
        if (resData?.code === 200 || resData?.code === 201) {
          showSuccessToast('Success', response.data?.message);
          dispatch(setDoctorDetails(resData?.data));

          navigation.goBack();
        } else {
          showErrorToast(
            'Failed',
            response?.data?.message || 'Something went wrong',
          );
        }
      } catch (error) {
        console.error('Certifications Update Error:', error?.message || error);
        showErrorToast(
          'Failed',
          error?.message || 'Error updating certifications',
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  // File Picker
  const handleChooseFile = async (
    fieldName,
    allowMultiple = false,
    index = null,
  ) => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });

      if (fieldName === 'otherDocuments' && index !== null) {
        const updatedDocs = [...formik.values.otherDocuments];
        updatedDocs[index].otherDocumentFile = results;
        formik.setFieldValue('otherDocuments', updatedDocs);
      } else {
        if (allowMultiple) {
          formik.setFieldValue(fieldName, [
            ...formik.values[fieldName],
            ...results,
          ]);
        } else {
          formik.setFieldValue(fieldName, results);
        }
      }
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error(err);
        Alert.alert('Error', 'Could not pick the file.');
      }
    }
  };

  // Remove file
  const removeFile = (fieldName, indexToRemove, docIndex = null) => {
    if (fieldName === 'otherDocuments' && docIndex !== null) {
      const updatedDocs = [...formik.values.otherDocuments];
      updatedDocs[docIndex].otherDocumentFile = updatedDocs[
        docIndex
      ].otherDocumentFile.filter((_, idx) => idx !== indexToRemove);
      formik.setFieldValue('otherDocuments', updatedDocs);
    } else {
      const updatedFiles = formik.values[fieldName].filter(
        (_, index) => index !== indexToRemove,
      );
      formik.setFieldValue(fieldName, updatedFiles);
    }
  };

  // Add another otherDocument
  const addOtherDocument = () => {
    formik.setFieldValue('otherDocuments', [
      ...formik.values.otherDocuments,
      {selectedDocumentType: '', otherDocumentFile: []},
    ]);
  };

  // Change document type
  const changeDocType = (index, value) => {
    const updatedDocs = [...formik.values.otherDocuments];
    updatedDocs[index].selectedDocumentType = value;
    formik.setFieldValue('otherDocuments', updatedDocs);
  };

  const handleSubmit = async values => {
    const token = await AsyncStorage.getItem('userToken');

    const req = {};

    try {
      setIsLoading(true);

      const response = await ApiRequest({
        BASEURL: ApiRoutes.addDoctorDocument,
        method: 'POST',
        req: req,
        token: token,
      });

      const resData = await decryptData(response.data);

      console.log('------------resData-------', resData);

      if (resData?.code === 200 || resData?.code === 201) {
        showSuccessToast('Success', resData?.message);
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderCompt title={'Update Certifications'} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* ID Proof */}
        <View style={styles.formSection}>
          <Text style={styles.label}>ID Proof</Text>
          {formik.values.idProof.map((file, idx) => (
            <FileDisplay
              key={idx}
              file={file}
              onRemove={() => removeFile('idProof', idx)}
            />
          ))}
          <Pressable
            style={styles.chooseFileButton}
            onPress={() => handleChooseFile('idProof', false)}>
            <Text style={styles.chooseFileText}>Choose File</Text>
          </Pressable>
        </View>

        {/* Qualification */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Qualification Certificate</Text>
          {formik.values.qualification.map((file, idx) => (
            <FileDisplay
              key={idx}
              file={file}
              onRemove={() => removeFile('qualification', idx)}
            />
          ))}
          <Pressable
            style={styles.chooseFileButton}
            onPress={() => handleChooseFile('qualification', true)}>
            <Text style={styles.chooseFileText}>Choose Files</Text>
          </Pressable>
        </View>

        {/* Other Documents */}
        <Text style={[styles.label, {marginBottom: 10}]}>Other Documents</Text>
        {formik.values.otherDocuments.map((doc, index) => (
          <View key={index} style={styles.otherDocBox}>
            {/* Dropdown */}
            <Text style={styles.dropdownLabel}>Select Document Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={doc.selectedDocumentType}
                onValueChange={value => changeDocType(index, value)}
                style={styles.picker}>
                <Picker.Item label="Select type..." value="" />
                {docTypes.map(type => (
                  <Picker.Item
                    key={type.value}
                    label={type.label}
                    value={type.value}
                  />
                ))}
              </Picker>
            </View>

            {doc.otherDocumentFile.map((file, idx) => (
              <FileDisplay
                key={idx}
                file={file}
                onRemove={() => removeFile('otherDocuments', idx, index)}
              />
            ))}

            <Text
              style={{
                color: Colors.BLACK,
                fontSize: 10,
                fontFamily: Fonts.PoppinsRegular,
              }}>
              Allowed formats: PDF, JPG, JPEG, PNG
            </Text>

            <Pressable
              style={styles.chooseFileButton}
              onPress={() => handleChooseFile('otherDocuments', false, index)}>
              <Text style={styles.chooseFileText}>Choose File</Text>
            </Pressable>
          </View>
        ))}
        <Pressable style={styles.addDocBtn} onPress={addOtherDocument}>
          <Text style={styles.addDocText}>+ Add another document</Text>
        </Pressable>

        {/* Submit */}
        <View style={styles.buttonContainer}>
          {formik.isSubmitting ? (
            <ActivityIndicator size="large" color={Colors.BLACK} />
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
    marginBottom: 8,
  },
  chooseFileButton: {
    borderWidth: 1,
    borderColor: Colors.BLACK,
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  chooseFileText: {color: Colors.BLACK, fontFamily: Fonts.PoppinsRegular},
  fileDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  fileName: {
    flex: 1,
    marginLeft: 10,
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.BLACK,
  },
  errorText: {color: 'red', fontSize: 12, marginTop: 5},
  buttonContainer: {marginTop: 20},
  otherDocBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  picker: {
    height: 45,
    width: '100%',
    color: Colors.BLACK,
  },
  dropdownLabel: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.BLACK,
  },
  addDocBtn: {
    marginBottom: 20,
    borderWidth: 0.5,
    padding: 10,
    alignSelf: 'flex-start',
    borderRadius: 5,
  },
  addDocText: {
    color: Colors.BLACK,
    fontSize: 14,
    fontFamily: Fonts.PoppinsMedium,
  },
});

export default CertificationsScreen;
