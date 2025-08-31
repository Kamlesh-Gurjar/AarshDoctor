// // src/navigation/Tabs.js
// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import CustomTabBar from '../components/common/CustomTabBar';
// import Appointments from '../screens/appointments/Appointments';
// import CalendarScreen from '../screens/bottomtabs/calendar/CalendarScreen';
// import SlotsScreen from '../screens/bottomtabs/slotes/SlotsScreen';
// import Profile from '../screens/bottomtabs/profile/Profile';

// const Tab = createBottomTabNavigator();

// const Tabs = () => {
//   return (
//     <Tab.Navigator
//       tabBar={props => <CustomTabBar {...props} />}
//       screenOptions={{headerShown: false}}>
//       <Tab.Screen
//         name="Appointments"
//         component={Appointments}
//         options={{tabBarLabel: 'Appointments'}}
//       />
//       <Tab.Screen
//         name="Calendar"
//         component={CalendarScreen}
//         options={{tabBarLabel: 'Calendar'}}
//       />
//       <Tab.Screen
//         name="Slots"
//         component={SlotsScreen}
//         options={{tabBarLabel: 'Slots'}}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{tabBarLabel: 'Profile'}}
//       />
//     </Tab.Navigator>
//   );
// };

// export default Tabs;

// src/navigation/Tabs.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from '../components/common/CustomTabBar'; // Ensure this path is correct
import Appointments from '../screens/appointments/Appointments';
import CalendarScreen from '../screens/bottomtabs/calendar/CalendarScreen';
import SlotsScreen from '../screens/bottomtabs/slotes/SlotsScreen';
import Profile from '../screens/bottomtabs/profile/Profile';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />} // This line passes props to your custom tab bar
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Appointments"
        component={Appointments}
        options={{tabBarLabel: 'Appointments'}}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{tabBarLabel: 'Calendar'}}
      />
      <Tab.Screen
        name="Slots"
        component={SlotsScreen}
        options={{tabBarLabel: 'Slots'}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{tabBarLabel: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
