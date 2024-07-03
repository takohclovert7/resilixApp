import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';



const FloodForcastPerDay = ({route}) => {
  const TodayForecast = route.params.RouteData;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };

  const day = date.toLocaleDateString('en-US', { day: 'numeric' });
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.toLocaleDateString('en-US', { year: 'numeric' });
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });

  return `${weekday} ${day} ${month} ${year}`;
};
 
  return (
    <ScrollView  contentContainerStyle={styles.container}  style={{marginBottom:90}}>
    <View style={[styles.header,{marginTop:40}]}>
      <Image
        source={require("../../images/icons/zag.png")} // Replace with your image URL
        style={styles.image}
      />
    </View>
    <View style={styles.content}>
      <Text style={styles.title}>Here’s what to expect from {`${TodayForecast.day}`} weather forecast</Text>
      <Text style={styles.bodyText}>
      Expect {`${TodayForecast.description}`} on {`${formatDate(TodayForecast.date)}`} with a temperature of about  {`${TodayForecast.intTemp}°C`} to 
         {`  ${TodayForecast.finalTemp}°C`} and a humidity  of {`${TodayForecast.humidity}%`}
      </Text>
      <Text style={[styles.bodyText,{fontSize:18,fontWeight:"bold"}]}>
        Resilix Care 
      </Text>
    </View>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Weather News</Text>
      <Image
        source={require("../../images/icons/share.png")} // Replace with your image URL
        style={{width:87,height:24}}
      />
    </TouchableOpacity>
  </ScrollView>
);
};

const styles = StyleSheet.create({
container: {
  flexGrow: 1,
        backgroundColor: "#D9D9D9",
        minHeight: "100%",

},
header: {
  alignItems: 'center',
  marginTop: 20,
},
image: {
  width: "80%",
  height: 153,
  borderRadius:30

},
content: {
  paddingHorizontal: 30,
  marginVertical: 20,
},
title: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
  color:"#363B64"
},
bodyText: {
  fontSize: 16,
  marginBottom: 10,
  color:"#363B64",
  textAlign:"justify"
},
button: {
  backgroundColor: 'white',
  padding: 10,
  alignItems: 'center',
  marginHorizontal: 20,
  borderRadius: 5,
  flexDirection:"row",
  justifyContent:"space-between",
  height:56
},
buttonText: {
  fontSize: 10,
  color: 'black',

},
});


export default FloodForcastPerDay;
