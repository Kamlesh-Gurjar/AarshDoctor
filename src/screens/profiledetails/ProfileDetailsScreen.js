// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Platform,
//   ActivityIndicator,
//   Image,
// } from 'react-native';
// import {Picker} from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import {ButtonCompt, HeaderCompt} from '../../components'; // Assuming you have a header component
// import {Colors} from '../../theme/Colors';
// import Fonts from '../../theme/Fonts';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ApiRequest from '../../network/ApiRequest';
// import {decryptData} from '../../utils/encryptionUtils';
// import {useDispatch, useSelector} from 'react-redux';
// import imageindex from '../../assets/images/imageindex';
// import {ApiRoutes} from '../../utils/ApiRoutes';
// import {
//   setDoctorDetails,
//   updateDoctorDetails,
//   clearDoctorDetails,
// } from '../../redux/redux_slice/DoctorDetailsSlice';
// import {
//   formatDate,
//   showErrorToast,
//   showSuccessToast,
// } from '../../utils/HelperFuntions';

// // This is a dummy component for Tag input.
// // You should install a library like 'react-native-tags-input' for full functionality.
// const TagInput = ({label, tags, onTagsChange, placeholdername}) => {
//   const [text, setText] = useState('');

//   const addTag = () => {
//     if (text && !tags.includes(text)) {
//       onTagsChange([...tags, text]);
//     }
//     setText('');
//   };

//   const removeTag = index => {
//     const newTags = [...tags];
//     newTags.splice(index, 1);
//     onTagsChange(newTags);
//   };

//   const stripHtml = (html = '') => {
//     if (!html) return '';
//     return html.replace(/<\/?[^>]+(>|$)/g, ''); // remove HTML tags
//   };

//   return (
//     <View style={styles.inputContainer}>
//       <Text style={styles.label}>{label}</Text>
//       <View style={styles.tagInputContainer}>
//         {tags?.map((tag, index) => (
//           <View key={index} style={styles.tag}>
//             <Text style={styles.tagText}>
//               {tag?.replaceAll('&amp', '').replaceAll(';', '')}
//             </Text>
//             <TouchableOpacity onPress={() => removeTag(index)}>
//               <Image style={styles.tagDelete} source={imageindex.cancel} />
//             </TouchableOpacity>
//           </View>
//         ))}
//         <TextInput
//           style={styles.tagTextInput}
//           value={text}
//           onChangeText={setText}
//           onSubmitEditing={addTag}
//           placeholder={'Add ' + placeholdername + '...'}
//           placeholderTextColor={Colors.GRAY}
//         />
//       </View>
//     </View>
//   );
// };

// const UpdateProfileScreen = () => {
//   const doctorDetails = useSelector(state => state.doctorDetails);
//   console.log('----1555----', doctorDetails);
//   // console.log("-----doctorDetails--",doctorDetails)

//   const dispatch = useDispatch();
//   const getDoctorDetails = async () => {
//     const token = await AsyncStorage.getItem('userToken');
//     try {
//       setIsLoading(true);

//       const response = await ApiRequest({
//         BASEURL: ApiRoutes.getDoctorDetails,
//         method: 'POST',
//         token: token,
//       });

//       const decrypted = decryptData(response?.data);

//       if (decrypted.code === 200 || decrypted.code === 201) {
//         console.log(
//           'Decrypted getDoctorDetails Data--------:',
//           decrypted?.data,
//         );
//         dispatch(setDoctorDetails(decrypted?.data));
//         // setDoctor(decrypted?.data);
//         setIsLoading(false);
//       } else {
//         setIsLoading(false);
//         console.error('Server error:', decrypted?.message);
//       }
//     } catch (error) {
//       setIsLoading(false);
//       console.error('Fetch Error:', error);
//     }
//   };

//   useEffect(() => {
//     getDoctorDetails();
//   }, []);

//   const [doctor, setDoctor] = useState(doctorDetails);

//   // console.log('---------------', doctor);
//   const [isLoading, setIsLoading] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);

//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const handleDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || doctor.dob;
//     setShowDatePicker(Platform.OS === 'ios');
//     setDoctor({...doctor, dob: currentDate});
//   };

//   const userData = useSelector(state => state?.user?.userData); // Correct reducer key
//   console.log('-------userData-------', userData);

//   const formattedDate = userData?.endDate
//     ?.toLocaleDateString('en-GB', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//     })
//     .replace(/\//g, '-');

//   // ✅ Submit Function
//   const handleBasicDetailsSubmit = async values => {

//     console.log("---jbsbskjgbfnfi-------------")
//     const token = await AsyncStorage.getItem('userToken');

//     const req = {
//       dateOfBirth,
//       gender,
//       profilePic,
//       specialization,
//       experience,
//       registrationNumber,
//       registrationCouncil,
//       registrationYear,
//       degree,
//       collegeName,
//       passOutYear,
//       description,
//       language,
//       fees,
//       email,
//       contact,
//       name,
//       salutation,
//     };

//     console.log("--------req-------",req)

//     try {
//       setSubmitLoading(true);

//       const response = await ApiRequest({
//         BASEURL: ApiRoutes.addBasicProfile,
//         method: 'POST',
//         req: req,
//         token: token,
//       });

//       const resData = await decryptData(response.data);

//       console.log('------------resData-------', resData);

//       if (resData?.code === 200 || resData?.code === 201) {
//         showSuccessToast('Success', resData?.message);
//       } else {
//         showErrorToast('Failed', resData?.message || 'Something went wrong');
//       }
//     } catch (error) {
//       console.error('Bank Details Update Error:', error?.message || error);
//       showErrorToast('Failed', error?.message || 'Error updating bank details');
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   return (
//     <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
//       <HeaderCompt title={'Update Basic Details'} />
//       {isLoading ? (
//         <ActivityIndicator size={'large'} style={{flex: 1}} />
//       ) : (
//         <ScrollView
//           style={styles.container}
//           contentContainerStyle={styles.contentContainer}>
//           {/* Salutation and Full Name */}
//           <View style={styles.row}>
//             <View style={[styles.inputContainer, {flex: 0.4}]}>
//               <Text style={styles.label}>Salutation</Text>
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   selectedValue={doctor.salutation}
//                   onValueChange={itemValue =>
//                     setDoctor({...doctor, salutation: itemValue})
//                   }
//                   style={styles.picker}>
//                   <Picker.Item label="Dr." value="Dr." />
//                   <Picker.Item label="Mr." value="Mr." />
//                   <Picker.Item label="Ms." value="Ms." />
//                 </Picker>
//               </View>
//             </View>
//             <View style={[styles.inputContainer, {flex: 0.6}]}>
//               <Text style={styles.label}>Full Name</Text>
//               <TextInput
//                 style={styles.input}
//                 value={doctor?.name}
//                 onChangeText={text => setDoctor({...doctor, fullName: text})}
//               />
//             </View>
//           </View>

//           {/* Email and Contact */}
//           {/* <View style={styles.row}> */}
//           <View style={[styles.inputContainer, {flex: 1}]}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               style={styles.input}
//               value={userData?.email}
//               onChangeText={text => setDoctor({...doctor, email: text})}
//               keyboardType="email-address"
//               editable={false}
//             />
//           </View>
//           <View style={[styles.inputContainer, {flex: 1}]}>
//             <Text style={styles.label}>Contact</Text>
//             <TextInput
//               style={styles.input}
//               value={userData?.contact}
//               onChangeText={text => setDoctor({...doctor, contact: text})}
//               keyboardType="phone-pad"
//               editable={false}
//             />
//           </View>
//           {/* </View> */}

//           {/* Date of Birth and Gender */}
//           <View style={styles.row}>
//             <View style={[styles.inputContainer, {flex: 1}]}>
//               <Text style={styles.label}>Date of Birth</Text>
//               <TouchableOpacity
//                 style={styles.dateInput}
//                 onPress={() => setShowDatePicker(true)}>
//                 <Text
//                   style={{
//                     color: Colors.BLACK,
//                     fontFamily: Fonts.PoppinsRegular,
//                   }}>
//                   {formatDate(doctor.dateOfBirth)}{' '}
//                 </Text>
//               </TouchableOpacity>
//               {showDatePicker && (
//                 <DateTimePicker
//                   value={new Date(doctor.dateOfBirth + '')}
//                   mode="date"
//                   display="default"
//                   onChange={handleDateChange}
//                 />
//               )}
//             </View>
//             <View style={[styles.inputContainer, {flex: 1}]}>
//               <Text style={styles.label}>Gender</Text>
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   selectedValue={doctor.gender}
//                   onValueChange={itemValue =>
//                     setDoctor({...doctor, gender: itemValue})
//                   }
//                   style={styles.picker}>
//                   <Picker.Item label="Male" value="Male" />
//                   <Picker.Item label="Female" value="Female" />
//                   <Picker.Item label="Other" value="Other" />
//                 </Picker>
//               </View>
//             </View>
//           </View>

//           {/* Total Experience */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Total Experience</Text>
//             <TextInput
//               style={styles.input}
//               value={doctor.experience}
//               onChangeText={text =>
//                 setDoctor({...doctor, totalExperience: text})
//               }
//             />
//           </View>

//           {/* Select Language For Consultation */}
//           <TagInput
//             label="Select Language For Consultation"
//             tags={doctor.language}
//             onTagsChange={newTags => setDoctor({...doctor, language: newTags})}
//             placeholdername={'language'}
//           />

//           {/* Specialization */}
//           <TagInput
//             label="Specialization"
//             tags={doctor.specialization}
//             onTagsChange={newTags =>
//               setDoctor({...doctor, specialization: newTags})
//             }
//             placeholdername={'specialization'}
//           />

//           {/* Qualifications and College/University */}
//           <View style={styles.row}>
//             <View style={[styles.inputContainer, {flex: 1}]}>
//               <Text style={styles.label}>Qualifications</Text>
//               <TextInput
//                 style={styles.input}
//                 value={doctor.qualification?.degree}
//                 onChangeText={text =>
//                   setDoctor({...doctor, qualification: text})
//                 }
//               />
//             </View>
//             <View style={[styles.inputContainer, {flex: 1}]}>
//               <Text style={styles.label}>College/University</Text>
//               <TextInput
//                 style={styles.input}
//                 value={doctor.qualification?.collegeName}
//                 onChangeText={text => setDoctor({...doctor, college: text})}
//               />
//             </View>
//           </View>

//           {/* Year of passing/graduation */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Year of passing/graduation</Text>
//             <TextInput
//               style={styles.input}
//               value={doctor.qualification?.passOutYear}
//               onChangeText={text => setDoctor({...doctor, passingYear: text})}
//               keyboardType="numeric"
//             />
//           </View>

//           {/* Medical Registration Number and Registration Council */}
//           {/* <View style={styles.row}> */}
//           <View style={[styles.inputContainer, {flex: 1}]}>
//             <Text style={styles.label}>Medical Registration Number</Text>
//             <TextInput
//               style={styles.input}
//               value={doctor.medicalRegistration?.registrationNumber}
//               onChangeText={text => setDoctor({...doctor, medicalRegNo: text})}
//             />
//           </View>
//           <View style={[styles.inputContainer, {flex: 1}]}>
//             <Text style={styles.label}>Registration Council</Text>
//             <TextInput
//               style={styles.input}
//               value={doctor.medicalRegistration?.registrationCouncil}
//               onChangeText={text => setDoctor({...doctor, regCouncil: text})}
//             />
//           </View>
//           {/* </View> */}

//           {/* Registration Year and Consultation Fees */}
//           <View style={styles.row}>
//             <View style={[styles.inputContainer, {flex: 1}]}>
//               <Text style={styles.label}>Registration Year</Text>
//               <TextInput
//                 style={styles.input}
//                 value={doctor.medicalRegistration?.registrationYear}
//                 onChangeText={text => setDoctor({...doctor, regYear: text})}
//                 keyboardType="numeric"
//               />
//             </View>
//             <View style={[styles.inputContainer, {flex: 1}]}>
//               <Text style={styles.label}>Consultation Fees</Text>
//               <TextInput
//                 style={[styles.input, styles.feesInput]}
//                 value={doctor.fees + ''}
//                 onChangeText={text => setDoctor({...doctor, fees: text})}
//                 keyboardType="numeric"
//               />
//             </View>
//           </View>

//           {/* Description */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Description</Text>
//             <TextInput
//               style={[styles.input, styles.descriptionInput]}
//               value={doctor.description?.replace(/<[^>]+>/g, '')}
//               onChangeText={text => setDoctor({...doctor, description: text})}
//               multiline={true}
//               numberOfLines={6}
//             />
//           </View>

//           {/* Update Button */}

//           <ButtonCompt
//             title={'Update'}
//             isLoading={submitLoading}
//             onPress={handleBasicDetailsSubmit}
//           />
//         </ScrollView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   contentContainer: {
//     padding: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 15,
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     marginBottom: 8,
//     fontSize: 14,
//     fontFamily: Fonts.PoppinsRegular,
//     color: Colors.BLACK,
//     opacity: 0.7,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     fontSize: 14,
//     fontFamily: Fonts.PoppinsRegular,
//     color: Colors.BLACK,
//     backgroundColor: '#fff',
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     backgroundColor: '#fff',
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//     color: Colors.BLACK,
//   },
//   dateInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     justifyContent: 'center',
//   },
//   feesInput: {
//     borderColor: '#00b894', // A teal color like in the image
//     borderWidth: 1.5,
//   },
//   descriptionInput: {
//     height: 150,
//     textAlignVertical: 'top',
//     paddingTop: 15,
//   },
//   updateButton: {
//     backgroundColor: '#00b894', // A teal color
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   updateButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontFamily: Fonts.PoppinsMedium,
//   },
//   // Tag Input Styles
//   tagInputContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 10,
//   },
//   tag: {
//     flexDirection: 'row',
//     backgroundColor: '#eee',
//     borderRadius: 15,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     margin: 4,
//     alignItems: 'center',
//   },
//   tagText: {
//     color: Colors.BLACK,
//     fontFamily: Fonts.PoppinsRegular,
//   },
//   tagDelete: {
//     marginLeft: 8,
//     tintColor: '#888',
//     height: 15,
//     width: 15,
//   },
//   tagTextInput: {
//     flex: 1,
//     minWidth: 100,
//     paddingVertical: 5,
//     fontSize: 15,
//   },
// });

// export default UpdateProfileScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Image,
  Alert, // Import Alert for better error messages
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ButtonCompt, HeaderCompt} from '../../components'; // Assuming you have a header component
import {Colors} from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiRequest from '../../network/ApiRequest';
import {decryptData} from '../../utils/encryptionUtils';
import {useDispatch, useSelector} from 'react-redux';
import imageindex from '../../assets/images/imageindex';
import {ApiRoutes} from '../../utils/ApiRoutes';
import {setDoctorDetails} from '../../redux/redux_slice/DoctorDetailsSlice';
import {
  formatDate,
  showErrorToast,
  showSuccessToast,
} from '../../utils/HelperFuntions';

// This is a dummy component for Tag input.
const TagInput = ({label, tags, onTagsChange, placeholdername}) => {
  const [text, setText] = useState('');

  const addTag = () => {
    if (text && !tags?.includes(text)) {
      // Add null/undefined check for tags
      onTagsChange([...(tags || []), text]); // Ensure tags is an array
    }
    setText('');
  };

  const removeTag = index => {
    const newTags = [...(tags || [])]; // Ensure tags is an array
    newTags.splice(index, 1);
    onTagsChange(newTags);
  };

  // No need for stripHtml here, as it's typically for display, and the tags are already clean.

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.tagInputContainer}>
        {tags?.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>
              {tag?.replaceAll('&amp', '').replaceAll(';', '')}
            </Text>
            <TouchableOpacity onPress={() => removeTag(index)}>
              <Image style={styles.tagDelete} source={imageindex.cancel} />
            </TouchableOpacity>
          </View>
        ))}
        <TextInput
          style={styles.tagTextInput}
          value={text}
          onChangeText={setText}
          onSubmitEditing={addTag}
          placeholder={'Add ' + placeholdername + '...'}
          placeholderTextColor={Colors.GRAY}
        />
      </View>
    </View>
  );
};

const UpdateProfileScreen = () => {
  const dispatch = useDispatch();
  const doctorDetailsFromRedux = useSelector(state => state.doctorDetails);

  console.log(
    '---------------sdskgnpo-----------',
    JSON.stringify(doctorDetailsFromRedux?.clinic),
  );
  const userData = useSelector(state => state?.user?.userData); // For email and contact

  // Initialize doctor state with data from Redux, ensuring all fields are present
  const [doctor, setDoctor] = useState({
    salutation: doctorDetailsFromRedux?.salutation || 'Dr.',
    name: doctorDetailsFromRedux?.name || '',
    email: userData?.email || '', // Use userData for initial email/contact
    contact: userData?.contact || '',
    dateOfBirth:
      doctorDetailsFromRedux?.dateOfBirth || new Date().toISOString(),
    gender: doctorDetailsFromRedux?.gender || 'Male',
    experience: doctorDetailsFromRedux?.experience || '',
    language: doctorDetailsFromRedux?.language || [],
    specialization: doctorDetailsFromRedux?.specialization || [],
    qualification: {
      degree: doctorDetailsFromRedux?.qualification?.degree || '',
      collegeName: doctorDetailsFromRedux?.qualification?.collegeName || '',
      passOutYear: doctorDetailsFromRedux?.qualification?.passOutYear || '',
    },
    medicalRegistration: {
      registrationNumber:
        doctorDetailsFromRedux?.medicalRegistration?.registrationNumber || '',
      registrationCouncil:
        doctorDetailsFromRedux?.medicalRegistration?.registrationCouncil || '',
      registrationYear:
        doctorDetailsFromRedux?.medicalRegistration?.registrationYear || '',
    },
    fees: doctorDetailsFromRedux?.fees || '',
    description: doctorDetailsFromRedux?.description || '',
    profilePic: doctorDetailsFromRedux?.profilePic || '', // Add profile pic
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Effect to update local state if doctorDetailsFromRedux changes (e.g., after initial fetch)
  useEffect(() => {
    if (
      doctorDetailsFromRedux &&
      Object.keys(doctorDetailsFromRedux).length > 0
    ) {
      setDoctor(prevDoctor => ({
        ...prevDoctor,
        salutation: doctorDetailsFromRedux?.salutation || prevDoctor.salutation,
        name: doctorDetailsFromRedux?.name || prevDoctor.name,
        dateOfBirth:
          doctorDetailsFromRedux?.dateOfBirth || prevDoctor.dateOfBirth,
        gender: doctorDetailsFromRedux?.gender || prevDoctor.gender,
        experience: doctorDetailsFromRedux?.experience || prevDoctor.experience,
        language: doctorDetailsFromRedux?.language || prevDoctor.language,
        specialization:
          doctorDetailsFromRedux?.specialization || prevDoctor.specialization,
        qualification: {
          degree:
            doctorDetailsFromRedux?.qualification?.degree ||
            prevDoctor.qualification.degree,
          collegeName:
            doctorDetailsFromRedux?.qualification?.collegeName ||
            prevDoctor.qualification.collegeName,
          passOutYear:
            doctorDetailsFromRedux?.qualification?.passOutYear ||
            prevDoctor.qualification.passOutYear,
        },
        medicalRegistration: {
          registrationNumber:
            doctorDetailsFromRedux?.medicalRegistration?.registrationNumber ||
            prevDoctor.medicalRegistration.registrationNumber,
          registrationCouncil:
            doctorDetailsFromRedux?.medicalRegistration?.registrationCouncil ||
            prevDoctor.medicalRegistration.registrationCouncil,
          registrationYear:
            doctorDetailsFromRedux?.medicalRegistration?.registrationYear ||
            prevDoctor.medicalRegistration.registrationYear,
        },
        fees: doctorDetailsFromRedux?.fees || prevDoctor.fees,
        description:
          doctorDetailsFromRedux?.description || prevDoctor.description,
        profilePic: doctorDetailsFromRedux?.profilePic || prevDoctor.profilePic,
      }));
    }
  }, [doctorDetailsFromRedux]);

  const getDoctorDetails = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      showErrorToast('Error', 'Authentication token not found.');
      return;
    }
    try {
      setIsLoading(true);
      const response = await ApiRequest({
        BASEURL: ApiRoutes.getDoctorDetails,
        method: 'POST', // Assuming GET is not required but POST is for some reason. If it's GET, remove 'req'
        token: token,
      });

      const decrypted = decryptData(response?.data);

      if (decrypted.code === 200 || decrypted.code === 201) {
        dispatch(setDoctorDetails(decrypted?.data));
        // The useEffect will handle updating the local `doctor` state
      } else {
        showErrorToast(
          'Failed',
          decrypted?.message || 'Failed to fetch doctor details',
        );
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      showErrorToast(
        'Error',
        'Failed to fetch doctor details. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDoctorDetails();
  }, []); // Run once on component mount

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(doctor.dateOfBirth);
    setShowDatePicker(Platform.OS === 'ios');
    setDoctor({...doctor, dateOfBirth: currentDate.toISOString()}); // Store as ISO string
  };

  // ✅ Submit Function
  const handleBasicDetailsSubmit = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      showErrorToast(
        'Error',
        'Authentication token not found. Please log in again.',
      );
      return;
    }

    // Prepare the request payload using the `doctor` state
    const req = {
      salutation: doctor.salutation,
      name: doctor.name,
      email: doctor.email, // Use state email
      contact: doctor.contact, // Use state contact
      dateOfBirth: doctor.dateOfBirth, // Already an ISO string
      gender: doctor.gender,
      experience: doctor.experience,
      language: doctor.language,
      specialization: doctor.specialization,
      // If profilePic is not handled by a separate upload, include it here
      profilePic: doctor.profilePic,
      registrationNumber: doctor.medicalRegistration.registrationNumber,
      registrationCouncil: doctor.medicalRegistration.registrationCouncil,
      registrationYear: doctor.medicalRegistration.registrationYear,
      degree: doctor.qualification.degree,
      collegeName: doctor.qualification.collegeName,
      passOutYear: doctor.qualification.passOutYear,
      description: doctor.description, // Ensure this is not HTML if API expects plain text
      fees: Number(doctor.fees), // Ensure fees is a number
    };

    console.log('--------Request Payload-------', req);

    try {
      setSubmitLoading(true);

      const response = await ApiRequest({
        BASEURL: ApiRoutes.addBasicProfile, // Make sure this API route is correct for updating
        method: 'POST', // or 'PUT'/'PATCH' if your API supports it for updates
        req: req,
        token: token,
      });

      const resData = await decryptData(response.data);

      console.log('------------API Response-------', resData);

      if (resData?.code === 200 || resData?.code === 201) {
        showSuccessToast(
          'Success',
          resData?.message || 'Profile updated successfully!',
        );
        // Optionally refetch details to update Redux store
        getDoctorDetails();
      } else {
        showErrorToast(
          'Failed',
          resData?.message || 'Something went wrong while updating profile.',
        );
      }
    } catch (error) {
      console.error('Profile Update Error:', error);
      showErrorToast(
        'Failed',
        error?.message || 'Error updating profile. Please try again.',
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <HeaderCompt title={'Update Basic Details'} />
      {isLoading ? (
        <ActivityIndicator
          size={'large'}
          style={{flex: 1, justifyContent: 'center'}}
          color={Colors.PRIMARY}
        />
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          {/* Profile Picture */}
          {/* <View style={styles.profilePicContainer}> */}
          {/* <Image
              // source={
              //   doctor.profilePic
              //     ? {uri: doctor.profilePic}
              //     : imageindex.defaultDoctor
              // } // Use a default image if none
               source={{uri:doctor.profilePic}}
              style={styles.profilePic}
            /> */}
          {/* Add an editable icon or button here for changing profile picture */}
          {/* <TouchableOpacity style={styles.editProfilePicButton}>
              <Image source={imageindex.edit} style={styles.cameraIcon} />
            </TouchableOpacity> */}
          {/* </View> */}

          {/* Salutation and Full Name */}
          <View style={styles.row}>
            <View style={[styles.inputContainer, {flex: 0.4}]}>
              <Text style={styles.label}>Salutation</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={doctor.salutation}
                  onValueChange={itemValue =>
                    setDoctor({...doctor, salutation: itemValue})
                  }
                  style={styles.picker}
                  itemStyle={{color: Colors.BLACK}} // For iOS text color
                >
                  <Picker.Item label="Dr." value="Dr." />
                  <Picker.Item label="Mr." value="Mr." />
                  <Picker.Item label="Ms." value="Ms." />
                </Picker>
              </View>
            </View>
            <View style={[styles.inputContainer, {flex: 0.6}]}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={doctor?.name}
                onChangeText={text => setDoctor({...doctor, name: text})}
                placeholder="Enter full name"
                placeholderTextColor={Colors.GRAY}
              />
            </View>
          </View>

          {/* Email and Contact */}
          <View style={[styles.inputContainer, {flex: 1}]}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={doctor?.email} // Use doctor.email from state
              onChangeText={text => setDoctor({...doctor, email: text})}
              keyboardType="email-address"
              editable={false} // Assuming email is not editable
              placeholder="Doctor's email"
              placeholderTextColor={Colors.GRAY}
            />
          </View>
          <View style={[styles.inputContainer, {flex: 1}]}>
            <Text style={styles.label}>Contact</Text>
            <TextInput
              style={styles.input}
              value={doctor?.contact} // Use doctor.contact from state
              onChangeText={text => setDoctor({...doctor, contact: text})}
              keyboardType="phone-pad"
              editable={false} // Assuming contact is not editable
              placeholder="Doctor's contact number"
              placeholderTextColor={Colors.GRAY}
            />
          </View>

          {/* Date of Birth and Gender */}
          <View style={styles.row}>
            <View style={[styles.inputContainer, {flex: 1}]}>
              <Text style={styles.label}>Date of Birth</Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}>
                <Text
                  style={{
                    color: Colors.BLACK,
                    fontFamily: Fonts.PoppinsRegular,
                  }}>
                  {doctor.dateOfBirth
                    ? formatDate(doctor.dateOfBirth)
                    : 'Select Date'}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={new Date(doctor.dateOfBirth)}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>
            <View style={[styles.inputContainer, {flex: 1}]}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={doctor.gender}
                  onValueChange={itemValue =>
                    setDoctor({...doctor, gender: itemValue})
                  }
                  style={styles.picker}
                  itemStyle={{color: Colors.BLACK}} // For iOS text color
                >
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
            </View>
          </View>

          {/* Total Experience */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Total Experience</Text>
            <TextInput
              style={styles.input}
              value={doctor.experience}
              onChangeText={text => setDoctor({...doctor, experience: text})}
              placeholder="e.g., 10 Years Experience"
              placeholderTextColor={Colors.GRAY}
            />
          </View>

          {/* Select Language For Consultation */}
          <TagInput
            label="Select Language For Consultation"
            tags={doctor.language}
            onTagsChange={newTags => setDoctor({...doctor, language: newTags})}
            placeholdername={'language'}
          />

          {/* Specialization */}
          <TagInput
            label="Specialization"
            tags={doctor.specialization}
            onTagsChange={newTags =>
              setDoctor({...doctor, specialization: newTags})
            }
            placeholdername={'specialization'}
          />

          {/* Qualifications and College/University */}
          <View style={styles.row}>
            <View style={[styles.inputContainer, {flex: 1}]}>
              <Text style={styles.label}>Qualifications</Text>
              <TextInput
                style={styles.input}
                value={doctor.qualification?.degree}
                onChangeText={text =>
                  setDoctor({
                    ...doctor,
                    qualification: {...doctor.qualification, degree: text},
                  })
                }
                placeholder="e.g., MBBS, MD"
                placeholderTextColor={Colors.GRAY}
              />
            </View>
            <View style={[styles.inputContainer, {flex: 1}]}>
              <Text style={styles.label}>College/University</Text>
              <TextInput
                style={styles.input}
                value={doctor.qualification?.collegeName}
                onChangeText={text =>
                  setDoctor({
                    ...doctor,
                    qualification: {...doctor.qualification, collegeName: text},
                  })
                }
                placeholder="e.g., AIIMS Delhi"
                placeholderTextColor={Colors.GRAY}
              />
            </View>
          </View>

          {/* Year of passing/graduation */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Year of passing/graduation</Text>
            <TextInput
              style={styles.input}
              value={doctor.qualification?.passOutYear}
              onChangeText={text =>
                setDoctor({
                  ...doctor,
                  qualification: {...doctor.qualification, passOutYear: text},
                })
              }
              keyboardType="numeric"
              placeholder="e.g., 2013"
              placeholderTextColor={Colors.GRAY}
            />
          </View>

          {/* Medical Registration Number and Registration Council */}
          <View style={[styles.inputContainer, {flex: 1}]}>
            <Text style={styles.label}>Medical Registration Number</Text>
            <TextInput
              style={styles.input}
              value={doctor.medicalRegistration?.registrationNumber}
              onChangeText={text =>
                setDoctor({
                  ...doctor,
                  medicalRegistration: {
                    ...doctor.medicalRegistration,
                    registrationNumber: text,
                  },
                })
              }
              placeholder="Enter registration number"
              placeholderTextColor={Colors.GRAY}
            />
          </View>
          <View style={[styles.inputContainer, {flex: 1}]}>
            <Text style={styles.label}>Registration Council</Text>
            <TextInput
              style={styles.input}
              value={doctor.medicalRegistration?.registrationCouncil}
              onChangeText={text =>
                setDoctor({
                  ...doctor,
                  medicalRegistration: {
                    ...doctor.medicalRegistration,
                    registrationCouncil: text,
                  },
                })
              }
              placeholder="e.g., MCI"
              placeholderTextColor={Colors.GRAY}
            />
          </View>

          {/* Registration Year and Consultation Fees */}
          <View style={styles.row}>
            <View style={[styles.inputContainer, {flex: 1}]}>
              <Text style={styles.label}>Registration Year</Text>
              <TextInput
                style={styles.input}
                value={doctor.medicalRegistration?.registrationYear}
                onChangeText={text =>
                  setDoctor({
                    ...doctor,
                    medicalRegistration: {
                      ...doctor.medicalRegistration,
                      registrationYear: text,
                    },
                  })
                }
                keyboardType="numeric"
                placeholder="e.g., 2012"
                placeholderTextColor={Colors.GRAY}
              />
            </View>
            <View style={[styles.inputContainer, {flex: 1}]}>
              <Text style={styles.label}>Consultation Fees</Text>
              <TextInput
                style={[styles.input, styles.feesInput]}
                value={doctor.fees ? String(doctor.fees) : ''} // Convert to string for TextInput
                onChangeText={text => setDoctor({...doctor, fees: text})}
                keyboardType="numeric"
                placeholder="e.g., 499"
                placeholderTextColor={Colors.GRAY}
              />
            </View>
          </View>

          {/* Description */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              // Strip HTML tags for display, but ensure the state retains original if API requires
              value={doctor.description?.replace(/<[^>]+>/g, '')}
              onChangeText={text => setDoctor({...doctor, description: text})}
              multiline={true}
              numberOfLines={6}
              placeholder="Provide a detailed description of your experience and services."
              placeholderTextColor={Colors.GRAY}
            />
          </View>

          {/* Update Button */}
          <ButtonCompt
            title={'Update Profile'}
            isLoading={submitLoading}
            onPress={handleBasicDetailsSubmit}
            buttonStyle={styles.updateButton}
            textStyle={styles.updateButtonText}
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40, // Add more padding at the bottom for the button
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 15, // Added margin for consistency
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.BLACK,
    opacity: 0.7,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.BLACK,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden', // Required for Android to show border radius correctly
  },
  picker: {
    height: 50,
    width: '100%',
    color: Colors.BLACK, // For Android text color
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'center',
  },
  feesInput: {
    borderColor: '#00b894', // A teal color like in the image
    borderWidth: 1.5,
  },
  descriptionInput: {
    height: 150,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  updateButton: {
    backgroundColor: '#00b894', // A teal color
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: Fonts.PoppinsMedium,
  },
  // Tag Input Styles
  tagInputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 50, // Ensure it has some height even with no tags
  },
  tag: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 4,
    alignItems: 'center',
  },
  tagText: {
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsRegular,
  },
  tagDelete: {
    marginLeft: 8,
    tintColor: '#888',
    height: 15,
    width: 15,
  },
  tagTextInput: {
    flex: 1,
    minWidth: 100,
    paddingVertical: 5,
    fontSize: 15,
    color: Colors.BLACK, // Ensure text color is visible
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
  },
  editProfilePicButton: {
    position: 'absolute',
    bottom: 0,
    right: '32%', // Adjust based on layout
    backgroundColor: Colors.APPCOLOR,
    borderRadius: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cameraIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.WHITE,
  },
});

export default UpdateProfileScreen;
