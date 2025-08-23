import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import {ButtonCompt, HeaderCompt} from '../../../components';
import {Colors} from '../../../theme/Colors';

const EditSlotsScreen = () => {
  const [slotType, setSlotType] = useState('Offline');
  const [selectedClinic, setSelectedClinic] = useState('Motherhood Hospital');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [isClinicDropdownOpen, setIsClinicDropdownOpen] = useState(false);

  const clinics = [
    'Select a clinic',
    'Motherhood Hospital',
    'Pranshu Surgical And Maternity Center',
  ];
  const days = [
    'Monday',
    'Tuesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const handleUpdate = () => {
    // Handle the update logic here
    console.log({
      slotType,
      selectedClinic,
      selectedDay,
    });
  };

  return (
    <View style={styles.container}>
      <HeaderCompt title={'Edit Slots'} />

      <ScrollView style={styles.form}>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Clinic</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setIsClinicDropdownOpen(!isClinicDropdownOpen)}>
            <Text style={{color: Colors.BLACK}}>{selectedClinic}</Text>
            <Icon name="arrow-down" size={20} color="#000" />
          </TouchableOpacity>
          {isClinicDropdownOpen && (
            <View style={styles.dropdownOptions}>
              {clinics.map((clinic, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownOption,
                    selectedClinic === clinic && styles.dropdownOptionSelected,
                  ]}
                  onPress={() => {
                    setSelectedClinic(clinic);
                    setIsClinicDropdownOpen(false);
                  }}>
                  <Text
                    style={[
                      selectedClinic === clinic &&
                        styles.dropdownOptionTextSelected,
                      styles.dropdownOptionText,
                    ]}>
                    {clinic}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select a Day</Text>
          <View style={styles.daysContainer}>
            {days.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.radioButton, {width: '33%', marginTop: 10}]}
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

        <ButtonCompt onPress={handleUpdate} title={'Update'} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  form: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,

    marginBottom: 12,
    color: Colors.BLACK,
  },
  radioContainer: {
    flexDirection: 'row',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00A0A0',
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: '#00A0A0',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#00A0A0',
    borderRadius: 8,
  },
  dropdownOptions: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
  },
  dropdownOption: {
    padding: 12,
    color: Colors.BLACK,
  },
  dropdownOptionSelected: {
    backgroundColor: Colors.APPCOLOR,
    borderRadius: 10,
  },
  dropdownOptionText: {
    color: Colors.BLACK,
  },
  dropdownOptionTextSelected: {
    color: Colors.WHITE,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default EditSlotsScreen;
