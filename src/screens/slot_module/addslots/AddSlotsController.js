// import {useState} from 'react';
// import {Alert} from 'react-native'; // Import Alert for validation

// const AddSlotsController = () => {
//   const [slotType, setSlotType] = useState('Online');
//   const [selectedDay, setSelectedDay] = useState('Monday');
//   const [slots, setSlots] = useState([{startTime: '', endTime: ''}]);
//   const [isTimePickerVisible, setTimePickerVisible] = useState(false);

//   // State for the currently active slot being edited
//   const [activeSlotIndex, setActiveSlotIndex] = useState(0);
//   const [activeSlotType, setActiveSlotType] = useState('startTime');

//   // State for the time picker modal itself
//   const [selectedHour, setSelectedHour] = useState('07');
//   const [selectedMinute, setSelectedMinute] = useState('00');
//   const [selectedAmPm, setSelectedAmPm] = useState('AM');

//   // State to control visibility of custom dropdowns in the modal
//   const [showHourPicker, setShowHourPicker] = useState(false);
//   const [showMinutePicker, setShowMinutePicker] = useState(false);
//   const [showAmPmPicker, setShowAmPmPicker] = useState(false);

//   const days = [
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//     'Sunday',
//   ];
//   const hours = Array.from({length: 12}, (_, i) =>
//     (i + 1).toString().padStart(2, '0'),
//   );

//   const minutes = ['00', '15', '30', '45'];
//   const amPm = ['AM', 'PM'];

//   const addSlot = () => {
//     setSlots([...slots, {startTime: '', endTime: ''}]);
//   };

//   const removeSlot = index => {
//     if (slots.length > 1) {
//       const newSlots = slots.filter((_, i) => i !== index);
//       setSlots(newSlots);
//       // If the removed slot was active, reset active index if necessary
//       if (activeSlotIndex === index && index === newSlots.length) {
//         setActiveSlotIndex(newSlots.length - 1);
//       } else if (activeSlotIndex > index) {
//         setActiveSlotIndex(activeSlotIndex - 1);
//       }
//     } else {
//       Alert.alert('Cannot Remove', 'At least one slot is required.');
//     }
//   };

//   const openTimePicker = (index, type) => {
//     setActiveSlotIndex(index);
//     setActiveSlotType(type);

//     const currentTime = slots[index][type];
//     if (currentTime) {
//       const [time, period] = currentTime.split(' ');
//       const [hour, minute] = time.split(':');
//       setSelectedHour(hour);
//       setSelectedMinute(minute);
//       setSelectedAmPm(period);
//     } else {
//       // Default to a sensible time if not set
//       setSelectedHour('09');
//       setSelectedMinute('00');
//       setSelectedAmPm('AM');
//     }
//     setTimePickerVisible(true);
//   };

//   // Helper function to convert 12-hour time to minutes from midnight for comparison
//   const timeToMinutes = timeString => {
//     if (!timeString) return -1; // Return -1 for invalid or empty time strings
//     const [time, period] = timeString.split(' ');
//     let [hours, minutes] = time.split(':').map(Number);

//     if (period === 'PM' && hours !== 12) {
//       hours += 12;
//     }
//     if (period === 'AM' && hours === 12) {
//       hours = 0;
//     }
//     return hours * 60 + minutes;
//   };

//   const handleTimeSelection = () => {
//     const newTime = `${selectedHour}:${selectedMinute} ${selectedAmPm}`;

//     // --- VALIDATION LOGIC ---
//     // Check if the current slot already has a value for the other time (start/end)
//     const currentSlot = slots[activeSlotIndex];
//     let isValid = true;

//     if (activeSlotType === 'endTime') {
//       const startTime = currentSlot.startTime;
//       if (startTime) {
//         const startMinutes = timeToMinutes(startTime);
//         const endMinutes = timeToMinutes(newTime);

//         if (endMinutes <= startMinutes) {
//           Alert.alert(
//             'Invalid Time',
//             'End time must be after the start time for the current slot.',
//             [{text: 'OK'}],
//           );
//           isValid = false;
//         }
//       }
//     } else if (activeSlotType === 'startTime') {
//       const endTime = currentSlot.endTime;
//       if (endTime) {
//         const startMinutes = timeToMinutes(newTime);
//         const endMinutes = timeToMinutes(endTime);
//         if (startMinutes >= endMinutes) {
//           Alert.alert(
//             'Invalid Time',
//             'Start time must be before the end time for the current slot.',
//             [{text: 'OK'}],
//           );
//           isValid = false;
//         }
//       }
//     }

//     // Check for overlapping slots
//     if (isValid) {
//       const newSlots = [...slots];
//       const tempNewSlots = [...newSlots]; // Create a temporary copy to test the new time
//       tempNewSlots[activeSlotIndex][activeSlotType] = newTime;

//       // Filter out incomplete slots or the slot currently being edited for a cleaner check
//       const completeSlots = tempNewSlots.filter(
//         (s, idx) => s.startTime && s.endTime && idx !== activeSlotIndex,
//       );

//       const newSlotStart =
//         activeSlotType === 'startTime'
//           ? timeToMinutes(newTime)
//           : timeToMinutes(tempNewSlots[activeSlotIndex].startTime);
//       const newSlotEnd =
//         activeSlotType === 'endTime'
//           ? timeToMinutes(newTime)
//           : timeToMinutes(tempNewSlots[activeSlotIndex].endTime);

//       if (
//         newSlotStart !== -1 &&
//         newSlotEnd !== -1 &&
//         newSlotStart < newSlotEnd
//       ) {
//         // Only check for overlap if the new slot is valid itself
//         for (let i = 0; i < completeSlots.length; i++) {
//           const existingSlot = completeSlots[i];
//           const existingStart = timeToMinutes(existingSlot.startTime);
//           const existingEnd = timeToMinutes(existingSlot.endTime);

//           // Check for overlap
//           // Case 1: New slot starts within existing slot
//           // Case 2: New slot ends within existing slot
//           // Case 3: New slot completely encompasses existing slot
//           // Case 4: Existing slot completely encompasses new slot
//           if (
//             (newSlotStart < existingEnd && newSlotEnd > existingStart) || // Overlap condition
//             (existingStart < newSlotEnd && existingEnd > newSlotStart) // Reverse overlap condition
//           ) {
//             Alert.alert(
//               'Slot Overlap',
//               `This slot (${newTime} or its pair) overlaps with an existing slot: ${existingSlot.startTime} - ${existingSlot.endTime}.`,
//               [{text: 'OK'}],
//             );
//             isValid = false;
//             break;
//           }
//         }
//       }
//     }

//     if (!isValid) {
//       return; // Stop the function if any validation failed
//     }

//     // If validation passes, update the slots
//     const newSlots = [...slots];
//     newSlots[activeSlotIndex][activeSlotType] = newTime;
//     setSlots(newSlots);
//     setTimePickerVisible(false);
//   };

//   const handleSubmit = () => {
//     // Final validation before submission
//     const allSlotsValid = slots.every(slot => {
//       if (!slot.startTime || !slot.endTime) {
//         Alert.alert(
//           'Incomplete Slots',
//           'Please fill all start and end times for all slots.',
//         );
//         return false;
//       }
//       const start = timeToMinutes(slot.startTime);
//       const end = timeToMinutes(slot.endTime);
//       if (start >= end) {
//         Alert.alert(
//           'Invalid Slot Time',
//           'End time must be after start time for all slots.',
//         );
//         return false;
//       }
//       return true;
//     });

//     if (!allSlotsValid) {
//       return;
//     }

//     console.log({slotType, selectedDay, slots});
//     // Here you would typically make an API call to save the slots
//     Alert.alert('Success', 'Slots submitted successfully!');
//   };

//   return {
//     // States
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
//   };
// };

// export default AddSlotsController;
