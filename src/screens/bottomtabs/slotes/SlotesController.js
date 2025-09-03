import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiRequest from '../../../network/ApiRequest';
import {ApiRoutes} from '../../../utils/ApiRoutes';
import {decryptData} from '../../../utils/encryptionUtils';
import {useSelector} from 'react-redux';

const SlotsController = () => {
  const [activeTab, setActiveTab] = useState('Offline');
  const navigation = useNavigation();
  const [offlineClinics, setOfflineClinics] = useState([]);
  const [onlineClinics, setOnlineClinics] = useState([]);

  const [isLoadingOffline, setIsLoadingOffline] = useState(false);
  const [isLoadingOnline, setIsLoadingOnline] = useState(false);
  const [doctorId, setDoctorId] = useState(null);
  const doctorDetails = useSelector(state => state.doctorDetails);

  const [showpausemodal,setshowpauseModal]=useState(false)

  // console.log('-----------doctorDetails--------', doctorDetails);

  const getAllOfflineSlots = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.error('No user token found for offline slots.');
      return;
    }

    try {
      setIsLoadingOffline(true);
      const response = await ApiRequest({
        BASEURL: ApiRoutes.getAllOfflineSlotes,
        method: 'POST',
        token: token,
      });

      const decrypted = decryptData(response.data);
      //   console.log(
      //     '----getAllOfflineSlots-------',
      //     JSON.stringify(decrypted?.data),
      //   );
      if (response.status === 200 || response.status === 201) {
        setOfflineClinics(decrypted?.data || []);
      } else {
        console.error('Server error for offline slots:', decrypted?.message);
      }
    } catch (error) {
      console.error('Fetch Error for offline slots:', error);
    } finally {
      setIsLoadingOffline(false);
    }
  };

  const getAllOnlineSlots = async id => {
    if (!id) {
      console.warn('Doctor ID not available for online slots.');
      return;
    }
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.error('No user token found for online slots.');
      return;
    }

    try {
      setIsLoadingOnline(true);
      const response = await ApiRequest({
        BASEURL: ApiRoutes.getAllOnlineSlotes,
        method: 'POST',
        token: token,
        req: {doctorId: id},
      });

      const decrypted = decryptData(response.data);

      //   console.log(
      //     '----getAllOnlineSlots-------',
      //     JSON.stringify(decrypted?.data?.slotsByDay),
      //   );
      if (response.status === 200 || response.status === 201) {
        setOnlineClinics(decrypted?.data?.slotsByDay || []);
      } else {
        console.error('Server error for online slots:', decrypted?.message);
      }
    } catch (error) {
      console.error('Fetch Error for online slots:', error);
    } finally {
      setIsLoadingOnline(false);
    }
  };

  const getDoctorDetails = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.error('No user token found for doctor details.');
      return;
    }

    try {
      const response = await ApiRequest({
        BASEURL: ApiRoutes.getDoctorDetails,
        method: 'POST',
        token: token,
      });

      const decrypted = decryptData(response?.data);
      if (response.status === 200 || response.status === 201) {
        setDoctorId(decrypted?.data?._id);
        // Call online slots after getting doctorId
        getAllOnlineSlots(decrypted?.data?._id);
      } else {
        console.error('Server error for doctor details:', decrypted?.message);
      }
    } catch (error) {
      console.error('Fetch Error for doctor details:', error);
    }
  };

  useEffect(() => {
    getDoctorDetails();
  }, []); // Run once on component mount to get doctor details and then online slots

  useFocusEffect(
    useCallback(() => {
      getAllOfflineSlots();
      // Only call online slots if doctorId is already available, otherwise it will be called after getDoctorDetails
      if (doctorId) {
        getAllOnlineSlots(doctorId);
      }

      // Return a cleanup function if needed
      return () => {
        console.log('Screen unfocused, cleanup here if needed');
        // Example: If you need to clear states when leaving the screen
        // setOfflineClinics([]);
        // setOnlineClinics([]);
      };
    }, [doctorId]), // Re-run when doctorId changes (after initial fetch)
  );

  return {
    activeTab,
    setActiveTab,
    offlineClinics,
    onlineClinics,
    isLoadingOffline,
    isLoadingOnline,
    getAllOfflineSlots,
    getAllOnlineSlots,
    navigation,
    showpausemodal,
    setshowpauseModal
  };
};

export default SlotsController;
