import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  Alert, // Import Alert
} from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import {ButtonCompt, HeaderCompt} from '../../../components'; // Assuming these are your custom components
import {Colors} from '../../../theme/Colors'; // Assuming this is your color theme file

const AddSlotsScreen = () => {
  const [slotType, setSlotType] = useState('Online');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [slots, setSlots] = useState([{startTime: '', endTime: ''}]);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  // State for the currently active slot being edited
  const [activeSlotIndex, setActiveSlotIndex] = useState(0);
  const [activeSlotType, setActiveSlotType] = useState('startTime');

  // State for the time picker modal itself
  const [selectedHour, setSelectedHour] = useState('07');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedAmPm, setSelectedAmPm] = useState('AM');

  // State to control visibility of custom dropdowns in the modal
  const [showHourPicker, setShowHourPicker] = useState(false);
  const [showMinutePicker, setShowMinutePicker] = useState(false);
  const [showAmPmPicker, setShowAmPmPicker] = useState(false);

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const hours = Array.from({length: 12}, (_, i) =>
    (i + 1).toString().padStart(2, '0'),
  );
  // const minutes = Array.from({length: 60}, (_, i) =>
  //   i.toString().padStart(2, '0'),
  // );
  // const minutes = Array.from({length: 60}, (_, i) =>
  //   i.toString().padStart(2, '0'),
  // );
  const minutes = ['00', '15', '30', '45'];
  const amPm = ['AM', 'PM'];

  const addSlot = () => {
    setSlots([...slots, {startTime: '', endTime: ''}]);
  };

  const removeSlot = index => {
    if (slots.length > 1) {
      const newSlots = slots.filter((_, i) => i !== index);
      setSlots(newSlots);
    }
  };

  const openTimePicker = (index, type) => {
    setActiveSlotIndex(index);
    setActiveSlotType(type);

    const currentTime = slots[index][type];
    if (currentTime) {
      const [time, period] = currentTime.split(' ');
      const [hour, minute] = time.split(':');
      setSelectedHour(hour);
      setSelectedMinute(minute);
      setSelectedAmPm(period);
    } else {
      // Default to a sensible time if not set
      setSelectedHour('09');
      setSelectedMinute('00');
      setSelectedAmPm('AM');
    }
    setTimePickerVisible(true);
  };

  // Helper function to convert 12-hour time to minutes from midnight for comparison
  const timeToMinutes = timeString => {
    if (!timeString) return 0;
    const [time, period] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (period === 'PM' && hours !== 12) {
      hours += 12;
    }
    if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    return hours * 60 + minutes;
  };

  const handleTimeSelection = () => {
    const newTime = `${selectedHour}:${selectedMinute} ${selectedAmPm}`;

    // --- VALIDATION LOGIC ---
    if (activeSlotType === 'endTime') {
      const startTime = slots[activeSlotIndex].startTime;
      if (startTime) {
        const startMinutes = timeToMinutes(startTime);
        const endMinutes = timeToMinutes(newTime);

        if (endMinutes <= startMinutes) {
          Alert.alert(
            'Invalid Time',
            'End time must be after the start time.',
            [{text: 'OK'}],
          );
          return; // Stop the function here
        }
      }
    }

    const newSlots = [...slots];
    newSlots[activeSlotIndex][activeSlotType] = newTime;
    setSlots(newSlots);
    setTimePickerVisible(false);
  };

  const handleSubmit = () => {
    console.log({slotType, selectedDay, slots});
    // Add validation to ensure all slots are filled before submitting
  };

  // Component for rendering the picker dropdowns
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
              onToggle(false);
            }}>
            <Text style={styles.dropdownItemText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderCompt title={'Add Slots'} />

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        {/* Slot Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Slot Type</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setSlotType('Online')}>
              <View
                style={[
                  styles.radio,
                  slotType === 'Online' && styles.radioSelected,
                ]}
              />
              <Text style={{color: Colors.BLACK}}>Online</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setSlotType('Offline')}>
              <View
                style={[
                  styles.radio,
                  slotType === 'Offline' && styles.radioSelected,
                ]}
              />
              <Text style={{color: Colors.BLACK}}>Offline</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Day Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select a Day</Text>
          <View style={styles.daysContainer}>
            {days.map(day => (
              <TouchableOpacity
                key={day}
                style={styles.radioButton}
                onPress={() => setSelectedDay(day)}>
                <View
                  style={[
                    styles.radio,
                    selectedDay === day && styles.radioSelected,
                  ]}
                />
                <Text style={{color: Colors.BLACK}}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Slots Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Slots for {selectedDay}:</Text>
          {slots.map((slot, index) => (
            <View key={index} style={styles.slotContainer}>
              <TouchableOpacity
                style={styles.timeInput}
                onPress={() => openTimePicker(index, 'startTime')}>
                <Text
                  style={{color: slot.startTime ? Colors.BLACK : Colors.BLACK}}>
                  {slot.startTime || 'Select start time'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.timeInput}
                onPress={() => openTimePicker(index, 'endTime')}>
                <Text
                  style={{color: slot.endTime ? Colors.BLACK : Colors.BLACK}}>
                  {slot.endTime || 'Select end time'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addSlot} style={styles.iconButton}>
                <Icon name="add-circle" size={28} color="green" />
              </TouchableOpacity>
              {slots.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeSlot(index)}
                  style={styles.iconButton}>
                  <Icon name="remove-circle" size={28} color="red" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <ButtonCompt title={'Submit'} onPress={handleSubmit} />
      </ScrollView>

      {/* Time Picker Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isTimePickerVisible}
        onRequestClose={() => setTimePickerVisible(false)}>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setTimePickerVisible(false)}>
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Time</Text>
              <TouchableOpacity onPress={() => setTimePickerVisible(false)}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* --- Interactive Time Picker --- */}
            <View style={styles.timePicker}>
              {/* Hour */}
              <View style={styles.pickerColumn}>
                <Text style={{color: Colors.BLACK}}>Hour</Text>
                <TouchableOpacity
                  style={styles.pickerBox}
                  onPress={() => {
                    setShowHourPicker(!showHourPicker);
                    setShowMinutePicker(false);
                    setShowAmPmPicker(false);
                  }}>
                  <Text style={styles.pickerValue}>{selectedHour}</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.timeSeparator}>:</Text>

              {/* Minute */}
              <View style={styles.pickerColumn}>
                <Text style={{color: Colors.BLACK}}>Minute</Text>
                <TouchableOpacity
                  style={styles.pickerBox}
                  onPress={() => {
                    setShowMinutePicker(!showMinutePicker);
                    setShowHourPicker(false);
                    setShowAmPmPicker(false);
                  }}>
                  <Text style={styles.pickerValue}>{selectedMinute}</Text>
                </TouchableOpacity>
              </View>

              {/* AM/PM */}
              <View style={styles.pickerColumn}>
                <Text style={{color: Colors.BLACK}}>AM/PM</Text>
                <TouchableOpacity
                  style={styles.pickerBox}
                  onPress={() => {
                    setShowAmPmPicker(!showAmPmPicker);
                    setShowHourPicker(false);
                    setShowMinutePicker(false);
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
                onPress={() => setTimePickerVisible(false)}>
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
    </View>
  );
};

// Add Colors.GREY to your theme or replace it with a color like '#888'
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  form: {padding: 16},
  section: {marginBottom: 24},
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: Colors.BLACK,
  },
  radioContainer: {flexDirection: 'row', alignItems: 'center'},
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00A0A0',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {backgroundColor: '#00A0A0'},
  daysContainer: {flexDirection: 'row', flexWrap: 'wrap'},
  slotContainer: {flexDirection: 'row', alignItems: 'center', marginBottom: 12},
  timeInput: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 8,
  },
  iconButton: {marginLeft: 4},
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
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {fontSize: 18, fontWeight: 'bold', color: Colors.BLACK},
  timePicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  pickerColumn: {alignItems: 'center'},
  pickerBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 4,
  },
  pickerValue: {fontSize: 20, fontWeight: 'bold', color: Colors.BLACK},
  timeSeparator: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginHorizontal: -10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 12,
  },
  cancelButton: {borderWidth: 1, borderColor: '#00A0A0'},
  cancelButtonText: {color: '#00A0A0', fontWeight: 'bold'},
  doneButton: {backgroundColor: '#00A0A0'},
  doneButtonText: {color: '#fff', fontWeight: 'bold'},
  // Dropdown styles
  dropdownContainer: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  dropdownItem: {padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee'},
  dropdownItemText: {textAlign: 'center', color: Colors.BLACK, fontSize: 16},
});

export default AddSlotsScreen;
