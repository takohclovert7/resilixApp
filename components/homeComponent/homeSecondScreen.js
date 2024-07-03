import React, { useState, useEffect } from 'react';
import { ActivityIndicator,  Text, View, Alert,  TouchableOpacity, StyleSheet, Platform, PermissionsAndroid} from 'react-native';
import HomeSecond from './homeSecond';
import PermissionsScreen from '../permission/permission';
import { getLocation } from "../../getLocation"
import NetInfo from '@react-native-community/netinfo';

const HomeSecondScreen = ({ route, navigation }) => {
  const [reload ,setReload]=useState(false)
  const [isOnline, setIsOnline] = useState(true);
useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(state => {
    setIsOnline(state.isConnected);
  });

  // Check the initial network state
  NetInfo.fetch().then(state => {
    setIsOnline(state.isConnected);
  });

  return () => {
    unsubscribe();
  };
}, [isOnline]);

  const reloadScreen = () => {
    navigation.navigate('Screen1', { key: Math.random() });
  };

  const boldText = route.params.boldT;
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
const [locationDate ,setLocationDate]=useState(null)
const [showPermissionScreen,setShowPermissionScreen]=useState(false)
const [locationServiceOff, setLocationServiceOff]=useState(false)
const [locationServiceTimeout, setLocationServiceTimeout]=useState(false)
const [locationPermissionDinied, setLocationPermissionDinied]=useState(false)

const handleGetLocation = async () => {
  setShowPermissionScreen(false)
   try {
    setLocationServiceOff(false)
    setLocationServiceTimeout(false)
    setLocationPermissionDinied(false)
     const location = await getLocation();
     setLocationDate(location)
     setIsLoading(false);
   } catch (error) {
//location manipulation start
if(error==="No location provider available.") {
  setLocationServiceOff(true)
  setLocationServiceTimeout(false)
  setLocationPermissionDinied(false)
}
else if(error==="Location request timed out"){
  setLocationServiceOff(false)
  setLocationServiceTimeout(true)
  setLocationPermissionDinied(false)
}
else{
  setLocationServiceOff(false)
  setLocationServiceTimeout(false)
  setLocationPermissionDinied(true)
}

//location manipulation end

     setIsLoading(false);
     setLocationDate(0)
   }
 };

  useEffect(function(){
    handleGetLocation();

  },[reload])

  function handleSendAlert(RouteData,inputValue){
   
 navigation.navigate('Screen3',{addressName:RouteData,boldText:boldText,emegencyDreciption:inputValue})
  }

  if (isLoading ||locationDate === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Fetching device location...</Text>
      </View>
    );
  }


  if (!isOnline) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
        <Text style={{fontSize:18,marginBottom:10}}>you are currently offline</Text>
        <TouchableOpacity style={{marginTop:10,width:90,height:35,borderRadius:10,
          backgroundColor:"lightgray",justifyContent:"center"}}
          onPress={()=>{  setReload(prevState => !prevState);}}
          >
          <Text style={{fontSize:15,fontWeight:"bold",textTransform:"uppercase",textAlign:"center"}}>Roload </Text>
        </TouchableOpacity>
      </View>
    );
  }


  if (locationServiceOff) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
        <Text style={{fontSize:18,marginBottom:10}}>Turn on device location service</Text>
        <TouchableOpacity style={{marginTop:10,width:90,height:35,borderRadius:10,
          backgroundColor:"lightgray",justifyContent:"center"}}
          onPress={()=>{  setReload(prevState => !prevState);}}
          >
          <Text style={{fontSize:15,fontWeight:"bold",textTransform:"uppercase",textAlign:"center"}}>Roload </Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (locationServiceTimeout) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
        <Text style={{fontSize:18,marginBottom:10}}>Network Error please try again</Text>
        <TouchableOpacity style={{marginTop:10,width:90,height:35,borderRadius:10,
          backgroundColor:"lightgray",justifyContent:"center"}}
          onPress={()=>{  setReload(prevState => !prevState);}}
          >
          <Text style={{fontSize:15,fontWeight:"bold",textTransform:"uppercase",textAlign:"center"}}>Roload </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (locationPermissionDinied) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        
        <PermissionsScreen  reloadScreen={reloadScreen}/>
      </View>
    );
  }


  return (<>
<HomeSecond     handleSendAlert={handleSendAlert}   boldText={boldText }  location={locationDate}/>
   </>
  )
}

export default HomeSecondScreen;