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
import Fonts from '../../../theme/Fonts';
import styles from './styles.editslotes';

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
    'Wednusday',
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
              {/* <View
                style={[
                  styles.radio,
                  slotType === 'Online' && styles.radioSelected,
                ]}
              /> */}
              <View style={[styles.radio]}>
                <View
                  style={[
                    {borderRadius: 50, padding: 6, margin: 2},
                    slotType === 'Online' && styles.radioSelected,
                  ]}
                />
              </View>
              <Text
                style={{color: Colors.BLACK, fontFamily: Fonts.PoppinsMedium}}>
                Online
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setSlotType('Offline')}>
              {/* <View
                style={[
                  styles.radio,
                  slotType === 'Offline' && styles.radioSelected,
                ]}
              /> */}
              <View style={[styles.radio]}>
                <View
                  style={[
                    {borderRadius: 50, padding: 6, margin: 2},
                    slotType === 'Offline' && styles.radioSelected,
                  ]}
                />
              </View>
              <Text
                style={{color: Colors.BLACK, fontFamily: Fonts.PoppinsMedium}}>
                Offline
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Clinic</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setIsClinicDropdownOpen(!isClinicDropdownOpen)}>
            <Text
              style={{color: Colors.BLACK, fontFamily: Fonts.PoppinsMedium}}>
              {selectedClinic}
            </Text>
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
                    // selectedDay === day && styles.radioSelected,
                  ]}>
                  <View
                    style={[
                      {borderRadius: 50, padding: 6, margin: 2},
                      selectedDay === day && styles.radioSelected,
                    ]}
                  />
                </View>
                <Text
                  style={{
                    color: Colors.BLACK,
                    fontFamily: Fonts.PoppinsMedium,
                  }}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <ButtonCompt onPress={handleUpdate} title={'Update'} />
      </ScrollView>
    </View>
  );
};

export default EditSlotsScreen;
