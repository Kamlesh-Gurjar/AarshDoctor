// // src/screens/SlotsScreen.js
// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   FlatList,
//   SafeAreaView,
// } from 'react-native';
// import MaterialIcons from '@react-native-vector-icons/material-icons';
// import {Colors} from '../../../theme/Colors';
// import Fonts from '../../../theme/Fonts';
// import {HeaderCompt} from '../../../components';

// const ClinicCard = ({clinicName, slots}) => (
//   <View style={styles.card}>
//     <View style={styles.cardHeader}>
//       <Text style={styles.clinicName}>{clinicName}</Text>
//       <View style={styles.icons}>
//         <TouchableOpacity>
//           <MaterialIcons name="edit" size={24} color="#3498db" />
//         </TouchableOpacity>
//         <TouchableOpacity style={{marginLeft: 15}}>
//           <MaterialIcons name="delete" size={24} color="#e74c3c" />
//         </TouchableOpacity>
//       </View>
//     </View>
//     <View style={styles.slotsContainer}>
//       {Object.entries(slots).map(([day, timeSlots]) => (
//         <View key={day} style={styles.dayContainer}>
//           <Text style={styles.dayText}>{day.toUpperCase()}</Text>
//           {timeSlots.length > 0 ? (
//             timeSlots.map((slot, index) => (
//               <Text key={index} style={styles.slotText}>
//                 {slot}
//               </Text>
//             ))
//           ) : (
//             <Text style={styles.noSlotText}>-</Text>
//           )}
//         </View>
//       ))}
//     </View>
//   </View>
// );

// const renderItem = ({item}) => (
//   <ClinicCard clinicName={item?.name} slots={item?.slots} />
// );

// const SlotsScreen = () => {
//   const clinics = [
//     {
//       name: 'Motherhood Hospital',
//       slots: {
//         Monday: [],
//         Tuesday: ['07:00 AM → 07:15 AM'],
//         Wednesday: [],
//         Thursday: [],
//         Friday: [],
//         Saturday: [],
//         Sunday: [],
//       },
//     },
//     {
//       name: 'Pranshu Surgical And Maternity Center',
//       slots: {
//         Monday: ['07:00 AM → 07:45 AM', '10:00 AM → 10:45 AM'],
//         Tuesday: [],
//         Wednesday: ['10:45 AM → 11:00 AM'],
//         Thursday: [],
//         Friday: [],
//         Saturday: [],
//         Sunday: [],
//       },
//     },
//   ];

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <HeaderCompt title={'Slotes'} />
//       <ScrollView style={styles.container}>
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>Your Slots</Text>
//           <TouchableOpacity style={styles.addButton}>
//             <MaterialIcons name="add" size={24} color="#fff" />
//             <Text style={styles.addButtonText}>Add Slots</Text>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={clinics}
//           keyExtractor={(item, index) =>
//             item.id?.toString() || index.toString()
//           } // Use unique id if available
//           renderItem={renderItem}
//           initialNumToRender={10} // Renders only a few items at first for performance
//           maxToRenderPerBatch={10} // Limits items rendered per batch
//           windowSize={5} // Number of screens worth of content to render
//           removeClippedSubviews={true} // Unmounts off-screen items
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{paddingBottom: 100}}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.WHITE,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//   },
//   headerTitle: {
//     fontSize: 20,
//     color: Colors.BLACK,
//     fontFamily: Fonts.PoppinsMedium,
//   },
//   addButton: {
//     flexDirection: 'row',
//     backgroundColor: Colors.APPCOLOR,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 100,
//     alignItems: 'center',
//   },
//   addButtonText: {
//     color: Colors.WHITE,
//     marginLeft: 5,
//   },
//   card: {
//     backgroundColor: Colors.WHITE,
//     borderRadius: 10,
//     padding: 15,
//     marginHorizontal: 20,
//     marginBottom: 20,
//     shadowColor: Colors.BLACK,
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderBottomWidth: 0.5,
//     borderBottomColor: Colors.GRAY,
//     paddingBottom: 10,
//   },
//   clinicName: {
//     fontSize: 16,
//     color: Colors.BLACK,
//     flex: 1,
//     fontFamily: Fonts.PoppinsMedium,
//     marginRight: 4,
//   },
//   icons: {
//     flexDirection: 'row',
//   },
//   slotsContainer: {
//     paddingTop: 10,
//   },
//   dayContainer: {
//     marginBottom: 5,
//   },
//   dayText: {
//     fontSize: 14,
//     color: Colors.BLACK,
//     // marginBottom: 5,
//     fontFamily: Fonts.PoppinsMedium,
//   },
//   slotText: {
//     fontSize: 14,
//     color: Colors.BLACK,
//     fontFamily: Fonts.PoppinsRegular,
//   },
//   noSlotText: {
//     fontSize: 14,
//     color: Colors.BLACK,
//     fontFamily: Fonts.PoppinsRegular,
//   },
// });

// export default SlotsScreen;

// src/screens/SlotsScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {Colors} from '../../../theme/Colors';
import Fonts from '../../../theme/Fonts';
import {HeaderCompt} from '../../../components';
import {useNavigation} from '@react-navigation/native';

const ClinicCard = ({clinicName, slots}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.clinicName}>{clinicName}</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => navigation.navigate('EditSlots')}>
            <MaterialIcons name="edit" size={24} color="#3498db" />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 15}}>
            <MaterialIcons name="delete" size={24} color="#e74c3c" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.slotsContainer}>
        {Object.entries(slots).map(([day, timeSlots]) => (
          <View key={day} style={styles.dayContainer}>
            <Text style={styles.dayText}>{day.toUpperCase()}</Text>
            {timeSlots.length > 0 ? (
              timeSlots.map((slot, index) => (
                <Text key={index} style={styles.slotText}>
                  {slot}
                </Text>
              ))
            ) : (
              <Text style={styles.noSlotText}>-</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const renderItem = ({item}) => (
  <ClinicCard clinicName={item?.name} slots={item?.slots} />
);

// A reusable component to display the list of slots
const SlotsList = ({title, clinics}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={clinics}
        keyExtractor={(item, index) => item.name + index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddSlots')}
              style={styles.addButton}>
              <MaterialIcons name="add" size={24} color="#fff" />
              <Text style={styles.addButtonText}>Add Slots</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const SlotsScreen = () => {
  const [activeTab, setActiveTab] = useState('Offline'); // 'Offline' or 'Online'
  const navigation = useNavigation();
  const offlineClinics = [
    {
      name: 'Motherhood Hospital',
      slots: {
        Monday: [],
        Tuesday: ['07:00 AM → 07:15 AM'],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      },
    },
    {
      name: 'Pranshu Surgical And Maternity Center',
      slots: {
        Monday: ['07:00 AM → 07:45 AM', '10:00 AM → 10:45 AM'],
        Tuesday: [],
        Wednesday: ['10:45 AM → 11:00 AM'],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      },
    },
  ];

  const onlineClinics = [
    {
      name: 'Online Clinic A',
      slots: {
        Monday: ['09:00 AM → 09:30 AM'],
        Tuesday: [],
        Wednesday: ['02:00 PM → 02:30 PM'],
        Thursday: [],
        Friday: ['11:00 AM → 11:30 AM'],
        Saturday: [],
        Sunday: [],
      },
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderCompt title={'Slotes'} />
      <View style={styles.container}>
        {/* Custom Tab Bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setActiveTab('Offline')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Offline' && styles.activeTabText,
              ]}>
              Offline Slotes
            </Text>
            {activeTab === 'Offline' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setActiveTab('Online')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Online' && styles.activeTabText,
              ]}>
              Online Slotes
            </Text>
            {activeTab === 'Online' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        </View>

        {/* Conditional Content */}
        {activeTab === 'Offline' ? (
          <SlotsList title="Your Offline Slots" clinics={offlineClinics} />
        ) : (
          <SlotsList title="Your Online Slots" clinics={onlineClinics} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  container: {
    flex: 1,
  },
  // Custom Tab Bar Styles
  tabBar: {
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_LIGHT, // Use a light gray
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 14,
    fontFamily: Fonts.PoppinsMedium,
    color: Colors.GRAY,
  },
  activeTabText: {
    color: Colors.APPCOLOR,
  },
  activeIndicator: {
    height: 2,
    width: '100%',
    backgroundColor: Colors.APPCOLOR,
    position: 'absolute',
    bottom: 0,
  },
  // List Styles
  listContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsMedium,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: Colors.APPCOLOR,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 100,
    alignItems: 'center',
  },
  addButtonText: {
    color: Colors.WHITE,
    marginLeft: 5,
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: Colors.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.GRAY,
    paddingBottom: 10,
  },
  clinicName: {
    fontSize: 16,
    color: Colors.BLACK,
    flex: 1,
    fontFamily: Fonts.PoppinsMedium,
    marginRight: 4,
  },
  icons: {
    flexDirection: 'row',
  },
  slotsContainer: {
    paddingTop: 10,
  },
  dayContainer: {
    marginBottom: 5,
  },
  dayText: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsMedium,
  },
  slotText: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsRegular,
  },
  noSlotText: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsRegular,
  },
});

export default SlotsScreen;
