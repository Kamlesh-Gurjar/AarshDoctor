import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from '@react-native-vector-icons/material-icons';
import {Colors} from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import {
  ButtonCompt,
  CustomPicker,
  HeaderCompt,
  InputCompt,
  TimePickerModal,
} from '../../components';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiRequest from '../../network/ApiRequest';
import {ApiRoutes} from '../../utils/ApiRoutes';
import {decryptData} from '../../utils/encryptionUtils';
import {showErrorToast, showSuccessToast} from '../../utils/HelperFuntions';
import {useSelector} from 'react-redux';

const RescheduleAppointmentScreen = ({navigation}) => {
  const doctorID = useSelector(state => state.doctorDetails?._id);

  const route = useRoute();
  const appointmentData = route?.params?.item;

  const appointmentID = appointmentData?._id;

  const [doctor, setDoctor] = useState({
    salutation: appointmentData?.patientId?.salutation,
    fullName: appointmentData?.patientId?.name,
    contact: appointmentData?.patientId?.contact,
  });

  const [selectedDate, setSelectedDate] = useState(
    appointmentData?.date ? new Date(appointmentData.date) : new Date(),
  );

  // console.log('-----selectedDate-------', selectedDate);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // --- State for Time Pickers ---
  const [startTime, setStartTime] = useState(
    appointmentData?.startTime || '09:30 AM',
  );
  const [endTime, setEndTime] = useState(
    appointmentData?.endTime || '10:00 AM',
  );
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [pickerFor, setPickerFor] = useState('start'); // To know which time to set: 'start' or 'end'

  const salutationItems = [
    {label: 'Dr.', value: 'Dr.'},
    {label: 'Mr.', value: 'Mr.'},
    {label: 'Ms.', value: 'Ms.'},
  ];

  const formatDate = date => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // UI ke liye: DD-MM-YYYY
  const formatDateForUI = date => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // API ke liye: YYYY-MM-DD
  const formatDateForAPI = date => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const onDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  };

  // --- Unified Logic for Opening Time Picker ---
  const openTimePicker = type => {
    setPickerFor(type); // Set whether we are picking for 'start' or 'end'
    setTimePickerVisible(true);
  };

  // --- Unified Logic for Handling Time Selection ---
  const handleTimeSelected = time => {
    if (pickerFor === 'start') {
      setStartTime(time);
    } else {
      setEndTime(time);
    }
    // The modal will close itself via its onTimeSelect prop
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async values => {
    const token = await AsyncStorage.getItem('userToken');

    const req = {
      doctorId: doctorID,
      appointmentId: appointmentID,
      date: formatDateForAPI(selectedDate),
      startTime: startTime,
      endTime: endTime,
    };

    // console.log("------req-------------",req)

    try {
      setIsLoading(true);

      const response = await ApiRequest({
        BASEURL: ApiRoutes.rescheduleAppointment,
        method: 'POST',
        req: req,
        token: token,
      });

      const resData = await decryptData(response.data);

      if (resData?.code === 200 || resData?.code === 201) {
        showSuccessToast('Success', resData?.message);
        navigation.goBack();
      } else {
        showErrorToast('Failed', resData?.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Bank Details Update Error:', error?.message || error);
      showErrorToast('Failed', error?.message || 'Error updating bank details');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderCompt title={'Reschedule Appointment'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        {/* --- Salutation and Full Name --- */}
        <View style={styles.row}>
          <CustomPicker
            label="Salutation"
            items={salutationItems}
            selectedValue={doctor.salutation}
            // onValueChange={itemValue =>
            //   setDoctor({...doctor, salutation: itemValue})
            // }
            style={{flex: 0.4}}
            disabled={true}
          />
          <InputCompt
            label="Full Name"
            value={doctor.fullName}
            onChangeText={text => setDoctor({...doctor, fullName: text})}
            style={{flex: 0.6, marginTop: 0}}
            editable={false}
          />
        </View>

        <InputCompt
          label="Contact"
          value={doctor.contact}
          onChangeText={text => setDoctor({...doctor, contact: text})}
          style={{marginTop: 0}}
          editable={false}
        />

        {/* --- Date Picker Field --- */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.pickerBox}
            onPress={() => setShowDatePicker(true)}>
            <Text style={styles.pickerText}>
              {formatDateForUI(selectedDate)}
            </Text>
            <Icon name="calendar-today" size={22} color={Colors.GRAY} />
          </TouchableOpacity>
        </View>

        {/* --- Start and End Time Fields --- */}
        <View style={styles.row}>
          {/* Start Time */}
          <View style={[styles.inputContainer, {flex: 1}]}>
            <Text style={styles.label}>Start Time</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.pickerBox}
              onPress={() => openTimePicker('start')}>
              <Text style={styles.pickerText}>{startTime}</Text>
              <Icon name="access-time" size={22} color={Colors.GRAY} />
            </TouchableOpacity>
          </View>

          {/* End Time */}
          <View style={[styles.inputContainer, {flex: 1}]}>
            <Text style={styles.label}>End Time</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.pickerBox}
              onPress={() => openTimePicker('end')}>
              <Text style={styles.pickerText}>{endTime}</Text>
              <Icon name="access-time" size={22} color={Colors.GRAY} />
            </TouchableOpacity>
          </View>
        </View>
        {/* <Text style={styles.headerTitle}>
          Your Available Slots for the Next 2 Days -
        </Text> */}
        {/* {slotsData.map((dayData, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dateText}>{dayData.date}</Text>
            <View style={styles.dayRow}>
              <Text style={styles.dayOfWeekText}>{dayData.dayOfWeek} -</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {dayData?.slots?.map(slot => (
                  <TouchableOpacity
                    key={slot.id}
                    style={[
                      styles.slotButton,
                      // Agar yeh slot selected hai, toh selected style apply karein
                      selectedSlot?.id === slot?.id && styles.slotButtonSelected,
                    ]}
                    onPress={() => onSlotSelect(slot)}>
                    <Text
                      style={[
                        styles.slotText,
                        selectedSlot?.id === slot?.id && styles.slotTextSelected,
                      ]}>
                      {slot.startTime}
                    </Text>
                    <Icon
                      name="arrow-right"
                      size={16}
                      color={selectedSlot?.id === slot.id ? '#fff' : '#6c757d'}
                    />
                    <Text
                      style={[
                        styles.slotText,
                        selectedSlot?.id === slot.id && styles.slotTextSelected,
                      ]}>
                      {slot.endTime}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        ))} */}
        <ButtonCompt
          title={'Reschedule '}
          isLoading={isLoading}
          onPress={handleSubmit}
        />
      </ScrollView>

      {/* --- A SINGLE, REUSABLE TimePickerModal --- */}
      <TimePickerModal
        visible={isTimePickerVisible}
        onClose={() => setTimePickerVisible(false)}
        onTimeSelect={handleTimeSelected}
        // Dynamically set the initial time based on which button was pressed
        initialTime={pickerFor === 'start' ? startTime : endTime}
      />

      {/* --- Date Picker Modal --- */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </SafeAreaView>
  );
};

export default RescheduleAppointmentScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  container: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 10,
    marginTop: 5,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 8,
    color: Colors.BLACK,
    fontSize: 14,
    fontFamily: Fonts.PoppinsSemiBold,
    opacity: 0.8,
  },
  pickerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    height: 50,
  },
  pickerText: {
    fontSize: 14,
    color: '#000',
    fontFamily: Fonts.PoppinsRegular,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: Fonts.PoppinsMedium,
    color: '#343a40',
    marginBottom: 20,
  },
  dayContainer: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    fontFamily: Fonts.PoppinsSemiBold,
    color: '#212529',
    marginBottom: 8,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayOfWeekText: {
    fontSize: 15,
    fontFamily: Fonts.PoppinsRegular,
    color: '#6c757d',
    marginRight: 10,
  },
  slotButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  slotButtonSelected: {
    backgroundColor: '#17a2b8', // Teal color jaisa image mein hai
    borderColor: '#17a2b8',
  },
  slotText: {
    fontSize: 14,
    fontFamily: Fonts.PoppinsRegular,
    color: '#495057',
  },
  slotTextSelected: {
    color: Colors.WHITE,
    fontFamily: Fonts.PoppinsMedium,
  },
});
