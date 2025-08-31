import React, {memo} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../../theme/Colors';
import Fonts from '../../theme/Fonts';

const CustomPicker = ({label, selectedValue, onValueChange, items, style}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      {/* This wrapper provides the consistent bordered look */}
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
          dropdownIconColor={Colors.BLACK} // Makes the dropdown arrow visible
        >
          {items.map(item => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5, // Default spacing
  },
  label: {
    marginBottom: 4,
    color: Colors.BLACK,
    fontSize: 14,
    fontFamily: Fonts.PoppinsSemiBold,
    opacity: 0.8,
  },
  pickerWrapper: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    // On Android, the picker is a dropdown modal, so we need to ensure
    // the wrapper has a consistent height.
    height: 48,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    color: Colors.BLACK,
    // On iOS, the picker is a wheel and doesn't sit nicely inside a short container.
    // This negative margin trick helps to make it look vertically centered.
    // For a fully custom UI, a modal-based picker is often better on iOS.
    ...Platform.select({
      ios: {
        marginTop: -10,
      },
      android: {
        height: '100%',
      },
    }),
  },
});

export default memo(CustomPicker);
