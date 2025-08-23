import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PaymentHistory = () => {
  return (
    <View style={styles.container}>
      <Text>PaymentHistory</Text>
      {/* You can add a list of payment records here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default PaymentHistory;