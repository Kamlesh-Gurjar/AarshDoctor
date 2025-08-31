import {StyleSheet} from 'react-native';
import Fonts from '../../../theme/Fonts';
import {Colors} from '../../../theme/Colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  container: {
    flex: 1,
  },
  // Custom Tab Bar Styles
  tabBar: {
    flexDirection: 'row',
    // height: 50,
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.GRAY,
    marginTop: 10,
    marginHorizontal: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBlockColor:Colors.LIGHT_GRAY
  },
  tabText: {
    fontSize: 14,
    fontFamily: Fonts.PoppinsMedium,
    color: Colors.GRAY,
    paddingBottom: 5,
  },
  activeTabText: {
    color: Colors.APPCOLOR,
    backgroundColor: Colors.WHITE,
    width: '80%',
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor:Colors.APPCOLOR

    // borderWidth: 0.5,
    // borderColor: Colors.APPCOLOR,
    // borderRadius: 50,
    // paddingVertical: 5,
  },
  activeIndicator: {
    // height: 2,
    // width: '100%',
    // backgroundColor: Colors.APPCOLOR,
    // position: 'absolute',
    // bottom: 0,
  },
  // List Styles
  listContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 18,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsMedium,
  },
  addButton: {
    flexDirection: 'row',
    // backgroundColor: Colors.APPCOLOR,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.APPCOLOR,
  },
  addButtonText: {
    color: Colors.APPCOLOR,
    marginLeft: 5,
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
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
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.GRAY,
    paddingBottom: 10,
  },
  clinicName: {
    fontSize: 16,
    color: Colors.BLACK,
    flex: 1,
    fontFamily: Fonts.PoppinsMedium,
    marginRight: 4,
  },
  icons: {
    flexDirection: 'row',
  },
  slotsContainer: {
    paddingTop: 10,
  },
  dayContainer: {
    marginBottom: 5,
  },
  dayText: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsMedium,
  },
  slotText: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsRegular,
  },
  noSlotText: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsRegular,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsRegular,
    fontSize: 16,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
