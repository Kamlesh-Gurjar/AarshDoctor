import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import ButtonCompt from './ButtonCompt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiRequest from '../../network/ApiRequest';
import {ApiRoutes} from '../../utils/ApiRoutes';
import {decryptData} from '../../utils/encryptionUtils';

// const labs = [
//   {id: '1', name: 'Pathkind Lab', location: 'Location not available'},
//   {
//     id: '2',
//     name: 'Quality Diagnostics And Imaging',
//     location: 'Location not available',
//   },
//   {id: '3', name: 'Naveen Path Labs', location: 'Location not available'},
//   {id: '4', name: 'Pawan Path Hub', location: 'Location not available'},
//   {id: '5', name: 'Teena Labs', location: 'Location not available'},
//   {id: '6', name: 'Dinesh Soni', location: 'Location not available'},
//   {id: '7', name: 'Sclick', location: 'Location not available'},
//   {id: '8', name: 'Nupur Labs', location: 'Location not available'},
//   {id: '9', name: 'Testing', location: 'Location not available'},
// ];

const LabModal = ({isVisible, onClose, onSelect}) => {
  const [labs, setlabs] = useState([]);
  const [labsLoading, setlabsLoading] = useState(true);

  const getLabsName = async id => {
    const token = await AsyncStorage.getItem('userToken');
    console.log('=================token==========', token);
    try {
      setlabsLoading(true);
      const response = await ApiRequest({
        BASEURL: ApiRoutes.getLabsName,
        method: 'POST',
        // req: {doctorId: id},
        token: token,
      });

      const decrypted = decryptData(response.data);

      if (decrypted.code === 200 || decrypted.code === 201) {
        console.log(
          '----getLabsName----------------',
          JSON.stringify(decrypted?.data),
        );
        setlabs(decrypted?.data);
      } else {
        setlabsLoading(false);
        console.error('Server error:', decrypted?.message);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setlabsLoading(false);
    }
  };

  useEffect(() => {
    getLabsName();
  }, []);

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Refer to Lab</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Lab List */}
          {labsLoading ? (
            <ActivityIndicator size={'large'} color={Colors.APPCOLOR} />
          ) : (
            <FlatList
              data={labs}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.labCard}
                  onPress={() => onSelect(item)}>
                  <Text style={styles.labName}>{item?.name}</Text>
                  <Text style={styles.labLocation}>
                    {item?.address?.locality}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}

          {/* Footer Button */}
          <TouchableOpacity style={styles.footerBtn} onPress={onClose}>
            <Text style={styles.footerBtnText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    maxHeight: '80%',
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  title: {
    fontSize: 18,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsSemiBold,
  },
  closeBtn: {
    fontSize: 18,
    color: Colors.BLACK,
  },
  labCard: {
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  labName: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsSemiBold,
  },
  labLocation: {
    fontSize: 13,
    color: Colors.GRAY,
    marginTop: 2,
    fontFamily: Fonts.PoppinsRegular,
  },
  footerBtn: {
    marginTop: 10,
    backgroundColor: Colors.APPCOLOR,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  footerBtnText: {
    color: Colors.WHITE,
    fontSize: 15,
    fontFamily: Fonts.PoppinsSemiBold,
  },
});

export default LabModal;
