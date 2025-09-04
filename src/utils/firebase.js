// import messaging from '@react-native-firebase/messaging';
// import { Alert, Platform } from 'react-native';

// // Request user permission
// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     getFcmToken();
//   }
// }

// // Get FCM Token
// async function getFcmToken() {
//   try {
//     const token = await messaging().getToken();
//     console.log("FCM Token:", token);
//     return token;
//   } catch (error) {
//     console.log("Error getting FCM token", error);
//   }
// }

// // Foreground message listener
// export const notificationListener = () => {
//   messaging().onMessage(async remoteMessage => {
//     Alert.alert(
//       remoteMessage.notification.title,
//       remoteMessage.notification.body
//     );
//   });
// };
