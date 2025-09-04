import {StyleSheet} from 'react-native';
import {Colors} from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  // --- Custom Tab Bar Styles ---
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: Colors.WHITE,
    paddingTop: 10,
    // borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tabButton: {
    flex: 1,
    // alignItems: 'center',
    paddingBottom: 10,
    marginHorizontal: 8,
  },
  tabText: {
    fontSize: 13,
    textTransform: 'capitalize',
    fontFamily: Fonts.PoppinsMedium,
    textAlign: 'center',
  },
  activeTabText: {
    color: Colors.APPCOLOR,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: Colors.APPCOLOR,
  },
  inactiveTabText: {
    color: Colors.BLACK,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: Colors.GRAY,
    opacity: 0.6,
  },
  activeIndicator: {
    height: 3,
    width: '60%',
    backgroundColor: Colors.PRIMARY,
    marginTop: 8,
    borderRadius: 2,
  },
  // --- Content and Screen Styles ---
  contentContainer: {
    flex: 1,
    marginTop: -10,
  },
  listContainer: {
    flex: 1,
    // backgroundColor: '#f8f9fa',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: Colors.GRAY,
    fontFamily: Fonts.PoppinsRegular,
  },
});

export default styles;
