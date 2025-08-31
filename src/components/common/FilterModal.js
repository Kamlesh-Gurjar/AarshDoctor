import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import {Colors} from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import imageindex from '../../assets/images/imageindex';

const FilterModal = ({visible, onClose, onApply}) => {
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const modes = ['online', 'offline'];
  const statuses = [
    'Completed',
    'Confirmed',
    'Pending',
    'Rescheduled',
    'confirm',
  ];
  const types = ['doctorConsultation', 'doctorVideoConsultation'];

  const handleApply = () => {
    onApply({mode: selectedMode, status: selectedStatus, type: selectedType});
    onClose();
  };

  const renderOption = (item, selected, setSelected) => (
    <Pressable
      style={[styles.option, selected === item && {backgroundColor: '#4a90e2'}]}
      onPress={() => setSelected(item)}>
      <Text style={[styles.optionText, selected === item && {color: '#fff'}]}>
        {item}
      </Text>
    </Pressable>
  );

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={styles.heading}>Filter Appointments</Text>
            <Pressable onPress={() => onClose()}>
              <Image
                source={imageindex.cancel}
                style={{height: 20, width: 20, tintColor: Colors.GRAY}}
              />
            </Pressable>
          </View>

          <Text style={styles.label}>Mode</Text>
          <View style={styles.row}>
            {modes.map(m => renderOption(m, selectedMode, setSelectedMode))}
          </View>

          <Text style={styles.label}>Status</Text>
          <View style={styles.rowWrap}>
            {statuses.map(s =>
              renderOption(s, selectedStatus, setSelectedStatus),
            )}
          </View>

          <Text style={styles.label}>Type</Text>
          <View style={styles.row}>
            {types.map(t => renderOption(t, selectedType, setSelectedType))}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => onClose()}>
              <Text style={{color: '#333', fontFamily: Fonts.PoppinsMedium}}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
              <Text
                style={{color: Colors.WHITE, fontFamily: Fonts.PoppinsMedium}}>
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 5,
    // textAlign: 'center',
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsSemiBold,
  },
  label: {
    fontSize: 14,
    marginTop: 5,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsMedium,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  option: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
    margin: 5,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    fontFamily: Fonts.PoppinsRegular,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelBtn: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#eee',
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  applyBtn: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: Colors.APPCOLOR,
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
  },
});
