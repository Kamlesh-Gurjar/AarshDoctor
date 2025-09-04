import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {ButtonCompt, HeaderCompt, InputCompt} from '../../../components';
import {AppConstant} from '../../../utils/AppConstant';
import {Colors} from '../../../theme/Colors';
import Fonts from '../../../theme/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiRequest from '../../../network/ApiRequest';
import {ApiRoutes} from '../../../utils/ApiRoutes';
import {decryptData} from '../../../utils/encryptionUtils';
import {showErrorToast, showSuccessToast} from '../../../utils/HelperFuntions';

// ✅ Validation schema
const ClinicSchema = Yup.object().shape({
  clinicName: Yup.string().required('Clinic name is required'),
  pincode: Yup.string()
    .required('Pincode is required')
    .matches(/^[0-9]{6}$/, 'Enter valid 6 digit pincode'),
  address: Yup.string().required('Address is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
});

const EditClinic = ({navigation, route}) => {
  const clinicData = route?.params?.clinicData;

  // Initialize region and marker with clinicData if available, otherwise default
  const [region, setRegion] = useState({
    latitude: clinicData?.location?.coordinates?.[1] || 22.7196, // latitude is at index 1
    longitude: clinicData?.location?.coordinates?.[0] || 75.8577, // longitude is at index 0
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [marker, setMarker] = useState({
    latitude: clinicData?.location?.coordinates?.[1] || 22.7196,
    longitude: clinicData?.location?.coordinates?.[0] || 75.8577,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Use useEffect to log clinicData when component mounts (for debugging)
  useEffect(() => {
    console.log('Clinic Data received:', clinicData);
  }, [clinicData]);

  // ✅ Submit Function (Modified for Edit)
  const handleSubmitForm = async values => {
    const token = await AsyncStorage.getItem('userToken');

    const req = {
      clinicId: clinicData?._id, // Include the clinic ID for update
      clinicName: values.clinicName,
      pincode: values.pincode,
      locality: values.address, // Using 'address' from form for 'locality' in API
      city: values.city,
      state: values.state,
      lat: marker.latitude,
      lng: marker.longitude,
    };

    try {
      setIsLoading(true);

      const response = await ApiRequest({
        // Assuming addDoctorClinicDetail can handle updates,
        // otherwise, you might need a separate API route like ApiRoutes.updateDoctorClinicDetail
        BASEURL: ApiRoutes.updateDoctorClinicDetail, // You might need to change this if there's a specific update endpoint
        method: 'POST', // Or 'PUT'/'PATCH' for updates, adjust as per your API
        req: req,
        token: token,
      });

      const resData = await decryptData(response.data);

      console.log('------------resData-------', resData);

      if (resData?.code === 200 || resData?.code === 201) {
        showSuccessToast('Success', resData?.message);
        navigation.navigate('AllClinics');
      } else {
        showErrorToast('Failed', resData?.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Clinic Update Error:', error?.message || error);
      showErrorToast('Failed', error?.message || 'Error while updating clinic');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        // Initialize form values from clinicData
        initialValues={{
          clinicName: clinicData?.clinicName || '',
          pincode: clinicData?.pincode || '',
          address: clinicData?.locality || '', // Assuming 'locality' is the full address
          state: clinicData?.state || '',
          city: clinicData?.city || '',
          location: clinicData?.locality || '', // Pre-fill GooglePlacesAutocomplete with current address
        }}
        validationSchema={ClinicSchema}
        onSubmit={handleSubmitForm}
        enableReinitialize={true} // Important for updating initialValues if route params change
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={{flex: 1}}>
            <HeaderCompt title={'Edit Clinic Details'} />
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 30,
                paddingHorizontal: 12,
              }}>
              {/* Clinic + Pincode */}
              <View style={styles.row}>
                <View style={{flex: 1}}>
                  <InputCompt
                    label="Clinic Name"
                    placeholder="Enter clinic name"
                    value={values.clinicName}
                    onChangeText={handleChange('clinicName')}
                    onBlur={handleBlur('clinicName')}
                  />
                  {touched.clinicName && errors.clinicName && (
                    <Text style={styles.error}>{errors.clinicName}</Text>
                  )}
                </View>

                <View style={{flex: 1}}>
                  <InputCompt
                    label="Pincode"
                    placeholder="Enter pincode"
                    keyboardType="numeric"
                    value={values.pincode}
                    onChangeText={handleChange('pincode')}
                    onBlur={handleBlur('pincode')}
                  />
                  {touched.pincode && errors.pincode && (
                    <Text style={styles.error}>{errors.pincode}</Text>
                  )}
                </View>
              </View>

              {/* Address */}
              <InputCompt
                label="Address"
                placeholder="Full address..."
                value={values.address}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
              />
              {touched.address && errors.address && (
                <Text style={styles.error}>{errors.address}</Text>
              )}

              {/* State + City */}
              <View style={styles.row}>
                <View style={{flex: 1}}>
                  <InputCompt
                    label="State"
                    placeholder="Enter state"
                    value={values.state}
                    onChangeText={handleChange('state')}
                    onBlur={handleBlur('state')}
                  />
                  {touched.state && errors.state && (
                    <Text style={styles.error}>{errors.state}</Text>
                  )}
                </View>
                <View style={{flex: 1}}>
                  <InputCompt
                    label="City"
                    placeholder="Enter city"
                    value={values.city}
                    onChangeText={handleChange('city')}
                    onBlur={handleBlur('city')}
                  />
                  {touched.city && errors.city && (
                    <Text style={styles.error}>{errors.city}</Text>
                  )}
                </View>
              </View>

              {/* Google Places Autocomplete */}
              <Text style={styles.label}>Search Location</Text>
              <GooglePlacesAutocomplete
                placeholder="Search location..."
                textInputProps={{
                  placeholderTextColor: Colors.GRAY,
                  fontFamily: Fonts.PoppinsRegular,
                }}
                fetchDetails={true}
                // Set defaultValue to pre-fill the search input
                defaultValue={values.location}
                onPress={(data, details = null) => {
                  const lat = details?.geometry.location.lat;
                  const lng = details?.geometry.location.lng;

                  // ✅ update region & marker
                  setRegion({...region, latitude: lat, longitude: lng});
                  setMarker({latitude: lat, longitude: lng});

                  // ✅ auto-fill address, city, state
                  const addressComponents = details?.address_components || [];
                  const getComponent = type =>
                    addressComponents.find(c => c.types.includes(type))
                      ?.long_name;

                  setFieldValue('address', data.description);
                  setFieldValue('location', data.description);
                  setFieldValue('city', getComponent('locality') || '');
                  setFieldValue(
                    'state',
                    getComponent('administrative_area_level_1') || '',
                  );
                  setFieldValue('pincode', getComponent('postal_code') || '');
                }}
                query={{
                  key: AppConstant.MAPKEY,
                  language: 'en',
                  components: 'country:in',
                }}
                styles={{
                  textInput: styles.input,
                  description: {
                    color: Colors.BLACK,
                    fontSize: 14,
                    fontFamily: Fonts.PoppinsRegular,
                  },
                  listView: {
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    elevation: 3,
                    zIndex: 1000,
                    marginTop: 5,
                  },
                }}
              />

              {/* Google Map */}
              <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={reg => setRegion(reg)}
                onPress={e => setMarker(e.nativeEvent.coordinate)}>
                <Marker
                  coordinate={marker}
                  draggable
                  onDragEnd={e => setMarker(e.nativeEvent.coordinate)}
                />
              </MapView>

              {/* Submit Button */}
              <ButtonCompt
                isLoading={isLoading}
                onPress={handleSubmit}
                title={'Update Clinic'}
              />
            </ScrollView>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default EditClinic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  row: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 8,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
    color: Colors.BLACK,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
    color: '#333',
    fontFamily: Fonts.PoppinsMedium,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 4,
  },
  map: {
    height: 250,
    borderRadius: 10,
    marginTop: 10,
  },
});
