import React, { useState ,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,ActivityIndicator } from 'react-native';
import axios from 'axios';
import { getDistance } from 'geolib';
import NetInfo from '@react-native-community/netinfo';

const disasterData = [
  {
    id: 1,
    type: 'Earthquake',
    location: 'Los Angeles',
    description: 'Magnitude 5.0 earthquake reported in Los Angeles.',
    startTime: '2024-07-01T09:00:00', // Example start time (ISO 8601 format)
    coordinates: { latitude: 34.052235, longitude: -118.243683 }, // Los Angeles coordinates
  },
  {
    id: 2,
    type: 'Wildfire',
    location: 'San Francisco',
    description: 'Wildfire outbreak in San Francisco Bay Area.',
    startTime: '2024-06-30T18:30:00', // Example start time (ISO 8601 format)
    coordinates: { latitude: 37.7749, longitude: -122.4194 }, // San Francisco coordinates
  },
  {
    id: 3,
    type: 'Flood',
    location: 'Miami',
    description: 'Heavy flooding reported in Miami.',
    startTime: '2024-07-02T11:45:00', // Example start time (ISO 8601 format)
    coordinates: { latitude: 25.7617, longitude: -80.1918 }, // Miami coordinates
  },
];

const ViewRecentDisasters = ({location,navigation}) => {
  
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
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [addressName,setAddresName]=useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr]=useState(false)
  const [reload ,setReload]=useState(false)
  const getHumanReadableAddress = async (latitude, longitude) => {
    setErr(false)
    setIsLoading(true)
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      //
      setAddresName(response.data.display_name);
      setIsLoading(false)
    } catch (error) {
      console.log(error.response.status);
      setErr(true)
      setIsLoading(false)
    }
  };

  useEffect(function(){
 
    if(location==0){
      // console.log(location)
    }else{
  
    getHumanReadableAddress(location.coords.latitude, location.coords.longitude);
   
  }
   },[reload])


 


  // Function to handle selecting a disaster
  const handleSelectDisaster = (disaster) => {
    setSelectedDisaster(disaster);
  };

  // Function to format start time for display
  const formatStartTime = (startTime) => {
    const date = new Date(startTime);
  
    // Define options for date formatting
    const options = {
      weekday: 'long', // Full day of the week (e.g., "Friday")
      day: 'numeric', // Day of the month (e.g., "19")
      month: 'long', // Full month name (e.g., "June")
      year: 'numeric', // Full year (e.g., "2024")
      hour: 'numeric', // Hour (e.g., "10")
      minute: '2-digit', // Minute (e.g., "10")
      hour12: true, // Use 12-hour clock format (true) or 24-hour clock format (false)
    };
  
    // Format the date according to the options
    return date.toLocaleString('en-US', options);
  };



  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Decoding  device location...</Text>
      </View>
    );
  }
  
  if (err) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Network error occur  fail to get device address</Text>
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



  return (
    <ScrollView style={[styles.container,{marginTop:15,marginBottom:120}]}>
        <View  style={{marginVertical:15}}>
            <Text style={{textAlign:"center",fontWeight:"bold",fontSize:18}}>
                Recent disaster happening in your area 
            </Text >
            <Text  style={{textAlign:"center",fontWeight:"500",fontSize:14}}>
                {addressName}
            </Text>
        </View>
      {/* Disaster Feed */}
      {disasterData.map((disaster) => (
        <TouchableOpacity
          key={disaster.id}
          style={styles.disasterItem}
          onPress={() => handleSelectDisaster(disaster)}
        >
          <Text style={styles.disasterType}>{disaster.type}</Text>
          <Text style={styles.disasterLocation}>{disaster.location}</Text>
          <Text style={styles.disasterDescription}>{disaster.description}</Text>
          <Text style={styles.startTime}>Started on: {formatStartTime(disaster.startTime)}</Text>
          <Text style={styles.distance}>{(getDistance(disaster.coordinates,
            { latitude: location.coords.latitude, longitude: location.coords.longitude })/1000)} Km away from you </Text>
          <TouchableOpacity style={styles.readMoreButton} onPress={() => navigation.navigate('Screen2',
            {disaster:disaster,
              addressName:addressName,
              distance:(getDistance(disaster.coordinates,
                { latitude: location.coords.latitude, longitude: location.coords.longitude })/1000),
                latitude: location.coords.latitude, 
                longitude: location.coords.longitude
            })}>
            <Text style={styles.readMoreText}>Read More</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}

     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  disasterItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  disasterType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  disasterLocation: {
    fontSize: 16,
    marginBottom: 5,
  },
  disasterDescription: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  startTime: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  distance: {
    fontSize: 13,
    color: 'gray',
    marginBottom: 5,
  },
  readMoreButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 5,
    alignSelf:"flex-end"
  
  },
  readMoreText: {
    color: '#ffffff',
    fontSize: 14,
  },


});

export default ViewRecentDisasters;
