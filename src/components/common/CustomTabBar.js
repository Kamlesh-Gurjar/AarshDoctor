// // src/components/CustomTabBar.js
// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import Icon from '@react-native-vector-icons/material-icons';
// import {Colors} from '../../theme/Colors';
// import Fonts from '../../theme/Fonts';

// const {width} = Dimensions.get('window');

// const CustomTabBar = ({state, descriptors, navigation}) => {
//   const icons = {
//     Appointments: 'event',
//     Calendar: 'calendar-today',
//     Slots: 'access-time',
//     Profile: 'account-circle',
//   };

//   return (
//     <View style={styles.tabBarContainer}>
//       {state.routes.map((route, index) => {
//         const {options} = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;
//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         return (
//           <TouchableOpacity
//             key={index}
//             accessibilityRole="button"
//             accessibilityState={isFocused ? {selected: true} : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             style={styles.tabButton}>
//             <Icon
//               name={icons[route.name]}
//               size={24}
//               color={isFocused ? Colors.APPCOLOR : Colors.GRAY}
//             />
//             <Text
//               style={{
//                 color: isFocused ? Colors.APPCOLOR : Colors.GRAY,
//                 fontSize: 12,
//                 fontFamily: Fonts.PoppinsMedium,
//               }}>
//               {label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   tabBarContainer: {
//     flexDirection: 'row',
//     height: 60,
//     backgroundColor: 'white',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: -2},
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//     justifyContent: 'space-around',
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   tabButton: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default CustomTabBar;

// src/components/CustomTabBar.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard, // Import Keyboard
} from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import {Colors} from '../../theme/Colors'; // Assuming this path is correct for your project
import Fonts from '../../theme/Fonts'; // Assuming this path is correct for your project

const {width} = Dimensions.get('window');

const CustomTabBar = ({state, descriptors, navigation}) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false); // State to track keyboard visibility

  useEffect(() => {
    // Event listener for when the keyboard shows up
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // Set state to true when keyboard is open
      },
    );
    // Event listener for when the keyboard hides
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // Set state to false when keyboard is closed
      },
    );

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const icons = {
    Appointments: 'event',
    Calendar: 'calendar-today',
    Slots: 'access-time',
    Profile: 'account-circle',
  };

  // If the keyboard is visible, return null to hide the entire tab bar component
  if (keyboardVisible) {
    return null;
  }

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabButton}>
            <View
              style={{
                backgroundColor: 'red',
                width: '60%',
                alignItems: 'center',
                backgroundColor: isFocused ? Colors.BACKGRONDCOLOR : null,
                borderRadius: 50,
                paddingVertical: 2,
              }}>
              <Icon
                name={icons[route.name]}
                size={22}
                color={isFocused ? Colors.APPCOLOR : Colors.GRAY}
              />
            </View>

            <Text
              allowFontScaling={false}
              style={{
                color: isFocused ? Colors.APPCOLOR : Colors.GRAY,
                fontSize: 11,
                fontFamily: Fonts.PoppinsMedium,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: Colors.WHITE,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'space-around',
    position: 'absolute', // Ensures the tab bar is at the bottom
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 1,
  },
});

export default CustomTabBar;
