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
import {
  setDoctorDetails,
  updateDoctorDetails,
  clearDoctorDetails,
} from '../../redux/redux_slice/DoctorDetailsSlice';
import {formatDate} from '../../utils/HelperFuntions';

// This is a dummy component for Tag input.
// You should install a library like 'react-native-tags-input' for full functionality.
const TagInput = ({label, tags, onTagsChange}) => {
  const [text, setText] = useState('');

  const addTag = () => {
    if (text && !tags.includes(text)) {
      onTagsChange([...tags, text]);
    }
    setText('');
  };

  const removeTag = index => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    onTagsChange(newTags);
  };

  const stripHtml = (html = '') => {
    if (!html) return '';
    return html.replace(/<\/?[^>]+(>|$)/g, ''); // remove HTML tags
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.tagInputContainer}>
        {tags?.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag?.replaceAll('&amp', '')}</Text>
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
          placeholder="Add a tag..."
          placeholderTextColor={Colors.GRAY}
        />
      </View>
    </View>
  );
};

const UpdateProfileScreen = () => {
  // const doctorDetails = useSelector((state) => state.doctorDetails);

  // console.log("-----doctorDetails--",doctorDetails)

  const dispatch = useDispatch();
  const getDoctorDetails = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      setIsLoading(true);

      const response = await ApiRequest({
        BASEURL: ApiRoutes.getDoctorDetails,
        method: 'POST',
        token: token,
      });

      const decrypted = decryptData(response?.data);

      if (decrypted.code === 200 || decrypted.code === 201) {
        console.log(
          'Decrypted getDoctorDetails Data--------:',
          decrypted?.data,
        );
        dispatch(setDoctorDetails(decrypted?.data));
        setDoctor(decrypted?.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.error('Server error:', decrypted?.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Fetch Error:', error);
    }
  };

  useEffect(() => {
    getDoctorDetails();
  }, []);

  const [doctor, setDoctor] = useState({});

  // console.log('---------------', doctor);
  const [isLoading, setIsLoading] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || doctor.dob;
    setShowDatePicker(Platform.OS === 'ios');
    setDoctor({...doctor, dob: currentDate});
  };

  const userData = useSelector(state => state?.user?.userData); // Correct reducer key
  console.log('-------userData-------', userData);

  const formattedDate = userData?.endDate
    ?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '-');

  return (
    <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <HeaderCompt title={'Update Basic Details'} />
      {isLoading ? (
        <ActivityIndicator size={'large'} style={{flex: 1}} />
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
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
                  style={styles.picker}>
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
                onChangeText={text => setDoctor({...doctor, fullName: text})}
              />
            </View>
          </View>

          {/* Email and Contact */}
          {/* <View style={styles.row}> */}
          <View style={[styles.inputContainer, {flex: 1}]}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={userData?.email}
              onChangeText={text => setDoctor({...doctor, email: text})}
              keyboardType="email-address"
              editable={false}
            />
          </View>
          <View style={[styles.inputContainer, {flex: 1}]}>
            <Text style={styles.label}>Contact</Text>
            <TextInput
              style={styles.input}
              value={userData?.contact}
              onChangeText={text => setDoctor({...doctor, contact: text})}
              keyboardType="phone-pad"
              editable={false}
            />
          </View>
          {/* </View> */}

          {/* Date of Birth and Gender */}
          <View style={styles.row}>
            <View style={[styles.inputContainer, {flex: 1}]}>
              <Text style={styles.label}>Date of Birth</Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}>
                <Text style={{color: Colors.BLACK}}>
                  {formatDate(doctor.dateOfBirth)}{' '}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={new Date(doctor.dateOfBirth + '')}
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
                  style={styles.picker}>
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
              onChangeText={text =>
                setDoctor({...doctor, totalExperience: text})
              }
            />
          </View>

          {/* Select Language For Consultation */}
          <TagInput
            label="Select Language For Consultation"
            tags={doctor.language}
            onTagsChange={newTags => setDoctor({...doctor, language: newTags})}
          />

          {/* Specialization */}
          <TagInput
            label="Specialization"
            tags={doctor.specialization}
            onTagsChange={newTags =>
              setDoctor({...doctor, specialization: newTags})
            }
          />

          {/* Qualifications and College/University */}
          <View style={styles.row}>
            <View style={[styles.inputContainer, {flex: 1}]}>
              <Text style={styles.label}>Qualifications</Text>
              <TextInput
                style={styles.input}
                value={doctor.qualification?.degree}
                onChangeText={text =>
                  setDoctor({...doctor, qualification: text})
                }
              />
            </View>
            <View style={[styles.inputContainer, {flex: 1}]}>
              <Text style={styles.label}>College/University</Text>
              <TextInput
                style={styles.input}
                value={doctor.qualification?.collegeName}
                onChangeText={text => setDoctor({...doctor, college: text})}
              />
            </View>
          </View>

          {/* Year of passing/graduation */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Year of passing/graduation</Text>
            <TextInput
              style={styles.input}
              value={doctor.qualification?.passOutYear}
              onChangeText={text => setDoctor({...doctor, passingYear: text})}
              keyboardType="numeric"
            />
          </View>

          {/* Medical Registration Number and Registration Council */}
          {/* <View style={styles.row}> */}
          <View style={[styles.inputContainer, {flex: 1}]}>
            <Text style={styles.label}>Medical Registration Number</Text>
            <TextInput
              style={styles.input}
              value={doctor.medicalRegistration?.registrationNumber}
              onChangeText={text => setDoctor({...doctor, medicalRegNo: text})}
            />
          </View>
          <View style={[styles.inputContainer, {flex: 1}]}>
            <Text style={styles.label}>Registration Council</Text>
            <TextInput
              style={styles.input}
              value={doctor.medicalRegistration?.registrationCouncil}
              onChangeText={text => setDoctor({...doctor, regCouncil: text})}
            />
          </View>
          {/* </View> */}

          {/* Registration Year and Consultation Fees */}
          <View style={styles.row}>
            <View style={[styles.inputContainer, {flex: 1}]}>
              <Text style={styles.label}>Registration Year</Text>
              <TextInput
                style={styles.input}
                value={doctor.medicalRegistration?.registrationYear}
                onChangeText={text => setDoctor({...doctor, regYear: text})}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.inputContainer, {flex: 1}]}>
              <Text style={styles.label}>Consultation Fees</Text>
              <TextInput
                style={[styles.input, styles.feesInput]}
                value={doctor.fees + ''}
                onChangeText={text => setDoctor({...doctor, fees: text})}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Description */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              value={doctor.description?.replace(/<[^>]+>/g, '')}
              onChangeText={text => setDoctor({...doctor, description: text})}
              multiline={true}
              numberOfLines={6}
            />
          </View>

          {/* Update Button */}
          {/* <TouchableOpacity
          style={styles.updateButton}
          onPress={() => console.log('Updated Data:', doctor)}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity> */}
          <ButtonCompt title={'Update'} />
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
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
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
  },
  picker: {
    height: 50,
    width: '100%',
    color: Colors.BLACK,
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
  },
});

export default UpdateProfileScreen;
