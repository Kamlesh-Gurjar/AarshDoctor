import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiRequest from '../../network/ApiRequest';
import {ApiRoutes} from '../../utils/ApiRoutes';
import {decryptData} from '../../utils/encryptionUtils';
import {showErrorToast, showSuccessToast} from '../../utils/HelperFuntions';
import {Colors} from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import {HeaderCompt} from '../../components';

const Notification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // ✅ Submit Function
  const getAllNotification = async () => {
    const token = await AsyncStorage.getItem('userToken');

    const req = {};

    try {
      setIsLoading(true);
      const response = await ApiRequest({
        BASEURL: ApiRoutes.getAllNotification,
        method: 'POST',
        req: req,
        token: token,
      });

      const resData = await decryptData(response.data);

      if (resData?.code === 200 || resData?.code === 201) {
        setNotifications(resData?.data);
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

  useEffect(() => {
    getAllNotification();
  }, []);
  const NotificationItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
      <Text style={styles.date}>
        {new Date(item.createdAt).toLocaleString()}
      </Text>
    </View>
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <HeaderCompt title={'Notifications'} />
      {isLoading ? (
        <ActivityIndicator size={'large'} style={{flex: 1}} />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={item => item?._id}
          renderItem={({item}) => <NotificationItem item={item} />}
          contentContainerStyle={styles.container}
          ListEmptyComponent={() => (
            <Text
              style={{
                fontFamily: Fonts.PoppinsRegular,
                color: Colors.BLACK,
                textAlign: 'center',
                fontSize: 16,
              }}>
              No notifications found.
            </Text>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: Colors.WHITE,
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    borderLeftWidth: 2,
    borderLeftColor: Colors.APPCOLOR,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsSemiBold,
  },
  body: {
    fontSize: 14,
    marginBottom: 6,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsRegular,
  },
  date: {
    fontSize: 12,
    color: 'gray',
    fontFamily: Fonts.PoppinsRegular,
  },
});
