import React, {useState} from 'react';
import {View, ActivityIndicator, StyleSheet, StatusBar} from 'react-native';
import {WebView} from 'react-native-webview';
import {Colors} from '../../theme/Colors';

const MeetingScreen = ({route}) => {
  const {roomUrl} = route.params;
  const [loading, setLoading] = useState(true);

  return (
    <View style={{flex: 1, backgroundColor: Colors.BLACK}}>
      <StatusBar backgroundColor={Colors.BLACK} barStyle={'light-content'} />
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.APPCOLOR} />
        </View>
      )}
      <WebView
        source={{uri: roomUrl}}
        style={{flex: 1, backgroundColor: Colors.BLACK}}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // optional background
    zIndex: 1,
  },
});

export default MeetingScreen;

// import React, {useEffect, useState, useRef} from 'react';
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   PermissionsAndroid,
//   Platform,
//   Alert,
// } from 'react-native';
// import {
//   HMSSDK,
//   HMSSessionStore,
//   HMSRoom,
//   HMSPeer,
//   HMSTrack,
//   HMSVideoView,
//   HMSUpdateListenerActions,
//   HMSLocalPeer,
//   HMSRemotePeer,
//   HMSRoomUpdate,
//   HMSTrackUpdate,
//   HMSPermissions,
//   HMSMessage,
//   HMSLogLevel,
//   HMSTrackSource, // For finding tracks
//   HMSTrackType,   // For finding tracks
// } from '@100mslive/react-native-hms';

// const HMS_AUTH_TOKEN_ENDPOINT = 'https://prod-in2.100ms.live/hmsapi/ankit-videoconf-1723.app.100ms.live/api/token'; // आपका 100ms Token Endpoint

// const MeetingScreen = ({route}) => {
//   const {roomUrl} = route.params; // Assume roomUrl is passed via navigation params

//   console.log("--------roomUrl----------",route)
//   const [hmsSDK, setHmsSDK] = useState(null);
//   const [room, setRoom] = useState(null);
//   const [localPeer, setLocalPeer] = useState(null);
//   const [remotePeers, setRemotePeers] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const hmsRef = useRef(null); // Use ref to store HMS instance

//   // Helper function to find video/audio track from a peer
//   const findVideoTrack = (peer) => {
//     return peer?.tracks?.find(
//       (track) => track.source === HMSTrackSource.REGULAR && track.type === HMSTrackType.VIDEO
//     );
//   };

//   const findAudioTrack = (peer) => {
//     return peer?.tracks?.find(
//       (track) => track.source === HMSTrackSource.REGULAR && track.type === HMSTrackType.AUDIO
//     );
//   };

//   useEffect(() => {
//     // Request permissions
//     const requestPermissions = async () => {
//       if (Platform.OS === 'android') {
//         try {
//           const granted = await PermissionsAndroid.requestMultiple([
//             PermissionsAndroid.PERMISSIONS.CAMERA,
//             PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//           ]);
//           if (
//             granted['android.permission.CAMERA'] ===
//               PermissionsAndroid.RESULTS.GRANTED &&
//             granted['android.permission.RECORD_AUDIO'] ===
//               PermissionsAndroid.RESULTS.GRANTED
//           ) {
//             console.log('Camera and microphone permissions granted');
//             initializeHMS();
//           } else {
//             Alert.alert(
//               'Permissions Denied',
//               'Camera and microphone permissions are required for video calls.',
//             );
//           }
//         } catch (err) {
//           console.warn(err);
//         }
//       } else {
//         initializeHMS();
//       }
//     };

//     requestPermissions();

//     return () => {
//       // Clean up on component unmount
//       if (hmsRef.current) {
//         hmsRef.current.leave();
//         hmsRef.current = null;
//         setHmsSDK(null);
//         setRoom(null);
//         setLocalPeer(null);
//         setRemotePeers([]);
//         setMessages([]);
//       }
//     };
//   }, []);

//   const initializeHMS = async () => {
//     try {
//       // Set log level for debugging
//       const hmsInstance = await HMSSDK.build({
//         // logLevel: HMSLogLevel.VERBOSE // Uncomment for more detailed logs
//       });
//       hmsRef.current = hmsInstance; // Store instance in ref
//       setHmsSDK(hmsInstance);
//       console.log('HMS SDK initialized');
//       setupHMSListeners(hmsInstance);
//       joinRoom(hmsInstance, roomUrl);
//     } catch (error) {
//       console.error('Failed to initialize HMS SDK:', error);
//       Alert.alert('Error', 'Failed to initialize video call SDK.');
//     }
//   };

//   const setupHMSListeners = hmsInstance => {
//     hmsInstance.addEventListener(
//       HMSUpdateListenerActions.ON_ROOM_UPDATE,
//       ({room, update}) => {
//         console.log('ON_ROOM_UPDATE', update, room);
//         setRoom(room);
//       },
//     );

//     hmsInstance.addEventListener(
//       HMSUpdateListenerActions.ON_JOIN,
//       ({room, localPeer}) => {
//         console.log('ON_JOIN', room, localPeer);
//         setRoom(room);
//         setLocalPeer(localPeer); // localPeer should have initial tracks here
//       },
//     );

//     hmsInstance.addEventListener(
//       HMSUpdateListenerActions.ON_PEER_UPDATE,
//       ({peer, update}) => {
//         console.log('ON_PEER_UPDATE', update, peer);
//         // If the updated peer is the local peer, update its state
//         if (localPeer && peer.peerID === localPeer.peerID) {
//             setLocalPeer(peer);
//             return; // Exit as localPeer is handled
//         }
//         if (update === 'PEER_JOINED') {
//           setRemotePeers(prev => [...prev, peer]);
//         } else if (update === 'PEER_LEFT') {
//           setRemotePeers(prev => prev.filter(p => p.peerID !== peer.peerID));
//         } else if (update === 'PEER_UPDATED' || update === 'ROLE_UPDATED') {
//           setRemotePeers(prev =>
//             prev.map(p => (p.peerID === peer.peerID ? peer : p)),
//           );
//         }
//       },
//     );

//     hmsInstance.addEventListener(
//       HMSUpdateListenerActions.ON_TRACK_UPDATE,
//       ({peer, track, update}) => {
//         console.log('ON_TRACK_UPDATE', update, peer, track);

//         // Handle local peer's track updates
//         if (localPeer && peer.peerID === localPeer.peerID) {
//           setLocalPeer(prev => {
//             if (!prev) return prev;
//             // Update the specific track within localPeer's tracks array
//             const updatedTracks = prev.tracks?.map(t =>
//               t.trackId === track.trackId ? track : t
//             ) || [];
//             if (!updatedTracks.find(t => t.trackId === track.trackId)) {
//                 updatedTracks.push(track); // If track was not found, add it (e.g., TRACK_ADDED)
//             }
//             return { ...prev, tracks: updatedTracks };
//           });
//           return; // Exit as localPeer track is handled
//         }

//         // Handle remote peer's track updates
//         setRemotePeers(prev =>
//           prev.map(p => {
//             if (p.peerID === peer.peerID) {
//               const existingTrackIndex = p.tracks?.findIndex(t => t.trackId === track.trackId);
//               let updatedTracks = p.tracks ? [...p.tracks] : [];

//               if (update === 'TRACK_ADDED') {
//                 if (existingTrackIndex === -1) { // Only add if not already present
//                     updatedTracks.push(track);
//                 }
//               } else if (update === 'TRACK_REMOVED') {
//                 updatedTracks = updatedTracks.filter(t => t.trackId !== track.trackId);
//               } else if (update === 'TRACK_MUTED' || update === 'TRACK_UNMUTED' || update === 'TRACK_DESCRIPTION_CHANGED') {
//                 if (existingTrackIndex !== -1) {
//                   updatedTracks[existingTrackIndex] = track; // Update existing track object
//                 } else {
//                     // This case is unlikely for mute/unmute if track was already present
//                     // but good to ensure track is there if not
//                     updatedTracks.push(track);
//                 }
//               }
//               return {...p, tracks: updatedTracks};
//             }
//             return p;
//           }),
//         );
//       },
//     );

//     hmsInstance.addEventListener(
//       HMSUpdateListenerActions.ON_MESSAGE,
//       ({message}) => {
//         console.log('ON_MESSAGE', message);
//         setMessages(prev => [...prev, message]);
//       },
//     );

//     hmsInstance.addEventListener(
//       HMSUpdateListenerActions.ON_ERROR,
//       ({error}) => {
//         console.error('HMS_ERROR', error);
//         Alert.alert(
//           'Video Call Error',
//           error.description || 'An unknown error occurred.',
//         );
//       },
//     );

//     hmsInstance.addEventListener(
//       HMSUpdateListenerActions.ON_RECONNECTING,
//       () => {
//         console.log('ON_RECONNECTING');
//       },
//     );

//     hmsInstance.addEventListener(
//       HMSUpdateListenerActions.ON_RECONNECTED,
//       () => {
//         console.log('ON_RECONNECTED');
//       },
//     );
//   };

//   const joinRoom = async (hmsInstance, url) => {
//     console.log("--------------url--------------",url)
//     try {
//       console.log('Attempting to join room with URL:', url);

//       // Extract room code from the URL for backend if needed
//       const urlParts = url.split('/');
//       const roomCode = urlParts[urlParts.length - 1]; // "cbj-bbak-ssz"

//       const response = await fetch(HMS_AUTH_TOKEN_ENDPOINT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           // You need to send the room_code (or room_id) and user_id/role to your token endpoint
//           room_id: roomCode, // Assuming your backend takes room_id
//           user_id: `user_${Math.random().toString(36).substring(7)}`, // Generate a unique user ID
//           role: 'host', // Or 'guest', 'viewer' etc. based on your application
//         }),
//       });

//       const data = await response.json();
//       const authToken = data.token; // Your backend should return a token

//       if (!authToken) {
//         throw new Error('No authentication token received from backend.');
//       }

//       console.log('Joining room with token:', authToken);
//       await hmsInstance.join({
//         authToken,
//         userName: `React Native User ${Math.floor(Math.random() * 100)}`, // Replace with actual user name
//         metaData: JSON.stringify({device: 'mobile'}), // Optional metadata
//       });
//       console.log('Successfully joined room!');
//     } catch (error) {
//       console.error('Failed to join room:', error);
//       Alert.alert(
//         'Error Joining Room',
//         error.message || 'Could not join the video call room.',
//       );
//     }
//   };

//   const leaveRoom = async () => {
//     if (hmsRef.current) {
//       await hmsRef.current.leave();
//       console.log('Left room');
//       setRoom(null);
//       setLocalPeer(null);
//       setRemotePeers([]);
//       setMessages([]);
//     }
//   };

//   const toggleLocalVideo = async () => {
//     if (localPeer && hmsRef.current) {
//       const videoTrack = findVideoTrack(localPeer);
//       if (videoTrack) {
//         await hmsRef.current.setLocalVideoEnabled(!videoTrack.enabled);
//         // State update will be handled by ON_TRACK_UPDATE listener
//       }
//     }
//   };

//   const toggleLocalAudio = async () => {
//     if (localPeer && hmsRef.current) {
//       const audioTrack = findAudioTrack(localPeer);
//       if (audioTrack) {
//         await hmsRef.current.setLocalAudioEnabled(!audioTrack.enabled);
//         // State update will be handled by ON_TRACK_UPDATE listener
//       }
//     }
//   };

//   if (!hmsSDK) {
//     return (
//       <View style={styles.container}>
//         <Text>Initializing HMS SDK...</Text>
//       </View>
//     );
//   }

//   // Find local video and audio tracks for rendering and button states
//   const localVideoTrack = findVideoTrack(localPeer);
//   const localAudioTrack = findAudioTrack(localPeer);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>
//         {room ? `Room: ${room.name}` : 'Not Connected'}
//       </Text>

//       {localPeer && (
//         <View style={styles.localVideoContainer}>
//           <Text style={styles.peerName}>You: {localPeer.name}</Text>
//           {localVideoTrack && localVideoTrack.isMute !== true && (
//             <HMSVideoView
//               style={styles.localVideo}
//               trackId={localVideoTrack.trackId}
//               mirror={true} // Mirror local video for self-view
//             />
//           )}
//           {(!localVideoTrack || localVideoTrack.isMute === true) && (
//             <View style={styles.mutedPlaceholder}>
//               <Text style={styles.mutedText}>Video Off</Text>
//             </View>
//           )}
//           <View style={styles.controls}>
//             <Button
//               title={
//                 localVideoTrack && localVideoTrack.enabled
//                   ? 'Turn Off Video'
//                   : 'Turn On Video'
//               }
//               onPress={toggleLocalVideo}
//             />
//             <Button
//               title={
//                 localAudioTrack && localAudioTrack.enabled
//                   ? 'Mute Audio'
//                   : 'Unmute Audio'
//               }
//               onPress={toggleLocalAudio}
//             />
//           </View>
//         </View>
//       )}

//       <Text style={styles.subheader}>Remote Participants:</Text>
//       <View style={styles.remoteVideosContainer}>
//         {remotePeers.map(peer => {
//           const videoTrack = findVideoTrack(peer); // Find video track for remote peer
//           return (
//             <View key={peer.peerID} style={styles.remoteVideoWrapper}>
//               <Text style={styles.peerName}>{peer.name}</Text>
//               {videoTrack && videoTrack.isMute !== true ? (
//                 <HMSVideoView
//                   style={styles.remoteVideo}
//                   trackId={videoTrack.trackId}
//                 />
//               ) : (
//                 <View style={styles.mutedPlaceholder}>
//                   <Text style={styles.mutedText}>Video Off</Text>
//                 </View>
//               )}
//             </View>
//           );
//         })}
//         {remotePeers.length === 0 && <Text>No other participants yet.</Text>}
//       </View>

//       <View style={styles.buttonContainer}>
//         <Button title="Leave Room" onPress={leaveRoom} color="red" />
//       </View>

//       <Text style={styles.subheader}>Chat Messages:</Text>
//       <View style={styles.messageContainer}>
//         {messages.map((msg, index) => (
//           <Text key={index} style={styles.messageText}>
//             <Text style={{fontWeight: 'bold'}}>
//               {msg.sender?.name || 'Unknown'}:
//             </Text>{' '}
//             {msg.message}
//           </Text>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f0f0f0',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   subheader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   localVideoContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 20,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   localVideo: {
//     width: '100%',
//     height: 200,
//     backgroundColor: 'black',
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   mutedPlaceholder: {
//     width: '100%',
//     height: 200,
//     backgroundColor: '#ccc',
//     borderRadius: 8,
//     marginTop: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   mutedText: {
//     color: '#666',
//     fontSize: 16,
//   },
//   controls: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     marginTop: 10,
//   },
//   remoteVideosContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     marginTop: 10,
//   },
//   remoteVideoWrapper: {
//     width: '48%', // Approx half width for two videos per row
//     aspectRatio: 1, // Make it square
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginBottom: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   remoteVideo: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 8,
//     backgroundColor: 'black',
//   },
//   peerName: {
//     position: 'absolute',
//     top: 5,
//     left: 5,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     color: 'white',
//     paddingHorizontal: 5,
//     borderRadius: 3,
//     fontSize: 12,
//     zIndex: 1,
//   },
//   buttonContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   messageContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 10,
//     marginTop: 10,
//     maxHeight: 150,
//     overflow: 'scroll',
//   },
//   messageText: {
//     fontSize: 14,
//     marginBottom: 5,
//   },
// });

// export default MeetingScreen;

// import React, {useEffect, useState, useRef} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import {
//   HMSSDK,
//   HMSUpdateListenerActions,
//   HMSRoomUpdate,
//   HMSPeerUpdate,
//   HMSTrackUpdate,
//   HMSMessage,
//   HMSException,
//   HMSAudioTrack,
//   HMSRoom,
//   HMSPeer,
//   HMSConfig,
// } from '@100mslive/react-native-hms';
// import {HeaderCompt} from '../../components';
// import Fonts from '../../theme/Fonts';
// import {Colors} from '../../theme/Colors';

// const MeetingScreen = ({route, navigation}) => {
//   const {roomUrl} = route.params;

//   console.log('----roomUrl--', roomUrl);

//   // const getMeetingId = url => {
//   //   try {
//   //     // Get everything after the last slash
//   //     const parts = url.split('/');
//   //     return parts[parts.length - 1];
//   //   } catch (error) {
//   //     return null;
//   //   }
//   // };

//   const getMeetingId = url => {
//     try {
//       const parts = url.split('/');
//       return parts[parts.length - 1];
//     } catch {
//       return null;
//     }
//   };

//   const uniqueMettingId = getMeetingId(roomUrl);

//   console.log('-------uniqueMettingId-----', uniqueMettingId);

//   const [hms, setHms] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [peers, setPeers] = useState([]);
//   const [localPeer, setLocalPeer] = useState(null);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const hmsInstanceRef = useRef(null);

//   useEffect(() => {
//     async function initializeHms() {
//       try {
//         const hmsSDK = await HMSSDK.build();
//         hmsInstanceRef.current = hmsSDK;
//         setHms(hmsSDK);
//         console.log('HMS SDK Initialized');

//         hmsSDK.addEventListener(HMSUpdateListenerActions.ON_JOIN, onJoin);
//         hmsSDK.addEventListener(
//           HMSUpdateListenerActions.ON_ROOM_UPDATE,
//           onRoomUpdate,
//         );
//         hmsSDK.addEventListener(
//           HMSUpdateListenerActions.ON_PEER_UPDATE,
//           onPeerUpdate,
//         );
//         hmsSDK.addEventListener(
//           HMSUpdateListenerActions.ON_TRACK_UPDATE,
//           onTrackUpdate,
//         );
//         hmsSDK.addEventListener(HMSUpdateListenerActions.ON_ERROR, onError);
//         hmsSDK.addEventListener(HMSUpdateListenerActions.ON_MESSAGE, onMessage);
//         hmsSDK.addEventListener(
//           HMSUpdateListenerActions.ON_RECONNECTING,
//           onReconnecting,
//         );
//         hmsSDK.addEventListener(
//           HMSUpdateListenerActions.ON_RECONNECTED,
//           onReconnected,
//         );

//         await joinRoom(hmsSDK);
//       } catch (error) {
//         console.error('HMS SDK Initialization or Join Error:', error);
//         Alert.alert('Error', 'Failed to initialize 100ms SDK or join room.');
//         setIsLoading(false);
//       }
//     }

//     initializeHms();

//     return () => {
//       if (hmsInstanceRef.current) {
//         hmsInstanceRef.current.removeEventListener(
//           HMSUpdateListenerActions.ON_JOIN,
//           onJoin,
//         );
//         hmsInstanceRef.current.removeEventListener(
//           HMSUpdateListenerActions.ON_ROOM_UPDATE,
//           onRoomUpdate,
//         );
//         hmsInstanceRef.current.removeEventListener(
//           HMSUpdateListenerActions.ON_PEER_UPDATE,
//           onPeerUpdate,
//         );
//         hmsInstanceRef.current.removeEventListener(
//           HMSUpdateListenerActions.ON_TRACK_UPDATE,
//           onTrackUpdate,
//         );
//         hmsInstanceRef.current.removeEventListener(
//           HMSUpdateListenerActions.ON_ERROR,
//           onError,
//         );
//         hmsInstanceRef.current.removeEventListener(
//           HMSUpdateListenerActions.ON_MESSAGE,
//           onMessage,
//         );
//         hmsInstanceRef.current.removeEventListener(
//           HMSUpdateListenerActions.ON_RECONNECTING,
//           onReconnecting,
//         );
//         hmsInstanceRef.current.removeEventListener(
//           HMSUpdateListenerActions.ON_RECONNECTED,
//           onReconnected,
//         );

//         hmsInstanceRef.current.leave();
//         hmsInstanceRef.current = null;
//       }
//     };
//   }, []);

//   // const joinRoom = async sdkInstance => {
//   //   const roomCode = uniqueMettingId || 'xeh-psdo-jbv';
//   //   const userName = 'Kamlesh';

//   //   try {
//   //     setIsLoading(true);

//   //     // 🔑 Token fetch
//   //     const authToken = await sdkInstance.getAuthTokenByRoomCode(roomCode);

//   //     console.log('AuthToken:', authToken);
//   //     console.log('UserName:', userName);

//   //     // ✅ HMSConfig sahi tarike se banao
//   //     const config = new HMSConfig(authToken, userName);

//   //     await sdkInstance.join(config);

//   //     console.log('Successfully requested to join room');
//   //   } catch (error) {
//   //     console.error('Failed to get auth token or join room:', error);
//   //     Alert.alert('Error', `Failed to join room: ${error.message}`);
//   //     setIsLoading(false);
//   //     navigation.goBack();
//   //   }
//   // };

//   // const joinRoom = async sdkInstance => {
//   //   const roomCode = uniqueMettingId || 'xeh-psdo-jbv';
//   //   const userName = 'Kamlesh'; // Ensure userName is defined

//   //   try {
//   //     setIsLoading(true);

//   //     // 🔑 Token fetch
//   //     const authToken = await sdkInstance.getAuthTokenByRoomCode(roomCode);

//   //     console.log('AuthToken:', authToken);
//   //     console.log('UserName:', userName);

//   //     // ✅ HMSConfig sahi tarike se banao - pass an object
//   //     const config = new HMSConfig({
//   //       authToken: authToken,
//   //       userName: userName,
//   //     });

//   //     await sdkInstance.join(config);

//   //     console.log('Successfully requested to join room');
//   //   } catch (error) {
//   //     console.error('Failed to get auth token or join room:', error);
//   //     Alert.alert('Error', `Failed to join room: ${error.message}`);
//   //     setIsLoading(false);
//   //     navigation.goBack();
//   //   }
//   // };

//   //   const joinRoom = async sdkInstance => {
//   //   const roomCode = uniqueMettingId || 'xeh-psdo-jbv';
//   //   const userName = 'Kamlesh';

//   //   try {
//   //     setIsLoading(true);

//   //     // 🔑 get auth token (testing only)
//   //     const authToken = await sdkInstance.getAuthTokenByRoomCode(roomCode);

//   //     console.log('AuthToken:', authToken);
//   //     console.log('UserName:', userName);

//   //     // ✅ HMSConfig expects (authToken, userName)
//   //     const config = new HMSConfig(authToken, userName);

//   //     await sdkInstance.join(config);

//   //     console.log('Successfully requested to join room');
//   //   } catch (error) {
//   //     console.error('Failed to get auth token or join room:', error);
//   //     Alert.alert('Error', `Failed to join room: ${error.message}`);
//   //     setIsLoading(false);
//   //     navigation.goBack();
//   //   }
//   // };

//   const joinRoom = async sdkInstance => {
//     const roomCode = uniqueMettingId || 'xeh-psdo-jbv';
//     const userName = 'Kamlesh';

//     try {
//       setIsLoading(true);

//       // 🔑 Token fetch (for dev/testing)
//       const authToken = await sdkInstance.getAuthTokenByRoomCode(roomCode);

//       console.log('AuthToken:', authToken);
//       console.log('UserName:', userName);

//       // ✅ FIX: pass args separately
//       const config = new HMSConfig(authToken, userName);

//       await sdkInstance.join(config);

//       console.log('Successfully requested to join room');
//     } catch (error) {
//       console.error('Failed to get auth token or join room:', error);
//       Alert.alert('Error', `Failed to join room: ${error.message}`);
//       setIsLoading(false);
//       navigation.goBack();
//     }
//   };

//   // Event Listener Callbacks
//   const onJoin = (room: HMSRoom) => {
//     console.log('Joined Room:', room.name);
//     setIsConnected(true);
//     setLocalPeer(room.localPeer);
//     const initialPeers = room.peers || [];
//     setPeers(initialPeers.filter(p => !p.isLocal));
//     setIsLoading(false);
//   };

//   const onRoomUpdate = ({
//     room,
//     update,
//   }: {
//     room: HMSRoom,
//     update: HMSRoomUpdate,
//   }) => {
//     console.log('Room Update:', update, room.name);
//   };

//   const onPeerUpdate = ({
//     peer,
//     update,
//   }: {
//     peer: HMSPeer,
//     update: HMSPeerUpdate,
//   }) => {
//     console.log('Peer Update:', peer.name, update);
//     setPeers(prevPeers => {
//       const existingPeerIndex = prevPeers.findIndex(
//         p => p.peerID === peer.peerID,
//       );
//       if (update === HMSPeerUpdate.PEER_JOINED) {
//         if (existingPeerIndex === -1 && !peer.isLocal) {
//           return [...prevPeers, peer];
//         }
//       } else if (update === HMSPeerUpdate.PEER_LEFT) {
//         if (existingPeerIndex !== -1) {
//           return prevPeers.filter(p => p.peerID !== peer.peerID);
//         }
//       } else if (
//         update === HMSPeerUpdate.ROLE_UPDATED ||
//         update === HMSPeerUpdate.METADATA_UPDATED
//       ) {
//         if (existingPeerIndex !== -1) {
//           const newPeers = [...prevPeers];
//           newPeers[existingPeerIndex] = peer;
//           return newPeers;
//         }
//       }
//       return prevPeers;
//     });

//     if (peer.isLocal) {
//       setLocalPeer(peer);
//     }
//   };

//   const onTrackUpdate = ({
//     peer,
//     track,
//     update,
//   }: {
//     peer: HMSPeer,
//     track: HMSTrack,
//     update: HMSTrackUpdate,
//   }) => {
//     console.log('Track Update:', peer.name, track?.type, update);

//     if (peer.isLocal && track?.type === 'audio') {
//       setIsMuted(!track.enabled);
//     }

//     setPeers(prevPeers => {
//       return prevPeers.map(p => {
//         if (p.peerID === peer.peerID) {
//           return peer;
//         }
//         return p;
//       });
//     });
//   };

//   const onError = (error: HMSException) => {
//     console.error('HMS Error:', error);
//     Alert.alert('Error', `An error occurred: ${error.message}`);
//   };

//   const onMessage = (message: HMSMessage) => {
//     console.log('New Message:', message.message);
//   };

//   const onReconnecting = () => {
//     console.warn('Reconnecting to room...');
//   };

//   const onReconnected = () => {
//     console.log('Reconnected to room!');
//   };

//   const toggleMute = async () => {
//     if (!hms || !localPeer) return;

//     try {
//       const audioTrack = localPeer.audioTrack;
//       if (audioTrack) {
//         await hms.setLocalAudioEnabled(!isMuted);
//         setIsMuted(!isMuted);
//         console.log('Audio Toggled:', !isMuted);
//       }
//     } catch (error) {
//       console.error('Failed to toggle mute:', error);
//       Alert.alert('Error', 'Failed to toggle microphone.');
//     }
//   };

//   const leaveMeeting = async () => {
//     if (hms) {
//       await hms.leave();
//       console.log('Left room');
//       navigation.goBack();
//     }
//   };

//   if (isLoading) {
//     return (
//       <View style={styles.centeredContainer}>
//         <ActivityIndicator size="large" color={Colors?.PRIMARY_BLUE} />
//         <Text style={styles.loadingText}>Joining room...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <HeaderCompt title={'Video Calling'} />
//       <Text style={styles.header}>100ms Audio Room</Text>
//       {isConnected ? (
//         <View style={styles.connectedContainer}>
//           <Text style={styles.statusText}>
//             Connected to: {roomUrl.split('/')[2]}
//           </Text>
//           {localPeer && (
//             <Text style={styles.localPeerText}>
//               You: {localPeer.name} (ID: {localPeer.peerID})
//             </Text>
//           )}

//           <Text style={styles.peersHeader}>Participants:</Text>
//           {peers.length === 0 && (
//             <Text style={styles.noPeersText}>No other participants yet.</Text>
//           )}
//           {peers.map(peer => (
//             <View key={peer.peerID} style={styles.peerCard}>
//               <Text style={styles.peerName}>{peer.name}</Text>
//               {peer.audioTrack && (
//                 <Text style={styles.peerAudioStatus}>
//                   {peer.audioTrack.enabled ? '🔊' : '🔇'}
//                 </Text>
//               )}
//             </View>
//           ))}

//           <View style={styles.controls}>
//             <TouchableOpacity
//               style={[styles.controlButton, isMuted && styles.mutedButton]}
//               onPress={toggleMute}>
//               <Text style={styles.controlButtonText}>
//                 {isMuted ? 'Unmute' : 'Mute'}
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.leaveButton} onPress={leaveMeeting}>
//               <Text style={styles.leaveButtonText}>Leave</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ) : (
//         <View style={styles.disconnectedContainer}>
//           <Text style={styles.statusText}>Connecting to room...</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors?.LIGHT_GRAY,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   centeredContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: Colors?.LIGHT_GRAY,
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: Colors?.BLACK,
//     fontFamily: Fonts?.PoppinsMedium,
//   },
//   header: {
//     fontSize: 24,
//     fontFamily: Fonts?.PoppinsBold,
//     color: Colors?.BLACK,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   connectedContainer: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 20,
//   },
//   disconnectedContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   statusText: {
//     fontSize: 16,
//     color: Colors?.BLACK,
//     fontFamily: Fonts?.PoppinsMedium,
//     marginBottom: 10,
//   },
//   localPeerText: {
//     fontSize: 15,
//     color: Colors?.DARK_GRAY,
//     fontFamily: Fonts?.PoppinsRegular,
//     marginBottom: 20,
//   },
//   peersHeader: {
//     fontSize: 18,
//     fontFamily: Fonts?.PoppinsSemiBold,
//     color: Colors?.BLACK,
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   peerCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: Colors?.WHITE,
//     borderRadius: 8,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     marginVertical: 5,
//     width: '90%',
//     shadowColor: Colors?.BLACK,
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   peerName: {
//     fontSize: 16,
//     fontFamily: Fonts?.PoppinsMedium,
//     color: Colors?.BLACK,
//   },
//   peerAudioStatus: {
//     fontSize: 18,
//   },
//   controls: {
//     flexDirection: 'row',
//     marginTop: 'auto', // कंट्रोल्स को नीचे की तरफ धकेलें
//     marginBottom: 20,
//     width: '100%',
//     justifyContent: 'space-around',
//   },
//   controlButton: {
//     backgroundColor: Colors?.PRIMARY_BLUE,
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 30,
//     minWidth: 100,
//     alignItems: 'center',
//   },
//   mutedButton: {
//     backgroundColor: Colors?.RED,
//   },
//   controlButtonText: {
//     color: Colors?.WHITE,
//     fontSize: 16,
//     fontFamily: Fonts?.PoppinsMedium,
//   },
//   leaveButton: {
//     backgroundColor: Colors?.RED,
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 30,
//     minWidth: 100,
//     alignItems: 'center',
//   },
//   leaveButtonText: {
//     color: Colors?.WHITE,
//     fontSize: 16,
//     fontFamily: Fonts?.PoppinsMedium,
//   },
// });

// export default MeetingScreen;

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import {
//   HMSRoomProvider,
//   useHMSActions,
//   useHMSStore,
//   selectIsConnectedToRoom,
//   selectPeers,
//   selectLocalPeer,
//   selectIsLocalAudioEnabled,
// } from '@100mslive/react-native-hms';

// import {HeaderCompt} from '../../components';
// import Fonts from '../../theme/Fonts';
// import {Colors} from '../../theme/Colors';

// const MeetingInner = ({roomUrl, navigation}) => {
//   const hmsActions = useHMSActions();
//   const isConnected = useHMSStore(selectIsConnectedToRoom);
//   const peers = useHMSStore(selectPeers);
//   const localPeer = useHMSStore(selectLocalPeer);
//   const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);

//   const [isLoading, setIsLoading] = useState(true);

//   // 🔑 Get Room Code from URL
//   const getMeetingId = url => {
//     try {
//       const parts = url.split('/');
//       return parts[parts.length - 1];
//     } catch {
//       return null;
//     }
//   };
//   const roomCode = getMeetingId(roomUrl);

//   const USERNAME = 'Kamlesh';

//   const joinRoom = async () => {
//     try {
//       setIsLoading(true);

//       // ✅ Directly get token from SDK using roomCode
//       const authToken = await hmsActions.getAuthTokenByRoomCode(roomCode);

//       console.log('AuthToken:', authToken);

//       await hmsActions.join({
//         authToken: authToken,
//         userName: USERNAME,
//         rememberDeviceSelection: true,
//       });

//       console.log('Successfully requested to join room');
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Join Error:', error);
//       Alert.alert('Error', `Failed to join room: ${error.message}`);
//       setIsLoading(false);
//       navigation.goBack();
//     }
//   };

//   const leaveRoom = async () => {
//     try {
//       await hmsActions.leave();
//       console.log('Left room');
//       navigation.goBack();
//     } catch (error) {
//       console.error('Leave Error:', error);
//     }
//   };

//   const toggleMute = async () => {
//     try {
//       await hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
//     } catch (error) {
//       console.log('Toggle Audio Error:', error);
//     }
//   };

//   useEffect(() => {
//     joinRoom(); // auto join on mount
//   }, []);

//   if (isLoading) {
//     return (
//       <View style={styles.centeredContainer}>
//         <ActivityIndicator size="large" color={Colors?.PRIMARY_BLUE} />
//         <Text style={styles.loadingText}>Joining room...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <HeaderCompt title={'Video Calling'} />
//       <Text style={styles.header}>100ms Audio Room</Text>
//       {isConnected ? (
//         <View style={styles.connectedContainer}>
//           <Text style={styles.statusText}>
//             Connected to: {roomUrl.split('/')[2]}
//           </Text>
//           {localPeer && (
//             <Text style={styles.localPeerText}>
//               You: {localPeer.name} (ID: {localPeer.peerID})
//             </Text>
//           )}

//           <Text style={styles.peersHeader}>Participants:</Text>
//           {peers.filter(p => !p.isLocal).length === 0 && (
//             <Text style={styles.noPeersText}>No other participants yet.</Text>
//           )}
//           {peers
//             .filter(p => !p.isLocal)
//             .map(peer => (
//               <View key={peer.peerID} style={styles.peerCard}>
//                 <Text style={styles.peerName}>{peer.name}</Text>
//                 {peer.audioTrack && (
//                   <Text style={styles.peerAudioStatus}>
//                     {peer.audioTrack.enabled ? '🔊' : '🔇'}
//                   </Text>
//                 )}
//               </View>
//             ))}

//           <View style={styles.controls}>
//             <TouchableOpacity
//               style={[
//                 styles.controlButton,
//                 !isLocalAudioEnabled && styles.mutedButton,
//               ]}
//               onPress={toggleMute}>
//               <Text style={styles.controlButtonText}>
//                 {isLocalAudioEnabled ? 'Mute' : 'Unmute'}
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.leaveButton} onPress={leaveRoom}>
//               <Text style={styles.leaveButtonText}>Leave</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ) : (
//         <View style={styles.disconnectedContainer}>
//           <Text style={styles.statusText}>Connecting to room...</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const MeetingScreen = ({route, navigation}) => {
//   const {roomUrl} = route?.params;
//   console.log("---roomUrl---",roomUrl)
//   return (
//     <HMSRoomProvider>
//       <MeetingInner roomUrl={roomUrl} navigation={navigation} />
//     </HMSRoomProvider>
//   );
// };

// export default MeetingScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors?.LIGHT_GRAY,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   centeredContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: Colors?.LIGHT_GRAY,
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: Colors?.BLACK,
//     fontFamily: Fonts?.PoppinsMedium,
//   },
//   header: {
//     fontSize: 24,
//     fontFamily: Fonts?.PoppinsBold,
//     color: Colors?.BLACK,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   connectedContainer: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 20,
//   },
//   disconnectedContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   statusText: {
//     fontSize: 16,
//     color: Colors?.BLACK,
//     fontFamily: Fonts?.PoppinsMedium,
//     marginBottom: 10,
//   },
//   localPeerText: {
//     fontSize: 15,
//     color: Colors?.DARK_GRAY,
//     fontFamily: Fonts?.PoppinsRegular,
//     marginBottom: 20,
//   },
//   peersHeader: {
//     fontSize: 18,
//     fontFamily: Fonts?.PoppinsSemiBold,
//     color: Colors?.BLACK,
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   peerCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: Colors?.WHITE,
//     borderRadius: 8,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     marginVertical: 5,
//     width: '90%',
//     shadowColor: Colors?.BLACK,
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   peerName: {
//     fontSize: 16,
//     fontFamily: Fonts?.PoppinsMedium,
//     color: Colors?.BLACK,
//   },
//   peerAudioStatus: {
//     fontSize: 18,
//   },
//   controls: {
//     flexDirection: 'row',
//     marginTop: 'auto',
//     marginBottom: 20,
//     width: '100%',
//     justifyContent: 'space-around',
//   },
//   controlButton: {
//     backgroundColor: Colors?.PRIMARY_BLUE,
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 30,
//     minWidth: 100,
//     alignItems: 'center',
//   },
//   mutedButton: {
//     backgroundColor: Colors?.RED,
//   },
//   controlButtonText: {
//     color: Colors?.WHITE,
//     fontSize: 16,
//     fontFamily: Fonts?.PoppinsMedium,
//   },
//   leaveButton: {
//     backgroundColor: Colors?.RED,
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 30,
//     minWidth: 100,
//     alignItems: 'center',
//   },
//   leaveButtonText: {
//     color: Colors?.WHITE,
//     fontSize: 16,
//     fontFamily: Fonts?.PoppinsMedium,
//   },
// });

// import React, {useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import {Colors} from '../../theme/Colors';
// import Fonts from '../../theme/Fonts';
// import {
//   HMSRoomProvider,
//   useHMSActions,
//   useHMSStore,
//   selectIsConnectedToRoom,
//   selectPeers,
//   selectLocalPeer,
//   selectIsLocalAudioEnabled,
// } from '@100mslive/react-native-hms';

// const MeetingScreen = ({route, navigation}) => {
//   const {roomUrl} = route?.params;

//   return (
//     <HMSRoomProvider>
//       <MeetingInner roomUrl={roomUrl} navigation={navigation} />
//     </HMSRoomProvider>
//   );
// };

// const MeetingInner = ({roomUrl, navigation}) => {
//   const hmsActions = useHMSActions();

//   console.log('-------', roomUrl);

//   // Store values from HMS
//   const isConnected = useHMSStore(selectIsConnectedToRoom);
//   const peers = useHMSStore(selectPeers);
//   const localPeer = useHMSStore(selectLocalPeer);
//   const isAudioOn = useHMSStore(selectIsLocalAudioEnabled);

//   useEffect(() => {
//     // 👇 Join room when component mounts
//     const joinRoom = async () => {
//       try {
//         // TODO: Replace with real token from backend
//         const authToken = roomUrl; // using passed token for now
//         await hmsActions.join({
//           userName: 'Kamlesh',
//           authToken,
//         });
//       } catch (error) {
//         console.log('Join Error: ', error);
//       }
//     };

//     joinRoom();

//     // 👇 Leave room when unmounting
//     return () => {
//       hmsActions.leave();
//     };
//   }, [roomUrl, hmsActions]);

//   if (!isConnected) {
//     return (
//       <View style={styles.centeredContainer}>
//         <ActivityIndicator size="large" color={Colors.PRIMARY_BLUE} />
//         <Text style={styles.loadingText}>Joining Room...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Meeting Room</Text>
//       <Text style={styles.localPeerText}>
//         You are logged in as {localPeer?.name}
//       </Text>

//       <Text style={styles.peersHeader}>Participants:</Text>
//       {peers.map(peer => (
//         <View key={peer.peerID} style={styles.peerCard}>
//           <Text style={styles.peerName}>
//             {peer.name} {peer.isLocal ? '(You)' : ''}
//           </Text>
//           <Text style={styles.peerAudioStatus}>
//             {peer.isAudioEnabled ? '🎤 On' : '🔇 Off'}
//           </Text>
//         </View>
//       ))}

//       <View style={styles.controls}>
//         <TouchableOpacity
//           style={[styles.controlButton, !isAudioOn && styles.mutedButton]}
//           onPress={() => hmsActions.setLocalAudioEnabled(!isAudioOn)}>
//           <Text style={styles.controlButtonText}>
//             {isAudioOn ? 'Mute' : 'Unmute'}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.leaveButton}
//           onPress={async () => {
//             await hmsActions.leave();
//             navigation.goBack();
//           }}>
//           <Text style={styles.leaveButtonText}>Leave</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default MeetingScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors?.LIGHT_GRAY,
//     padding: 20,
//     justifyContent: 'flex-start',
//   },
//   centeredContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: Colors?.LIGHT_GRAY,
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: Colors?.BLACK,
//     fontFamily: Fonts?.PoppinsMedium,
//   },
//   header: {
//     fontSize: 24,
//     fontFamily: Fonts?.PoppinsBold,
//     color: Colors?.BLACK,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   connectedContainer: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 20,
//   },
//   disconnectedContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   statusText: {
//     fontSize: 16,
//     color: Colors?.BLACK,
//     fontFamily: Fonts?.PoppinsMedium,
//     marginBottom: 10,
//   },
//   localPeerText: {
//     fontSize: 15,
//     color: Colors?.DARK_GRAY,
//     fontFamily: Fonts?.PoppinsRegular,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   peersHeader: {
//     fontSize: 18,
//     fontFamily: Fonts?.PoppinsSemiBold,
//     color: Colors?.BLACK,
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   peerCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: Colors?.WHITE,
//     borderRadius: 8,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     marginVertical: 5,
//     width: '100%',
//     shadowColor: Colors?.BLACK,
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   peerName: {
//     fontSize: 16,
//     fontFamily: Fonts?.PoppinsMedium,
//     color: Colors?.BLACK,
//   },
//   peerAudioStatus: {
//     fontSize: 18,
//   },
//   controls: {
//     flexDirection: 'row',
//     marginTop: 'auto',
//     marginBottom: 20,
//     width: '100%',
//     justifyContent: 'space-around',
//   },
//   controlButton: {
//     backgroundColor: Colors?.PRIMARY_BLUE,
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 30,
//     minWidth: 100,
//     alignItems: 'center',
//   },
//   mutedButton: {
//     backgroundColor: Colors?.RED,
//   },
//   controlButtonText: {
//     color: Colors?.WHITE,
//     fontSize: 16,
//     fontFamily: Fonts?.PoppinsMedium,
//   },
//   leaveButton: {
//     backgroundColor: Colors?.RED,
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 30,
//     minWidth: 100,
//     alignItems: 'center',
//   },
//   leaveButtonText: {
//     color: Colors?.WHITE,
//     fontSize: 16,
//     fontFamily: Fonts?.PoppinsMedium,
//   },
// });

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   TouchableOpacity,
//   Dimensions,
//   FlatList,
//   SafeAreaView,
// } from 'react-native';
// import {
//   HMSRoomProvider,
//   useHMSActions,
//   useHMSStore,
//   selectIsConnectedToRoom,
//   selectPeers,
//   selectLocalPeer,
//   selectIsLocalAudioEnabled,
//   selectIsLocalVideoEnabled,
//   HMSVideoView,
// } from '@100mslive/react-native-hms';
// import Ionicons from '@react-native-vector-icons/material-icons';

// const {width, height} = Dimensions.get('window');

// const Screen = ({route, navigation}) => {
//   const {roomUrl} = route.params;
//   const hmsActions = useHMSActions();

//   const isConnected = useHMSStore(selectIsConnectedToRoom);
//   const peers = useHMSStore(selectPeers);
//   const localPeer = useHMSStore(selectLocalPeer);
//   const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
//   const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);

//   const [loading, setLoading] = useState(true);

//   // Room Join
//   useEffect(() => {
//     const joinRoom = async () => {
//       try {
//         setLoading(true);
//         await hmsActions.join({
//           userName: 'Kamlesh',
//           authToken: roomUrl,
//         });
//       } catch (err) {
//         console.error('JOIN ERROR ===>', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     joinRoom();

//     return () => {
//       hmsActions.leave();
//     };
//   }, []);

//   // Mic Toggle
//   const toggleAudio = async () => {
//     await hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
//   };

//   // Video Toggle
//   const toggleVideo = async () => {
//     await hmsActions.setLocalVideoEnabled(!isLocalVideoEnabled);
//   };

//   // End Call
//   const endCall = async () => {
//     await hmsActions.leave();
//     navigation.goBack();
//   };

//   if (loading || !isConnected || !localPeer) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="blue" />
//         <Text style={styles.text}>Joining Room...</Text>
//       </View>
//     );
//   }

//   // Combine peers
//   const allPeers = peers.length ? [localPeer, ...peers] : [localPeer];

//   return (
//     <View style={styles.container}>
//       {allPeers.length === 1 ? (
//         <View style={styles.center}>
//           <Text style={styles.text}>You are the only one here</Text>
//           {isLocalVideoEnabled && localPeer.videoTrack && (
//             <HMSVideoView
//               style={styles.video}
//               trackId={localPeer.videoTrack.trackId}
//               scaleType="ASPECT_FILL"
//             />
//           )}
//         </View>
//       ) : (
//         <FlatList
//           data={allPeers}
//           keyExtractor={item => item.peerID}
//           numColumns={2}
//           renderItem={({item}) => (
//             <View style={styles.videoWrapper}>
//               {item.videoTrack ? (
//                 <HMSVideoView
//                   style={styles.video}
//                   trackId={item.videoTrack.trackId}
//                   scaleType="ASPECT_FILL"
//                 />
//               ) : (
//                 <View style={[styles.video, styles.noVideo]}>
//                   <Text style={styles.text}>{item.name}</Text>
//                 </View>
//               )}
//             </View>
//           )}
//         />
//       )}

//       {/* Controls */}
//       <View style={styles.controls}>
//         <TouchableOpacity onPress={toggleAudio} style={styles.controlBtn}>
//           <Ionicons
//             name={isLocalAudioEnabled ? 'mic' : 'mic-off'}
//             size={30}
//             color="white"
//           />
//         </TouchableOpacity>

//         <TouchableOpacity onPress={toggleVideo} style={styles.controlBtn}>
//           <Ionicons
//             name={isLocalVideoEnabled ? 'videocam' : 'videocam-off'}
//             size={30}
//             color="white"
//           />
//         </TouchableOpacity>

//         <TouchableOpacity onPress={endCall} style={styles.controlBtnEnd}>
//           <Ionicons name="call-end" size={30} color="white" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// // Wrapper for HMS Provider
// const MeetingScreen = ({route, navigation}) => {
//   return (
//     <SafeAreaView>
//       {/* <HMSRoomProvider> */}
//       <Screen route={route} navigation={navigation} />
//       {/* </HMSRoomProvider> */}
//     </SafeAreaView>
//   );
// };

// export default MeetingScreen;

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: 'black'},
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'black',
//   },
//   text: {color: 'white', fontSize: 16, margin: 10},
//   videoWrapper: {flex: 1, margin: 2},
//   video: {
//     width: width / 2 - 4,
//     height: height / 2 - 4,
//     backgroundColor: 'grey',
//   },
//   noVideo: {justifyContent: 'center', alignItems: 'center'},
//   controls: {
//     position: 'absolute',
//     bottom: 30,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//   },
//   controlBtn: {backgroundColor: '#222', padding: 15, borderRadius: 50},
//   controlBtnEnd: {backgroundColor: 'red', padding: 15, borderRadius: 50},
// });
