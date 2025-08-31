import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  HMSSDK,
  HMSUpdateListenerActions,
  HMSRoomUpdate,
  HMSPeerUpdate,
  HMSTrackUpdate,
  HMSMessage,
  HMSException,
  HMSAudioTrack,
  HMSRoom,
  HMSPeer,
  HMSConfig,
} from '@100mslive/react-native-hms';
import {HeaderCompt} from '../../components';
import Fonts from '../../theme/Fonts';
import {Colors} from '../../theme/Colors';

const MeetingScreen = ({route, navigation}) => {
  const {roomUrl} = route.params;

  console.log('----roomUrl--', roomUrl);

  // const getMeetingId = url => {
  //   try {
  //     // Get everything after the last slash
  //     const parts = url.split('/');
  //     return parts[parts.length - 1];
  //   } catch (error) {
  //     return null;
  //   }
  // };

  const getMeetingId = url => {
    try {
      const parts = url.split('/');
      return parts[parts.length - 1];
    } catch {
      return null;
    }
  };

  const uniqueMettingId = getMeetingId(roomUrl);

  console.log('-------uniqueMettingId-----', uniqueMettingId);

  const [hms, setHms] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [peers, setPeers] = useState([]);
  const [localPeer, setLocalPeer] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const hmsInstanceRef = useRef(null);

  useEffect(() => {
    async function initializeHms() {
      try {
        const hmsSDK = await HMSSDK.build();
        hmsInstanceRef.current = hmsSDK;
        setHms(hmsSDK);
        console.log('HMS SDK Initialized');

        hmsSDK.addEventListener(HMSUpdateListenerActions.ON_JOIN, onJoin);
        hmsSDK.addEventListener(
          HMSUpdateListenerActions.ON_ROOM_UPDATE,
          onRoomUpdate,
        );
        hmsSDK.addEventListener(
          HMSUpdateListenerActions.ON_PEER_UPDATE,
          onPeerUpdate,
        );
        hmsSDK.addEventListener(
          HMSUpdateListenerActions.ON_TRACK_UPDATE,
          onTrackUpdate,
        );
        hmsSDK.addEventListener(HMSUpdateListenerActions.ON_ERROR, onError);
        hmsSDK.addEventListener(HMSUpdateListenerActions.ON_MESSAGE, onMessage);
        hmsSDK.addEventListener(
          HMSUpdateListenerActions.ON_RECONNECTING,
          onReconnecting,
        );
        hmsSDK.addEventListener(
          HMSUpdateListenerActions.ON_RECONNECTED,
          onReconnected,
        );

        await joinRoom(hmsSDK);
      } catch (error) {
        console.error('HMS SDK Initialization or Join Error:', error);
        Alert.alert('Error', 'Failed to initialize 100ms SDK or join room.');
        setIsLoading(false);
      }
    }

    initializeHms();

    return () => {
      if (hmsInstanceRef.current) {
        hmsInstanceRef.current.removeEventListener(
          HMSUpdateListenerActions.ON_JOIN,
          onJoin,
        );
        hmsInstanceRef.current.removeEventListener(
          HMSUpdateListenerActions.ON_ROOM_UPDATE,
          onRoomUpdate,
        );
        hmsInstanceRef.current.removeEventListener(
          HMSUpdateListenerActions.ON_PEER_UPDATE,
          onPeerUpdate,
        );
        hmsInstanceRef.current.removeEventListener(
          HMSUpdateListenerActions.ON_TRACK_UPDATE,
          onTrackUpdate,
        );
        hmsInstanceRef.current.removeEventListener(
          HMSUpdateListenerActions.ON_ERROR,
          onError,
        );
        hmsInstanceRef.current.removeEventListener(
          HMSUpdateListenerActions.ON_MESSAGE,
          onMessage,
        );
        hmsInstanceRef.current.removeEventListener(
          HMSUpdateListenerActions.ON_RECONNECTING,
          onReconnecting,
        );
        hmsInstanceRef.current.removeEventListener(
          HMSUpdateListenerActions.ON_RECONNECTED,
          onReconnected,
        );

        hmsInstanceRef.current.leave();
        hmsInstanceRef.current = null;
      }
    };
  }, []);

  // const joinRoom = async sdkInstance => {
  //   const roomCode = uniqueMettingId || 'xeh-psdo-jbv';
  //   const userName = 'Kamlesh';

  //   try {
  //     setIsLoading(true);

  //     // 🔑 Token fetch
  //     const authToken = await sdkInstance.getAuthTokenByRoomCode(roomCode);

  //     console.log('AuthToken:', authToken);
  //     console.log('UserName:', userName);

  //     // ✅ HMSConfig sahi tarike se banao
  //     const config = new HMSConfig(authToken, userName);

  //     await sdkInstance.join(config);

  //     console.log('Successfully requested to join room');
  //   } catch (error) {
  //     console.error('Failed to get auth token or join room:', error);
  //     Alert.alert('Error', `Failed to join room: ${error.message}`);
  //     setIsLoading(false);
  //     navigation.goBack();
  //   }
  // };

  // const joinRoom = async sdkInstance => {
  //   const roomCode = uniqueMettingId || 'xeh-psdo-jbv';
  //   const userName = 'Kamlesh'; // Ensure userName is defined

  //   try {
  //     setIsLoading(true);

  //     // 🔑 Token fetch
  //     const authToken = await sdkInstance.getAuthTokenByRoomCode(roomCode);

  //     console.log('AuthToken:', authToken);
  //     console.log('UserName:', userName);

  //     // ✅ HMSConfig sahi tarike se banao - pass an object
  //     const config = new HMSConfig({
  //       authToken: authToken,
  //       userName: userName,
  //     });

  //     await sdkInstance.join(config);

  //     console.log('Successfully requested to join room');
  //   } catch (error) {
  //     console.error('Failed to get auth token or join room:', error);
  //     Alert.alert('Error', `Failed to join room: ${error.message}`);
  //     setIsLoading(false);
  //     navigation.goBack();
  //   }
  // };

  //   const joinRoom = async sdkInstance => {
  //   const roomCode = uniqueMettingId || 'xeh-psdo-jbv';
  //   const userName = 'Kamlesh';

  //   try {
  //     setIsLoading(true);

  //     // 🔑 get auth token (testing only)
  //     const authToken = await sdkInstance.getAuthTokenByRoomCode(roomCode);

  //     console.log('AuthToken:', authToken);
  //     console.log('UserName:', userName);

  //     // ✅ HMSConfig expects (authToken, userName)
  //     const config = new HMSConfig(authToken, userName);

  //     await sdkInstance.join(config);

  //     console.log('Successfully requested to join room');
  //   } catch (error) {
  //     console.error('Failed to get auth token or join room:', error);
  //     Alert.alert('Error', `Failed to join room: ${error.message}`);
  //     setIsLoading(false);
  //     navigation.goBack();
  //   }
  // };

  const joinRoom = async sdkInstance => {
    const roomCode = uniqueMettingId || 'xeh-psdo-jbv';
    const userName = 'Kamlesh';

    try {
      setIsLoading(true);

      // 🔑 Token fetch (for dev/testing)
      const authToken = await sdkInstance.getAuthTokenByRoomCode(roomCode);

      console.log('AuthToken:', authToken);
      console.log('UserName:', userName);

      // ✅ FIX: pass args separately
      const config = new HMSConfig(authToken, userName);

      await sdkInstance.join(config);

      console.log('Successfully requested to join room');
    } catch (error) {
      console.error('Failed to get auth token or join room:', error);
      Alert.alert('Error', `Failed to join room: ${error.message}`);
      setIsLoading(false);
      navigation.goBack();
    }
  };

  // Event Listener Callbacks
  const onJoin = (room: HMSRoom) => {
    console.log('Joined Room:', room.name);
    setIsConnected(true);
    setLocalPeer(room.localPeer);
    const initialPeers = room.peers || [];
    setPeers(initialPeers.filter(p => !p.isLocal));
    setIsLoading(false);
  };

  const onRoomUpdate = ({
    room,
    update,
  }: {
    room: HMSRoom,
    update: HMSRoomUpdate,
  }) => {
    console.log('Room Update:', update, room.name);
  };

  const onPeerUpdate = ({
    peer,
    update,
  }: {
    peer: HMSPeer,
    update: HMSPeerUpdate,
  }) => {
    console.log('Peer Update:', peer.name, update);
    setPeers(prevPeers => {
      const existingPeerIndex = prevPeers.findIndex(
        p => p.peerID === peer.peerID,
      );
      if (update === HMSPeerUpdate.PEER_JOINED) {
        if (existingPeerIndex === -1 && !peer.isLocal) {
          return [...prevPeers, peer];
        }
      } else if (update === HMSPeerUpdate.PEER_LEFT) {
        if (existingPeerIndex !== -1) {
          return prevPeers.filter(p => p.peerID !== peer.peerID);
        }
      } else if (
        update === HMSPeerUpdate.ROLE_UPDATED ||
        update === HMSPeerUpdate.METADATA_UPDATED
      ) {
        if (existingPeerIndex !== -1) {
          const newPeers = [...prevPeers];
          newPeers[existingPeerIndex] = peer;
          return newPeers;
        }
      }
      return prevPeers;
    });

    if (peer.isLocal) {
      setLocalPeer(peer);
    }
  };

  const onTrackUpdate = ({
    peer,
    track,
    update,
  }: {
    peer: HMSPeer,
    track: HMSTrack,
    update: HMSTrackUpdate,
  }) => {
    console.log('Track Update:', peer.name, track?.type, update);

    if (peer.isLocal && track?.type === 'audio') {
      setIsMuted(!track.enabled);
    }

    setPeers(prevPeers => {
      return prevPeers.map(p => {
        if (p.peerID === peer.peerID) {
          return peer;
        }
        return p;
      });
    });
  };

  const onError = (error: HMSException) => {
    console.error('HMS Error:', error);
    Alert.alert('Error', `An error occurred: ${error.message}`);
  };

  const onMessage = (message: HMSMessage) => {
    console.log('New Message:', message.message);
  };

  const onReconnecting = () => {
    console.warn('Reconnecting to room...');
  };

  const onReconnected = () => {
    console.log('Reconnected to room!');
  };

  const toggleMute = async () => {
    if (!hms || !localPeer) return;

    try {
      const audioTrack = localPeer.audioTrack;
      if (audioTrack) {
        await hms.setLocalAudioEnabled(!isMuted);
        setIsMuted(!isMuted);
        console.log('Audio Toggled:', !isMuted);
      }
    } catch (error) {
      console.error('Failed to toggle mute:', error);
      Alert.alert('Error', 'Failed to toggle microphone.');
    }
  };

  const leaveMeeting = async () => {
    if (hms) {
      await hms.leave();
      console.log('Left room');
      navigation.goBack();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={Colors?.PRIMARY_BLUE} />
        <Text style={styles.loadingText}>Joining room...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderCompt title={'Video Calling'} />
      <Text style={styles.header}>100ms Audio Room</Text>
      {isConnected ? (
        <View style={styles.connectedContainer}>
          <Text style={styles.statusText}>
            Connected to: {roomUrl.split('/')[2]}
          </Text>
          {localPeer && (
            <Text style={styles.localPeerText}>
              You: {localPeer.name} (ID: {localPeer.peerID})
            </Text>
          )}

          <Text style={styles.peersHeader}>Participants:</Text>
          {peers.length === 0 && (
            <Text style={styles.noPeersText}>No other participants yet.</Text>
          )}
          {peers.map(peer => (
            <View key={peer.peerID} style={styles.peerCard}>
              <Text style={styles.peerName}>{peer.name}</Text>
              {peer.audioTrack && (
                <Text style={styles.peerAudioStatus}>
                  {peer.audioTrack.enabled ? '🔊' : '🔇'}
                </Text>
              )}
            </View>
          ))}

          <View style={styles.controls}>
            <TouchableOpacity
              style={[styles.controlButton, isMuted && styles.mutedButton]}
              onPress={toggleMute}>
              <Text style={styles.controlButtonText}>
                {isMuted ? 'Unmute' : 'Mute'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.leaveButton} onPress={leaveMeeting}>
              <Text style={styles.leaveButtonText}>Leave</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.disconnectedContainer}>
          <Text style={styles.statusText}>Connecting to room...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors?.LIGHT_GRAY,
    padding: 20,
    justifyContent: 'center',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors?.LIGHT_GRAY,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors?.BLACK,
    fontFamily: Fonts?.PoppinsMedium,
  },
  header: {
    fontSize: 24,
    fontFamily: Fonts?.PoppinsBold,
    color: Colors?.BLACK,
    textAlign: 'center',
    marginBottom: 20,
  },
  connectedContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  disconnectedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    color: Colors?.BLACK,
    fontFamily: Fonts?.PoppinsMedium,
    marginBottom: 10,
  },
  localPeerText: {
    fontSize: 15,
    color: Colors?.DARK_GRAY,
    fontFamily: Fonts?.PoppinsRegular,
    marginBottom: 20,
  },
  peersHeader: {
    fontSize: 18,
    fontFamily: Fonts?.PoppinsSemiBold,
    color: Colors?.BLACK,
    marginTop: 20,
    marginBottom: 10,
  },
  peerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors?.WHITE,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    width: '90%',
    shadowColor: Colors?.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  peerName: {
    fontSize: 16,
    fontFamily: Fonts?.PoppinsMedium,
    color: Colors?.BLACK,
  },
  peerAudioStatus: {
    fontSize: 18,
  },
  controls: {
    flexDirection: 'row',
    marginTop: 'auto', // कंट्रोल्स को नीचे की तरफ धकेलें
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-around',
  },
  controlButton: {
    backgroundColor: Colors?.PRIMARY_BLUE,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    minWidth: 100,
    alignItems: 'center',
  },
  mutedButton: {
    backgroundColor: Colors?.RED,
  },
  controlButtonText: {
    color: Colors?.WHITE,
    fontSize: 16,
    fontFamily: Fonts?.PoppinsMedium,
  },
  leaveButton: {
    backgroundColor: Colors?.RED,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    minWidth: 100,
    alignItems: 'center',
  },
  leaveButtonText: {
    color: Colors?.WHITE,
    fontSize: 16,
    fontFamily: Fonts?.PoppinsMedium,
  },
});

export default MeetingScreen;

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
