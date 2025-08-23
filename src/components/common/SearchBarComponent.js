import React, { memo } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import imageindex from '../../assets/images/imageindex';

const SearchBarComponent = ({ onSearch, value }) => {
  return (
    <View style={styles.container}>
      {/* Search Icon */}
      <Image
        source={imageindex.search}
        style={styles.icon}
      />

      {/* Search Input */}
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={onSearch}
        value={value}
        placeholderTextColor={Colors.GRAY}
      />

      {/* Clear Icon (only show if text exists) */}
      {value?.length > 0 && (
        <TouchableOpacity onPress={() => onSearch('')}>
          <Image
            source={imageindex.cancel}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    marginHorizontal: 10,
    marginVertical: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    flex:1
  },
  icon: {
    height: 20,
    width: 20,
    tintColor: Colors.APPCOLOR,
  },
  input: {
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsRegular,
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
  },
});

export default memo(SearchBarComponent);
