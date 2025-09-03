// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
//   SafeAreaView,
//   StatusBar,
//   Pressable, // We use Pressable for better feedback
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Your Custom Components
// import {
//   AppointmentCard,
//   ButtonCompt,
//   HeaderCompt,
//   SearchBarComponent,
// } from '../../components';

// // Your Theme and Assets
// import {Colors} from '../../theme/Colors';
// import imageindex from '../../assets/images/imageindex';

// // Your Controller and Redux
// import AppointmentController from './AppointmentController';
// import {userLogout} from '../../redux/reducer/LoginReducer';
// import Fonts from '../../theme/Fonts';
// import styles from './styles.appointment';

// // --- Our New Custom Tab Bar Component ---
// const CustomTopTabBar = ({activeTab, onTabPress}) => {
//   const tabs = ['Upcoming', 'Completed', 'Cancelled'];

//   return (
//     <View style={styles.tabBarContainer}>
//       {tabs.map(tab => (
//         <Pressable
//           key={tab}
//           style={styles.tabButton}
//           onPress={() => onTabPress(tab)}>
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === tab ? styles.activeTabText : styles.inactiveTabText,
//             ]}>
//             {tab}
//           </Text>
//           {activeTab === tab && <View style={styles.activeIndicator} />}
//         </Pressable>
//       ))}
//     </View>
//   );
// };

// const Appointments = ({navigation}) => {
//   // --- STATE MANAGEMENT ---
//   // This state now controls which tab is visible. 'Upcoming' is the default.
//   const [activeTab, setActiveTab] = useState('Upcoming');
//   const [activeCardId, setActiveCardId] = useState(null);

//   // Get all your state and functions from the controller
//   const {searchQuery, filteredData, isLoading, handleSearch, userData} =
//     AppointmentController();

//   // --- TAB SCREEN COMPONENTS ---
//   // These are the actual screens that will be rendered based on the active tab.

//   const UpcomingScreen = () => (
//     <View style={styles.listContainer}>
//       {isLoading ? (
//         <ActivityIndicator
//           style={{marginTop: 50}}
//           size="large"
//           color={Colors.GRAY}
//         />
//       ) : (
//         <FlatList
//           data={filteredData.filter(item => item?.status === 'Rescheduled')}
//           renderItem={({item}) => (
//             <AppointmentCard
//               item={item}
//               activeCardId={activeCardId}
//               setActiveCardId={setActiveCardId}
//             />
//           )}
//           keyExtractor={item => item?.id?.toString()}
//           showsVerticalScrollIndicator={false}
//           ListEmptyComponent={() => (
//             <Text style={styles.emptyText}>
//               No upcoming appointments found.
//             </Text>
//           )}
//           contentContainerStyle={{flexGrow: 1, paddingTop: 10}}
//           ListHeaderComponent={() => (
//             <SearchBarComponent onSearch={handleSearch} value={searchQuery} />
//           )}
//         />
//       )}
//     </View>
//   );

//   const CompletedScreen = () => (
//     <View style={styles.listContainer}>
//       {isLoading ? (
//         <ActivityIndicator
//           style={{marginTop: 50}}
//           size="large"
//           color={Colors.PRIMARY}
//         />
//       ) : (
//         <FlatList
//           data={filteredData.filter(item => item?.status === 'Confirmed')}
//           renderItem={({item}) => (
//             <AppointmentCard
//               item={item}
//               activeCardId={activeCardId}
//               setActiveCardId={setActiveCardId}
//             />
//           )}
//           keyExtractor={item => item?.id?.toString()}
//           showsVerticalScrollIndicator={false}
//           ListEmptyComponent={() => (
//             <Text style={styles.emptyText}>
//               No upcoming appointments found.
//             </Text>
//           )}
//           contentContainerStyle={{flexGrow: 1, paddingTop: 10}}
//           ListHeaderComponent={() => (
//             <SearchBarComponent onSearch={handleSearch} value={searchQuery} />
//           )}
//         />
//       )}
//     </View>
//   );

//   const CancelledScreen = () => (
//     <View style={styles.listContainer}>
//       {isLoading ? (
//         <ActivityIndicator
//           style={{marginTop: 50}}
//           size="large"
//           color={Colors.PRIMARY}
//         />
//       ) : (
//         <FlatList
//           data={filteredData.filter(item => item?.status === 'Cancelled')}
//           renderItem={({item}) => (
//             <AppointmentCard
//               item={item}
//               activeCardId={activeCardId}
//               setActiveCardId={setActiveCardId}
//             />
//           )}
//           keyExtractor={item => item?.id?.toString()}
//           showsVerticalScrollIndicator={false}
//           ListEmptyComponent={() => (
//             <Text style={styles.emptyText}>
//               No upcoming appointments found.
//             </Text>
//           )}
//           contentContainerStyle={{flexGrow: 1, paddingTop: 10}}
//           ListHeaderComponent={() => (
//             <SearchBarComponent onSearch={handleSearch} value={searchQuery} />
//           )}
//         />
//       )}
//     </View>
//   );

//   // --- CONDITIONAL CONTENT RENDERER ---
//   // This function decides which screen component to show.
//   const renderContent = () => {
//     switch (activeTab) {
//       case 'Upcoming':
//         return <UpcomingScreen />;
//       case 'Completed':
//         return <CompletedScreen />;
//       case 'Cancelled':
//         return <CancelledScreen />;
//       default:
//         return null;
//     }
//   };

//   // --- MAIN RETURN STATEMENT ---
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor={Colors.WHITE} barStyle="dark-content" />
//       <HeaderCompt
//         showBack={false}
//         title={userData?.name}
//         leftimage={{uri: userData?.profilePic}}
//         rightIcon={imageindex.edit}
//         onPressRight={() => navigation.navigate('ProfileDetails')}
//       />

//       {/* Render our custom tab bar */}
//       <CustomTopTabBar activeTab={activeTab} onTabPress={setActiveTab} />

//       {/* Render the content for the active tab */}
//       <View style={styles.contentContainer}>{renderContent()}</View>
//     </SafeAreaView>
//   );
// };

// export default Appointments;

import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Pressable,
  Image,
  Modal, // We use Pressable for better feedback
} from 'react-native';

// Your Custom Components
import {
  AppointmentCard,
  FilterModal,
  HeaderCompt,
  SearchBarComponent,
} from '../../components';

// Your Theme and Assets
import {Colors} from '../../theme/Colors';
import imageindex from '../../assets/images/imageindex';

// Your Controller
import AppointmentController from './AppointmentController';

// Your Styles
import styles from './styles.appointment';
import {useSelector} from 'react-redux';

// --- New Custom Tab Bar Component ---
// This component will render the tabs at the top.
const CustomTopTabBar = ({activeTab, onTabPress}) => {
  const tabs = ['Latest', 'All']; // Our two tabs

  return (
    <View style={styles.tabBarContainer}>
      {tabs.map(tab => (
        <Pressable
          key={tab}
          style={styles.tabButton}
          onPress={() => onTabPress(tab)}>
          <Text
            style={[
              styles.tabText,
              activeTab === tab ? styles.activeTabText : styles.inactiveTabText,
              {
                backgroundColor:
                  activeTab === tab ? Colors.BACKGRONDCOLOR : Colors.WHITE,
              },
            ]}>
            {tab} Appointments
          </Text>
          {/* This view adds the underline for the active tab */}
          {activeTab === tab && <View style={styles.activeIndicator} />}
        </Pressable>
      ))}
    </View>
  );
};

const Appointments = ({navigation}) => {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('All'); // Default tab is 'Latest'
  const [activeCardId, setActiveCardId] = useState(null);

  // Get all state and functions from the controller
  const {
    searchQuery,
    filteredData, // This is for the "All" tab
    isLoading, // Loading state for the "All" tab
    handleSearch,
    userData,
    allLatestAppointment, // This is for the "Latest" tab
    allLatestAppointmentLoading, // Loading state for the "Latest" tab
  } = AppointmentController();

  console.log('-----------------', userData?.profilePic);
  const doctorDetails = useSelector(state => state.doctorDetails);

  // --- DYNAMIC CONTENT VARIABLES ---
  // These variables will change based on the active tab
  const isLatestTab = activeTab === 'Latest';
  const currentData = isLatestTab ? allLatestAppointment : filteredData;
  const isLoadingData = isLatestTab ? allLatestAppointmentLoading : isLoading;
  const emptyMessage = isLatestTab
    ? 'No Appointments Yet'
    : 'No Appointments found.';

  //Filter Logic
  // console.log('-----currentData--------', currentData);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [appointments, setAppointments] = useState(currentData);

  const handleApplyFilter = filters => {
    console.log('Applied Filters:', filters);
    let result = currentData;

    if (filters.mode) {
      result = result.filter(item => item.mode === filters.mode);
    }
    if (filters.status) {
      result = result.filter(item => item.status === filters.status);
    }
    if (filters.type) {
      result = result.filter(item => item.type === filters.type);
    }

    setAppointments(result);
  };
  // --- MAIN RENDER ---

  // console.log('-----------', userData?.profilePic);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={Colors.WHITE} barStyle="dark-content" />
      <HeaderCompt
        showBack={false}
        title={userData?.name}
        leftimage={{
          uri: doctorDetails?.profilePic?.endsWith('.avif')
            ? doctorDetails?.profilePic.replace('.avif', '.jpg') // fallback
            : doctorDetails?.profilePic,
        }}
        rightIcon={imageindex.edit}
        onPressRight={() => navigation.navigate('ProfileDetails')}
      />

      {/* Render our new custom tab bar */}
      <CustomTopTabBar activeTab={activeTab} onTabPress={setActiveTab} />

      <View style={styles.contentContainer}>
        {isLoadingData ? (
          <ActivityIndicator
            style={{flex: 1}}
            size="large"
            color={Colors.GRAY}
          />
        ) : (
          <FlatList
            data={currentData}
            // data={appointments}
            renderItem={({item}) => (
              <AppointmentCard
                item={item}
                activeCardId={activeCardId}
                setActiveCardId={setActiveCardId}
              />
            )}
            keyExtractor={item => item?._id?.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() =>
              activeTab == 'Latest' ? (
                <Image
                  source={imageindex.nolatest}
                  style={{
                    height: 200,
                    width: 200,
                    alignSelf: 'center',
                    marginTop: 100,
                  }}
                />
              ) : (
                <Text style={styles.emptyText}>{emptyMessage}</Text>
              )
            }
            contentContainerStyle={{
              flexGrow: 1,
              paddingTop: 10,
              paddingBottom: 100,
            }}
            // Only show the search bar for the "All" appointments tab
            ListHeaderComponent={
              !isLatestTab ? (
                <SearchBarComponent
                  onSearch={handleSearch}
                  value={searchQuery}
                  showFilterIcon={true}
                  onPressFilter={() =>
                    setIsFilterModalVisible(!isFilterModalVisible)
                  }
                />
              ) : null
            }
          />
        )}
      </View>
      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onApply={handleApplyFilter}
      />
    </SafeAreaView>
  );
};

export default Appointments;
