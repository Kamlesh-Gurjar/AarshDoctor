import {StyleSheet} from 'react-native';
import {Colors} from '../../../theme/Colors';
import Fonts from '../../../theme/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },

  form: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 12,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsMedium,
  },
  radioContainer: {
    flexDirection: 'row',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  radio: {
    // width: 20,
    // height: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.GRAY,
    marginRight: 8,
    // padding: 2,
    borderWidth: 1,
  },
  radioSelected: {
    backgroundColor: Colors.GRAY,
    borderRadius: 50,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 8,
  },
  dropdownOptions: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 8,
  },
  dropdownOption: {
    padding: 12,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsMedium,
  },
  dropdownOptionSelected: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    borderBottomColor: Colors.APPCOLOR,
    borderBottomWidth: 0.5,
  },
  dropdownOptionText: {
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsRegular,
  },
  dropdownOptionTextSelected: {
    color: Colors.WHITE,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default styles;
