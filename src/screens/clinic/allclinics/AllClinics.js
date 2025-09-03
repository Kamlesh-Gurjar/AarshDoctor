// import {
//   ActivityIndicator,
//   FlatList,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import React, {memo, useEffect, useState} from 'react';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {Colors} from '../../../theme/Colors';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ApiRequest from '../../../network/ApiRequest';
// import {ApiRoutes} from '../../../utils/ApiRoutes';
// import {decryptData} from '../../../utils/encryptionUtils';
// import {showErrorToast, showSuccessToast} from '../../../utils/HelperFuntions';
// import {HeaderCompt} from '../../../components';
// import Fonts from '../../../theme/Fonts';
// import Icon from '@react-native-vector-icons/material-icons';

// const AllClinics = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [clinics, setClinics] = useState([]);

//   const getDoctorAllClinic = async values => {
//     const token = await AsyncStorage.getItem('userToken');

//     try {
//       setIsLoading(true);

//       const response = await ApiRequest({
//         BASEURL: ApiRoutes.getDoctorAllClinic,
//         method: 'POST',
//         token: token,
//       });

//       const resData = await decryptData(response.data);

//       if (resData?.code === 200 || resData?.code === 201) {
//         setIsLoading(false);
//         // showSuccessToast('Success', resData?.message);
//         setClinics(resData?.data?.clinic);
//       } else {
//         setIsLoading(false);

//         showErrorToast('Failed', resData?.message || 'Something went wrong');
//       }
//     } catch (error) {
//       setIsLoading(false);

//       console.error('Bank Details Update Error:', error?.message || error);
//       showErrorToast('Failed', error?.message || 'Error updating bank details');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getDoctorAllClinic();
//   }, []);

//   // ---- Card Component (optimized with React.memo) ----
//   const ClinicCard = memo(({item}) => {
//     return (
//       <View style={styles.card}>
//         <Text style={styles.clinicName}>{item.clinicName}</Text>
//         <Text style={styles.city}>
//           {item.city}, {item.state}
//         </Text>
//         <Text style={styles.locality}>{item.locality}</Text>
//         <View style={styles.row}>
//           <Text style={styles.label}>Pincode: </Text>
//           <Text style={styles.value}>{item.pincode}</Text>
//         </View>
//       </View>
//     );
//   });
//   const renderItem = ({item}) => <ClinicCard item={item} />;

//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: Colors.WHITE}}>
//       <HeaderCompt title={'Clinics'} />
//       {isLoading ? (
//         <ActivityIndicator
//           size={'large'}
//           color={Colors.APPCOLOR}
//           style={{flex: 1}}
//         />
//       ) : (
//         <FlatList
//           data={clinics}
//           keyExtractor={item => item._id}
//           renderItem={renderItem}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{padding: 12}}
//           removeClippedSubviews
//           initialNumToRender={6}
//           maxToRenderPerBatch={8}
//           windowSize={10}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// export default AllClinics;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#f9f9f9',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   clinicName: {
//     fontSize: 16,
//     color: Colors.BLACK,
//     marginBottom: 4,
//     fontFamily: Fonts.PoppinsMedium,
//   },
//   city: {
//     fontSize: 14,
//     color: Colors.APPCOLOR,
//     marginBottom: 4,
//     fontFamily: Fonts.PoppinsMedium,
//   },
//   locality: {
//     fontSize: 13,
//     color: '#555',
//     marginBottom: 8,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   label: {
//     fontSize: 13,
//     color: '#444',
//     fontFamily: Fonts.PoppinsMedium,
//   },
//   value: {
//     fontSize: 13,
//     color: '#333',
//     fontFamily: Fonts.PoppinsRegular,
//   },
// });
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../../theme/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiRequest from '../../../network/ApiRequest';
import {ApiRoutes} from '../../../utils/ApiRoutes';
import {decryptData} from '../../../utils/encryptionUtils';
import {showErrorToast, showSuccessToast} from '../../../utils/HelperFuntions';
import {HeaderCompt} from '../../../components';
import Fonts from '../../../theme/Fonts';

import Icon from '@react-native-vector-icons/material-icons';
import FIcon from '@react-native-vector-icons/material-icons';

const AllClinics = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);

  const getDoctorAllClinic = async values => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      setIsLoading(true);
      const response = await ApiRequest({
        BASEURL: ApiRoutes.getDoctorAllClinic,
        method: 'POST',
        token: token,
      });
      const resData = await decryptData(response.data);

      if (resData?.code === 200 || resData?.code === 201) {
        setClinics(resData?.data?.clinic);
      } else {
        showErrorToast('Failed', resData?.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Clinic Fetch Error:', error?.message || error);
      showErrorToast('Failed', error?.message || 'Error fetching clinics');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDoctorAllClinic();
  }, []);

  const deleteDoctorClinic = async values => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      setIsLoading(true);
      const response = await ApiRequest({
        BASEURL: ApiRoutes.deleteDoctorClinic,
        method: 'POST',
        token: token,
        req: {
          clinicId: selectedClinic?._id,
        },
      });
      const resData = await decryptData(response.data);

      if (resData?.code === 200 || resData?.code === 201) {
        showSuccessToast('Success', resData?.message);
        getDoctorAllClinic();
        setDeleteModal(false);
        setSelectedClinic(null);
      } else {
        showErrorToast('Failed', resData?.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Clinic Fetch Error:', error?.message || error);
      showErrorToast('Failed', error?.message || 'Error fetching clinics');
    } finally {
      setIsLoading(false);
    }
  };

  // ---- Card Component (optimized with React.memo) ----
  const ClinicCard = memo(({item}) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.clinicInfo}>
            <Text style={styles.clinicName}>{item.clinicName}</Text>

            <View style={styles.infoRow}>
              <FIcon
                name="location-on"
                size={14}
                color={Colors.APPCOLOR}
                style={styles.infoIcon}
              />
              <Text style={styles.locationText}>
                {item.locality}, {item.city}, {item.state} - {item.pincode}
              </Text>
            </View>
            {/* You can add more detailed address parts if available */}
            {/* <View style={styles.infoRow}>
              <Icon name="home" size={14} color="#555" style={styles.infoIcon} />
              <Text style={styles.locality}>{item.addressLine1}</Text>
            </View> */}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.iconBtn, styles.editBtn]}
              onPress={() => {navigation.navigate("EditClinic",{clinicData:item})
                }}>
              <Icon name="edit" size={18} color={Colors.APPCOLOR} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconBtn, styles.deleteBtn]}
              onPress={() => {
                setSelectedClinic(item);
                setDeleteModal(true);
              }}>
              <Icon name="delete" size={18} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  });

  const renderItem = ({item}) => <ClinicCard item={item} />;

  const confirmDelete = () => {
    // if (selectedClinic) {
    //   // TODO: API call for delete
    //   showSuccessToast('Deleted', `${selectedClinic.clinicName} removed`);
    //   setClinics(prev => prev.filter(c => c._id !== selectedClinic._id));
    // }
    // setDeleteModal(false);
    // setSelectedClinic(null);
    deleteDoctorClinic();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <HeaderCompt
        title={'Clinics'}
        addClicnicbutton={true}
        onPressAddClinic={() =>  navigation.navigate("AddClinic")}
      />
      {isLoading ? (
        <ActivityIndicator
          size={'large'}
          color={Colors.APPCOLOR}
          style={{flex: 1}}
        />
      ) : (
        <FlatList
          data={clinics}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: 12}}
          removeClippedSubviews
          initialNumToRender={6}
          maxToRenderPerBatch={8}
          windowSize={10}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        transparent
        visible={deleteModal}
        animationType="fade"
        onRequestClose={() => setDeleteModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Confirm Deletion</Text>
            <Text style={styles.modalMsg}>
              Are you sure you want to delete{' '}
              <Text style={{fontFamily: Fonts.PoppinsMedium}}>
                {selectedClinic?.clinicName}
              </Text>{' '}
              clinic?
            </Text>
            <View style={styles.modalActions}>
              <Pressable
                style={[styles.btn, {backgroundColor: '#eee'}]}
                onPress={() => setDeleteModal(false)}>
                <Text style={[styles.btnText, {color: Colors.BLACK}]}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={[styles.btn, {backgroundColor: 'red'}]}
                onPress={confirmDelete}>
                <Text style={[styles.btnText, {color: '#fff'}]}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AllClinics;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: Colors.APPCOLOR,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clinicInfo: {
    flex: 1,
    marginRight: 10,
  },
  clinicName: {
    fontSize: 18,
    color: Colors.BLACK,
    marginBottom: 6,
    fontFamily: Fonts.PoppinsMedium,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoIcon: {
    marginRight: 8,
  },
  locationText: {
    fontSize: 13,
    color: '#555',
    fontFamily: Fonts.PoppinsRegular,
    flexShrink: 1, // Allows text to wrap
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  iconBtn: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBtn: {
    borderColor: Colors.APPCOLOR,
  },
  deleteBtn: {
    borderColor: 'red',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: Fonts.PoppinsMedium,
    marginBottom: 10,
    color: Colors.BLACK,
    textAlign: 'center',
  },
  modalMsg: {
    fontSize: 15,
    color: '#444',
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 22,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Changed to space-around for better spacing
    marginTop: 10,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100, // Ensure buttons have a minimum width
    alignItems: 'center',
  },
  btnText: {
    fontSize: 15,
    fontFamily: Fonts.PoppinsMedium,
  },
});
