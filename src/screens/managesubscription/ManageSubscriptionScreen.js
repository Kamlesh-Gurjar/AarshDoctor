// screens/Profile/ManageSubscriptionScreen.js (adjust path as needed)
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import {ButtonCompt, HeaderCompt} from '../../components';
import Fonts from '../../theme/Fonts';
import {Colors} from '../../theme/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiRoutes} from '../../utils/ApiRoutes';
import ApiRequest from '../../network/ApiRequest';
import {decryptData} from '../../utils/encryptionUtils';
import {
  formatDate,
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from '../../utils/HelperFuntions';
import RNFetchBlob from 'react-native-blob-util';

// const SubscriptionCard = ({item}) => {
//   const handlewDownload = () => {};

//   return (
//     <View style={styles.card}>
//       <View style={styles.cardHeader}>
//         <Text style={styles.planName}>{item?.packageId?.name}</Text>
//         <View style={styles.paidBadge}>
//           <Text style={styles.paidText}>{item.paymentStatus}</Text>
//         </View>
//       </View>
//       <Text style={styles.joinDate}>
//         Joined on {formatDate(item.startDate)}
//       </Text>
//       <View style={styles.detailRow}>
//         <Icon name="calendar-today" size={16} color={Colors.GRAY_DARK} />
//         <Text style={styles.detailText}>
//           Next payment is on {formatDate(item.endDate)}
//         </Text>
//       </View>
//       <View style={styles.detailRow}>
//         <Icon name="monetization-on" size={16} color={Colors.GRAY_DARK} />
//         <Text style={styles.detailText}>Plan Price: ₹{item.price}</Text>
//       </View>

//       <ButtonCompt
//         title={'Download Invoice'}
//         onPress={handlewDownload}
//         style={{borderRadius: 100}}
//         // isLoading={true}
//       />
//     </View>
//   );
// };
const SubscriptionCard = ({item}) => {
  const handlewDownload = () => {
    if (!item?.invoiceUrl) {
      showInfoToast('Error', 'Invoice URL not found');
      return;
    }

    const {dirs} = RNFetchBlob.fs;
    const path =
      Platform.OS === 'ios'
        ? dirs.DocumentDir + `/invoice_${item.id}.pdf`
        : dirs.DownloadDir + `/invoice_${item.id}.pdf`;

    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'pdf',
      path: path,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: path,
        description: 'Invoice PDF',
      },
    })
      .fetch('GET', item.invoiceUrl)
      .then(res => {
        showSuccessToast('Success', `Invoice downloaded: ${res.path()}`);
        console.log('Invoice saved to:', res.path());
      })
      .catch(err => {
        console.error('Download Error:', err);
        showErrorToast('Error', 'Failed to download invoice');
      });
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.planName}>{item?.packageId?.name}</Text>
        <View style={styles.paidBadge}>
          <Text style={styles.paidText}>{item.paymentStatus}</Text>
        </View>
      </View>

      <Text style={styles.joinDate}>
        Joined on {formatDate(item.startDate)}
      </Text>

      <View style={styles.detailRow}>
        <Icon name="calendar-today" size={16} color={Colors.GRAY_DARK} />
        <Text style={styles.detailText}>
          Next payment is on {formatDate(item.endDate)}
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Icon name="monetization-on" size={16} color={Colors.GRAY_DARK} />
        <Text style={styles.detailText}>Plan Price: ₹{item.price}</Text>
      </View>

      <ButtonCompt
        title={'Download Invoice'}
        onPress={handlewDownload}
        style={{borderRadius: 100}}
      />
    </View>
  );
};

const ManageSubscriptionScreen = () => {
  const [subscriptions, setsubscriptions] = useState([]);
  const [subscriptionsLoading, setsubscriptionsLoading] = useState(false);

  const getPurchasedSubscriptionPlan = async id => {
    const token = await AsyncStorage.getItem('userToken');
    console.log('=================token==========', token);
    try {
      setsubscriptionsLoading(true);
      const response = await ApiRequest({
        BASEURL: ApiRoutes.getPurchasedSubscriptionPlan,
        method: 'POST',
        req: {doctorId: id},
        token: token,
      });

      const decrypted = decryptData(response.data);

      if (decrypted.code === 200 || decrypted.code === 201) {
        // console.log(
        //   '----getPurchasedSubscriptionPlan----------------',
        //   JSON.stringify(decrypted?.data),
        // );
        setsubscriptions(decrypted?.data);
      } else {
        setsubscriptionsLoading(false);
        console.error('Server error:', decrypted?.message);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setsubscriptionsLoading(false);
    }
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Needed',
            message: 'App needs access to your storage to download invoice',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission granted');
          return true;
        } else {
          Alert.alert('Permission Denied', 'Storage permission is required.');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      // iOS doesn't need storage permission
      return true;
    }
  };

  useEffect(() => {
    requestStoragePermission();
    getPurchasedSubscriptionPlan();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderCompt title={'Manage Subscription'} />
      {subscriptionsLoading ? (
        <ActivityIndicator size={'large'} style={{flex: 1}} />
      ) : (
        <FlatList
          data={subscriptions}
          renderItem={({item}) => <SubscriptionCard item={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={() => (
            <Text style={styles.screenTitle}>Your Active Plans</Text>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: Colors.WHITE},
  listContainer: {padding: 20},
  screenTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsMedium,
  },
  // Card styles
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 20,
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
    marginBottom: 10,
  },
  planName: {
    fontSize: 18,
    fontFamily: Fonts.PoppinsMedium,
    color: Colors.BLACK,
  },
  paidBadge: {
    backgroundColor: '#d4edda',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 50,
  },
  paidText: {
    color: '#155724',
    fontSize: 12,
    fontFamily: Fonts.PoppinsMedium,
  },
  joinDate: {
    fontSize: 13,
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.GRAY,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 10,
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.BLACK,
  },
});

export default ManageSubscriptionScreen;
