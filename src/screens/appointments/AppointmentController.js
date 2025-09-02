import {View, Text, PermissionsAndroid, Platform} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiRequest from '../../network/ApiRequest';
import {decryptData} from '../../utils/encryptionUtils';
import {ApiRoutes} from '../../utils/ApiRoutes';
import {useFocusEffect} from '@react-navigation/native';

const AppointmentController = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allLatestAppointment, setAllLatestAppointment] = useState([]);
  const [allLatestAppointmentLoading, setAllLatestAppointmentLoading] =
    useState(false);

  const userData = useSelector(state => state?.user?.userData);
  const dispatch = useDispatch();

  const getAllAppointments = async id => {
    const token = await AsyncStorage.getItem('userToken');
    // console.log("=================token==========",token)
    try {
      setIsLoading(true);
      const response = await ApiRequest({
        BASEURL: ApiRoutes.getAllAppointments,
        method: 'POST',
        req: {doctorId: id},
        token: token,
      });

      const decrypted = decryptData(response.data);
      // console.log('----11-------', decrypted?.data);
      if (response.status === 200 || response.status === 201) {
        setOriginalData(decrypted?.data || []);
        setFilteredData(decrypted?.data || []);
      } else {
        console.error('Server error:', decrypted?.message);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllLatestAppointments = async id => {
    const token = await AsyncStorage.getItem('userToken');
    // console.log("=================token==========",token)
    try {
      setAllLatestAppointmentLoading(true);
      const response = await ApiRequest({
        BASEURL: ApiRoutes.getAllLatestAppointments,
        method: 'POST',
        req: {doctorId: id},
        token: token,
      });

      const decrypted = decryptData(response.data);
      // console.log(
      //   '----getAllLatestAppointments----------------',
      //   decrypted?.data,
      // );
      if (response.status === 200 || response.status === 201) {
        setAllLatestAppointment(decrypted?.data);
      } else {
        setAllLatestAppointmentLoading(false);
        console.error('Server error:', decrypted?.message);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setAllLatestAppointmentLoading(false);
    }
  };

  const getDoctorDetails = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await ApiRequest({
        BASEURL: ApiRoutes.getDoctorDetails,
        method: 'POST',
        token: token,
      });

      const decrypted = decryptData(response?.data);

      await getAllAppointments(decrypted?.data?._id);
      await getAllLatestAppointments(decrypted?.data?._id);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  // useEffect(() => {
  //   getDoctorDetails();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      getDoctorDetails();
    }, []),
  );

  const handleSearch = text => {
    setSearchQuery(text);

    const filtered = originalData.filter(item => {
      const itemData = `
        ${item?.patientId?.name?.toUpperCase() || ''}
        ${item?.patientId?.contact?.toUpperCase() || ''}
        ${item?.status?.toUpperCase() || ''}
        ${item?.mode?.toUpperCase() || ''}
        ${item?.type?.toUpperCase() || ''}
        ${item?.startTime?.toUpperCase() || ''}
        ${item?.endTime?.toUpperCase() || ''}
        ${item?.date?.toUpperCase() || ''}
      `;
      return itemData.includes(text.toUpperCase());
    });

    setFilteredData(filtered);
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        return (
          granted['android.permission.CAMERA'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        );
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  return {
    searchQuery,
    filteredData,
    isLoading,
    handleSearch,
    refreshAppointments: getDoctorDetails,
    userData,
    dispatch,
    allLatestAppointment,
    allLatestAppointmentLoading,
  };
};

export default AppointmentController;
