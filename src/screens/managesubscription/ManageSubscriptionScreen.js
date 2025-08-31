// screens/Profile/ManageSubscriptionScreen.js (adjust path as needed)
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import {ButtonCompt, HeaderCompt} from '../../components';
import Fonts from '../../theme/Fonts';
import {Colors} from '../../theme/Colors';

// Sample Data
const subscriptionData = [
  {
    id: '1',
    planName: 'Test Plan',
    joinDate: '8/11/2025',
    nextPayment: '11/11/2025',
    price: 116.82,
    status: 'PAID',
  },
  {
    id: '2',
    planName: 'Test Plan',
    joinDate: '8/11/2025',
    nextPayment: '11/11/2025',
    price: 116.82,
    status: 'PAID',
  },
];

const SubscriptionCard = ({item}) => {
  const handleCancel = () => {
    Alert.alert(
      'Cancel Plan',
      `Are you sure you want to cancel the "${item.planName}"?`,
      [{text: 'No'}, {text: 'Yes', style: 'destructive'}],
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.planName}>{item.planName}</Text>
        <View style={styles.paidBadge}>
          <Text style={styles.paidText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.joinDate}>Joined on {item.joinDate}</Text>
      <View style={styles.detailRow}>
        <Icon name="calendar-today" size={16} color={Colors.GRAY_DARK} />
        <Text style={styles.detailText}>
          Next payment is on {item.nextPayment}
        </Text>
      </View>
      <View style={styles.detailRow}>
        <Icon name="monetization-on" size={16} color={Colors.GRAY_DARK} />
        <Text style={styles.detailText}>Plan Price: ₹{item.price}</Text>
      </View>

      <ButtonCompt
        title={'Cancel Plan'}
        onPress={handleCancel}
        style={{backgroundColor: Colors.RED}}
      />
    </View>
  );
};

const ManageSubscriptionScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderCompt title={'Manage Subscription'} />
      <FlatList
        data={subscriptionData}
        renderItem={({item}) => <SubscriptionCard item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={() => (
          <Text style={styles.screenTitle}>Your Active Plans</Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: Colors.WHITE},
  listContainer: {padding: 20},
  screenTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsMedium,
  },
  // Card styles
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 20,
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
    marginBottom: 10,
  },
  planName: {
    fontSize: 18,
    fontFamily: Fonts.PoppinsMedium,
    color: Colors.BLACK,
  },
  paidBadge: {
    backgroundColor: '#d4edda',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 50,
  },
  paidText: {
    color: '#155724',
    fontSize: 12,
    fontFamily: Fonts.PoppinsMedium,
  },
  joinDate: {
    fontSize: 13,
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.GRAY,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 10,
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.BLACK,
  },
});

export default ManageSubscriptionScreen;
