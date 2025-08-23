import React, {memo} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../theme/Colors';
import Fonts from '../../theme/Fonts';

const ButtonCompt = ({title, onPress, isLoading,style}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button,style]}
      onPress={onPress}
      disabled={isLoading} // Disable button when loading
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.APPCOLOR,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20,
    minHeight: 50,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: Fonts.PoppinsMedium,
  },
});

export default memo(ButtonCompt);
