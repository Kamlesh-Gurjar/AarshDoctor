import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Reports = () => {
  return (
    <View style={styles.container}>
      <Text>Reports</Text>
      {/* You can add a list of medical reports here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default Reports;