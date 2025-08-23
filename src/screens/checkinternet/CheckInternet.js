import React from 'react';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
 
import imageindex from '../../assets/images/imageindex';
import { Colors } from '../../theme/Colors';
import Fonts from '../../theme/Fonts';

const CheckInternet = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.WHITE} />
      <Image
        resizeMode="center"
        source={imageindex.nowifi}
        style={{height: 200, width: 200}}
      />
      <Text style={styles.text}>
        No Internet. Please check your connection.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  text: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    fontFamily: Fonts.PoppinsRegular,
    width: '80%',
    marginTop: 20,
  },
});

export default CheckInternet;
