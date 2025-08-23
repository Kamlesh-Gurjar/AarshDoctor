// src/components/CustomTabBar.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import {Colors} from '../../theme/Colors';

const {width} = Dimensions.get('window');

const CustomTabBar = ({state, descriptors, navigation}) => {
  const icons = {
    Appointments: 'event',
    Calendar: 'calendar-today',
    Slots: 'access-time',
    Profile: 'account-circle',
  };

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
            <Icon
              name={icons[route.name]}
              size={24}
              color={isFocused ? Colors.APPCOLOR : Colors.GRAY}
            />
            <Text
              style={{
                color: isFocused ? Colors.APPCOLOR : Colors.GRAY,
                fontSize: 12,
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
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomTabBar;
