import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {Colors} from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
// import styles from '../../screens/bottomtabs/slotes/styles.slotes';

const ClinicCard = ({clinicName, slots,item}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.clinicName}>{clinicName}</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => navigation.navigate('EditSlots',{item:item})}>
            <MaterialIcons name="edit" size={24} color="#3498db" />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 15}}>
            <MaterialIcons name="delete" size={24} color="#e74c3c" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.slotsContainer}>
        <FlatList
          data={slots}
          renderItem={({item}) => {
            // console.log('--------itemmain-------', item);
            return (
              <View style={styles.dayContainer}>
                <Text style={styles.dayText}>{item?.dayOfWeek}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                  }}>
                  {item?.slots?.length > 0 ? (
                    item?.slots?.map((item, index) => (
                      <Text style={styles.slotText}>
                        {item?.startTime} → {item?.endTime}
                      </Text>
                    ))
                  ) : (
                    <Text style={styles.noSlotText}>-</Text>
                  )}
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default memo(ClinicCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
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
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.GRAY,
    paddingBottom: 10,
  },
  clinicName: {
    fontSize: 16,
    color: Colors.BLACK,
    flex: 1,
    fontFamily: Fonts.PoppinsMedium,
    marginRight: 4,
  },
  icons: {
    flexDirection: 'row',
  },
  slotsContainer: {
    paddingTop: 10,
  },
  dayContainer: {
    marginBottom: 5,
  },
  dayText: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsMedium,
  },
  slotText: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsRegular,
  },
  noSlotText: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsRegular,
  },
});
