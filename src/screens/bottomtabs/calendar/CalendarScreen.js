// // src/screens/CalendarScreen.js
// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import {Calendar} from 'react-native-calendars';
// import {HeaderCompt} from '../../../components';
// import {Colors} from '../../../theme/Colors';
// import Fonts from '../../../theme/Fonts';
// import CalenderController from './CalenderController';

// const CalendarScreen = () => {
//   const markedDates = {
//     '2025-08-18': {marked: true, dotColor: '#3498db'},
//     '2025-08-19': {marked: true, dotColor: '#3498db'},
//     '2025-08-20': {marked: true, dotColor: '#3498db'},
//   };

//   const {
//     offlineCalenderdata,
//     isLoadingofflineCalender,
//     OnlineCalenderdata,
//     OnlineCalenderdataLoading,
//   } = CalenderController();

//   console.log('======OnlineCalenderdata=====', OnlineCalenderdata);
//   console.log('======offlineCalenderdata=====', offlineCalenderdata);

//   return (
//     <View style={styles.container}>
//       <HeaderCompt title={'Online Calender'} />
//       <Calendar
//         current={'2025-08-14'}
//         markedDates={markedDates}
//         theme={{
//           backgroundColor: Colors.WHITE,
//           calendarBackground: Colors.WHITE,
//           textSectionTitleColor: '#b6c1cd',
//           selectedDayBackgroundColor: '#3498db',
//           selectedDayTextColor: Colors.WHITE,
//           todayTextColor: '#3498db',
//           dayTextColor: Colors.BLACK,
//           arrowColor: Colors.APPCOLOR,
//           monthTextColor: Colors.APPCOLOR,
//           indicatorColor: Colors.APPCOLOR,
//         }}
//       />
//       <View style={styles.slotsInfo}>
//         <Text style={styles.infoTitle}>Available Slots for August</Text>
//         <View style={styles.slotItem}>
//           <Text style={styles.slotDate}>Monday, 18</Text>
//           <Text style={styles.slotTime}>07:00 AM - 07:45 AM</Text>
//           <Text style={styles.slotTime}>10:00 AM - 10:45 AM</Text>
//         </View>
//         <View style={styles.slotItem}>
//           <Text style={styles.slotDate}>Tuesday, 19</Text>
//           <Text style={styles.slotTime}>07:00 AM - 07:15 AM</Text>
//         </View>
//         <View style={styles.slotItem}>
//           <Text style={styles.slotDate}>Wednesday, 20</Text>
//           <Text style={styles.slotTime}>10:45 AM - 11:00 AM</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   slotsInfo: {
//     padding: 20,
//     flex: 1,
//   },
//   infoTitle: {
//     fontSize: 18,
//     marginBottom: 15,
//     color: Colors.BLACK,
//     fontFamily: Fonts.PoppinsMedium,
//   },
//   slotItem: {
//     marginBottom: 15,
//     borderLeftWidth: 3,
//     borderLeftColor: Colors.APPCOLOR,
//     paddingLeft: 10,
//   },
//   slotDate: {
//     fontSize: 15,
//     color: Colors.BLACK,
//     fontFamily: Fonts.PoppinsMedium,
//   },
//   slotTime: {
//     fontSize: 14,
//     color: Colors.GRAY,
//     marginTop: 3,
//     fontFamily: Fonts.PoppinsRegular,
//   },
// });

// export default CalendarScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {HeaderCompt} from '../../../components';
import {Colors} from '../../../theme/Colors';
import Fonts from '../../../theme/Fonts';
import CalenderController from './CalenderController';
import moment from 'moment';

const CalendarScreen = () => {
  const [activeTab, setActiveTab] = useState('online'); // 'online' or 'offline'
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDateSlots, setSelectedDateSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD')); // State to hold the currently selected date on the calendar

  const {
    offlineCalenderdata,
    isLoadingofflineCalender,
    OnlineCalenderdata,
    OnlineCalenderdataLoading,
  } = CalenderController();

  // console.log('======OnlineCalenderdata=====', OnlineCalenderdata);
  console.log('======offlineCalenderdata=====', offlineCalenderdata);

  useEffect(() => {
    // Process data for marked dates and initial slot display
    let dataToProcess =
      activeTab === 'online' ? OnlineCalenderdata : offlineCalenderdata;

    if (dataToProcess && dataToProcess[0] && dataToProcess[0].slotsByDate) {
      const newMarkedDates = {};
      const allSlots = {};

      dataToProcess[0].slotsByDate.forEach(item => {
        newMarkedDates[item.date] = {marked: true, dotColor: Colors.APPCOLOR};
        allSlots[item.date] = item.slots.map(slot => ({
          startTime: slot.startTime,
          endTime: slot.endTime,
        }));
      });
      setMarkedDates(newMarkedDates);

      // Set initial selected date slots if available for the current date
      const initialDate = moment().format('YYYY-MM-DD');
      if (allSlots[initialDate]) {
        setSelectedDateSlots(allSlots[initialDate]);
      } else {
        setSelectedDateSlots([]);
      }
    } else {
      setMarkedDates({});
      setSelectedDateSlots([]);
    }
  }, [activeTab, OnlineCalenderdata, offlineCalenderdata]);

  const onDayPress = day => {
    setSelectedDay(day.dateString);
    let dataToProcess =
      activeTab === 'online' ? OnlineCalenderdata : offlineCalenderdata;
    if (dataToProcess && dataToProcess[0] && dataToProcess[0].slotsByDate) {
      const selectedDayData = dataToProcess[0].slotsByDate.find(
        item => item.date === day.dateString,
      );
      if (selectedDayData) {
        setSelectedDateSlots(
          selectedDayData.slots.map(slot => ({
            startTime: slot.startTime,
            endTime: slot.endTime,
          })),
        );
      } else {
        setSelectedDateSlots([]);
      }
    } else {
      setSelectedDateSlots([]);
    }
  };

  const renderSlots = slots => {
    if (!slots || slots.length === 0) {
      return (
        <Text style={styles.noSlotsText}>
          No slots available for this date.
        </Text>
      );
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}>
        {slots.map((slot, index) => (
          <View key={index} style={styles.slotItem}>
            <Text
              style={
                styles.slotTime
              }>{`${slot.startTime} → ${slot.endTime}`}</Text>
          </View>
        ))}
      </View>
    );
  };

  const currentData =
    activeTab === 'online' ? OnlineCalenderdata : offlineCalenderdata;
  const isLoading =
    activeTab === 'online'
      ? OnlineCalenderdataLoading
      : isLoadingofflineCalender;

  const today = moment();

  const maxDate = today.clone().add(3, 'months').format('YYYY-MM-DD');

  return (
    <View style={styles.container}>
      <HeaderCompt title={'Calendar'} />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'online' && styles.activeTab]}
          onPress={() => setActiveTab('online')}>
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'online' && styles.activeTabButtonText,
            ]}>
            Online Calendar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'offline' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('offline')}>
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'offline' && styles.activeTabButtonText,
            ]}>
            Offline Calendar
          </Text>
        </TouchableOpacity>
      </View>

      <Calendar
        current={moment().format('YYYY-MM-DD')}
        // minDate={moment().format('YYYY-MM-DD')} // Optional: Disable past dates
        // maxDate={maxDate} // Set maxDate to restrict navigation
        markedDates={{
          ...markedDates,
          [selectedDay]: {
            selected: true,
            selectedColor: Colors.APPCOLOR,
            selectedTextColor: Colors.WHITE,
            ...(markedDates[selectedDay] || {}), // Keep existing marked properties if any
          },
        }}
        onDayPress={onDayPress}
        theme={{
          backgroundColor: Colors.WHITE,
          calendarBackground: Colors.WHITE,
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: Colors.APPCOLOR,
          selectedDayTextColor: Colors.WHITE,
          todayTextColor: Colors.APPCOLOR,
          dayTextColor: Colors.BLACK,
          arrowColor: Colors.APPCOLOR,
          monthTextColor: Colors.APPCOLOR,
          indicatorColor: Colors.APPCOLOR,
        }}
      />
      <ScrollView style={styles.slotsInfo}>
        <Text style={styles.infoTitle}>
          Available Slots for {moment(selectedDay).format('MMMM Do, YYYY')} (
          {activeTab === 'online' ? 'Online' : 'Offline'})
        </Text>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={Colors.APPCOLOR}
            style={styles.loadingIndicator}
          />
        ) : (
          renderSlots(selectedDateSlots)
        )}
        <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 50,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.WHITE,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  activeTab: {
    backgroundColor: Colors.APPCOLOR,
  },
  tabButtonText: {
    fontSize: 16,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsMedium,
  },
  activeTabButtonText: {
    color: Colors.WHITE,
  },
  slotsInfo: {
    padding: 20,
    flex: 1,
  },
  infoTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsMedium,
  },
  slotItem: {
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: Colors.APPCOLOR,
    paddingLeft: 10,
    borderWidth: 0.5,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  slotDate: {
    fontSize: 15,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsMedium,
  },
  slotTime: {
    fontSize: 14,
    color: Colors.GRAY,
    marginTop: 3,
    fontFamily: Fonts.PoppinsRegular,
  },
  noSlotsText: {
    fontSize: 16,
    color: Colors.GRAY,
    fontFamily: Fonts.PoppinsRegular,
    textAlign: 'center',
    marginTop: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default CalendarScreen;
