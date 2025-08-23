import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Pressable, // We use Pressable for better feedback
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Custom Components
import {
  AppointmentCard,
  ButtonCompt,
  HeaderCompt,
  SearchBarComponent,
} from '../../components';

// Your Theme and Assets
import {Colors} from '../../theme/Colors';
import imageindex from '../../assets/images/imageindex';

// Your Controller and Redux
import AppointmentController from './AppointmentController';
import {userLogout} from '../../redux/reducer/LoginReducer';

// --- Our New Custom Tab Bar Component ---
const CustomTopTabBar = ({activeTab, onTabPress}) => {
  const tabs = ['Upcoming', 'Completed', 'Cancelled'];

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
            ]}>
            {tab}
          </Text>
          {activeTab === tab && <View style={styles.activeIndicator} />}
        </Pressable>
      ))}
    </View>
  );
};

const Appointments = ({navigation}) => {
  // --- STATE MANAGEMENT ---
  // This state now controls which tab is visible. 'Upcoming' is the default.
  const [activeTab, setActiveTab] = useState('Upcoming');

  // Get all your state and functions from the controller
  const {searchQuery, filteredData, isLoading, handleSearch, userData} =
    AppointmentController();

  // --- TAB SCREEN COMPONENTS ---
  // These are the actual screens that will be rendered based on the active tab.

  const UpcomingScreen = () => (
    <View style={styles.listContainer}>
      {isLoading ? (
        <ActivityIndicator
          style={{marginTop: 50}}
          size="large"
          color={Colors.PRIMARY}
        />
      ) : (
        <FlatList
          data={filteredData.filter(item => item?.status === 'Rescheduled')}
          renderItem={({item}) => <AppointmentCard item={item} />}
          keyExtractor={item => item?.id?.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>
              No upcoming appointments found.
            </Text>
          )}
          contentContainerStyle={{flexGrow: 1, paddingTop: 10}}
          ListHeaderComponent={() => (
            <SearchBarComponent onSearch={handleSearch} value={searchQuery} />
          )}
        />
      )}
    </View>
  );

  const CompletedScreen = () => (
    <View style={styles.listContainer}>
      {isLoading ? (
        <ActivityIndicator
          style={{marginTop: 50}}
          size="large"
          color={Colors.PRIMARY}
        />
      ) : (
        <FlatList
          data={filteredData.filter(item => item?.status === 'Confirmed')}
          renderItem={({item}) => <AppointmentCard item={item} />}
          keyExtractor={item => item?.id?.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>
              No upcoming appointments found.
            </Text>
          )}
          contentContainerStyle={{flexGrow: 1, paddingTop: 10}}
          ListHeaderComponent={() => (
            <SearchBarComponent onSearch={handleSearch} value={searchQuery} />
          )}
        />
      )}
    </View>
  );

  const CancelledScreen = () => (
    <View style={styles.listContainer}>
      {isLoading ? (
        <ActivityIndicator
          style={{marginTop: 50}}
          size="large"
          color={Colors.PRIMARY}
        />
      ) : (
        <FlatList
          data={filteredData.filter(item => item?.status === 'Cancelled')}
          renderItem={({item}) => <AppointmentCard item={item} />}
          keyExtractor={item => item?.id?.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>
              No upcoming appointments found.
            </Text>
          )}
          contentContainerStyle={{flexGrow: 1, paddingTop: 10}}
          ListHeaderComponent={() => (
            <SearchBarComponent onSearch={handleSearch} value={searchQuery} />
          )}
        />
      )}
    </View>
  );

  // --- CONDITIONAL CONTENT RENDERER ---
  // This function decides which screen component to show.
  const renderContent = () => {
    switch (activeTab) {
      case 'Upcoming':
        return <UpcomingScreen />;
      case 'Completed':
        return <CompletedScreen />;
      case 'Cancelled':
        return <CancelledScreen />;
      default:
        return null;
    }
  };

  // --- MAIN RETURN STATEMENT ---
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={Colors.WHITE} barStyle="dark-content" />
      <HeaderCompt
        showBack={false}
        title={userData?.name}
        leftimage={{uri: userData?.profilePic}}
        rightIcon={imageindex.edit}
        onPressRight={() => navigation.navigate('ProfileDetails')}
      />

      {/* Render our custom tab bar */}
      <CustomTopTabBar activeTab={activeTab} onTabPress={setActiveTab} />

      {/* Render the content for the active tab */}
      <View style={styles.contentContainer}>{renderContent()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  // --- Custom Tab Bar Styles ---
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.WHITE,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  activeTabText: {
    color: Colors.APPCOLOR,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: Colors.PRIMARY,
  },
  inactiveTabText: {
    color: Colors.GRAY,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: Colors.GRAY,
  },
  activeIndicator: {
    height: 3,
    width: '60%',
    backgroundColor: Colors.PRIMARY,
    marginTop: 8,
    borderRadius: 2,
  },
  // --- Content and Screen Styles ---
  contentContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  placeholderText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
});

export default Appointments;
