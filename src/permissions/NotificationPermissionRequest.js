// NotificationPermissionRequest.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const requestPermissionFirebase = async () => {
  try {
    // iOS and Android (Firebase will handle iOS UNAuthorization and Android token retrieval)
    const authStatus = await messaging().requestPermission({
      alert: true,
      badge: true,
      sound: true,
      provisional: false, // set true if you want provisional on iOS
    });

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    return {granted: enabled, authStatus};
  } catch (e) {
    console.warn('requestPermissionFirebase error:', e);
    return {granted: false, error: e};
  }
};

const requestAndroidNotificationPermission = async () => {
  // Android 13+ needs POST_NOTIFICATIONS runtime permission
  if (Platform.OS !== 'android') return {granted: true};

  try {
    if (Platform.Version < 33) {
      // pre-Android 13: permission auto-granted for notifications
      return {granted: true};
    }

    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'Notification Permission',
        message: 'App wants to send you notifications',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
    );

    return {granted: result === PermissionsAndroid.RESULTS.GRANTED, result};
  } catch (e) {
    console.warn('requestAndroidNotificationPermission error:', e);
    return {granted: false, error: e};
  }
};

export default function NotificationPermissionRequest() {
  const [status, setStatus] = useState({checked: false, granted: false});

  useEffect(() => {
    // call on component mount (or call from a button)
    askForNotificationPermission();
  }, []);

  const askForNotificationPermission = async () => {
    // Optional : show explanatory popup before asking (better UX)
    Alert.alert(
      'Allow Notifications?',
      'We would like to send you notifications for updates and appointments.',
      [
        {
          text: 'No',
          onPress: () => setStatus({checked: true, granted: false}),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            // Android runtime permission (Android 13+)
            const androidRes = await requestAndroidNotificationPermission();
            if (!androidRes.granted && Platform.OS === 'android') {
              // user denied runtime permission on Android
              setStatus({checked: true, granted: false});
              return;
            }

            // Firebase / iOS request (also works on Android to get token permission state)
            const firebaseRes = await requestPermissionFirebase();
            const granted = !!firebaseRes.granted;

            setStatus({checked: true, granted});

            if (granted) {
              // get FCM token if needed
              try {
                const fcmToken = await messaging().getToken();
                console.log('FCM token:', fcmToken);
                // send token to your server if required
              } catch (e) {
                console.warn('getToken error:', e);
              }
            } else {
              // Optionally guide user to settings
              Alert.alert(
                'Notifications blocked',
                'If you want to enable notifications later, open app settings.',
                [
                  {text: 'Cancel', style: 'cancel'},
                  {
                    text: 'Open Settings',
                    onPress: () => {
                      // open app settings
                      Linking.openSettings();
                    },
                  },
                ],
              );
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  //   return (
  //     <View style={{ padding: 16 }}>
  //       <Text>Notification permission:</Text>
  //       <Text>
  //         {status.checked
  //           ? status.granted
  //             ? 'Granted ✅'
  //             : 'Denied ❌'
  //           : 'Not asked yet'}
  //       </Text>

  //       <View style={{ height: 12 }} />

  //       <Button title="Ask for Notification Permission" onPress={askForNotificationPermission} />
  //     </View>
  //   );
}
