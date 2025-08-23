import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PaymentHistory from '../payment_history/PaymentHistory';
import Reports from '../reports/Reports';

const AppointmentDetailsScreen = () => {
  const [activeTab, setActiveTab] = useState('Payment History');

  const renderContent = () => {
    switch (activeTab) {
      case 'Payment History':
        return <PaymentHistory />;
      case 'Reports':
        return <Reports />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient's Previous Appointment Summary</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Payment History' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Payment History')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Payment History' && styles.activeTabText,
            ]}>
            Payment History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Reports' && styles.activeTab]}
          onPress={() => setActiveTab('Reports')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Reports' && styles.activeTabText,
            ]}>
            Reports
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 7,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  tabText: {
    fontSize: 16,
    color: '#6c757d',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    marginTop: 1, // To show the line underneath the tabs
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
  },
});

export default AppointmentDetailsScreen;
