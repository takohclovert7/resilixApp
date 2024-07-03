import React, { useState, useEffect } from 'react';
import { ActivityIndicator,  Text, View, Alert,  TouchableOpacity, StyleSheet, Platform, PermissionsAndroid} from 'react-native';
import PermissionsScreen from '../permission/permission';
import { getLocation } from "../../getLocation"
import CustomAlertCreation from './creatCustomAlert';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

const AlertCreation = ({ route, navigation }) => {
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

  const [isDecoding, setIsDecoding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
const [locationDate ,setLocationDate]=useState(null)
const [addressName,setAddresName]=useState(null)
const [showPermissionScreen,setShowPermissionScreen]=useState(false)
const [locationServiceOff, setLocationServiceOff]=useState(false)
const [locationServiceTimeout, setLocationServiceTimeout]=useState(false)
const [locationPermissionDinied, setLocationPermissionDinied]=useState(false)
const [errDecoding ,setErrDecoding]=useState(false)

const [reload ,setReload]=useState(false)
const handleGetLocation = async () => {
  setErrDecoding(false)
  setIsDecoding(false)
   try {
    setShowPermissionScreen(false)
    setLocationServiceOff(false)
    setLocationServiceTimeout(false)
    setLocationPermissionDinied(false)
     const location = await getLocation();
     setLocationDate(location)
     setIsLoading(false);
    
     const {latitude,longitude}=location.coords
   
       try {
        setIsDecoding(true)
     const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
   
      if (response.status >= 200 && response.status < 300) {
        setAddresName(response.data.display_name);
        setIsDecoding(false)
      } else {
          console.log('Request unsuccessful with status:', response.status);
          setIsDecoding(false)
          setErrDecoding(true)
      }
  } catch (errorOpen) {
      // console.error('Error occurred:', errorOpen.message);
      setErrDecoding(true)
  }
  
    
   } catch (error) {
    setErrDecoding(false)
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

  function handleSendAlert(title,Description){
    navigation.navigate('Screen3',{addressName:addressName,boldText:title,emegencyDreciption:Description});
  }
  

  if (isLoading ||locationDate === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Fetching device location...</Text>
      </View>
    );
  }
  if (isDecoding) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Decoding Device Address...</Text>
      </View>
    );
  }
  if (errDecoding) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text  style={{fontSize:16,marginBottom:10}}>Network Error fail to decode device address</Text>
        <TouchableOpacity style={{marginTop:10,width:90,height:35,borderRadius:10,
          backgroundColor:"lightgray",justifyContent:"center"}}
          onPress={()=>{  setReload(prevState => !prevState);}}
          >
          <Text style={{fontSize:15,fontWeight:"bold",textTransform:"uppercase",textAlign:"center"}}>Roload </Text>
        </TouchableOpacity>
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


  return ( <>
<CustomAlertCreation  addressName={addressName}  handleSendAlert={handleSendAlert}/>  
   </>
  )
}

export default AlertCreation;
