import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView, // We'll use Pressable for custom buttons
} from 'react-native';
import React from 'react';
import {ButtonCompt, HeaderCompt} from '../../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userLogout} from '../../../redux/reducer/LoginReducer';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../../theme/Colors';
import Fonts from '../../../theme/Fonts';
import Icon from '@react-native-vector-icons/material-icons';
import imageindex from '../../../assets/images/imageindex';

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector(state => state?.user?.userData);

  // --- Data for our menu items ---
  const menuItems = [
    {
      title: 'Basic Details',
      icon: 'account-box',
      target: 'ProfileDetails', // Add your screen name here
      isHighlighted: true,
    },
    {
      title: 'Bank Details',
      icon: 'credit-card',
      target: 'BankDetails',
      isHighlighted: true,
    },
    {
      title: 'Certifications',
      icon: 'assignment',
      target: 'Certifications',
      isHighlighted: true,
    },
    {
      title: 'Manage Subscription',
      icon: 'subscriptions',
      target: 'ManageSubscription',
      isHighlighted: true,
    },
    {
      title: 'Change Password',
      icon: 'sync-lock',
      target: 'ResetPassword',
      isHighlighted: true, // This will give it the special style
    },
  ];

  const onLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    dispatch(userLogout());
    // Use reset to clear navigation history after logout
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderCompt title={'Profile'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          {/* --- Profile Info Section --- */}
          <View style={styles.profileHeader}>
            <Image
              source={
                userData?.profilePic
                  ? {uri: userData.profilePic}
                  : imageindex.user
              }
              style={styles.profileImage}
            />
            <Text style={styles.userName}>{userData?.name || 'UserName'}</Text>
            <Text style={styles.userEmail}>
              {userData?.email || 'User Email'}
            </Text>
          </View>

          {/* --- Menu Items Section --- */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <Pressable
                key={index}
                style={[
                  styles.menuItem,
                  item.isHighlighted && styles.highlightedItem, // Apply special style if highlighted
                ]}
                onPress={() => navigation.navigate(item.target)}>
                <Icon
                  name={item.icon}
                  size={24}
                  color={
                    item.isHighlighted ? Colors.APPCOLOR : Colors.GRAY_DARK
                  }
                  style={styles.menuIcon}
                />
                <Text
                  style={[
                    styles.menuText,
                    item.isHighlighted && styles.highlightedText,
                  ]}>
                  {item.title}
                </Text>
              </Pressable>
            ))}
            <ButtonCompt title={'Logout'} onPress={onLogout} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

// --- New Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  userName: {
    marginTop: 10,
    color: Colors.BLACK,
    fontSize: 18,
    fontFamily: Fonts.PoppinsMedium,
  },
  userEmail: {
    color: Colors.GRAY,
    fontFamily: Fonts.PoppinsRegular,
    fontSize: 14,
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: 100,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  highlightedItem: {
    backgroundColor: '#e0f7fa', // A light teal/cyan color
  },
  menuIcon: {
    marginRight: 20,
  },
  menuText: {
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsRegular,
    fontSize: 16,
  },
  highlightedText: {
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsMedium,
    opacity: 0.8,
  },
});
