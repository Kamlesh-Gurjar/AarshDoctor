// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import Icon from '@react-native-vector-icons/material-icons';
// import {ButtonCompt, HeaderCompt} from '../../../components';
// import {Colors} from '../../../theme/Colors';
// import Fonts from '../../../theme/Fonts';
// import styles from './styles.editslotes';

// const EditSlotsScreen = ({route}) => {
//   const {item} = route?.params;
//   console.log('======slot item=====',JSON.stringify(item));
//   const [slotType, setSlotType] = useState('Offline');
//   const [selectedClinic, setSelectedClinic] = useState('Motherhood Hospital');
//   const [selectedDay, setSelectedDay] = useState('Monday');
//   const [isClinicDropdownOpen, setIsClinicDropdownOpen] = useState(false);

//   const clinics = [
//     'Select a clinic',
//     'Motherhood Hospital',
//     'Pranshu Surgical And Maternity Center',
//   ];
//   const days = [
//     'Monday',
//     'Tuesday',
//     'Wednusday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//     'Sunday',
//   ];

//   const handleUpdate = () => {
//     // Handle the update logic here
//     console.log({
//       slotType,
//       selectedClinic,
//       selectedDay,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <HeaderCompt title={'Edit Slots'} />

//       <ScrollView style={styles.form}>
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Select Slot Type</Text>
//           <View style={styles.radioContainer}>
//             <TouchableOpacity
//               style={styles.radioButton}
//               onPress={() => setSlotType('Online')}>
//               {/* <View
//                 style={[
//                   styles.radio,
//                   slotType === 'Online' && styles.radioSelected,
//                 ]}
//               /> */}
//               <View style={[styles.radio]}>
//                 <View
//                   style={[
//                     {borderRadius: 50, padding: 6, margin: 2},
//                     slotType === 'Online' && styles.radioSelected,
//                   ]}
//                 />
//               </View>
//               <Text
//                 style={{color: Colors.BLACK, fontFamily: Fonts.PoppinsMedium}}>
//                 Online
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.radioButton}
//               onPress={() => setSlotType('Offline')}>
//               {/* <View
//                 style={[
//                   styles.radio,
//                   slotType === 'Offline' && styles.radioSelected,
//                 ]}
//               /> */}
//               <View style={[styles.radio]}>
//                 <View
//                   style={[
//                     {borderRadius: 50, padding: 6, margin: 2},
//                     slotType === 'Offline' && styles.radioSelected,
//                   ]}
//                 />
//               </View>
//               <Text
//                 style={{color: Colors.BLACK, fontFamily: Fonts.PoppinsMedium}}>
//                 Offline
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Select Clinic</Text>
//           <TouchableOpacity
//             style={styles.dropdown}
//             onPress={() => setIsClinicDropdownOpen(!isClinicDropdownOpen)}>
//             <Text
//               style={{color: Colors.BLACK, fontFamily: Fonts.PoppinsMedium}}>
//               {selectedClinic}
//             </Text>
//             <Icon name="arrow-down" size={20} color="#000" />
//           </TouchableOpacity>
//           {isClinicDropdownOpen && (
//             <View style={styles.dropdownOptions}>
//               {clinics.map((clinic, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={[
//                     styles.dropdownOption,
//                     selectedClinic === clinic && styles.dropdownOptionSelected,
//                   ]}
//                   onPress={() => {
//                     setSelectedClinic(clinic);
//                     setIsClinicDropdownOpen(false);
//                   }}>
//                   <Text
//                     style={[
//                       selectedClinic === clinic &&
//                         styles.dropdownOptionTextSelected,
//                       styles.dropdownOptionText,
//                     ]}>
//                     {clinic}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           )}
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Select a Day</Text>
//           <View style={styles.daysContainer}>
//             {days.map((day, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={[styles.radioButton, {width: '33%', marginTop: 10}]}
//                 onPress={() => setSelectedDay(day)}>
//                 <View
//                   style={[
//                     styles.radio,
//                     // selectedDay === day && styles.radioSelected,
//                   ]}>
//                   <View
//                     style={[
//                       {borderRadius: 50, padding: 6, margin: 2},
//                       selectedDay === day && styles.radioSelected,
//                     ]}
//                   />
//                 </View>
//                 <Text
//                   style={{
//                     color: Colors.BLACK,
//                     fontFamily: Fonts.PoppinsMedium,
//                   }}>
//                   {day}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         <ButtonCompt onPress={handleUpdate} title={'Update'} />
//       </ScrollView>
//     </View>
//   );
// };

// export default EditSlotsScreen;



import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
  Image,
} from 'react-native';
import {ButtonCompt, ClinicDropdown, HeaderCompt} from '../../../components';
import Fonts from '../../../theme/Fonts';
import {Colors} from '../../../theme/Colors';
import imageindex from '../../../assets/images/imageindex';
import {showErrorToast, showSuccessToast} from '../../../utils/HelperFuntions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decryptData} from '../../../utils/encryptionUtils';
import ApiRequest from '../../../network/ApiRequest';
import {ApiRoutes} from '../../../utils/ApiRoutes';

// const clinics = ['Clinic A', 'Clinic B', 'Clinic C'];
const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const hoursOptions = Array.from({length: 12}, (_, i) =>
  (i + 1).toString().padStart(2, '0'),
);
const minutesOptions = ['00', '15', '30', '45'];
const ampmOptions = ['AM', 'PM'];

// utility: convert time to minutes for comparison
const toMinutes = time => {
  if (!time) return null;
  const [hm, ap] = time.split(' ');
  const [h, m] = hm.split(':').map(Number);
  let hours = h % 12;
  if (ap === 'PM') hours += 12;
  return hours * 60 + m;
};

const EditSlotsScreen = ({route,navigation}) => {
  const {item} = route?.params;
  console.log('======slot item=====', JSON.stringify(item));
  const [slotType, setSlotType] = useState('Online');
  const [selectedClinic, setSelectedClinic] = useState(null);

  console.log(' Selected: {selectedClinic}====', selectedClinic?._id);

  const [clinics, setClinics] = useState([]);

  // console.log('clinics----------', clinics);
  const [clinicsLoading, setClinicsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('Monday');
  // const [slots, setSlots] = useState({ Monday: [{ start: "", end: "" }] });

  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [timeType, setTimeType] = useState(null); // "start" or "end"
  const [currentSlotIndex, setCurrentSlotIndex] = useState(null);

  // Temp states for picker
  const [selectedHour, setSelectedHour] = useState('09');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedAmpm, setSelectedAmpm] = useState('AM');
  const [isLoading, setIsLoading] = useState(false);

  const initSlots = weekdays.reduce((acc, day) => {
    acc[day] = [{start: '', end: ''}];
    return acc;
  }, {});

  const [slots, setSlots] = useState(initSlots);

  const transformSlots = data => {
    return Object.keys(data).map(day => ({
      dayOfWeek: day,
      slots: data[day]
        .filter(s => s.start && s.end) // empty slots remove karna
        .map(s => ({
          startTime: s.start,
          endTime: s.end,
        })),
    }));
  };

  const resultData = transformSlots(slots);
  // console.log(JSON.stringify(resultData, null, 2));

  // console.log('-------slots---------', slots);

  // Add new slot (with validation)
  const handleAddSlot = () => {
    const prevSlots = slots[selectedDay];
    const lastSlot = prevSlots[prevSlots.length - 1];

    // validation: last slot must have start & end filled
    if (!lastSlot.start || !lastSlot.end) {
      showErrorToast(
        'Incomplete Slot',
        'Please fill Start and End time before adding new slot.',
      );
      return;
    }

    let newSlot = {start: '', end: ''};
    const updated = [...prevSlots, newSlot];
    setSlots({...slots, [selectedDay]: updated});
  };

  // Remove slot (ensure at least 1 remains)
  const handleRemoveSlot = index => {
    const prevSlots = slots[selectedDay];

    // prevent deleting if only 1 slot is left
    if (prevSlots.length === 1) {
      showErrorToast(
        'Not Allowed',
        'At least one slot must remain for each day.',
      );
      return;
    }

    const newSlots = [...prevSlots];
    newSlots.splice(index, 1);

    setSlots({...slots, [selectedDay]: newSlots});
  };
  // Save selected time with validation
  const handleSaveTime = () => {
    const formatted = `${selectedHour}:${selectedMinute} ${selectedAmpm}`;
    const updatedSlots = [...slots[selectedDay]];
    const slot = updatedSlots[currentSlotIndex];

    if (timeType === 'end' && slot.start) {
      const startMins = toMinutes(slot.start);
      const endMins = toMinutes(formatted);
      if (endMins <= startMins) {
        Alert.alert(
          'Invalid Slot',
          'End time must be greater than Start time.',
        );
        return;
      }
      // ensure AM-PM match
      if (slot.start.split(' ')[1] !== formatted.split(' ')[1]) {
        Alert.alert(
          'Invalid Slot',
          'Start and End must be in same AM/PM range.',
        );
        return;
      }
    }

    updatedSlots[currentSlotIndex][timeType] = formatted;
    setSlots({...slots, [selectedDay]: updatedSlots});
    setTimeModalVisible(false);
  };

  // Time Picker Modal
  const renderTimePicker = () => (
    <Modal transparent={true} visible={timeModalVisible} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            <Text style={styles.modalTitle}>Select Time</Text>
          </View>
          <View style={styles.pickerRow}>
            {/* Hours */}
            <View style={{height: 250, flex: 1}}>
              <Text
                style={{
                  color: Colors.BLACK,
                  fontFamily: Fonts.PoppinsMedium,
                  textAlign: 'center',
                  fontSize: 16,
                }}>
                Hour
              </Text>
              <FlatList
                data={hoursOptions}
                style={{flex: 1}}
                keyExtractor={item => item}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.optionBtn,
                      selectedHour === item && styles.selectedOption,
                    ]}
                    onPress={() => setSelectedHour(item)}>
                    <Text
                      style={{
                        color: Colors.BLACK,
                        fontFamily: Fonts.PoppinsMedium,
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            {/* Minutes */}
            <View style={{height: 250, flex: 1}}>
              <Text
                style={{
                  color: Colors.BLACK,
                  fontFamily: Fonts.PoppinsMedium,
                  textAlign: 'center',
                  fontSize: 16,
                }}>
                Minutes
              </Text>
              <FlatList
                data={minutesOptions}
                style={{flex: 1}}
                keyExtractor={item => item}
                contentContainerStyle={{height: 300}}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.optionBtn,
                      selectedMinute === item && styles.selectedOption,
                    ]}
                    onPress={() => setSelectedMinute(item)}>
                    <Text
                      style={{
                        color: Colors.BLACK,
                        fontFamily: Fonts.PoppinsMedium,
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            {/* AM/PM */}
            <View style={{height: 250, flex: 1}}>
              <Text
                style={{
                  color: Colors.BLACK,
                  fontFamily: Fonts.PoppinsMedium,
                  textAlign: 'center',
                  fontSize: 16,
                }}>
                AM/PM
              </Text>
              <FlatList
                data={ampmOptions}
                style={{flex: 1}}
                keyExtractor={item => item}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.optionBtn,
                      selectedAmpm === item && styles.selectedOption,
                    ]}
                    onPress={() => setSelectedAmpm(item)}>
                    <Text
                      style={{
                        color: Colors.BLACK,
                        fontFamily: Fonts.PoppinsMedium,
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setTimeModalVisible(false)}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.doneBtn} onPress={handleSaveTime}>
              <Text style={styles.btnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const getDoctorAllClinic = async id => {
    const token = await AsyncStorage.getItem('userToken');
    // console.log("=================token==========",token)
    try {
      setClinicsLoading(true);
      const response = await ApiRequest({
        BASEURL: ApiRoutes.getDoctorAllClinic,
        method: 'POST',
        // req: {doctorId: id},
        token: token,
      });

      const decrypted = decryptData(response.data);

      if (decrypted.code === 200 || decrypted.code === 201) {
        console.log(
          '----getDoctorAllClinic----------------',
          JSON.stringify(decrypted),
        );
        setClinics(decrypted?.data?.clinic);
      } else {
        setClinicsLoading(false);
        console.error('Server error:', decrypted?.message);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setClinicsLoading(false);
    }
  };

  useEffect(() => {
    getDoctorAllClinic();
  }, []);

  // doctorClinicId, slotsByDay, type = "offline"

  // const handleSubmit = async values => {
  //   const token = await AsyncStorage.getItem('userToken');

  //   const req = {
  //     doctorClinicId: slotType == 'Offline' ? selectedClinic?._id : '',
  //     slotsByDay: resultData,
  //     type: slotType == 'Offline' ? 'offline' : 'online',
  //   };

  //   try {
  //     setIsLoading(true);

  //     const response = await ApiRequest({
  //       BASEURL: ApiRoutes.addDoctorClinicSlot,
  //       method: 'POST',
  //       req: req,
  //       token: token,
  //     });

  //     const resData = await decryptData(response.data);

  //     console.log('------------resData-------', resData);

  //     if (resData?.code === 200 || resData?.code === 201) {
  //       showSuccessToast('Success', resData?.message);
  //     } else {
  //       showErrorToast('Failed', resData?.message || 'Something went wrong');
  //     }
  //   } catch (error) {
  //     console.error('Slots Error:', error?.message || error);
  //     showErrorToast('Failed', error?.message || 'Error  slots booking');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async () => {
  const token = await AsyncStorage.getItem('userToken');

  const req = {
    doctorClinicId: slotType === 'Offline' ? selectedClinic?._id : '',
    slotsByDay: transformSlots(slots), // ✅ yahi convert hoke backend format banega
    type: slotType === 'Offline' ? 'offline' : 'online',
  };

  try {
    setIsLoading(true);
    const response = await ApiRequest({
      BASEURL: ApiRoutes.addDoctorClinicSlot,
      method: 'POST',
      req,
      token,
    });

    const resData = await decryptData(response.data);
    if (resData?.code === 200 || resData?.code === 201) {
      showSuccessToast('Success', resData?.message);
      navigation.goBack()
      
    } else {
      showErrorToast('Failed', resData?.message || 'Something went wrong');
    }
  } catch (error) {
    showErrorToast('Failed', error?.message || 'Error slots booking');
  } finally {
    setIsLoading(false);
  }
};



  useEffect(() => {
  if (item?.slot?.slotsByDay) {
    const formatted = weekdays.reduce((acc, day) => {
      // slotsByDay se matching day find karo
      const found = item.slot.slotsByDay.find(s => s.dayOfWeek === day);
      if (found && found.slots.length > 0) {
        acc[day] = found.slots.map(s => ({
          start: s.startTime,
          end: s.endTime,
        }));
      } else {
        acc[day] = [{ start: '', end: '' }];
      }
      return acc;
    }, {});
    setSlots(formatted);
  }

  // agar clinic select karna hai to default bhi set karlo
  if (item?.clinicName) {
    setSelectedClinic({ clinicName: item.clinicName, _id: item.slot?.doctorClinicId });
  }

  // slotType bhi set karo
  if (item?.slot?.slotType) {
    setSlotType(item.slot.slotType === 'offline' ? 'Offline' : 'Online');
  }
}, [item]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderCompt title={'Edit Slots'} />
      <ScrollView style={styles.container}>
        {/* Slot Type */}
        <Text style={styles.heading}>Select Slot Type</Text>
        <View style={styles.radioGroup}>
          {['Online', 'Offline'].map(t => (
            <TouchableOpacity
              key={t}
              style={styles.radioBtn}
              onPress={() => setSlotType(t)}>
              {/* Radio circle */}
              <View style={styles.radioOuter}>
                {slotType === t && <View style={styles.radioInner} />}
              </View>
              <Text style={slotType === t ? styles.radio : styles.radio}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Clinic if offline */}
        {slotType === 'Offline' && (
          <View>
            {/* <Text style={styles.heading}>Select Clinic</Text> */}
            {/* <View style={styles.radioGroup}>
              {clinics.map(c => (
                <TouchableOpacity
                  style={styles.radioBtn}
                  onPress={() => setSelectedClinic(c?.clinicName)}>
                  <Text
                    style={
                      selectedClinic === c?.clinicName
                        ? styles.radioSelected
                        : styles.radio
                    }>
                    {c?.clinicName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View> */}
            {/* <ClinicDropdown clinics={clinics} /> */}
            <ClinicDropdown
              clinics={clinics}
              onSelect={value => setSelectedClinic(value)}
            />
          </View>
        )}

        {/* Day Selection */}
        <Text style={styles.heading}>Select a Day</Text>
        <View style={styles.radioGroup}>
          {weekdays.map(d => (
            <TouchableOpacity
              key={d}
              style={styles.radioBtn}
              onPress={() => setSelectedDay(d)}>
              {/* Radio circle */}
              <View style={styles.radioOuter}>
                {selectedDay === d && <View style={styles.radioInner} />}
              </View>
              <Text style={selectedDay === d ? styles.radio : styles.radio}>
                {d}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Slots */}
        <Text style={styles.heading}>Slots for {selectedDay}:</Text>
        {(slots[selectedDay] || []).map((slot, idx) => (
          <View key={idx} style={styles.slotRow}>
            <TouchableOpacity
              style={styles.timeBox}
              onPress={() => {
                setTimeType('start');
                setCurrentSlotIndex(idx);
                setTimeModalVisible(true);
              }}>
              <Text
                style={{fontFamily: Fonts.PoppinsMedium, color: Colors.BLACK}}>
                {slot.start || 'Start Time'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timeBox}
              onPress={() => {
                setTimeType('end');
                setCurrentSlotIndex(idx);
                setTimeModalVisible(true);
              }}>
              <Text
                style={{fontFamily: Fonts.PoppinsMedium, color: Colors.BLACK}}>
                {slot.end || 'End Time'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addBtn} onPress={handleAddSlot}>
              {/* <Text style={{color: '#fff', fontWeight: 'bold'}}>+</Text> */}
              <Image
                source={imageindex.add}
                style={{height: 23, width: 23, tintColor: Colors.APPCOLOR}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => handleRemoveSlot(idx)}>
              {/* <Text style={{color: '#fff', fontWeight: 'bold'}}>-</Text> */}
              <Image
                source={imageindex.cancel}
                style={{height: 25, width: 25, tintColor: Colors.RED}}
              />
            </TouchableOpacity>
          </View>
        ))}

        {/* Submit */}
        {/* <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => Alert.alert('Saved', JSON.stringify(slots, null, 2))}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity> */}

        <ButtonCompt
          isLoading={isLoading}
          onPress={handleSubmit}
          title={'Submit'}
        />

        {renderTimePicker()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditSlotsScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 15},
  heading: {
    fontSize: 16,
    marginBottom: 5,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsMedium,
  },
  radioGroup: {flexDirection: 'row', flexWrap: 'wrap'},
  radioBtn: {
    marginRight: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.APPCOLOR,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.APPCOLOR,
  },
  radio: {
    borderRadius: 20,
    fontSize: 14,
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.BLACK,
  },
  radioSelected: {
    borderWidth: 0.4,
    // borderColor: '#008CBA',
    // backgroundColor: '#E6F7FF',
    // paddingVertical: 8,
    // borderRadius: 20,
    // fontWeight: '600',
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsRegular,
    paddingHorizontal: 5,
  },
  slotRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  timeBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  addBtn: {
    // backgroundColor: 'green',
    // padding: 10,
    // borderRadius: 20,
    marginLeft: 5,
  },
  removeBtn: {
    // backgroundColor: 'red',
    // padding: 10,
    borderRadius: 20,
    marginLeft: 5,
  },
  submitBtn: {
    backgroundColor: '#00bcd4',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {color: '#fff', textAlign: 'center', fontWeight: '600'},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    height: 400,
  },
  modalTitle: {
    fontSize: 18,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsMedium,
  },
  pickerRow: {flexDirection: 'row', justifyContent: 'space-between'},
  optionBtn: {
    padding: 12,
    margin: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  selectedOption: {borderColor: '#008CBA', backgroundColor: '#E6F7FF'},
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  cancelBtn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  doneBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
});
