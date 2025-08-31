// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Modal,
//   FlatList,
//   Alert, // Import Alert
// } from 'react-native';
// import Icon from '@react-native-vector-icons/material-icons';
// import {ButtonCompt, HeaderCompt} from '../../../components'; // Assuming these are your custom components
// import {Colors} from '../../../theme/Colors'; // Assuming this is your color theme file
// import styles from './styles.addSlotes';
// import Fonts from '../../../theme/Fonts';
// import AddSlotsController from './AddSlotsController';

// const AddSlotsScreen = () => {
//   // const [slotType, setSlotType] = useState('Online');
//   // const [selectedDay, setSelectedDay] = useState('Monday');
//   // const [slots, setSlots] = useState([{startTime: '', endTime: ''}]);
//   // const [isTimePickerVisible, setTimePickerVisible] = useState(false);

//   // // State for the currently active slot being edited
//   // const [activeSlotIndex, setActiveSlotIndex] = useState(0);
//   // const [activeSlotType, setActiveSlotType] = useState('startTime');

//   // // State for the time picker modal itself
//   // const [selectedHour, setSelectedHour] = useState('07');
//   // const [selectedMinute, setSelectedMinute] = useState('00');
//   // const [selectedAmPm, setSelectedAmPm] = useState('AM');

//   // // State to control visibility of custom dropdowns in the modal
//   // const [showHourPicker, setShowHourPicker] = useState(false);
//   // const [showMinutePicker, setShowMinutePicker] = useState(false);
//   // const [showAmPmPicker, setShowAmPmPicker] = useState(false);

//   // const days = [
//   //   'Monday',
//   //   'Tuesday',
//   //   'Wednesday',
//   //   'Thursday',
//   //   'Friday',
//   //   'Saturday',
//   //   'Sunday',
//   // ];
//   // const hours = Array.from({length: 12}, (_, i) =>
//   //   (i + 1).toString().padStart(2, '0'),
//   // );

//   // const minutes = ['00', '15', '30', '45'];
//   // const amPm = ['AM', 'PM'];

//   // const addSlot = () => {
//   //   setSlots([...slots, {startTime: '', endTime: ''}]);
//   // };

//   // const removeSlot = index => {
//   //   if (slots.length > 1) {
//   //     const newSlots = slots.filter((_, i) => i !== index);
//   //     setSlots(newSlots);
//   //   }
//   // };

//   // const openTimePicker = (index, type) => {
//   //   setActiveSlotIndex(index);
//   //   setActiveSlotType(type);

//   //   const currentTime = slots[index][type];
//   //   if (currentTime) {
//   //     const [time, period] = currentTime.split(' ');
//   //     const [hour, minute] = time.split(':');
//   //     setSelectedHour(hour);
//   //     setSelectedMinute(minute);
//   //     setSelectedAmPm(period);
//   //   } else {
//   //     // Default to a sensible time if not set
//   //     setSelectedHour('09');
//   //     setSelectedMinute('00');
//   //     setSelectedAmPm('AM');
//   //   }
//   //   setTimePickerVisible(true);
//   // };

//   // // Helper function to convert 12-hour time to minutes from midnight for comparison
//   // const timeToMinutes = timeString => {
//   //   if (!timeString) return 0;
//   //   const [time, period] = timeString.split(' ');
//   //   let [hours, minutes] = time.split(':').map(Number);

//   //   if (period === 'PM' && hours !== 12) {
//   //     hours += 12;
//   //   }
//   //   if (period === 'AM' && hours === 12) {
//   //     hours = 0;
//   //   }
//   //   return hours * 60 + minutes;
//   // };

//   // const handleTimeSelection = () => {
//   //   const newTime = `${selectedHour}:${selectedMinute} ${selectedAmPm}`;

//   //   // --- VALIDATION LOGIC ---
//   //   if (activeSlotType === 'endTime') {
//   //     const startTime = slots[activeSlotIndex].startTime;
//   //     if (startTime) {
//   //       const startMinutes = timeToMinutes(startTime);
//   //       const endMinutes = timeToMinutes(newTime);

//   //       if (endMinutes <= startMinutes) {
//   //         Alert.alert(
//   //           'Invalid Time',
//   //           'End time must be after the start time.',
//   //           [{text: 'OK'}],
//   //         );
//   //         return; // Stop the function here
//   //       }
//   //     }
//   //   }

//   //   const newSlots = [...slots];
//   //   newSlots[activeSlotIndex][activeSlotType] = newTime;
//   //   setSlots(newSlots);
//   //   setTimePickerVisible(false);
//   // };

//   // const handleSubmit = () => {
//   //   console.log({slotType, selectedDay, slots});
//   //   // Add validation to ensure all slots are filled before submitting
//   // };

//   const {
//     slotType,
//     setSlotType,
//     selectedDay,
//     setSelectedDay,
//     slots,
//     setSlots,
//     isTimePickerVisible,
//     setTimePickerVisible,
//     activeSlotIndex,
//     setActiveSlotIndex,
//     activeSlotType,
//     setActiveSlotType,
//     selectedHour,
//     setSelectedHour,
//     selectedMinute,
//     setSelectedMinute,
//     selectedAmPm,
//     setSelectedAmPm,
//     showHourPicker,
//     setShowHourPicker,
//     showMinutePicker,
//     setShowMinutePicker,
//     showAmPmPicker,
//     setShowAmPmPicker,

//     // Data arrays
//     days,
//     hours,
//     minutes,
//     amPm,

//     // Functions
//     addSlot,
//     removeSlot,
//     openTimePicker,
//     handleTimeSelection,
//     handleSubmit,
//   }=AddSlotsController()

//   // Component for rendering the picker dropdowns
//   const PickerDropdown = ({data, onSelect, onToggle}) => (
//     <View style={styles.dropdownContainer}>
//       <FlatList
//         data={data}
//         keyExtractor={item => item}
//         renderItem={({item}) => (
//           <TouchableOpacity
//             style={styles.dropdownItem}
//             onPress={() => {
//               onSelect(item);
//               onToggle(false);
//             }}>
//             <Text style={styles.dropdownItemText}>{item}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <HeaderCompt title={'Add Slots'} />

//       <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
//         {/* Slot Type Selection */}
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
//               <Text style={{color: Colors.BLACK}}>Online</Text>
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
//               <Text style={{color: Colors.BLACK}}>Offline</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Day Selection */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Select a Day</Text>
//           <View style={styles.daysContainer}>
//             {days.map(day => (
//               <TouchableOpacity
//                 key={day}
//                 style={styles.radioButton}
//                 onPress={() => setSelectedDay(day)}>
//                 {/* <View
//                   style={[
//                     styles.radio,
//                     selectedDay === day && styles.radioSelected,
//                   ]}
//                 /> */}

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
//                 <Text style={{color: Colors.BLACK}}>{day}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Slots Input */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Slots for {selectedDay}:</Text>
//           {slots.map((slot, index) => (
//             <View key={index} style={styles.slotContainer}>
//               <TouchableOpacity
//                 style={styles.timeInput}
//                 onPress={() => openTimePicker(index, 'startTime')}>
//                 <Text
//                   style={{
//                     color: slot.startTime ? Colors.BLACK : Colors.BLACK,
//                     fontFamily: Fonts.PoppinsMedium,
//                   }}>
//                   {slot.startTime || 'Select start time'}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.timeInput}
//                 onPress={() => openTimePicker(index, 'endTime')}>
//                 <Text
//                   style={{
//                     color: slot.endTime ? Colors.BLACK : Colors.BLACK,
//                     fontFamily: Fonts.PoppinsMedium,
//                   }}>
//                   {slot.endTime || 'Select end time'}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={addSlot} style={styles.iconButton}>
//                 <Icon name="add-circle" size={28} color="green" />
//               </TouchableOpacity>
//               {slots.length > 1 && (
//                 <TouchableOpacity
//                   onPress={() => removeSlot(index)}
//                   style={styles.iconButton}>
//                   <Icon name="remove-circle" size={28} color="red" />
//                 </TouchableOpacity>
//               )}
//             </View>
//           ))}
//         </View>

//         <ButtonCompt title={'Submit'} onPress={handleSubmit} />
//       </ScrollView>

//       {/* Time Picker Modal */}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={isTimePickerVisible}
//         onRequestClose={() => setTimePickerVisible(false)}>
//         <TouchableOpacity
//           style={styles.modalContainer}
//           activeOpacity={1}
//           onPress={() => setTimePickerVisible(false)}>
//           <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Select Time</Text>
//               <TouchableOpacity onPress={() => setTimePickerVisible(false)}>
//                 <Icon name="close" size={24} color="#000" />
//               </TouchableOpacity>
//             </View>

//             {/* --- Interactive Time Picker --- */}
//             <View style={styles.timePicker}>
//               {/* Hour */}
//               <View style={styles.pickerColumn}>
//                 <Text
//                   style={{
//                     color: Colors.BLACK,
//                     fontFamily: Fonts.PoppinsMedium,
//                   }}>
//                   Hour
//                 </Text>
//                 <TouchableOpacity
//                   style={styles.pickerBox}
//                   onPress={() => {
//                     setShowHourPicker(!showHourPicker);
//                     setShowMinutePicker(false);
//                     setShowAmPmPicker(false);
//                   }}>
//                   <Text style={styles.pickerValue}>{selectedHour}</Text>
//                 </TouchableOpacity>
//               </View>

//               <Text style={styles.timeSeparator}>:</Text>

//               {/* Minute */}
//               <View style={styles.pickerColumn}>
//                 <Text
//                   style={{
//                     color: Colors.BLACK,
//                     fontFamily: Fonts.PoppinsMedium,
//                   }}>
//                   Minute
//                 </Text>
//                 <TouchableOpacity
//                   style={styles.pickerBox}
//                   onPress={() => {
//                     setShowMinutePicker(!showMinutePicker);
//                     setShowHourPicker(false);
//                     setShowAmPmPicker(false);
//                   }}>
//                   <Text style={styles.pickerValue}>{selectedMinute}</Text>
//                 </TouchableOpacity>
//               </View>

//               {/* AM/PM */}
//               <View style={styles.pickerColumn}>
//                 <Text
//                   style={{
//                     color: Colors.BLACK,
//                     fontFamily: Fonts.PoppinsMedium,
//                   }}>
//                   AM/PM
//                 </Text>
//                 <TouchableOpacity
//                   style={styles.pickerBox}
//                   onPress={() => {
//                     setShowAmPmPicker(!showAmPmPicker);
//                     setShowHourPicker(false);
//                     setShowMinutePicker(false);
//                   }}>
//                   <Text style={styles.pickerValue}>{selectedAmPm}</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* --- Dropdown Views --- */}
//             {showHourPicker && (
//               <PickerDropdown
//                 data={hours}
//                 onSelect={setSelectedHour}
//                 onToggle={setShowHourPicker}
//               />
//             )}
//             {showMinutePicker && (
//               <PickerDropdown
//                 data={minutes}
//                 onSelect={setSelectedMinute}
//                 onToggle={setShowMinutePicker}
//               />
//             )}
//             {showAmPmPicker && (
//               <PickerDropdown
//                 data={amPm}
//                 onSelect={setSelectedAmPm}
//                 onToggle={setShowAmPmPicker}
//               />
//             )}

//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.cancelButton]}
//                 onPress={() => setTimePickerVisible(false)}>
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.doneButton]}
//                 onPress={handleTimeSelection}>
//                 <Text style={styles.doneButtonText}>Done</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//         </TouchableOpacity>
//       </Modal>
//     </View>
//   );
// };

// export default AddSlotsScreen;

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Modal,
//   FlatList,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
//  import Icon from '@react-native-vector-icons/material-icons';

// import {ButtonCompt, HeaderCompt} from '../../../components';
// import {Colors} from '../../../theme/Colors';
// import styles from './styles.addSlotes';
// import Fonts from '../../../theme/Fonts';
// import AddSlotsController from './AddSlotsController'; // Ensure this path is correct
// import ApiRequest from '../../../network/ApiRequest';
// import {ApiRoutes} from '../../../utils/ApiRoutes';
// import {decryptData} from '../../../utils/encryptionUtils';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // A simple dropdown component for clinic selection
// const ClinicDropdown = ({data, onSelect, selectedValue, onToggle}) => (
//   <View style={styles.dropdownContainer}>
//     <FlatList
//       data={data}
//       keyExtractor={item => item._id}
//       renderItem={({item}) => (
//         <TouchableOpacity
//           style={styles.dropdownItem}
//           onPress={() => {
//             onSelect(item._id); // Assuming _id is the value you want
//             onToggle(false);
//           }}>
//           <Text style={styles.dropdownItemText}>{item.name}</Text>
//         </TouchableOpacity>
//       )}
//     />
//   </View>
// );

// const AddSlotsScreen = () => {
//   const {
//     slotType,
//     setSlotType,
//     selectedDay,
//     setSelectedDay,
//     slots,
//     setSlots,
//     isTimePickerVisible,
//     setTimePickerVisible,
//     activeSlotIndex,
//     setActiveSlotIndex,
//     activeSlotType,
//     setActiveSlotType,
//     selectedHour,
//     setSelectedHour,
//     selectedMinute,
//     setSelectedMinute,
//     selectedAmPm,
//     setSelectedAmPm,
//     showHourPicker,
//     setShowHourPicker,
//     showMinutePicker,
//     setShowMinutePicker,
//     showAmPmPicker,
//     setShowAmPmPicker,
//     days,
//     hours,
//     minutes,
//     amPm,
//     addSlot,
//     removeSlot,
//     openTimePicker,
//     handleTimeSelection,
//     handleSubmit: controllerHandleSubmit, // Rename to avoid conflict if you add a screen-level handleSubmit
//   } = AddSlotsController();

//   // New states for Offline Clinic selection
//   const [offlineClinicsList, setOfflineClinicsList] = useState([]);
//   const [selectedClinicId, setSelectedClinicId] = useState(null);
//   const [selectedClinicName, setSelectedClinicName] = useState('Select a Clinic');
//   const [showClinicPicker, setShowClinicPicker] = useState(false);
//   const [isLoadingClinics, setIsLoadingClinics] = useState(false);
//   const [clinicError, setClinicError] = useState('');

//   // Fetch offline clinics
//   const fetchOfflineClinics = async () => {
//     setIsLoadingClinics(true);
//     setClinicError('');
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       if (!token) {
//         setClinicError('User not authenticated.');
//         setIsLoadingClinics(false);
//         return;
//       }

//       const response = await ApiRequest({
//         BASEURL: ApiRoutes.getAllClinics, // Assuming an API route to get all clinics
//         method: 'GET', // Or POST, depending on your API
//         token: token,
//       });

//       const decrypted = decryptData(response.data);
//       if (response.status === 200 || response.status === 201) {
//         setOfflineClinicsList(decrypted?.data || []);
//       } else {
//         setClinicError(decrypted?.message || 'Failed to fetch clinics.');
//       }
//     } catch (error) {
//       console.error('Error fetching clinics:', error);
//       setClinicError('Network error or server issue.');
//     } finally {
//       setIsLoadingClinics(false);
//     }
//   };

//   useEffect(() => {
//     // Fetch clinics only if the slotType is 'Offline'
//     if (slotType === 'Offline') {
//       fetchOfflineClinics();
//     }
//     // Reset selected clinic when slot type changes
//     setSelectedClinicId(null);
//     setSelectedClinicName('Select a Clinic');
//     setClinicError('');
//   }, [slotType]);

//   const handleClinicSelect = (id, name) => {
//     setSelectedClinicId(id);
//     setSelectedClinicName(name);
//     setShowClinicPicker(false);
//     setClinicError(''); // Clear error on selection
//   };

//   // Screen-level submit handler to include clinic validation
//   const handleSubmit = async () => {
//     // Validate clinic selection for offline slots
//     if (slotType === 'Offline' && !selectedClinicId) {
//       setClinicError('Please select a clinic for offline slots.');
//       Alert.alert('Validation Error', 'Please select a clinic for offline slots.');
//       return;
//     }

//     // Call the controller's handleSubmit
//     const payload = await controllerHandleSubmit({
//       slotType,
//       selectedDay,
//       slots,
//       clinicId: slotType === 'Offline' ? selectedClinicId : null, // Add clinicId to payload
//     });

//     if (payload) {
//       console.log('Final Payload:', JSON.stringify(payload, null, 2));
//       // Here you would make your actual API call with the constructed payload
//       // Example:
//       // const token = await AsyncStorage.getItem('userToken');
//       // const response = await ApiRequest({
//       //   BASEURL: ApiRoutes.addSlots, // Your API route for adding slots
//       //   method: 'POST',
//       //   token: token,
//       //   req: payload,
//       // });
//       // handle response...
//     }
//   };

//   // Component for rendering the picker dropdowns
//   const PickerDropdown = ({data, onSelect, onToggle}) => (
//     <View style={styles.dropdownContainer}>
//       <FlatList
//         data={data}
//         keyExtractor={item => item}
//         renderItem={({item}) => (
//           <TouchableOpacity
//             style={styles.dropdownItem}
//             onPress={() => {
//               onSelect(item);
//               onToggle(false);
//             }}>
//             <Text style={styles.dropdownItemText}>{item}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <HeaderCompt title={'Add Slots'} />

//       <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
//         {/* Slot Type Selection */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Select Slot Type</Text>
//           <View style={styles.radioContainer}>
//             <TouchableOpacity
//               style={styles.radioButton}
//               onPress={() => setSlotType('Online')}>
//               <View style={[styles.radio]}>
//                 <View
//                   style={[
//                     {borderRadius: 50, padding: 6, margin: 2},
//                     slotType === 'Online' && styles.radioSelected,
//                   ]}
//                 />
//               </View>
//               <Text style={{color: Colors.BLACK}}>Online</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.radioButton}
//               onPress={() => setSlotType('Offline')}>
//               <View style={[styles.radio]}>
//                 <View
//                   style={[
//                     {borderRadius: 50, padding: 6, margin: 2},
//                     slotType === 'Offline' && styles.radioSelected,
//                   ]}
//                 />
//               </View>
//               <Text style={{color: Colors.BLACK}}>Offline</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Clinic Selection (conditionally rendered for Offline slots) */}
//         {slotType === 'Offline' && (
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Select Clinic</Text>
//             <TouchableOpacity
//               style={styles.pickerBox}
//               onPress={() => {
//                 setShowClinicPicker(!showClinicPicker);
//                 setClinicError(''); // Clear error when trying to open picker
//               }}>
//               {isLoadingClinics ? (
//                 <ActivityIndicator size="small" color={Colors.APPCOLOR} />
//               ) : (
//                 <Text style={styles.pickerValue}>
//                   {selectedClinicName}
//                 </Text>
//               )}
//               <Icon name="arrow-drop-down" size={24} color={Colors.BLACK} />
//             </TouchableOpacity>
//             {clinicError ? (
//               <Text style={styles.errorText}>{clinicError}</Text>
//             ) : null}
//             {showClinicPicker && (
//               <ClinicDropdown
//                 data={offlineClinicsList}
//                 selectedValue={selectedClinicId}
//                 onSelect={(id) => {
//                   const clinic = offlineClinicsList.find(c => c._id === id);
//                   handleClinicSelect(id, clinic ? clinic.name : 'Select a Clinic');
//                 }}
//                 onToggle={setShowClinicPicker}
//               />
//             )}
//           </View>
//         )}

//         {/* Day Selection */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Select a Day</Text>
//           <View style={styles.daysContainer}>
//             {days.map(day => (
//               <TouchableOpacity
//                 key={day}
//                 style={styles.radioButton}
//                 onPress={() => setSelectedDay(day)}>
//                 <View style={[styles.radio]}>
//                   <View
//                     style={[
//                       {borderRadius: 50, padding: 6, margin: 2},
//                       selectedDay === day && styles.radioSelected,
//                     ]}
//                   />
//                 </View>
//                 <Text style={{color: Colors.BLACK}}>{day}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Slots Input */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Slots for {selectedDay}:</Text>
//           {slots.map((slot, index) => (
//             <View key={index} style={styles.slotContainer}>
//               <TouchableOpacity
//                 style={styles.timeInput}
//                 onPress={() => openTimePicker(index, 'startTime')}>
//                 <Text
//                   style={{
//                     color: slot.startTime ? Colors.BLACK : Colors.DARK_GREY, // Changed to DARK_GREY for placeholder
//                     fontFamily: Fonts.PoppinsMedium,
//                   }}>
//                   {slot.startTime || 'Start Time'}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.timeInput}
//                 onPress={() => openTimePicker(index, 'endTime')}>
//                 <Text
//                   style={{
//                     color: slot.endTime ? Colors.BLACK : Colors.DARK_GREY, // Changed to DARK_GREY for placeholder
//                     fontFamily: Fonts.PoppinsMedium,
//                   }}>
//                   {slot.endTime || 'End Time'}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={addSlot} style={styles.iconButton}>
//                 <Icon name="add-circle" size={28} color="green" />
//               </TouchableOpacity>
//               {slots.length > 1 && (
//                 <TouchableOpacity
//                   onPress={() => removeSlot(index)}
//                   style={styles.iconButton}>
//                   <Icon name="remove-circle" size={28} color="red" />
//                 </TouchableOpacity>
//               )}
//             </View>
//           ))}
//         </View>

//         <ButtonCompt title={'Submit'} onPress={handleSubmit} />
//       </ScrollView>

//       {/* Time Picker Modal */}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={isTimePickerVisible}
//         onRequestClose={() => setTimePickerVisible(false)}>
//         <TouchableOpacity
//           style={styles.modalContainer}
//           activeOpacity={1}
//           onPress={() => setTimePickerVisible(false)}>
//           <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Select Time</Text>
//               <TouchableOpacity onPress={() => setTimePickerVisible(false)}>
//                 <Icon name="close" size={24} color="#000" />
//               </TouchableOpacity>
//             </View>

//             {/* --- Interactive Time Picker --- */}
//             <View style={styles.timePicker}>
//               {/* Hour */}
//               <View style={styles.pickerColumn}>
//                 <Text
//                   style={{
//                     color: Colors.BLACK,
//                     fontFamily: Fonts.PoppinsMedium,
//                   }}>
//                   Hour
//                 </Text>
//                 <TouchableOpacity
//                   style={styles.pickerBox}
//                   onPress={() => {
//                     setShowHourPicker(!showHourPicker);
//                     setShowMinutePicker(false);
//                     setShowAmPmPicker(false);
//                   }}>
//                   <Text style={styles.pickerValue}>{selectedHour}</Text>
//                 </TouchableOpacity>
//               </View>

//               <Text style={styles.timeSeparator}>:</Text>

//               {/* Minute */}
//               <View style={styles.pickerColumn}>
//                 <Text
//                   style={{
//                     color: Colors.BLACK,
//                     fontFamily: Fonts.PoppinsMedium,
//                   }}>
//                   Minute
//                 </Text>
//                 <TouchableOpacity
//                   style={styles.pickerBox}
//                   onPress={() => {
//                     setShowMinutePicker(!showMinutePicker);
//                     setShowHourPicker(false);
//                     setShowAmPmPicker(false);
//                   }}>
//                   <Text style={styles.pickerValue}>{selectedMinute}</Text>
//                 </TouchableOpacity>
//               </View>

//               {/* AM/PM */}
//               <View style={styles.pickerColumn}>
//                 <Text
//                   style={{
//                     color: Colors.BLACK,
//                     fontFamily: Fonts.PoppinsMedium,
//                   }}>
//                   AM/PM
//                 </Text>
//                 <TouchableOpacity
//                   style={styles.pickerBox}
//                   onPress={() => {
//                     setShowAmPmPicker(!showAmPmPicker);
//                     setShowHourPicker(false);
//                     setShowMinutePicker(false);
//                   }}>
//                   <Text style={styles.pickerValue}>{selectedAmPm}</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* --- Dropdown Views --- */}
//             {showHourPicker && (
//               <PickerDropdown
//                 data={hours}
//                 onSelect={setSelectedHour}
//                 onToggle={setShowHourPicker}
//               />
//             )}
//             {showMinutePicker && (
//               <PickerDropdown
//                 data={minutes}
//                 onSelect={setSelectedMinute}
//                 onToggle={setShowMinutePicker}
//               />

//             )}
//             {showAmPmPicker && (
//               <PickerDropdown
//                 data={amPm}
//                 onSelect={setSelectedAmPm}
//                 onToggle={setShowAmPmPicker}
//               />
//             )}

//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.cancelButton]}
//                 onPress={() => setTimePickerVisible(false)}>
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.doneButton]}
//                 onPress={handleTimeSelection}>
//                 <Text style={styles.doneButtonText}>Done</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//         </TouchableOpacity>
//       </Modal>

//       {/* Clinic Picker Modal - Reusing the same modal structure, consider a dedicated one if complexity grows */}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={showClinicPicker}
//         onRequestClose={() => setShowClinicPicker(false)}>
//         <TouchableOpacity
//           style={styles.modalContainer}
//           activeOpacity={1}
//           onPress={() => setShowClinicPicker(false)}>
//           <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Select Clinic</Text>
//               <TouchableOpacity onPress={() => setShowClinicPicker(false)}>
//                 <Icon name="close" size={24} color="#000" />
//               </TouchableOpacity>
//             </View>
//             {isLoadingClinics ? (
//               <ActivityIndicator size="large" color={Colors.APPCOLOR} style={{marginVertical: 20}} />
//             ) : (
//               <ClinicDropdown
//                 data={offlineClinicsList}
//                 selectedValue={selectedClinicId}
//                 onSelect={(id) => {
//                   const clinic = offlineClinicsList.find(c => c._id === id);
//                   handleClinicSelect(id, clinic ? clinic.name : 'Select a Clinic');
//                 }}
//                 onToggle={setShowClinicPicker}
//               />
//             )}
//             {clinicError ? (
//               <Text style={[styles.errorText, {textAlign: 'center', marginTop: 10}]}>{clinicError}</Text>
//             ) : null}
//             <TouchableOpacity
//               style={[styles.modalButton, styles.doneButton, {marginTop: 20}]}
//               onPress={() => setShowClinicPicker(false)}>
//               <Text style={styles.doneButtonText}>Done</Text>
//             </TouchableOpacity>
//           </TouchableOpacity>
//         </TouchableOpacity>
//       </Modal>

//     </View>
//   );
// };

// export default AddSlotsScreen;

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Modal,
//   FlatList,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
//  import Icon from '@react-native-vector-icons/material-icons';

// import {ButtonCompt, HeaderCompt} from '../../../components';
// import {Colors} from '../../../theme/Colors';
// import styles from './styles.addSlotes';
// import Fonts from '../../../theme/Fonts';
// import AddSlotsController from './AddSlotsController';
// import ApiRequest from '../../../network/ApiRequest';
// import {ApiRoutes} from '../../../utils/ApiRoutes';
// import {decryptData} from '../../../utils/encryptionUtils';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // 🔹 Reusable Dropdown Component
// const Dropdown = ({data, onSelect, onToggle, keyExtractor = "id"}) => (
//   <View style={styles.dropdownContainer}>
//     <FlatList
//       data={data}
//       keyExtractor={item => item[keyExtractor] || item}
//       renderItem={({item}) => (
//         <TouchableOpacity
//           style={styles.dropdownItem}
//           onPress={() => {
//             onSelect(item);
//             onToggle(false);
//           }}>
//           <Text style={styles.dropdownItemText}>{item.name || item}</Text>
//         </TouchableOpacity>
//       )}
//     />
//   </View>
// );

// const AddSlotsScreen = () => {
//   const {
//     slotType,
//     setSlotType,
//     selectedDay,
//     setSelectedDay,
//     slots,
//     addSlot,
//     removeSlot,
//     openTimePicker,
//     isTimePickerVisible,
//     setTimePickerVisible,
//     selectedHour,
//     selectedMinute,
//     selectedAmPm,
//     setSelectedHour,
//     setSelectedMinute,
//     setSelectedAmPm,
//     showHourPicker,
//     setShowHourPicker,
//     showMinutePicker,
//     setShowMinutePicker,
//     showAmPmPicker,
//     setShowAmPmPicker,
//     days,
//     hours,
//     minutes,
//     amPm,
//     handleTimeSelection,
//     handleSubmit: controllerHandleSubmit,
//   } = AddSlotsController();

//   // 🔹 Clinic States
//   const [offlineClinicsList, setOfflineClinicsList] = useState([]);
//   const [selectedClinic, setSelectedClinic] = useState(null);
//   const [showClinicPicker, setShowClinicPicker] = useState(false);
//   const [isLoadingClinics, setIsLoadingClinics] = useState(false);
//   const [clinicError, setClinicError] = useState('');

//   // 🔹 Fetch Clinics for Offline Slot Type
//   const fetchOfflineClinics = async () => {
//     setIsLoadingClinics(true);
//     setClinicError('');
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       if (!token) {
//         setClinicError('User not authenticated.');
//         return;
//       }

//       const response = await ApiRequest({
//         BASEURL: ApiRoutes.getAllClinics,
//         method: 'GET',
//         token,
//       });

//       const decrypted = decryptData(response.data);
//       if (response.status === 200 || response.status === 201) {
//         setOfflineClinicsList(decrypted?.data || []);
//       } else {
//         setClinicError(decrypted?.message || 'Failed to fetch clinics.');
//       }
//     } catch (error) {
//       console.error('Error fetching clinics:', error);
//       setClinicError('Network error or server issue.');
//     } finally {
//       setIsLoadingClinics(false);
//     }
//   };

//   useEffect(() => {
//     if (slotType === 'Offline') {
//       fetchOfflineClinics();
//     }
//     setSelectedClinic(null);
//     setClinicError('');
//   }, [slotType]);

//   // 🔹 Submit Handler
//   const handleSubmit = async () => {
//     if (slotType === 'Offline' && !selectedClinic) {
//       setClinicError('Please select a clinic for offline slots.');
//       Alert.alert('Validation Error', 'Please select a clinic for offline slots.');
//       return;
//     }

//     if (slots.some(s => !s.startTime || !s.endTime)) {
//       Alert.alert('Validation Error', 'Please fill all slot times before submitting.');
//       return;
//     }

//     const payload = await controllerHandleSubmit({
//       slotType,
//       selectedDay,
//       slots,
//       clinicId: slotType === 'Offline' ? selectedClinic._id : null,
//     });

//     if (payload) {
//       console.log('Final Payload:', JSON.stringify(payload, null, 2));
//       // 🔹 Make API call here if needed
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <HeaderCompt title={'Add Slots'} />

//       <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
//         {/* Slot Type */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Select Slot Type</Text>
//           <View style={styles.radioContainer}>
//             {['Online', 'Offline'].map(type => (
//               <TouchableOpacity
//                 key={type}
//                 style={styles.radioButton}
//                 onPress={() => setSlotType(type)}>
//                 <View style={styles.radio}>
//                   <View
//                     style={[
//                       {borderRadius: 50, padding: 6, margin: 2},
//                       slotType === type && styles.radioSelected,
//                     ]}
//                   />
//                 </View>
//                 <Text style={{color: Colors.BLACK}}>{type}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Clinic Selection (Offline Only) */}
//         {slotType === 'Offline' && (
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Select Clinic</Text>
//             <TouchableOpacity
//               style={styles.pickerBox}
//               onPress={() => setShowClinicPicker(true)}>
//               {isLoadingClinics ? (
//                 <ActivityIndicator size="small" color={Colors.APPCOLOR} />
//               ) : (
//                 <Text style={styles.pickerValue}>
//                   {selectedClinic ? selectedClinic.name : 'Select a Clinic'}
//                 </Text>
//               )}
//               <Icon name="arrow-drop-down" size={24} color={Colors.BLACK} />
//             </TouchableOpacity>
//             {clinicError ? <Text style={styles.errorText}>{clinicError}</Text> : null}
//           </View>
//         )}

//         {/* Day Selection */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Select a Day</Text>
//           <View style={styles.daysContainer}>
//             {days.map(day => (
//               <TouchableOpacity
//                 key={day}
//                 style={styles.radioButton}
//                 onPress={() => setSelectedDay(day)}>
//                 <View style={styles.radio}>
//                   <View
//                     style={[
//                       {borderRadius: 50, padding: 6, margin: 2},
//                       selectedDay === day && styles.radioSelected,
//                     ]}
//                   />
//                 </View>
//                 <Text style={{color: Colors.BLACK}}>{day}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Slots Input */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Slots for {selectedDay}:</Text>
//           {slots.map((slot, index) => (
//             <View key={index} style={styles.slotContainer}>
//               <TouchableOpacity
//                 style={styles.timeInput}
//                 onPress={() => openTimePicker(index, 'startTime')}>
//                 <Text
//                   style={{
//                     color: slot.startTime ? Colors.BLACK : Colors.DARK_GREY,
//                     fontFamily: Fonts.PoppinsMedium,
//                   }}>
//                   {slot.startTime || 'Start Time'}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.timeInput}
//                 onPress={() => openTimePicker(index, 'endTime')}>
//                 <Text
//                   style={{
//                     color: slot.endTime ? Colors.BLACK : Colors.DARK_GREY,
//                     fontFamily: Fonts.PoppinsMedium,
//                   }}>
//                   {slot.endTime || 'End Time'}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={addSlot} style={styles.iconButton}>
//                 <Icon name="add-circle" size={28} color="green" />
//               </TouchableOpacity>
//               {slots.length > 1 && (
//                 <TouchableOpacity
//                   onPress={() => removeSlot(index)}
//                   style={styles.iconButton}>
//                   <Icon name="remove-circle" size={28} color="red" />
//                 </TouchableOpacity>
//               )}
//             </View>
//           ))}
//         </View>

//         <ButtonCompt title={'Submit'} onPress={handleSubmit} />
//       </ScrollView>

//       {/* 🔹 Time Picker Modal */}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={isTimePickerVisible}
//         onRequestClose={() => setTimePickerVisible(false)}>
//         <TouchableOpacity
//           style={styles.modalContainer}
//           activeOpacity={1}
//           onPress={() => setTimePickerVisible(false)}>
//           <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Select Time</Text>
//               <TouchableOpacity onPress={() => setTimePickerVisible(false)}>
//                 <Icon name="close" size={24} color="#000" />
//               </TouchableOpacity>
//             </View>

//             {/* Hour / Minute / AM-PM */}
//             <View style={styles.timePicker}>
//               {[
//                 {label: 'Hour', value: selectedHour, onPress: () => {setShowHourPicker(!showHourPicker); setShowMinutePicker(false); setShowAmPmPicker(false);}},
//                 {label: 'Minute', value: selectedMinute, onPress: () => {setShowMinutePicker(!showMinutePicker); setShowHourPicker(false); setShowAmPmPicker(false);}},
//                 {label: 'AM/PM', value: selectedAmPm, onPress: () => {setShowAmPmPicker(!showAmPmPicker); setShowHourPicker(false); setShowMinutePicker(false);}},
//               ].map((picker, idx) => (
//                 <View key={idx} style={styles.pickerColumn}>
//                   <Text style={{color: Colors.BLACK, fontFamily: Fonts.PoppinsMedium}}>{picker.label}</Text>
//                   <TouchableOpacity style={styles.pickerBox} onPress={picker.onPress}>
//                     <Text style={styles.pickerValue}>{picker.value}</Text>
//                   </TouchableOpacity>
//                 </View>
//               ))}
//             </View>

//             {showHourPicker && (
//               <Dropdown data={hours} onSelect={setSelectedHour} onToggle={setShowHourPicker} />
//             )}
//             {showMinutePicker && (
//               <Dropdown data={minutes} onSelect={setSelectedMinute} onToggle={setShowMinutePicker} />
//             )}
//             {showAmPmPicker && (
//               <Dropdown data={amPm} onSelect={setSelectedAmPm} onToggle={setShowAmPmPicker} />
//             )}

//             <View style={styles.modalButtons}>
//               <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setTimePickerVisible(false)}>
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={[styles.modalButton, styles.doneButton]} onPress={handleTimeSelection}>
//                 <Text style={styles.doneButtonText}>Done</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//         </TouchableOpacity>
//       </Modal>

//       {/* 🔹 Clinic Picker Modal */}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={showClinicPicker}
//         onRequestClose={() => setShowClinicPicker(false)}>
//         <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={() => setShowClinicPicker(false)}>
//           <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Select Clinic</Text>
//               <TouchableOpacity onPress={() => setShowClinicPicker(false)}>
//                 <Icon name="close" size={24} color="#000" />
//               </TouchableOpacity>
//             </View>
//             {isLoadingClinics ? (
//               <ActivityIndicator size="large" color={Colors.APPCOLOR} style={{marginVertical: 20}} />
//             ) : (
//               <Dropdown
//                 data={offlineClinicsList}
//                 onSelect={(clinic) => setSelectedClinic(clinic)}
//                 onToggle={setShowClinicPicker}
//                 keyExtractor="_id"
//               />
//             )}
//             {clinicError ? <Text style={[styles.errorText, {textAlign: 'center', marginTop: 10}]}>{clinicError}</Text> : null}
//           </TouchableOpacity>
//         </TouchableOpacity>
//       </Modal>
//     </View>
//   );
// };

// export default AddSlotsScreen;

// // AddSlotsScreen.js
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   FlatList,
//   StyleSheet,
//   ScrollView,
//   Alert,
// } from "react-native";

// const clinics = ["Clinic A", "Clinic B", "Clinic C"];
// const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// const hoursOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
// const minutesOptions = ["00", "15", "30", "45"];
// const ampmOptions = ["AM", "PM"];

// const AddSlotsScreen = () => {
//   const [slotType, setSlotType] = useState("online");
//   const [selectedClinic, setSelectedClinic] = useState(null);
//   const [selectedDay, setSelectedDay] = useState("Monday");
//   const [slots, setSlots] = useState({ Monday: [{ start: "", end: "" }] });

//   const [timeModalVisible, setTimeModalVisible] = useState(false);
//   const [timeType, setTimeType] = useState(null); // "start" or "end"
//   const [currentSlotIndex, setCurrentSlotIndex] = useState(null);

//   // Temp states for picker
//   const [selectedHour, setSelectedHour] = useState("09");
//   const [selectedMinute, setSelectedMinute] = useState("00");
//   const [selectedAmpm, setSelectedAmpm] = useState("AM");

//   // Add new slot
//   const handleAddSlot = () => {
//     const newSlots = [...(slots[selectedDay] || [])];
//     newSlots.push({ start: "", end: "" });
//     setSlots({ ...slots, [selectedDay]: newSlots });
//   };

//   // Remove slot
//   const handleRemoveSlot = (index) => {
//     const newSlots = [...slots[selectedDay]];
//     newSlots.splice(index, 1);
//     setSlots({ ...slots, [selectedDay]: newSlots });
//   };

//   // Save selected time
//   const handleSaveTime = () => {
//     const formatted = `${selectedHour}:${selectedMinute} ${selectedAmpm}`;
//     const updatedSlots = [...slots[selectedDay]];
//     updatedSlots[currentSlotIndex][timeType] = formatted;
//     setSlots({ ...slots, [selectedDay]: updatedSlots });
//     setTimeModalVisible(false);
//   };

//   // Time Picker Modal
//   const renderTimePicker = () => (
//     <Modal transparent={true} visible={timeModalVisible} animationType="fade">
//       <View style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           <Text style={styles.modalTitle}>Select Time</Text>
//           <View style={styles.pickerRow}>
//             {/* Hours */}
//             <FlatList
//               data={hoursOptions}
//               style={{ flex: 1 }}
//               keyExtractor={(item) => item}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={[styles.optionBtn, selectedHour === item && styles.selectedOption]}
//                   onPress={() => setSelectedHour(item)}
//                 >
//                   <Text>{item}</Text>
//                 </TouchableOpacity>
//               )}
//             />

//             {/* Minutes */}
//             <FlatList
//               data={minutesOptions}
//               style={{ flex: 1 }}
//               keyExtractor={(item) => item}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={[styles.optionBtn, selectedMinute === item && styles.selectedOption]}
//                   onPress={() => setSelectedMinute(item)}
//                 >
//                   <Text>{item}</Text>
//                 </TouchableOpacity>
//               )}
//             />

//             {/* AM/PM */}
//             <FlatList
//               data={ampmOptions}
//               style={{ flex: 1 }}
//               keyExtractor={(item) => item}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={[styles.optionBtn, selectedAmpm === item && styles.selectedOption]}
//                   onPress={() => setSelectedAmpm(item)}
//                 >
//                   <Text>{item}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </View>

//           <View style={styles.modalActions}>
//             <TouchableOpacity style={styles.cancelBtn} onPress={() => setTimeModalVisible(false)}>
//               <Text style={styles.btnText}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.doneBtn} onPress={handleSaveTime}>
//               <Text style={styles.btnText}>Done</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Add Slots</Text>

//       {/* Slot Type */}
//       <Text style={styles.heading}>Select Slot Type</Text>
//       <View style={styles.radioGroup}>
//         {["online", "offline"].map((t) => (
//           <TouchableOpacity key={t} style={styles.radioBtn} onPress={() => setSlotType(t)}>
//             <Text style={slotType === t ? styles.radioSelected : styles.radio}>{t}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Clinic if offline */}
//       {slotType === "offline" && (
//         <View>
//           <Text style={styles.heading}>Select Clinic</Text>
//           <View style={styles.radioGroup}>
//             {clinics.map((c) => (
//               <TouchableOpacity key={c} style={styles.radioBtn} onPress={() => setSelectedClinic(c)}>
//                 <Text style={selectedClinic === c ? styles.radioSelected : styles.radio}>{c}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       )}

//       {/* Day Selection */}
//       <Text style={styles.heading}>Select a Day</Text>
//       <View style={styles.radioGroup}>
//         {weekdays.map((d) => (
//           <TouchableOpacity key={d} style={styles.radioBtn} onPress={() => setSelectedDay(d)}>
//             <Text style={selectedDay === d ? styles.radioSelected : styles.radio}>{d}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Slots */}
//       <Text style={styles.heading}>Slots for {selectedDay}:</Text>
//       {(slots[selectedDay] || []).map((slot, idx) => (
//         <View key={idx} style={styles.slotRow}>
//           <TouchableOpacity
//             style={styles.timeBox}
//             onPress={() => {
//               setTimeType("start");
//               setCurrentSlotIndex(idx);
//               setTimeModalVisible(true);
//             }}
//           >
//             <Text>{slot.start || "Start Time"}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.timeBox}
//             onPress={() => {
//               setTimeType("end");
//               setCurrentSlotIndex(idx);
//               setTimeModalVisible(true);
//             }}
//           >
//             <Text>{slot.end || "End Time"}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.addBtn} onPress={handleAddSlot}>
//             <Text style={{ color: "#fff", fontWeight: "bold" }}>+</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemoveSlot(idx)}>
//             <Text style={{ color: "#fff", fontWeight: "bold" }}>-</Text>
//           </TouchableOpacity>
//         </View>
//       ))}

//       {/* Submit */}
//       <TouchableOpacity style={styles.submitBtn} onPress={() => Alert.alert("Saved", JSON.stringify(slots))}>
//         <Text style={styles.btnText}>Submit</Text>
//       </TouchableOpacity>

//       {renderTimePicker()}
//     </ScrollView>
//   );
// };

// export default AddSlotsScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 15 },
//   title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
//   heading: { fontSize: 16, fontWeight: "600", marginVertical: 10 },
//   radioGroup: { flexDirection: "row", flexWrap: "wrap" },
//   radioBtn: { marginRight: 15, marginVertical: 5 },
//   radio: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 20 },
//   radioSelected: {
//     borderWidth: 1,
//     borderColor: "#008CBA",
//     backgroundColor: "#E6F7FF",
//     padding: 8,
//     borderRadius: 20,
//     fontWeight: "600",
//   },
//   slotRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
//   timeBox: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     marginHorizontal: 5,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   addBtn: {
//     backgroundColor: "green",
//     padding: 10,
//     borderRadius: 20,
//     marginLeft: 5,
//   },
//   removeBtn: {
//     backgroundColor: "red",
//     padding: 10,
//     borderRadius: 20,
//     marginLeft: 5,
//   },
//   submitBtn: {
//     backgroundColor: "#00bcd4",
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 20,
//   },
//   btnText: { color: "#fff", textAlign: "center", fontWeight: "600" },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     width: "85%",
//     padding: 20,
//     borderRadius: 12,
//     elevation: 5,
//   },
//   modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
//   pickerRow: { flexDirection: "row", justifyContent: "space-between" },
//   optionBtn: {
//     padding: 12,
//     margin: 5,
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: "#ccc",
//     alignItems: "center",
//   },
//   selectedOption: { borderColor: "#008CBA", backgroundColor: "#E6F7FF" },
//   modalActions: { flexDirection: "row", justifyContent: "space-between", marginTop: 15 },
//   cancelBtn: { backgroundColor: "red", padding: 10, borderRadius: 8, flex: 1, marginRight: 5 },
//   doneBtn: { backgroundColor: "green", padding: 10, borderRadius: 8, flex: 1, marginLeft: 5 },
// });

import React, {useState} from 'react';
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
import {HeaderCompt} from '../../../components';
import Fonts from '../../../theme/Fonts';
import {Colors} from '../../../theme/Colors';
import imageindex from '../../../assets/images/imageindex';
import {showErrorToast} from '../../../utils/HelperFuntions';
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

const AddSlotsScreen = () => {
  const [slotType, setSlotType] = useState('Online');
  const [selectedClinic, setSelectedClinic] = useState(null);

  const [clinics,setClinics]=useState([])
  const [selectedDay, setSelectedDay] = useState('Monday');
  // const [slots, setSlots] = useState({ Monday: [{ start: "", end: "" }] });

  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [timeType, setTimeType] = useState(null); // "start" or "end"
  const [currentSlotIndex, setCurrentSlotIndex] = useState(null);

  // Temp states for picker
  const [selectedHour, setSelectedHour] = useState('09');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedAmpm, setSelectedAmpm] = useState('AM');

  const initSlots = weekdays.reduce((acc, day) => {
    acc[day] = [{start: '', end: ''}];
    return acc;
  }, {});

  const [slots, setSlots] = useState(initSlots);

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
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
            {/* Minutes */}
            <FlatList
              data={minutesOptions}
              style={{flex: 1}}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.optionBtn,
                    selectedMinute === item && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedMinute(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
            {/* AM/PM */}
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
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
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
      setOnlineCalenderdataLoading(true);
      const response = await ApiRequest({
        BASEURL: ApiRoutes.getDoctorAllClinic,
        method: 'POST',
        req: {doctorId: id},
        token: token,
      });

      const decrypted = decryptData(response.data);

      if (decrypted.code === 200 || decrypted.code === 201) {
        console.log(
          '----getDoctorAllClinic----------------',
          JSON.stringify(decrypted),
        );
        setClinics(decrypted?.data);
      } else {
        setOnlineCalenderdataLoading(false);
        console.error('Server error:', decrypted?.message);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setOnlineCalenderdataLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderCompt title={'Add Slots'} />
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
            <Text style={styles.heading}>Select Clinic</Text>
            <View style={styles.radioGroup}>
              {clinics.map(c => (
                <TouchableOpacity
                  key={c}
                  style={styles.radioBtn}
                  onPress={() => setSelectedClinic(c)}>
                  <Text
                    style={
                      selectedClinic === c ? styles.radioSelected : styles.radio
                    }>
                    {c}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => Alert.alert('Saved', JSON.stringify(slots, null, 2))}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>

        {renderTimePicker()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddSlotsScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 15},
  heading: {
    fontSize: 16,
    marginBottom: 12,
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
    fontSize: 16,
    fontFamily: Fonts.PoppinsMedium,
    color: Colors.BLACK,
  },
  radioSelected: {
    borderWidth: 1,
    borderColor: '#008CBA',
    backgroundColor: '#E6F7FF',
    padding: 8,
    borderRadius: 20,
    fontWeight: '600',
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
    height: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.BLACK,
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
