 import { StyleSheet } from 'react-native';
import Fonts from '../../theme/Fonts';
import { Colors } from '../../theme/Colors';

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     padding: 20,
     backgroundColor: Colors.WHITE,
   },
   logo: {alignSelf: 'center', height: 100, width: 200, resizeMode: 'center'},
   descriptiontext: {
     textAlign: 'center',
     fontFamily: Fonts.PoppinsRegular,
     color: Colors.BLACK,
     opacity: 0.7,
   },
   errorText: {
     fontSize: 12,
     color: 'red',
     marginBottom: 10,
     fontFamily: Fonts.PoppinsRegular,
   },
   forgottext: {
     color: Colors.APPCOLOR,
     fontFamily: Fonts.PoppinsMedium,
     textAlign: 'right',
   },
 });

 export default styles