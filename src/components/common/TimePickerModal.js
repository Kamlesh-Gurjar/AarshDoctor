import React, {useState, useEffect, memo} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import {Colors} from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import styles from '../../screens/slot_module/addslots/styles.addSlotes';

// --- Helper Data ---
const hours = Array.from({length: 12}, (_, i) =>
  String(i + 1).padStart(2, '0'),
);
// const minutes = Array.from({length: 60}, (_, i) => String(i).padStart(2, '0'));
// const amPm = ['AM', 'PM'];
const minutes = ['00', '15', '30', '45'];
const amPm = ['AM', 'PM'];

// --- Sub-component for Dropdowns ---
const PickerDropdown = ({data, onSelect, onToggle}) => (
  <View style={styles.dropdownContainer}>
    <FlatList
      data={data}
      keyExtractor={item => item}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.dropdownItem}
          onPress={() => {
            onSelect(item);
            onToggle(false); // Hide dropdown after selection
          }}>
          <Text style={styles.dropdownItemText}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
);

// --- Main Reusable Component ---
const TimePickerModal = ({visible, onClose, onTimeSelect, initialTime}) => {
  const [selectedHour, setSelectedHour] = useState('09');
  const [selectedMinute, setSelectedMinute] = useState('30');
  const [selectedAmPm, setSelectedAmPm] = useState('AM');

  const [showHourPicker, setShowHourPicker] = useState(false);
  const [showMinutePicker, setShowMinutePicker] = useState(false);
  const [showAmPmPicker, setShowAmPmPicker] = useState(false);

  // Set the initial time when the modal becomes visible
  useEffect(() => {
    if (visible && initialTime) {
      const [time, period] = initialTime.split(' ');
      const [hour, minute] = time.split(':');
      setSelectedHour(hour);
      setSelectedMinute(minute);
      setSelectedAmPm(period);
    } else if (visible) {
      // Reset to default if no initial time is provided
      setSelectedHour('09');
      setSelectedMinute('30');
      setSelectedAmPm('AM');
    }
  }, [visible, initialTime]);

  const handleTimeSelection = () => {
    const formattedTime = `${selectedHour}:${selectedMinute} ${selectedAmPm}`;
    onTimeSelect(formattedTime);
    onClose(); // Close the modal after selection
  };

  const closeAllPickers = () => {
    setShowHourPicker(false);
    setShowMinutePicker(false);
    setShowAmPmPicker(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={onClose} // Close when clicking backdrop
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Time</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* --- Interactive Time Picker --- */}
          <View style={styles.timePicker}>
            {/* Hour */}
            <View style={styles.pickerColumn}>
              <Text style={styles.pickerLabel}>Hour</Text>
              <TouchableOpacity
                style={styles.pickerBox}
                onPress={() => {
                  closeAllPickers();
                  setShowHourPicker(!showHourPicker);
                }}>
                <Text style={styles.pickerValue}>{selectedHour}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.timeSeparator}>:</Text>

            {/* Minute */}
            <View style={styles.pickerColumn}>
              <Text style={styles.pickerLabel}>Minute</Text>
              <TouchableOpacity
                style={styles.pickerBox}
                onPress={() => {
                  closeAllPickers();
                  setShowMinutePicker(!showMinutePicker);
                }}>
                <Text style={styles.pickerValue}>{selectedMinute}</Text>
              </TouchableOpacity>
            </View>

            {/* AM/PM */}
            <View style={styles.pickerColumn}>
              <Text style={styles.pickerLabel}>AM/PM</Text>
              <TouchableOpacity
                style={styles.pickerBox}
                onPress={() => {
                  closeAllPickers();
                  setShowAmPmPicker(!showAmPmPicker);
                }}>
                <Text style={styles.pickerValue}>{selectedAmPm}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* --- Dropdown Views --- */}
          {showHourPicker && (
            <PickerDropdown
              data={hours}
              onSelect={setSelectedHour}
              onToggle={setShowHourPicker}
            />
          )}
          {showMinutePicker && (
            <PickerDropdown
              data={minutes}
              onSelect={setSelectedMinute}
              onToggle={setShowMinutePicker}
            />
          )}
          {showAmPmPicker && (
            <PickerDropdown
              data={amPm}
              onSelect={setSelectedAmPm}
              onToggle={setShowAmPmPicker}
            />
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.doneButton]}
              onPress={handleTimeSelection}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

// --- Styles ---
// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '90%',
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 20,
//     elevation: 10,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     paddingBottom: 15,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontFamily: Fonts.PoppinsSemiBold,
//     color: Colors.BLACK,
//   },
//   timePicker: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     alignItems: 'flex-end',
//     marginVertical: 25,
//   },
//   pickerColumn: {
//     alignItems: 'center',
//   },
//   pickerLabel: {
//     color: Colors.BLACK,
//     fontFamily: Fonts.PoppinsMedium,
//     fontSize: 14,
//     marginBottom: 8,
//   },
//   pickerBox: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     backgroundColor: '#f8f9fa',
//   },
//   pickerValue: {
//     fontSize: 22,
//     fontFamily: Fonts.PoppinsBold,
//     color: Colors.APPCOLOR,
//   },
//   timeSeparator: {
//     fontSize: 24,
//     fontFamily: Fonts.PoppinsBold,
//     color: '#000',
//     marginHorizontal: 5,
//     paddingBottom: 10, // To align with the boxes
//   },
//   dropdownListContainer: {
//     height: 160, // Fixed height for dropdown
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     backgroundColor: Colors.WHITE,
//     marginBottom: 20,
//   },
//   dropdownItem: {
//     padding: 12,
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   dropdownItemText: {
//     color: Colors.BLACK,
//     fontSize: 16,
//     fontFamily: Fonts.PoppinsMedium,
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 15,
//   },
//   modalButton: {
//     flex: 1,
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   cancelButton: {
//     backgroundColor: '#f1f1f1',
//     marginRight: 10,
//   },
//   cancelButtonText: {
//     color: '#555',
//     fontFamily: Fonts.PoppinsSemiBold,
//     fontSize: 16,
//   },
//   doneButton: {
//     backgroundColor: Colors.APPCOLOR,
//   },
//   doneButtonText: {
//     color: Colors.WHITE,
//     fontFamily: Fonts.PoppinsSemiBold,
//     fontSize: 16,
//   },
// });

export default memo(TimePickerModal);
