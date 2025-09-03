import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fonts from '../../theme/Fonts';
import {Colors} from '../../theme/Colors';
import {
  formatDate,
  showErrorToast,
  showSuccessToast,
} from '../../utils/HelperFuntions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiRoutes} from '../../utils/ApiRoutes';
import ApiRequest from '../../network/ApiRequest';
import {decryptData} from '../../utils/encryptionUtils';

const DateRangeModal = ({visible, onClose, onDone}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async values => {
    const token = await AsyncStorage.getItem('userToken');

    const req = {
      startDate: formatDateForAPI(startDate),
      endDate: formatDateForAPI(endDate),
    };

    try {
      setIsLoading(true);

      const response = await ApiRequest({
        BASEURL: ApiRoutes.pauseSlot,
        method: 'POST',
        req: req,
        token: token,
      });

      const resData = await decryptData(response.data);

      console.log('------------resData-------', resData);

      if (resData?.code === 200 || resData?.code === 201) {
        showSuccessToast('Success', resData?.message);
        onClose();
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

  const formatDateForAPI = date => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  console.log(
    '-----------startDate---------------',
    formatDateForAPI(startDate),
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Select Date Range</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Date pickers */}
          <View style={styles.row}>
            <View style={styles.dateBox}>
              <Text style={styles.label}>Start Date</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowStartPicker(true)}>
                <Text
                  style={{
                    fontFamily: Fonts.PoppinsRegular,
                    color: Colors.BLACK,
                  }}>
                  {formatDate(startDate)}
                </Text>
              </TouchableOpacity>
              {showStartPicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'inline' : 'default'}
                  onChange={(e, date) => {
                    setShowStartPicker(false);
                    if (date) setStartDate(date);
                  }}
                />
              )}
            </View>

            <View style={styles.dateBox}>
              <Text style={styles.label}>End Date</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowEndPicker(true)}>
                <Text
                  style={{
                    fontFamily: Fonts.PoppinsRegular,
                    color: Colors.BLACK,
                  }}>
                  {formatDate(endDate)}
                </Text>
              </TouchableOpacity>
              {showEndPicker && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'inline' : 'default'}
                  onChange={(e, date) => {
                    setShowEndPicker(false);
                    if (date) setEndDate(date);
                  }}
                />
              )}
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={{color: '#333', fontFamily: Fonts.PoppinsMedium}}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.doneBtn}
              //   onPress={() => onDone(startDate, endDate)}
              onPress={handleSubmit}>
              {isLoading ? (
                <ActivityIndicator size={'small'} color={Colors.WHITE} />
              ) : (
                <Text
                  style={{
                    color: Colors.WHITE,
                    fontFamily: Fonts.PoppinsMedium,
                    textAlign: 'center',
                  }}>
                  Done
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DateRangeModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {fontSize: 16, fontFamily: Fonts.PoppinsMedium, color: Colors.BLACK},
  closeBtn: {fontSize: 18, color: '#333'},
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  dateBox: {flex: 1, marginHorizontal: 5},
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: Fonts.PoppinsMedium,
    color: Colors.BLACK,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.APPCOLOR,
  },
  doneBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.APPCOLOR,
    width: 100,
  },
});
