 

import React, { memo } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Fonts from '../../theme/Fonts';
import {Colors} from '../../theme/Colors';

const statusColors = {
  Confirmed: '#4CAF50', // Green
  Pending: '#FFC107', // Yellow
  Rescheduled: '#FF9800', // Orange
  Cancelled: '#F44336', // Red
};

const formatDateIndian = dateString => {
  if (!dateString) return '';

  const dateObj = new Date(dateString);

  let day = dateObj.getDate();
  let month = dateObj.getMonth() + 1; // Months are 0-based
  let year = dateObj.getFullYear();

  // Add leading zeros if needed
  day = day < 10 ? `0${day}` : day;
  month = month < 10 ? `0${month}` : month;

  return `${day}/${month}/${year}`;
  // Example: "30/06/2025"
};

const AppointmentCard = ({item}) => {
  return (
    <View style={styles.card}>
      {/* Date & Mode */}
      <View style={styles.row}>
        <Text style={styles.date}>{formatDateIndian(item.date)}</Text>
        <Text
          style={[
            styles.mode,
            {color: item.mode === 'online' ? '#2196F3' : '#9C27B0'},
          ]}>
          {item.mode.toUpperCase()}
        </Text>
      </View>
      {/*  name */}
      <Text style={styles.time}>
        <Text
          style={[
            styles.time,
            {
              color: Colors.BLACK,
              fontFamily: Fonts.PoppinsSemiBold,
              fontSize: 16,
            },
          ]}>
          Patient name :
        </Text>{' '}
        {item?.patientId?.name}
      </Text>
      {/* Time */}
      <Text style={styles.time}>
        <Text
          style={[
            styles.time,
            {
              color: Colors.BLACK,
              fontFamily: Fonts.PoppinsSemiBold,
              fontSize: 16,
            },
          ]}>
          Time :
        </Text>{' '}
        {item.startTime}
        {/* - {item.endTime} */}
      </Text>

      {/* Type */}
      {/* <Text style={styles.type}>{item.type}</Text> */}

      <Text style={styles.type}>
        <Text
          style={[
            styles.time,
            {
              color: Colors.BLACK,
              fontFamily: Fonts.PoppinsSemiBold,
              fontSize: 16,
            },
          ]}>
          Phone no. :
        </Text>{' '}
        {item?.patientId?.contact}
      </Text>

      {/* Status */}
      <View style={styles.statusContainer}>
        <Text
          style={[
            styles.status,
            {backgroundColor: statusColors[item.status] || '#607D8B'},
          ]}>
          {item.status}
        </Text>
      </View>
    </View>
  );
};

export default memo(AppointmentCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 16,
    fontFamily: Fonts.PoppinsMedium,
    color: Colors.BLACK,
  },
  mode: {
    fontSize: 14,
    fontFamily: Fonts.PoppinsRegular,
  },
  time: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
    fontFamily: Fonts.PoppinsRegular,
    textTransform:"capitalize"
  },
  type: {
    fontSize: 14,
    marginTop: 4,
    color: '#757575',
    fontFamily: Fonts.PoppinsRegular,
    textTransform: 'capitalize',
  },
  statusContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  status: {
    fontSize: 12,
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontFamily: Fonts.PoppinsMedium,
  },
});
