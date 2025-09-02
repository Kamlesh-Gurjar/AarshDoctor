import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decryptData} from '../../../utils/encryptionUtils';
import ApiRequest from '../../../network/ApiRequest';
import {ApiRoutes} from '../../../utils/ApiRoutes';
import {useFocusEffect} from '@react-navigation/native';

const CalenderController = () => {
  const [offlineCalenderdata, setofflineCalenderdata] = useState([]);
  const [isLoadingofflineCalender, setIsLoadingofflineCalender] =
    useState(true);
  const [OnlineCalenderdata, setOnlineCalenderdata] = useState([]);
  const [OnlineCalenderdataLoading, setOnlineCalenderdataLoading] =
    useState(true);

  const getAllOfflineCalender = async (id, doctorClinicIds) => {
    console.log('-----------payloaddata-------------', id, doctorClinicIds);
    const token = await AsyncStorage.getItem('userToken');
    // console.log('=================token==========', token);
    try {
      setIsLoadingofflineCalender(true);
      const response = await ApiRequest({
        BASEURL: ApiRoutes.getAllDoctorMonthsSlot,
        method: 'POST',
        req: {doctorId: id, doctorClinicIds: doctorClinicIds},
        token: token,
      });

      const decrypted = decryptData(response.data);

      if (decrypted.code === 200 || decrypted.code === 201) {
        // console.log(
        //   '----getAllOfflineCalender-------',
        //   JSON.stringify(decrypted),
        // );
        setofflineCalenderdata(decrypted?.data);
      } else {
        console.log('response', decrypted?.message);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setIsLoadingofflineCalender(false);
    }
  };

  const getAllOnlineCalender = async id => {
    const token = await AsyncStorage.getItem('userToken');
    // console.log("=================token==========",token)
    try {
      setOnlineCalenderdataLoading(true);
      const response = await ApiRequest({
        BASEURL: ApiRoutes.getAllDoctorOnlineMonthSlot,
        method: 'POST',
        req: {doctorId: id},
        token: token,
      });

      const decrypted = decryptData(response.data);

      if (decrypted.code === 200 || decrypted.code === 201) {
        // console.log(
        //   '----getAllOnlineCalender----------------',
        //   JSON.stringify(decrypted?.data),
        // );
        setOnlineCalenderdata(decrypted?.data);
      } else {
        setOnlineCalenderdataLoading(false);
        console.error('Server error:', decrypted?.message);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setOnlineCalenderdataLoading(false);
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

      // console.log(
      //   '---------decrypted--userdata--1112222---',
      //   decrypted?.data?.clinic.map(item => item?._id),
      // );
      await getAllOfflineCalender(
        decrypted?.data?._id,
        decrypted?.data?.clinic.map(item => item?._id),
      );
      await getAllOnlineCalender(decrypted?.data?._id);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  useEffect(() => {
    getDoctorDetails();
    // getAllOfflineCalender();
    // getAllOnlineCalender();
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     getAllOfflineCalender();
  //     getAllOnlineCalender();
  //     // Agar cleanup karna hai to return ek function
  //     return () => {
  //       console.log('Screen unfocused, cleanup here if needed');
  //     };
  //   }, []),
  // );

  return {
    offlineCalenderdata,
    isLoadingofflineCalender,
    OnlineCalenderdata,
    OnlineCalenderdataLoading,
  };
};

export default CalenderController;
