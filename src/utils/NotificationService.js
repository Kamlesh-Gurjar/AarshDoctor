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
