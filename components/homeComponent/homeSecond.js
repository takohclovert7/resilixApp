import React, { useState, useEffect } from 'react';
import { ActivityIndicator,StyleSheet, ScrollView, Text, Keyboard, View, Image, TouchableOpacity, SafeAreaView, TextInput, StatusBar, TouchableWithoutFeedback, Alert } from 'react-native';
import axios from 'axios';


function HomeSecond({handleSendAlert,boldText,location,id}){
const [addressName,setAddresName]=useState(null)
const [inputValue, setInputValue] = useState('');
const [isLoading, setIsLoading] = useState(true);
const [reload ,setReload]=useState(false)
const [err, setErr]=useState(false)
  const getHumanReadableAddress = async (latitude, longitude) => {
    setErr(false)
    setIsLoading(true)
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      // console.log('Address:', response.data.display_name);
      setAddresName(response.data.display_name);
      setIsLoading(false)
    } catch (error) {
      setErr(true)
      setIsLoading(false)
    }
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };


  const handleSubmit = () => {
    if (inputValue.trim() === '') {
      Alert.alert('Input field Required', 'Provide a description of the emegency you are currently facing .');
    } else {
      // Handle the valid input
      // sendPostRequest()
      handleSendAlert(addressName,inputValue)
     
    }
  };
  


 useEffect(function(){
 
  if(location==0){
    // console.log(location)
  }else{

  getHumanReadableAddress(location.coords.latitude, location.coords.longitude);
}
 },[reload])

 
async function sendPostRequest() {
  const url = 'https://resilix.onrender.com/alerts/';
  const data = {
      user: 1,
      alert_type: 1,
      user_location: {
          longitude: 10.1234,
          latitude: 20.5678
      },
      description: 'There is a flood in my area.',
      broadcast_to_all: true
  };

  try {
      const response = await axios.post(url, data, {
          headers: {
              'Content-Type': 'application/json'
          }
      });

      console.log('Success:', response.data);

  } catch (error) {
      if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log('Server error:', error.response.text);
          console.log('Status code:', error.response.status);
          console.log('Headers:', error.response.headers);
      } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser
          // and an instance of http.ClientRequest in node.js
          console.log('Network error:', error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error:', error.message);
      }
  }
}



 

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
      <Text style={{textAlign:"center"}}>Network error occur  fail to get address of the  device</Text>
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

  
    <ScrollView style={{ backgroundColor: "#D9D9D9", height: "100%" }}>
     
    <TouchableOpacity activeOpacity={1} onPress={() => { Keyboard.dismiss() }}>
      <View style={{ backgroundColor: "#D9D9D9", height: "100%" }}>
        <View style={{ marginTop: 10, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "#444E72" }}>
            {boldText} Emergency
          </Text>
          <Text style={{ width: "80%", marginTop: 20, marginLeft: 20, fontSize: 15, color: "#444E72" }}>
            Spot {boldText} somewhere? Report it to keep the community informed and safe
          </Text>
          <View style={{ display: "flex", flexDirection: "row", width: "90%", justifyContent: "space-between", marginLeft: 20 }}>
            <View style={{ flexDirection: "row", width: 251, backgroundColor:  "rgba(0, 113, 206, 0.15)",  alignItems: "center", borderRadius: 10, marginTop: 20 }}>
              <Image
                source={require("../../images/icons/loca.png")}
                resizeMode="contain"
                style={{ width: 24, height: 30, tintColor: "rgba(0,113,206,1.0)", marginLeft: -2, marginRight: 5 }}
              />
              <Text style={{ color: "#444E72",padding: 3 }}>
                {`${addressName}`}
              </Text>
            </View>
            <View style={{ marginLeft: 5, marginTop: 27, backgroundColor: "#0071CE", width: 55, height: 25, marginRight: 35, borderRadius: 15, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontWeight: "bold", color: "white" }}>ENG</Text>
            </View>
          </View>
        </View>

        <SafeAreaView style={styles.container}>
          <View style={styles.containerView}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputSimpleBorder}
                placeholder="Type your message here (optional)"
                multiline={true}
                numberOfLines={5}
                value={inputValue}
                onChangeText={handleInputChange}
        
              />
              <Image
                source={require('../../images/icons/mic.png')} // Replace with your image path
                style={styles.image}
              />
            </View>
          </View>
        </SafeAreaView>

        <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity style={{
            backgroundColor: "red",
            width: 130,
            height: 40,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "white",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
            onPress={handleSubmit}
          >
            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", paddingRight: 10 }}>Send Alert</Text>
            <Image
              source={require("../../images/icons/send1.png")}
              resizeMode="contain"
              style={{
                width: 30,
                height: 20,
                tintColor: "white"
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    {/* </TouchableWithoutFeedback> */}
    </TouchableOpacity>
  </ScrollView>
);
};

const styles = StyleSheet.create({
emergencyView: {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  backgroundColor: "rgba(165,229,255,0.5)",
  marginTop: 10,
  height: 50,
  borderRadius: 30 // This should be a number, not a string
},
arrowView: {
  backgroundColor: "blue",
  width: 21,
  height: 21,
  borderRadius: 11,
  marginTop: 14,
  marginRight: 18,
  paddingTop: 2,
  paddingLeft: 4
},
fView: {
  width: 35,
  height: 35,
  borderRadius: 17,
  marginLeft: 25,
  marginTop: 8,
  paddingTop: 5,
  paddingLeft: 7
},
container: {
  justifyContent: 'center',
},
containerView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},
inputContainer: {
  position: 'relative',
  width: '100%',
},
inputSimpleBorder: {
  marginBottom: 15,
  backgroundColor: "rgba(0, 113, 206, 0.05)",
  borderWidth: 1,
  borderColor: 'rgba(0, 113, 206, 0.15)',
  padding: 10,
  fontSize: 13,
  paddingRight: 40, // Add some padding to the right to avoid text overlapping the image
  textAlignVertical: 'top', // For Android to align the text at the top
  height: 120
},
image: {
  position: 'absolute',
  bottom: 16,
  right: 4,
  width: 30,
  height: 30,
},
});
export default HomeSecond;