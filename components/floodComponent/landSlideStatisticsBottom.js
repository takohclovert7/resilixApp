import React from 'react';
import {ActivityIndicator, View,TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';
const LandSlideStatisticsBottom = ({location,addressName}) => {
    const [reload,setReload]=React.useState(false)
const [weatherData, setWeatherData]=React.useState(null)
const [gettingWeatherData, setGettingWeatherData]=React.useState(true)
const [err,setErr]=React.useState(false)
    const apiKey = '191bc27a69ea3067e1f53ba05e917755';
    const fetchWeatherData = async () => {
        setGettingWeatherData(true)
        setErr(false)
        try {
           
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${apiKey}&units=metric`);
          setWeatherData(response.data);
          setGettingWeatherData(false)
        } catch (error) {
        //   console.error('Error fetching weather data:', error);
          setErr(true);
        }
      };
    
React.useEffect(()=>{
    fetchWeatherData()
},[reload])


if (gettingWeatherData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Getting weather data...</Text>
      </View>
    );
  }
  if (err) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{textAlign:"center"}}>Network error occur  fail to get weather Data</Text>
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
   
      <View style={styles.card}>
        
       <View style={styles.item}>
            
            <View  style={{width:"60%"}}>
               {/* <Text  style={{fontSize:16,fontWeight:"bold",marginBottom:2,marginLeft:10}}>Disaster Area</Text> */}
            <Text style={[styles.itemText,{fontSize:12,fontWeight:"500",color:"gray"}]}>{addressName}</Text>
            </View>
         <View style={{marginRight:20,flexDirection:"row"}}> 
          <Image
 src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
        style={{width:40,height:50,marginRight:1}}
      />
       <Text style={[styles.itemText,{fontSize:16,fontWeight:"bold",textAlign:"center",marginBottom:3,marginTop:10}]}>{ Math.ceil(weatherData.main.temp)}°</Text>
      
         </View>
      
        </View>
        <TouchableOpacity style={[styles.item,{ paddingVertical: 10, flexDirection: "column",alignItems:"flex-end",marginRight:25}]}>
            
          <Text style={[styles.itemText,{color:"lightgray",fontWeight:"bold",marginBottom:3}]}>Wind speed</Text>
          <Text style={[styles.itemText,{fontSize:14,fontWeight:"bold",color:"gray"}]}>{`${ Math.ceil((weatherData.wind.speed)*2.237)} mph`}</Text>
          
        
        </TouchableOpacity>
    </View>
)
}

const styles=StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 10,
        paddingLeft: 10,
        elevation: 3, // for android
        shadowColor: '#000', // for ios
        shadowOffset: { width: 0, height: 2 }, // for ios
        shadowOpacity: 0.2, // for ios
        shadowRadius: 2, // for ios
        marginBottom:60,
        top:-50
      },
      item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      itemText: {
        fontSize: 13,
        color: '#333',
      },
})

export default LandSlideStatisticsBottom;