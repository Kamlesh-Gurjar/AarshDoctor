import { StyleSheet } from 'react-native';
import Fonts from '../../../theme/Fonts';
import { Colors } from '../../../theme/Colors';


const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: Colors.APPCOLOR,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clinicInfo: {
    flex: 1,
    marginRight: 10,
  },
  clinicName: {
    fontSize: 18,
    color: Colors.BLACK,
    marginBottom: 6,
    fontFamily: Fonts.PoppinsMedium,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoIcon: {
    marginRight: 8,
  },
  locationText: {
    fontSize: 13,
    color: '#555',
    fontFamily: Fonts.PoppinsRegular,
    flexShrink: 1, // Allows text to wrap
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  iconBtn: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBtn: {
    borderColor: Colors.APPCOLOR,
  },
  deleteBtn: {
    borderColor: 'red',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: Fonts.PoppinsMedium,
    marginBottom: 10,
    color: Colors.BLACK,
    textAlign: 'center',
  },
  modalMsg: {
    fontSize: 15,
    color: '#444',
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 22,
    fontFamily:Fonts.PoppinsRegular
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Changed to space-around for better spacing
    marginTop: 10,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100, // Ensure buttons have a minimum width
    alignItems: 'center',
  },
  btnText: {
    fontSize: 15,
    fontFamily: Fonts.PoppinsMedium,
  },
});


export default styles