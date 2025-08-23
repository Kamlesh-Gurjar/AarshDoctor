import React, {memo} from 'react';
import {Image, TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import imageindex from '../../assets/images/imageindex';
import {Colors} from '../../theme/Colors';
import Fonts from '../../theme/Fonts';

const HeaderCompt = ({
  title,
  showBack = true,
  leftimage,
  rightIcon,
  onPressRight,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {leftimage && (
        <Image
          source={leftimage}
          style={{height: 40, width: 40, borderRadius: 40}}
        />
      )}
      {showBack && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image source={imageindex.back} style={styles.backIcon} />
        </TouchableOpacity>
      )}

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {rightIcon && (
        <TouchableOpacity
          style={[
            styles.backButton,
            {borderWidth: 0, borderColor: Colors.APPCOLOR, borderRadius: 0},
          ]}
          onPress={onPressRight}>
          <Image source={rightIcon} style={styles.backIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(HeaderCompt);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  backButton: {
    padding: 5,
    borderWidth: 0.5,
    borderColor: Colors.APPCOLOR,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    height: 18,
    width: 18,
    tintColor: Colors.APPCOLOR,
  },
  title: {
    fontSize: 16,
    color: Colors.BLACK,
    marginLeft: 15,
    fontFamily: Fonts.PoppinsMedium,
    opacity: 0.9,
    flex: 1,
  },
});
