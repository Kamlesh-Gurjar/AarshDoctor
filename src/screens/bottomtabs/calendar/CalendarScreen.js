// src/screens/CalendarScreen.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {HeaderCompt} from '../../../components';

const CalendarScreen = () => {
  const markedDates = {
    '2025-08-18': {marked: true, dotColor: '#3498db'},
    '2025-08-19': {marked: true, dotColor: '#3498db'},
    '2025-08-20': {marked: true, dotColor: '#3498db'},
  };

  return (
    <View style={styles.container}>
      <HeaderCompt title={'Online Calender'} />
      <Calendar
        current={'2025-08-14'}
        markedDates={markedDates}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#3498db',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#3498db',
          dayTextColor: '#2d4150',
          arrowColor: '#3498db',
          monthTextColor: '#3498db',
          indicatorColor: 'blue',
        }}
      />
      <View style={styles.slotsInfo}>
        <Text style={styles.infoTitle}>Available Slots for August</Text>
        <View style={styles.slotItem}>
          <Text style={styles.slotDate}>Monday, 18</Text>
          <Text style={styles.slotTime}>07:00 AM - 07:45 AM</Text>
          <Text style={styles.slotTime}>10:00 AM - 10:45 AM</Text>
        </View>
        <View style={styles.slotItem}>
          <Text style={styles.slotDate}>Tuesday, 19</Text>
          <Text style={styles.slotTime}>07:00 AM - 07:15 AM</Text>
        </View>
        <View style={styles.slotItem}>
          <Text style={styles.slotDate}>Wednesday, 20</Text>
          <Text style={styles.slotTime}>10:45 AM - 11:00 AM</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slotsInfo: {
    padding: 20,
    flex: 1,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  slotItem: {
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#3498db',
    paddingLeft: 10,
  },
  slotDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
  },
  slotTime: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
});

export default CalendarScreen;
