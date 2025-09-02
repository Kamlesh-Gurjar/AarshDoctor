// import React, {memo, useState} from 'react';
// import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import Fonts from '../../theme/Fonts';
// import {Colors} from '../../theme/Colors';
// import Icon from '@react-native-vector-icons/material-icons';
// import {useNavigation} from '@react-navigation/native';

// const statusColors = {
//   Confirmed: '#4CAF50', // Green
//   Pending: '#FFC107', // Yellow
//   Rescheduled: '#FF9800', // Orange
//   Cancelled: '#F44336', // Red
//   Completed: '#4CAF50', // Green
// };

// const formatDateIndian = dateString => {
//   if (!dateString) return '';

//   const dateObj = new Date(dateString);

//   let day = dateObj.getDate();
//   let month = dateObj.getMonth() + 1; // Months are 0-based
//   let year = dateObj.getFullYear();

//   // Add leading zeros if needed
//   day = day < 10 ? `0${day}` : day;
//   month = month < 10 ? `0${month}` : month;

//   return `${day}/${month}/${year}`;
//   // Example: "30/06/2025"
// };

// const AppointmentCard = ({item, setActiveCardId, activeCardId}) => {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.card}>
//       {/* Date & Mode */}
//       <View style={styles.row}>
//         <Text style={styles.date}>
//           {'Date : ' + formatDateIndian(item.date)}
//         </Text>
//         {/* <Text
//           style={[
//             styles.mode,
//             {color: item.mode === 'online' ? '#2196F3' : '#9C27B0'},
//           ]}>
//           {item.mode.toUpperCase()}
//         </Text> */}
//         {/* <TouchableOpacity
//           onPress={() => setShowPopup(!showPopup)}
//           style={{padding: 4}}>
//           <Icon name={'more-vert'} size={24} color={Colors.BLACK} />
//         </TouchableOpacity> */}
//         <TouchableOpacity
//           onPress={() =>
//             setActiveCardId(activeCardId === item._id ? null : item._id)
//           }>
//           <Icon name={'more-vert'} size={24} />
//         </TouchableOpacity>
//       </View>
//       {/*  name */}
//       <Text style={styles.time}>
//         <Text
//           style={[
//             styles.time,
//             {
//               color: Colors.BLACK,
//               fontFamily: Fonts.PoppinsSemiBold,
//               fontSize: 16,
//             },
//           ]}>
//           Patient name :
//         </Text>{' '}
//         {item?.patientId?.name}
//       </Text>
//       {/* Time */}
//       <Text style={styles.time}>
//         <Text
//           style={[
//             styles.time,
//             {
//               color: Colors.BLACK,
//               fontFamily: Fonts.PoppinsSemiBold,
//               fontSize: 16,
//             },
//           ]}>
//           Time :
//         </Text>{' '}
//         {item.startTime}
//         {/* - {item.endTime} */}
//       </Text>

//       {/* Type */}
//       {/* <Text style={styles.type}>{item.type}</Text> */}

//       <Text style={styles.type}>
//         <Text
//           style={[
//             styles.time,
//             {
//               color: Colors.BLACK,
//               fontFamily: Fonts.PoppinsSemiBold,
//               fontSize: 16,
//             },
//           ]}>
//           Phone no. :
//         </Text>{' '}
//         {item?.patientId?.contact}
//       </Text>

//       {/* Status */}
//       <View style={styles.statusContainer}>
//         <Text
//           style={[
//             styles.status,
//             {backgroundColor: statusColors[item.status] || '#607D8B'},
//           ]}>
//           {item.status}
//         </Text>
//         <Text
//           style={[
//             styles.mode,
//             {color: item.mode === 'online' ? '#2196F3' : '#9C27B0'},
//           ]}>
//           {item.mode.toUpperCase()}
//         </Text>
//       </View>

//       {/* Popup View */}
//       {activeCardId === item._id && (
//         <View
//           style={{
//             padding: 4,
//             backgroundColor: Colors.WHITE,
//             position: 'absolute',
//             right: 25,
//             top: 40,
//             borderRadius: 5,
//             shadowColor: '#000',
//             shadowOffset: {
//               width: 0,
//               height: 2,
//             },
//             shadowOpacity: 0.25,
//             shadowRadius: 3.84,

//             elevation: 5,
//           }}>
//           <TouchableOpacity
//             style={{padding: 5}}
//             onPress={() => navigation.navigate('AddPrescription')}>
//             <Text
//               style={{
//                 color: Colors.BLACK,
//                 fontSize: 12,
//                 fontFamily: Fonts.PoppinsRegular,
//               }}>
//               Add Prescription
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{padding: 5}}
//             onPress={() => navigation.navigate('RescheduleAppointment')}>
//             <Text
//               style={{
//                 color: Colors.BLACK,
//                 fontSize: 12,
//                 fontFamily: Fonts.PoppinsRegular,
//               }}>
//               Reschedule Appointment
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// export default memo(AppointmentCard);

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: Colors.WHITE,
//     borderRadius: 12,
//     padding: 15,
//     marginVertical: 8,
//     marginHorizontal: 10,
//     shadowColor: Colors.BLACK,
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   date: {
//     fontSize: 16,
//     fontFamily: Fonts.PoppinsMedium,
//     color: Colors.BLACK,
//   },
//   mode: {
//     fontSize: 14,
//     fontFamily: Fonts.PoppinsRegular,
//   },
//   time: {
//     marginTop: 5,
//     fontSize: 14,
//     color: Colors.BLACK,
//     fontFamily: Fonts.PoppinsRegular,
//     textTransform: 'capitalize',
//     opacity: 0.8,
//   },
//   type: {
//     fontSize: 14,
//     marginTop: 4,
//     color: '#757575',
//     fontFamily: Fonts.PoppinsRegular,
//     textTransform: 'capitalize',
//   },
//   statusContainer: {
//     marginTop: 10,
//     alignItems: 'flex-start',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   status: {
//     fontSize: 12,
//     color: Colors.WHITE,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 6,
//     fontFamily: Fonts.PoppinsMedium,
//   },
// });

import React, {memo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';
import Icon from '@react-native-vector-icons/material-icons'; // Assuming you have this icon library
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../theme/Colors';
import LabModal from '../common/LabModal';

const statusColors = {
  Confirmed: '#4CAF50', // Green
  confirm: '#4CAF50', // Green
  Pending: '#FFC107', // Yellow
  Rescheduled: '#FF9800', // Orange
  Cancelled: '#F44336', // Red
  Completed: '#4CAF50', // Green
};

// const formatDateIndian = dateString => {
//   if (!dateString) return '';

//   const dateObj = new Date(dateString);

//   let day = dateObj.getDate();
//   let month = dateObj.getMonth() + 1; // Months are 0-based
//   let year = dateObj.getFullYear();

//   // Add leading zeros if needed
//   day = day < 10 ? `0${day}` : day;
//   month = month < 10 ? `0${month}` : month;

//   return `${day}/${month}/${year}`;
// };

const formatDateIndian = dateString => {
  if (!dateString) return '';

  const dateObj = new Date(dateString);

  let day = dateObj.getDate();
  let monthIndex = dateObj.getMonth(); // 0-based
  let year = dateObj.getFullYear();

  // Month names array
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Add leading zero to day if needed
  day = day < 10 ? `0${day}` : day;

  return `${day} ${months[monthIndex]}, ${year}`;
};

const AppointmentCard = ({item, setActiveCardId, activeCardId}) => {
  const navigation = useNavigation();
  const isCardActive = activeCardId === item._id;
  const [isVisible, setIsVisible] = useState(false);

  const handleSelectLab = lab => {
    console.log('Selected Lab:', lab);
    setIsVisible(!isVisible); // close after selecting
  };

  return (
    <View style={styles.card}>
      {/* Date & More Options */}
      <View style={styles.headerRow}>
        <View style={styles.headerInfo}>
          <Icon name="calendar-today" size={16} color={Colors.TEXT_DARK} />
          <Text style={styles.date}>{formatDateIndian(item.date)}</Text>
        </View>
        <TouchableOpacity
          onPress={() => setActiveCardId(isCardActive ? null : item._id)}
          style={styles.moreIconTouch}>
          <Icon name={'more-vert'} size={24} color={Colors.TEXT_DARK} />
        </TouchableOpacity>
      </View>

      {/* Patient Name */}
      <View style={styles.detailRow}>
        <Icon name="person-outline" size={18} color={Colors.TEXT_MEDIUM} />
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Patient name :</Text>{' '}
          {item?.patientId?.name || 'N/A'}
        </Text>
      </View>

      {/* Phone Number */}
      <View style={styles.detailRow}>
        <Icon name="phone" size={18} color={Colors.TEXT_MEDIUM} />
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Phone no. :</Text>{' '}
          {item?.patientId?.contact || 'N/A'}
        </Text>
      </View>

      {/* Time */}
      <View style={[styles.detailRow, {justifyContent: 'space-between'}]}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="schedule" size={18} color={Colors.TEXT_MEDIUM} />
          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Time :</Text>{' '}
            {item.startTime || 'N/A'}
          </Text>
        </View>
        {item?.hostUrl && (
          <Pressable
            onPress={() => {
              navigation.navigate('Meeting', {roomUrl: item?.hostUrl});
            }}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: Colors.APPCOLOR,
              borderRadius: 20,
            }}>
            <Text
              style={{color: Colors.WHITE, fontFamily: Fonts.PoppinsMedium}}>
              Join Now
            </Text>
          </Pressable>
        )}
      </View>

      {/* Status & Mode */}
      <View style={styles.footerRow}>
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: statusColors[item.status] || Colors.GRAY_MEDIUM},
          ]}>
          <Icon
            name="info-outline"
            size={12}
            color={Colors.WHITE}
            style={styles.statusIcon}
          />
          <Text style={styles.statusText}>{item.status || 'Unknown'}</Text>
        </View>
        <View style={styles.modeContainer}>
          <View
            style={[
              styles.modeDot,
              {
                backgroundColor:
                  item.mode === 'online' ? Colors.BLUE : Colors.PURPLE,
              },
            ]}
          />
          <Text
            style={[
              styles.modeText,
              {color: item.mode === 'online' ? Colors.BLUE : Colors.PURPLE},
            ]}>
            {(item.mode || 'N/A').toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Popup View */}
      {isCardActive && (
        <View style={styles.popup}>
          <TouchableOpacity
            style={styles.popupOption}
            onPress={() => {
              setActiveCardId(null); // Close popup
              navigation.navigate('AddPrescription');
            }}>
            <Icon name="description" size={16} color={Colors.TEXT_DARK} />
            <Text style={styles.popupText}>Add Prescription</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.popupOption}
            onPress={() => {
              setActiveCardId(null); // Close popup
              navigation.navigate('RescheduleAppointment', {item: item});
            }}>
            <Icon name="event-note" size={16} color={Colors.TEXT_DARK} />
            <Text style={styles.popupText}>Reschedule Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.popupOption}
            // onPress={() => {
            //   setActiveCardId(null); // Close popup
            //   navigation.navigate('RescheduleAppointment', {item: item});
            // }}
            onPress={() => setIsVisible(!isVisible)}>
            <Icon name="send" size={16} color={Colors.TEXT_DARK} />
            <Text style={styles.popupText}>Refer to Lab</Text>
          </TouchableOpacity>
        </View>
      )}

      {isVisible && (
        <LabModal
          isVisible={isVisible}
          onClose={() => setIsVisible(!isVisible)}
          onSelect={handleSelectLab}
        />
      )}
    </View>
  );
};

export default memo(AppointmentCard);

// const Colors = {
//   PRIMARY: '#2196F3',
//   ACCENT: '#FFC107',
//   WHITE: '#FFFFFF',
//   BLACK: '#000000',
//   TEXT_DARK: '#333333',
//   TEXT_MEDIUM: '#666666',
//   TEXT_LIGHT: '#999999',
//   BORDER: '#E0E0E0',
//   BACKGROUND_LIGHT: '#F8F8F8',
//   BLUE: '#2196F3',
//   PURPLE: '#9C27B0',
//   GREEN: '#4CAF50',
//   YELLOW: '#FFC107',
//   ORANGE: '#FF9800',
//   RED: '#F44336',
//   GRAY_MEDIUM: '#9E9E9E',
// };

const Fonts = {
  PoppinsRegular: 'Poppins-Regular',
  PoppinsMedium: 'Poppins-Medium',
  PoppinsSemiBold: 'Poppins-SemiBold',
  PoppinsBold: 'Poppins-Bold',
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    position: 'relative', // For absolute positioning of popup
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 17,
    fontFamily: Fonts.PoppinsSemiBold,
    color: Colors.TEXT_DARK,
    marginLeft: 8,
  },
  moreIconTouch: {
    padding: 5, // Make touch area larger
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 15,
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.TEXT_DARK,
    marginLeft: 10,
    flexShrink: 1, // Allow text to wrap
  },
  detailLabel: {
    fontFamily: Fonts.PoppinsMedium,
    color: Colors.TEXT_MEDIUM,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.BORDER,
    paddingTop: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    minWidth: 90, // Ensure minimum width for consistency
    justifyContent: 'center',
  },
  statusIcon: {
    marginRight: 5,
  },
  statusText: {
    fontSize: 13,
    color: Colors.WHITE,
    fontFamily: Fonts.PoppinsMedium,
  },
  modeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  modeText: {
    fontSize: 13,
    fontFamily: Fonts.PoppinsMedium,
  },
  popup: {
    position: 'absolute',
    top: 45, // Adjust as needed to align with the more icon
    right: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 10, // Ensure popup is above other elements
    minWidth: 180,
  },
  // popupOption: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingVertical: 12,
  //   paddingHorizontal: 15,
  //   borderBottomWidth: 0.5,
  //   borderBottomColor: Colors.BORDER,
  // },
  popupOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  popupText: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.TEXT_DARK,
  },
});
