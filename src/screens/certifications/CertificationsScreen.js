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

// // screens/Profile/CertificationsScreen.js

// import React, {useState} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Pressable,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import {useFormik} from 'formik';
// import * as Yup from 'yup';
// import DocumentPicker from 'react-native-document-picker';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {ButtonCompt, HeaderCompt} from '../../components';
// import {Colors} from '../../theme/Colors';
// import Fonts from '../../theme/Fonts';

// // Validation Schema
// const CertificationsSchema = Yup.object().shape({
//   idProof: Yup.array().min(1, 'ID Proof is required').required(),
//   qualification: Yup.array()
//     .min(1, 'Qualification Certificate is required')
//     .required(),
//   otherDocs: Yup.array().min(1, 'At least one document is required'),
// });

// // Reusable file display
// const FileDisplay = ({file, onRemove}) => (
//   <View style={styles.fileDisplayContainer}>
//     <Icon name="attachment" size={20} color={Colors.PRIMARY} />
//     <Text style={styles.fileName} numberOfLines={1}>
//       {file.name}
//     </Text>
//     <Pressable onPress={onRemove}>
//       <Icon name="close" size={22} color={Colors.GRAY_DARK} />
//     </Pressable>
//   </View>
// );

// const CertificationsScreen = () => {
//   const [otherDocs, setOtherDocs] = useState([{type: '', files: []}]);

//   const formik = useFormik({
//     initialValues: {
//       idProof: [],
//       qualification: [],
//       otherDocs: [],
//     },
//     validationSchema: CertificationsSchema,
//     onSubmit: (values, {setSubmitting}) => {
//       console.log('Submitting Certifications:', values);
//       setTimeout(() => {
//         setSubmitting(false);
//         Alert.alert('Success', 'Certifications have been updated.');
//       }, 1500);
//     },
//   });

//   const handleChooseFile = async (
//     fieldName,
//     allowMultiple = false,
//     index = null,
//   ) => {
//     try {
//       const results = await DocumentPicker.pick({
//         type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
//         allowMultiSelection: allowMultiple,
//       });

//       if (fieldName === 'otherDocs' && index !== null) {
//         const updatedDocs = [...otherDocs];
//         updatedDocs[index].files = results;
//         setOtherDocs(updatedDocs);
//         formik.setFieldValue('otherDocs', updatedDocs);
//       } else {
//         formik.setFieldValue(fieldName, results);
//       }
//     } catch (err) {
//       if (!DocumentPicker.isCancel(err)) {
//         Alert.alert('Error', 'Could not pick the file. Please try again.');
//       }
//     }
//   };

//   const addOtherDocSection = () => {
//     setOtherDocs([...otherDocs, {type: '', files: []}]);
//   };

//   const removeOtherDoc = index => {
//     const updated = otherDocs.filter((_, i) => i !== index);
//     setOtherDocs(updated);
//     formik.setFieldValue('otherDocs', updated);
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <HeaderCompt title={'Update Certifications'} />
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         keyboardShouldPersistTaps="handled">
//         {/* Existing ID Proof Section */}
//         <View style={styles.formSection}>
//           <Text style={styles.label}>ID Proof (Single File)</Text>
//           {formik.values.idProof.map((file, index) => (
//             <FileDisplay
//               key={index}
//               file={file}
//               onRemove={() => formik.setFieldValue('idProof', [])}
//             />
//           ))}
//           <Pressable
//             style={styles.chooseFileButton}
//             onPress={() => handleChooseFile('idProof', false)}>
//             <Text style={styles.chooseFileText}>Choose File</Text>
//           </Pressable>
//         </View>

//         {/* Qualification Section */}
//         <View style={styles.formSection}>
//           <Text style={styles.label}>
//             Qualification Certificate (Multiple Files)
//           </Text>
//           {formik.values.qualification.map((file, index) => (
//             <FileDisplay
//               key={index}
//               file={file}
//               onRemove={() =>
//                 formik.setFieldValue(
//                   'qualification',
//                   formik.values.qualification.filter((_, i) => i !== index),
//                 )
//               }
//             />
//           ))}
//           <Pressable
//             style={styles.chooseFileButton}
//             onPress={() => handleChooseFile('qualification', true)}>
//             <Text style={styles.chooseFileText}>Choose Files</Text>
//           </Pressable>
//         </View>

//         {/* 🔹 Other Documents Section */}
//         <View style={styles.formSection}>
//           <Text style={styles.label}>Other Documents</Text>
//           {otherDocs.map((doc, index) => (
//             <View key={index} style={styles.otherDocContainer}>
//               <Text style={styles.subLabel}>Document {index + 1}</Text>

//               {/* Dropdown Placeholder */}
//               <Pressable style={styles.dropdown}>
//                 <Text
//                   style={{color: doc.type ? Colors.BLACK : Colors.GRAY_DARK}}>
//                   {doc.type || 'Select Document Type'}
//                 </Text>
//               </Pressable>

//               {doc.files.map((file, i) => (
//                 <FileDisplay
//                   key={i}
//                   file={file}
//                   onRemove={() => removeOtherDoc(index)}
//                 />
//               ))}

//               <Pressable
//                 style={styles.chooseFileButton}
//                 onPress={() => handleChooseFile('otherDocs', false, index)}>
//                 <Text style={styles.chooseFileText}>Choose File</Text>
//               </Pressable>

//               <Pressable onPress={() => removeOtherDoc(index)}>
//                 <Text style={{color: 'red', marginTop: 5}}>Remove</Text>
//               </Pressable>
//             </View>
//           ))}

//           <Pressable style={styles.addButton} onPress={addOtherDocSection}>
//             <Text style={styles.addButtonText}>+ Add another document</Text>
//           </Pressable>
//         </View>

//         {/* Submit */}
//         <View style={styles.buttonContainer}>
//           {formik.isSubmitting ? (
//             <ActivityIndicator size="large" color={Colors.PRIMARY} />
//           ) : (
//             <ButtonCompt title={'Update'} onPress={formik.handleSubmit} />
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {flex: 1, backgroundColor: Colors.WHITE},
//   scrollContainer: {padding: 20, paddingBottom: 50},
//   formSection: {marginBottom: 25},
//   label: {
//     fontSize: 16,
//     fontFamily: Fonts.PoppinsMedium,
//     color: Colors.BLACK,
//     marginBottom: 10,
//   },
//   subLabel: {
//     fontSize: 14,
//     fontFamily: Fonts.PoppinsRegular,
//     color: Colors.BLACK,
//     marginBottom: 5,
//   },
//   chooseFileButton: {
//     borderWidth: 1,
//     borderColor: Colors.PRIMARY,
//     borderStyle: 'dashed',
//     borderRadius: 8,
//     padding: 15,
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//     marginTop: 10,
//   },
//   chooseFileText: {color: Colors.PRIMARY, fontFamily: Fonts.PoppinsRegular},
//   fileDisplayContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     marginBottom: 10,
//     backgroundColor: '#fff',
//   },
//   fileName: {
//     flex: 1,
//     marginLeft: 10,
//     fontFamily: Fonts.PoppinsRegular,
//     color: Colors.BLACK,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     fontFamily: Fonts.PoppinsRegular,
//     marginTop: 5,
//   },
//   buttonContainer: {marginTop: 20},
//   otherDocContainer: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   dropdown: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 10,
//     backgroundColor: '#fff',
//   },
//   addButton: {
//     marginTop: 10,
//     padding: 12,
//     borderWidth: 1,
//     borderColor: Colors.PRIMARY,
//     borderRadius: 8,
//   },
//   addButtonText: {
//     color: Colors.PRIMARY,
//     textAlign: 'center',
//     fontFamily: Fonts.PoppinsRegular,
//   },
// });

// export default CertificationsScreen;
