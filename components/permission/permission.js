import React, { useState, useEffect } from 'react';
import { TouchableOpacity,View, Text, Button, Alert, Linking, Platform,AppState,StyleSheet } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

const PermissionsScreen = ({reloadScreen}) => {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [appState, setAppState] = useState(AppState.currentState);
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    checkLocationPermission();
    
    return () => {
      subscription.remove();
    };
  }, [appState]);

  const handleAppStateChange = (nextAppState) => {
    setAppState(nextAppState);
    console.log(appState)
   if(appState==="background"){
    reloadScreen();
   }
  };


  const checkLocationPermission = async () => {
    const status = await check(
      Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );
    setPermissionStatus(status);
  };

  const requestLocationPermission = async () => {
    const result = await request(
      Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );
    setPermissionStatus(result);
  };

  const handleToggle = () => {
    if (permissionStatus === RESULTS.DENIED || permissionStatus === RESULTS.BLOCKED) {
      setIsEnabled(true)
      Alert.alert(
        'Location Permission Required',
        'To enable location services, please go to your device settings and allow location access for this app.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              setIsEnabled(false)
            }
          },
          {
            text: 'Open Settings',
            onPress: () => {
              openSettings().catch(() => Alert.alert('Unable to open settings'));
            }
          }
        ]
      );
    } else {
      requestLocationPermission();
    }

  
  };

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };


  return (
    <View style={{marginTop:80}}>
      <Text style={{textAlign:"center",fontSize:20,fontWeight:"bold",color:"gray"}}>
        You Disabled location service
      </Text>
      <Text style={{padding:10,textAlign:"center",marginTop:10,fontSize:16}}>
        this app Required that you grand location permission for it to function properly
      </Text>
      <Text style={{padding:10,textAlign:"center",marginTop:40}}>
        Click the button below to turn on location service manually 
      </Text>
    
<View  style={{flexDirection:"row",justifyContent:"space-between",margin:10}}>
  <Text style={{fontSize:15}}>
    Enable location permission
  </Text>

  <TouchableOpacity   onPress={handleToggle} activeOpacity={0.8}>
      <View style={[styles.container, isEnabled ? styles.active : styles.inactive]}>
        <View style={[styles.circle, isEnabled ? styles.circleActive : styles.circleInactive]} />
      </View>
    </TouchableOpacity>
</View>
<View  >

<Text style={{
  textAlign:"center",
  padding:10
}}>After ensuring that location permission has being granted click relaod screen to reload the app page</Text>
<TouchableOpacity style={{marginTop:10,width:150,height:35,borderRadius:10,
          backgroundColor:"lightgray",justifyContent:"center",alignSelf:"center"}}
          onPress={()=>{  reloadScreen();}}
          >
          <Text style={{fontSize:15,fontWeight:"bold",textTransform:"uppercase",textAlign:"center"}}>Roload screen </Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#ccc',
  },
  active: {
    backgroundColor: 'green',
  },
  inactive: {
    backgroundColor: 'gray',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    position: 'absolute',
    left: 2,
    top: 1,
  },
  circleActive: {
    transform: [{ translateX: 33 }],
  },
  circleInactive: {
    transform: [{ translateX: 0 }],
  },
});


export default PermissionsScreen;
