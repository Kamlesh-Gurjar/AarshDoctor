import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {Store} from './src/redux/store';
import {LogBox} from 'react-native';
import AppNavavigation from './src/appnavigation/AppNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {CheckInternet} from './src/screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

// Ignore the gesture-handler warning
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

let persistor = persistStore(Store);

const App = () => {
  const [isConnected, setIsConnected] = useState<any>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={{flex: 1}}>
            {isConnected ? <AppNavavigation /> : <CheckInternet />}
            <Toast />
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   FlatList,
//   Dimensions,
// } from 'react-native';
// import {
//   HMSSDK,
//   HMSUpdateListenerActions,
//   HMSConfig,
//   HMSPeer,
//   HMSTrack,
//   HMSVideoView,
// } from '@100mslive/react-native-hms';

// const App = () => {
//   const [hmsInstance, setHmsInstance] = useState(null);
//   const [isJoined, setIsJoined] = useState(false);
//   const [peers, setPeers] = useState([]);

//   const tokenEndpoint = 'YOUR_TOKEN_ENDPOINT'; // Apne 100ms dashboard se token endpoint yahan dalein

//   useEffect(() => {
//     const initializeHMS = async () => {
//       const instance = await HMSSDK.build();
//       setHmsInstance(instance);

//       instance.addEventListener(
//         HMSUpdateListenerActions.ON_PEER_UPDATE,
//         onPeerListener,
//       );
//       instance.addEventListener(
//         HMSUpdateListenerActions.ON_TRACK_UPDATE,
//         onTrackListener,
//       );
//     };

//     initializeHMS();

//     return () => {
//       hmsInstance?.removeEventListener(HMSUpdateListenerActions.ON_PEER_UPDATE);
//       hmsInstance?.removeEventListener(HMSUpdateListenerActions.ON_TRACK_UPDATE);
//     };
//   }, []);

//   const getAuthTokenByRoomCode = async () => {
//     // Is function ko aapko apne server par implement karna hoga
//     // Suraksha ke liye, token hamesha server se generate karein
//     // Yahan hum ek dummy implementation dikha rahe hain
//     const response = await fetch(`${tokenEndpoint}api/token`, {
//         method: 'POST',
//         body: JSON.stringify({
//             user_id: `user_${Date.now()}`, // Ek unique user ID
//             room_id: 'YOUR_ROOM_ID', // Apne dashboard se ek room ID yahan dalein
//             role: 'host', // Ya 'guest'
//         }),
//     });
//     const { token } = await response.json();
//     return token;
//   };

//   const joinRoom = async () => {
//     if (!hmsInstance) {
//       console.warn('HMS instance is not ready yet');
//       return;
//     }

//     const authToken = await getAuthTokenByRoomCode();
//     const config = new HMSConfig({
//       authToken: authToken,
//       username: `User ${Math.floor(Math.random() * 1000)}`,
//     });

//     hmsInstance.join(config);
//   };

//   const onPeerListener = (data) => {
//     // Room mein peers (users) ke join ya leave hone par yeh function call hota hai
//     console.log('ON_PEER_UPDATE', data);
//     setPeers(data.peers);
//   };

//   const onTrackListener = (data) => {
//     // Kisi peer ke audio ya video track mein badlav hone par yeh call hota hai
//     console.log('ON_TRACK_UPDATE', data);
//     setPeers([...data.peers]);
//   };

//   const leaveRoom = () => {
//     hmsInstance?.leave();
//     setIsJoined(false);
//     setPeers([]);
//   };

//   const renderPeer = ({ item }) => {
//     return (
//       <View style={styles.peerContainer}>
//         {item.videoTrack?.trackId ? (
//           <HMSVideoView
//             trackId={item.videoTrack.trackId}
//             style={styles.videoView}
//           />
//         ) : (
//           <View style={styles.avatar}>
//             <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
//           </View>
//         )}
//         <Text style={styles.peerName}>{item.name}</Text>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {isJoined ? (
//         <>
//           <FlatList
//             data={peers}
//             renderItem={renderPeer}
//             keyExtractor={(item) => item.peerID}
//             numColumns={2}
//           />
//           <Button title="Leave Room" onPress={leaveRoom} />
//         </>
//       ) : (
//         <Button title="Join Room" onPress={joinRoom} />
//       )}
//     </View>
//   );
// };

// const { width } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   peerContainer: {
//     width: width / 2 - 20,
//     height: width / 2,
//     margin: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#e0e0e0',
//     borderRadius: 8,
//   },
//   videoView: {
//     width: '100%',
//     height: '100%',
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: 'purple',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   avatarText: {
//     fontSize: 40,
//     color: 'white',
//   },
//   peerName: {
//     position: 'absolute',
//     bottom: 10,
//     color: 'white',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     padding: 5,
//     borderRadius: 5,
//   },
// });

// export default App;
