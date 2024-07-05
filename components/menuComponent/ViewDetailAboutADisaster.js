import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity,ActivityIndicator, ScrollView  } from 'react-native';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import MyMap from '../map/mapView';
// import DisasterCard from './viewDetailAboutADisaster_card';

export default  function  ViewDetailedAboutADisasters  ({ route,navigation}){
const {disaster,distance,latitude,longitude}=route.params;
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
  setReload(prevState => !prevState);

};
const [addressName,setAddresName]=useState(null)
const [isLoading, setIsLoading] = useState(true);
const [err, setErr]=useState(false)
const [reload ,setReload]=useState(false)
const getHumanReadableAddress = async (latitude, longitude) => {
    setErr(false)
    setIsLoading(true)
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
    // console.log('Address:', response.data.display_name);
    setAddresName(response.data.display_name);
    setIsLoading(false)
  } catch (error) {
    // console.error('Error fetching address:', error);
    setErr(true)
    setIsLoading(false)
  }
};
React.useEffect(()=>{
    getHumanReadableAddress(disaster.coordinates.latitude,disaster.coordinates.longitude)
},[reload])



if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Decoding  Address of disaster area...</Text>
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


  if (err) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{textAlign:"center"}}>Network error occur  fail to get address of the  disaster area</Text>
        <TouchableOpacity style={{marginTop:10,width:90,height:35,borderRadius:10,
          backgroundColor:"lightgray",justifyContent:"center"}}
          onPress={()=>{  setReload(prevState => !prevState);}}
          >
          <Text style={{fontSize:15,fontWeight:"bold",textTransform:"uppercase",textAlign:"center"}}>Roload </Text>
        </TouchableOpacity>
      </View>
    );
  }


    return(
<MyMap  addressName={addressName}  disaster={disaster}   distance={distance} 
latitude={latitude}  longitude={longitude} />
  );
};

