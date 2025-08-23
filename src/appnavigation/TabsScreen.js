// import {
//   View,
//   Text,
//   Keyboard,
//   BackHandler,
//   Alert, // or use a custom modal instead
// } from 'react-native';
// import React, {useEffect, useState, useCallback} from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {useFocusEffect, useNavigationState} from '@react-navigation/native';
// import {Appointment, Setting, History, Home, Search} from '../screens';
// import {CustomBottomTabs} from '../customcomponent';

// const TabsScreen = () => {
//   const Tab = createBottomTabNavigator();
//   const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       'keyboardDidShow',
//       () => setIsKeyboardVisible(true),
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       'keyboardDidHide',
//       () => setIsKeyboardVisible(false),
//     );

//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);

//   // This gives you the current route name (screen)
//   const currentRouteName = useNavigationState(state => {
//     const route = state.routes[state.index];
//     return route.name;
//   });

//   useFocusEffect(
//     useCallback(() => {
//       const onBackPress = () => {
//         if (currentRouteName === 'Home') {
//           // Show confirmation alert or custom popup
//           Alert.alert(
//             'Exit App',
//             'Are you sure you want to exit?',
//             [
//               {text: 'Cancel', style: 'cancel'},
//               {text: 'Yes', onPress: () => BackHandler.exitApp()},
//             ],
//             {cancelable: false},
//           );
//           return true; // prevent default back behavior
//         }
//         return false; // allow normal back behavior for other screens
//       };

//       BackHandler.addEventListener('hardwareBackPress', onBackPress);

//       return () =>
//         BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//     }, [currentRouteName]),
//   );

//   return (
//     <Tab.Navigator initialRouteName='Home'
//       screenOptions={{headerShown: false,}}
//       tabBar={props => (
//         <CustomBottomTabs {...props} isKeyboardVisible={isKeyboardVisible} />
//       )}>
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Search" component={Search} />
//       <Tab.Screen name="Appointment" component={Appointment} />
//       <Tab.Screen name="History" component={History} />
//       <Tab.Screen name="Setting" component={Setting} />
//     </Tab.Navigator>
//   );
// };

// export default TabsScreen;
