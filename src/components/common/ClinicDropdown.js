// import React, {memo, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   FlatList,
// } from 'react-native';
// import {Colors} from '../../theme/Colors';
// import Fonts from '../../theme/Fonts';

// const ClinicDropdown = ({clinics}) => {
//   const [selectedClinic, setSelectedClinic] = useState('');
//   const [isVisible, setIsVisible] = useState(false);

//   const handleSelect = clinic => {
//     setSelectedClinic(clinic?.clinicName);
//     setIsVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Select Clinic</Text>

//       {/* Dropdown Button */}
//       <TouchableOpacity
//         style={styles.dropdownBtn}
//         onPress={() => setIsVisible(true)}>
//         <Text style={styles.dropdownText}>
//           {selectedClinic || 'Select Clinic'}
//         </Text>
//       </TouchableOpacity>

//       {/* Dropdown List Modal */}
//       <Modal visible={isVisible} transparent animationType="fade">
//         <TouchableOpacity
//           style={styles.overlay}
//           activeOpacity={1}
//           onPressOut={() => setIsVisible(false)}>
//           <View style={styles.dropdownList}>
//             <FlatList
//               data={clinics}
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={({item}) => (
//                 <TouchableOpacity
//                   style={styles.option}
//                   onPress={() => handleSelect(item)}>
//                   <Text style={styles.optionText}>{item?.clinicName}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: 10,
//   },
//   heading: {
//     fontSize: 16,
//     marginBottom: 5,
//     color: Colors.BLACK,
//     fontFamily: Fonts.PoppinsMedium,
//   },
//   dropdownBtn: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 6,
//     padding: 12,
//     justifyContent: 'center',
//   },
//   dropdownText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dropdownList: {
//     backgroundColor: '#fff',
//     width: '80%',
//     borderRadius: 6,
//     paddingVertical: 10,
//     maxHeight: 300,
//   },
//   option: {
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#ccc',
//   },
//   optionText: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default memo(ClinicDropdown);

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import {Colors} from '../../theme/Colors';
import Fonts from '../../theme/Fonts';

const ClinicDropdown = ({clinics, onSelect}) => {
  const [selectedClinic, setSelectedClinic] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = clinic => {
    setSelectedClinic(clinic?.clinicName);
    setIsVisible(false);

    // 🔥 send value back to parent
    if (onSelect) {
      onSelect(clinic);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Clinic</Text>

      {/* Dropdown Button */}
      <TouchableOpacity
        style={styles.dropdownBtn}
        onPress={() => setIsVisible(true)}>
        <Text style={styles.dropdownText}>
          {selectedClinic || 'Select Clinic'}
        </Text>
      </TouchableOpacity>

      {/* Dropdown List Modal */}
      <Modal visible={isVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setIsVisible(false)}>
          <View style={styles.dropdownList}>
            <FlatList
              data={clinics}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}>
                  <Text style={styles.optionText}>{item?.clinicName}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  heading: {
    fontSize: 16,
    marginBottom: 5,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsMedium,
  },
  dropdownBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsRegular,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownList: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 6,
    paddingVertical: 10,
    maxHeight: 300,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: Colors.BLACK,
    fontFamily: Fonts.PoppinsRegular,
  },
});

export default ClinicDropdown;
