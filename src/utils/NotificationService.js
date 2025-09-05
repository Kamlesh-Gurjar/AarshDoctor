// import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';
// import {ApiRoutes} from './ApiRoutes';
// import ApiRequest from '../network/ApiRequest';

// // Request user permission for notifications
// export const requestUserPermission = async () => {
//   const authStatus = await messaging().requestPermission();
//   if (
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL
//   ) {
//     console.log('Notification permission granted.');
//   } else {
//     console.log('Notification permission denied.');
//   }
// };

// // Get the FCM token
// export const getFcmToken = async () => {
//   const token = await messaging().getToken();

//   const response = await ApiRequest({
//     BASEURL: ApiRoutes.updateFcmToken,
//     req: {
//       fcmToken: token,
//     },
//     method: 'POST',
//   });

//   console.log('FCM Token:', token);
//   return token; // Send this token to your backend server
// };

// // Configure push notifications
// export const configurePushNotifications = () => {
//   messaging().onMessage(async remoteMessage => {
//     // Handle foreground notifications
//     console.log('Foreground notification:', remoteMessage);
//     PushNotification.localNotification({
//       title: remoteMessage.notification.title,
//       message: remoteMessage.notification.body,
//     });
//   });

//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log('Notification caused app to open:', remoteMessage);
//   });

//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log('App opened by notification:', remoteMessage);
//       }
//     });

//   // Get the device's FCM token and listen for refresh
//   messaging().onTokenRefresh(async token => {
//     const response = await MainApiRequest({
//       BASEURL: ApiRoutes.updateFcmToken,
//       req: {
//         fcmToken: token,
//       },
//       method: 'POST',
//     });

//     console.log('FCM Token refreshed:', token);
//     // Send the updated token to your backend
//   });
// };

import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import ApiRequest from '../network/ApiRequest';
import {ApiRoutes} from './ApiRoutes';
import {Alert} from 'react-native';

// // Request user permission for notifications
// export const requestUserPermission = async () => {
//   const authStatus = await messaging().requestPermission();
//   if (
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL
//   ) {
//     console.log('Notification permission granted.');
//   } else {
//     console.log('Notification permission denied.');
//   }
// };

// export const requestUserPermission = async () => {
//   return new Promise(resolve => {
//     Alert.alert(
//       'Enable Notifications',
//       'This app would like to send you notifications for updates and reminders.',
//       [
//         {
//           text: 'No Thanks',
//           onPress: () => {
//             console.log('User denied via custom popup');
//             resolve(false);
//           },
//           style: 'cancel',
//         },
//         {
//           text: 'Allow',
//           onPress: async () => {
//             try {
//               const authStatus = await messaging().requestPermission();
//               const enabled =
//                 authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//                 authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//               if (enabled) {
//                 console.log('Notification permission granted.');
//                 resolve(true);
//               } else {
//                 console.log('Notification permission denied.');
//                 resolve(false);
//               }
//             } catch (error) {
//               console.log('Permission error:', error);
//               resolve(false);
//             }
//           },
//         },
//       ],
//     );
//   });
// };

export const requestUserPermission = () => {
  return new Promise((resolve) => {
    Alert.alert(
      "Allow Notifications",
      "This app would like to send you notifications about updates and reminders.",
      [
        {
          text: "Don't Allow",
          onPress: () => {
            console.log("User denied notification permission (custom popup).");
            resolve(false);
          },
          style: "cancel",
        },
        {
          text: "Allow",
          onPress: async () => {
            try {
              // Ye line native OS ka permission popup kholti hai
              const authStatus = await messaging().requestPermission();
              const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

              if (enabled) {
                console.log("✅ Notification permission granted.");
                resolve(true);
              } else {
                console.log("❌ Notification permission denied.");
                resolve(false);
              }
            } catch (err) {
              console.log("Permission error:", err);
              resolve(false);
            }
          },
        },
      ]
    );
  });
};

// Get the FCM token
export const getFcmToken = async () => {
  const token = await messaging().getToken();

  const response = await ApiRequest({
    BASEURL: ApiRoutes.updateFcmToken,
    req: {
      email: '',
      password: '',
      isWeb: false,
      deviceToken: token,
      deviceType: 'mobile',
    },
    method: 'POST',
  });
  console.log('--------------', response);
  console.log('FCM Token:', token);
  return token; // Send this token to your backend server
};

// Configure push notifications
export const configurePushNotifications = () => {
  messaging().onMessage(async remoteMessage => {
    // Handle foreground notifications
    console.log('Foreground notification:', remoteMessage);
    PushNotification.localNotification({
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
    });
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification caused app to open:', remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('App opened by notification:', remoteMessage);
      }
    });

  // Get the device's FCM token and listen for refresh
  messaging().onTokenRefresh(async token => {
    const response = await ApiRequest({
      BASEURL: ApiRoutes.updateFcmToken,
      req: {
        email: '',
        password: '',
        isWeb: false,
        deviceToken: token,
        deviceType: 'mobile',
      },
      method: 'POST',
    });

    console.log('FCM Token refreshed:', token);
    // Send the updated token to your backend
  });
};
