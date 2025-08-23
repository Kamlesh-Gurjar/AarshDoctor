import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiRequest from '../../network/ApiRequest';
import {decryptData} from '../../utils/encryptionUtils';
import {ApiRoutes} from '../../utils/ApiRoutes';

const AppointmentController = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const userData = useSelector(state => state?.user?.userData);
  const dispatch = useDispatch();

  const getAllAppointments = async id => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      setIsLoading(true);
      const response = await ApiRequest({
        BASEURL: ApiRoutes.getAllAppointments,
        method: 'POST',
        req: {doctorId: id},
        token: token,
      });

      const decrypted = decryptData(response.data);
      console.log('----11-------', decrypted?.data);
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
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  useEffect(() => {
    getDoctorDetails();
  }, []);

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

  return {
    searchQuery,
    filteredData,
    isLoading,
    handleSearch,
    refreshAppointments: getDoctorDetails,
    userData,
    dispatch,
  };
};

export default AppointmentController;
