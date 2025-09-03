// import React, {useCallback, useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   SafeAreaView,
//   ActivityIndicator,
// } from 'react-native';
// import MaterialIcons from '@react-native-vector-icons/material-icons';
// import {Colors} from '../../../theme/Colors';
// import Fonts from '../../../theme/Fonts';
// import {ClinicCard, HeaderCompt} from '../../../components';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import styles from './styles.slotes';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ApiRequest from '../../../network/ApiRequest';
// import {ApiRoutes} from '../../../utils/ApiRoutes';
// import {decryptData} from '../../../utils/encryptionUtils';
// // import {it} from '@jest/globals';

// // const ClinicCard = ({clinicName, slots}) => {
// //   const navigation = useNavigation();

// //   return (
// //     <View style={styles.card}>
// //       <View style={styles.cardHeader}>
// //         <Text style={styles.clinicName}>{clinicName}</Text>
// //         <View style={styles.icons}>
// //           <TouchableOpacity onPress={() => navigation.navigate('EditSlots')}>
// //             <MaterialIcons name="edit" size={24} color="#3498db" />
// //           </TouchableOpacity>
// //           <TouchableOpacity style={{marginLeft: 15}}>
// //             <MaterialIcons name="delete" size={24} color="#e74c3c" />
// //           </TouchableOpacity>
// //         </View>
// //       </View>
// //       <View style={styles.slotsContainer}>
// //         <FlatList
// //           data={slots}
// //           renderItem={({item}) => {
// //             // console.log('--------itemmain-------', item);
// //             return (
// //               <View style={styles.dayContainer}>
// //                 <Text style={styles.dayText}>{item?.dayOfWeek}</Text>
// //                 {item?.slots?.length > 0 ? (
// //                   item?.slots?.map((item, index) => (
// //                     <Text style={styles.slotText}>
// //                       {item?.startTime} → {item?.endTime}
// //                     </Text>
// //                   ))
// //                 ) : (
// //                   <Text style={styles.noSlotText}>-</Text>
// //                 )}
// //               </View>
// //             );
// //           }}
// //         />
// //       </View>
// //     </View>
// //   );
// // };

// const renderItem = ({item}) => {
//   // console.log('------item--11------------', JSON.stringify(item));

//   return (
//     <ClinicCard clinicName={item?.clinicName} slots={item?.slot?.slotsByDay} />
//   );
// };

// // A reusable component to display the list of slots
// const SlotsList = ({title, clinics}) => {
//   // console.log('-- ---------------', JSON.stringify(clinics));
//   const navigation = useNavigation();
//   return (
//     <View style={styles.listContainer}>
//       <FlatList
//         data={clinics}
//         keyExtractor={(item, index) => item?.name + index?.toString()}
//         renderItem={renderItem}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{paddingBottom: 100}}
//         ListHeaderComponent={
//           <View style={styles.header}>
//             <Text style={styles.headerTitle}>{title}</Text>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('AddSlots')}
//               style={styles.addButton}>
//               <MaterialIcons name="add" size={24} color={Colors.APPCOLOR} />
//               <Text style={styles.addButtonText}>Add Slots</Text>
//             </TouchableOpacity>
//           </View>
//         }
//         ListEmptyComponent={() => (
//           <Text style={{color: Colors.BLACK}}>No Slots Found.</Text>
//         )}
//       />
//     </View>
//   );
// };

// const SlotsScreen = () => {
//   const [activeTab, setActiveTab] = useState('Offline');
//   const navigation = useNavigation();
//   const [offlineClinics, setOfflineClinics] = useState([]);
//   const [onlineClinics, setOnlineClinics] = useState([]);

//   const [isLoading, setIsLoading] = useState(false);
//   const [isOnlineLoading, setIsOnlineLoading] = useState(false);

//   const getAllOfflineSlotes = async () => {
//     const token = await AsyncStorage.getItem('userToken');
//     try {
//       setIsLoading(true);
//       const response = await ApiRequest({
//         BASEURL: ApiRoutes.getAllOfflineSlotes,
//         method: 'POST',
//         token: token,
//       });

//       const decrypted = decryptData(response.data);
//       console.log(
//         '----getAllOfflineSlotes-------',
//         JSON.stringify(decrypted?.data),
//       );
//       if (response.status === 200 || response.status === 201) {
//         setIsLoading(false);

//         setOfflineClinics(decrypted?.data || []);
//       } else {
//         setIsLoading(false);

//         console.error('Server error:', decrypted?.message);
//       }
//     } catch (error) {
//       console.error('Fetch Error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getAllOnlineSlotes = async id => {
//     const token = await AsyncStorage.getItem('userToken');
//     try {
//       setIsOnlineLoading(true);
//       const response = await ApiRequest({
//         BASEURL: ApiRoutes.getAllOnlineSlotes,
//         method: 'POST',
//         token: token,
//         req: {doctorId: id},
//       });

//       const decrypted = decryptData(response.data);

//       console.log(
//         '----getAllOnlineSlotes-------',
//         JSON.stringify(decrypted?.data?.slotsByDay),
//       );
//       if (response.status === 200 || response.status === 201) {
//         setOnlineClinics(decrypted?.data?.slotsByDay || []);
//       } else {
//         setIsOnlineLoading(false);

//         console.error('Server error:', decrypted?.message);
//       }
//     } catch (error) {
//       setIsOnlineLoading(false);

//       console.error('Fetch Error:', error);
//     } finally {
//       setIsOnlineLoading(false);
//     }
//   };

//   const getDoctorDetails = async () => {
//     const token = await AsyncStorage.getItem('userToken');
//     try {
//       const response = await ApiRequest({
//         BASEURL: ApiRoutes.getDoctorDetails,
//         method: 'POST',
//         token: token,
//       });

//       const decrypted = decryptData(response?.data);

//       await getAllOnlineSlotes(decrypted?.data?._id);
//     } catch (error) {
//       console.error('Fetch Error:', error);
//     }
//   };

//   useEffect(() => {
//     getDoctorDetails();
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       getAllOfflineSlotes();
//       getAllOnlineSlotes();

//       // Agar cleanup karna hai to return ek function
//       return () => {
//         console.log('Screen unfocused, cleanup here if needed');
//       };
//     }, []),
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <HeaderCompt title={'Slots'} />
//       <View style={styles.container}>
//         {/* Custom Tab Bar */}
//         <View style={styles.tabBar}>
//           <TouchableOpacity
//             style={styles.tabItem}
//             onPress={() => setActiveTab('Offline')}>
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === 'Offline' && styles.activeTabText,
//               ]}>
//               Offline Slots
//             </Text>
//             {activeTab === 'Offline' && <View style={styles.activeIndicator} />}
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.tabItem}
//             onPress={() => setActiveTab('Online')}>
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === 'Online' && styles.activeTabText,
//               ]}>
//               Online Slots
//             </Text>
//             {activeTab === 'Online' && <View style={styles.activeIndicator} />}
//           </TouchableOpacity>
//         </View>

//         {/* Conditional Content */}

//         {activeTab === 'Offline' ? (
//           isLoading ? (
//             <ActivityIndicator size={'large'} style={{flex: 1}} />
//           ) : (
//             <SlotsList title="Your Offline Slots" clinics={offlineClinics} />
//           )
//         ) : activeTab === 'Online' && isOnlineLoading ? (
//           <ActivityIndicator size={'large'} style={{flex: 1}} />
//         ) : (
//           <>
//             <View style={styles.header}>
//               <Text style={styles.headerTitle}>Your Online Slots</Text>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('AddSlots')}
//                 style={styles.addButton}>
//                 <MaterialIcons name="add" size={24} color={Colors.APPCOLOR} />
//                 <Text style={styles.addButtonText}>Add Slots</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.card}>
//               <View style={[styles.icons, {justifyContent: 'flex-end'}]}>
//                 <TouchableOpacity
//                   onPress={() => navigation.navigate('EditSlots')}>
//                   <MaterialIcons name="edit" size={24} color="#3498db" />
//                 </TouchableOpacity>
//                 {/* <TouchableOpacity style={{marginLeft: 15}}>
//                 <MaterialIcons name="delete" size={24} color="#e74c3c" />
//               </TouchableOpacity> */}
//               </View>
//               <FlatList
//                 data={onlineClinics}
//                 keyExtractor={(item, index) => item?._id}
//                 renderItem={({item, index}) => {
//                   return (
//                     <View style={styles.dayContainer}>
//                       <Text style={styles.dayText}>{item?.dayOfWeek}</Text>
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           flexWrap: 'wrap',
//                           justifyContent: 'space-between',
//                         }}>
//                         {item?.slots?.length > 0 ? (
//                           item?.slots?.map((item, index) => (
//                             <Text style={styles.slotText}>
//                               {item?.startTime} → {item?.endTime}
//                             </Text>
//                           ))
//                         ) : (
//                           <Text style={styles.noSlotText}>-</Text>
//                         )}
//                       </View>
//                     </View>
//                   );
//                 }}
//               />
//             </View>
//           </>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default SlotsScreen;

import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {Colors} from '../../../theme/Colors';
import Fonts from '../../../theme/Fonts';
import {ClinicCard, DateRangeModal, HeaderCompt} from '../../../components';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import styles from './styles.slotes';
// Import the controller
import SlotsController from './SlotesController'; // Adjust the path as necessary

const renderItem = ({item}) => {
  return (
    <ClinicCard
      clinicName={item?.clinicName}
      slots={item?.slot?.slotsByDay}
      item={item}
    />
  );
};

// A reusable component to display the list of slots
const SlotsList = ({title, clinics, onAddSlotsPress}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={clinics}
        keyExtractor={(item, index) => item?.clinicName + index?.toString()} // Using clinicName and index for unique key
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            <TouchableOpacity
              onPress={onAddSlotsPress}
              style={styles.addButton}>
              <MaterialIcons name="add" size={24} color={Colors.APPCOLOR} />
              <Text style={styles.addButtonText}>Add Slots</Text>
            </TouchableOpacity>
          </View>
        }
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>No Slots Found.</Text>
        )}
      />
    </View>
  );
};

const SlotsScreen = () => {
  const navigation = useNavigation();

  // Call the controller hook and destructure its returned values
  const {
    activeTab,
    setActiveTab,
    offlineClinics,
    onlineClinics,
    isLoadingOffline,
    isLoadingOnline,
    showpausemodal,
    setshowpauseModal,
  } = SlotsController(); // Use the hook here

  // Handler for Add Slots button press
  const handleAddSlotsPress = () => {
    navigation.navigate('AddSlots');
  };

  // Handler for Edit Slots button press
  const handleEditSlotsPress = () => {
    navigation.navigate('EditSlots', {item: {}});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderCompt
        title={'Slots'}
        showpausebutton={true}
        onPressPause={() => setshowpauseModal(!showpausemodal)}
      />
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
              Offline Slots
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
              Online Slots
            </Text>
            {activeTab === 'Online' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        </View>

        {/* Conditional Content */}
        {activeTab === 'Offline' ? (
          isLoadingOffline ? (
            <ActivityIndicator
              size={'large'}
              style={styles.activityIndicator}
            />
          ) : (
            <SlotsList
              title="Your Offline Slots"
              clinics={offlineClinics}
              onAddSlotsPress={handleAddSlotsPress}
            />
          )
        ) : (
          // Online Slots tab content
          <>
            {isLoadingOnline ? (
              <ActivityIndicator
                size={'large'}
                style={styles.activityIndicator}
              />
            ) : (
              <>
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Your Online Slots</Text>
                  <TouchableOpacity
                    onPress={handleAddSlotsPress}
                    style={styles.addButton}>
                    <MaterialIcons
                      name="add"
                      size={24}
                      color={Colors.APPCOLOR}
                    />
                    <Text style={styles.addButtonText}>Add Slots</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.card}>
                  <View style={[styles.icons, {justifyContent: 'flex-end'}]}>
                    <TouchableOpacity onPress={handleEditSlotsPress}>
                      <MaterialIcons name="edit" size={24} color="#3498db" />
                    </TouchableOpacity>
                    {/* Delete button can be added here if needed */}
                  </View>
                  <FlatList
                    data={onlineClinics}
                    keyExtractor={(item, index) =>
                      item?.dayOfWeek + index.toString()
                    } // Using dayOfWeek and index for unique key
                    renderItem={({item}) => {
                      return (
                        <View style={styles.dayContainer}>
                          <Text style={styles.dayText}>{item?.dayOfWeek}</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              justifyContent: 'space-between',
                            }}>
                            {item?.slots?.length > 0 ? (
                              item?.slots?.map((slot, idx) => (
                                <Text
                                  key={idx.toString()}
                                  style={styles.slotText}>
                                  {slot?.startTime} → {slot?.endTime}
                                </Text>
                              ))
                            ) : (
                              <Text style={styles.noSlotText}>-</Text>
                            )}
                          </View>
                        </View>
                      );
                    }}
                    ListEmptyComponent={() => (
                      <Text style={styles.emptyListText}>
                        No Online Slots Found.
                      </Text>
                    )}
                  />
                </View>
              </>
            )}
          </>
        )}
      </View>

      <DateRangeModal
        visible={showpausemodal}
        onClose={() => setshowpauseModal(false)}
        onDone={(start, end) => {
          console.log('Selected:', start, end);
          setshowpauseModal(false);
        }}
      />
    </SafeAreaView>
  );
};

export default SlotsScreen;
