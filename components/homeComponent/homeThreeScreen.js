import React ,{useEffect}from 'react';
import {ActivityIndicator, StyleSheet, Text, Keyboard, ScrollView, View, Image, TouchableOpacity, SafeAreaView, TextInput, StatusBar, TouchableWithoutFeedback, Alert } from 'react-native';
import axios from 'axios';
import Markdown from 'react-native-markdown-display';
const HomeThreeScreen = ({route,navigation}) => {
  const {addressName,boldText,emegencyDreciption} = route.params;
const [chatData ,setChatData]=React.useState("")
const [isloading,setIsloading]=React.useState(false)
  async function sendPostRequest() {
    setIsloading(true)
    const url = 'https://resilixapi.onrender.com/chatbot/';
    const data = {
       message: emegencyDreciption
    };
  
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
  
        // console.log('Success:', response.data.response);
        setChatData(response.data)
        setIsloading(false)
    } catch (error) {
      setIsloading(false)
        if (error.response) {
       
            console.log('Server error:', error.response.data);
            console.log('Status code:', error.response.status);
            // console.log('Headers:', error.response.headers);
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
  

useEffect(()=>{
  sendPostRequest()
},[])

 
  return (
    <ScrollView style={{ backgroundColor: "#fff7ee", height: "100%", marginBottom:90}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ backgroundColor: "#fff7ee", height: "100%" , marginBottom:60}}>
          
          <View style={{ marginTop: 40 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 20, color: "green", alignItems: "center" }}>
                First Aid 
              </Text>
              <Text style={{ width: "80%", marginTop: 20, marginLeft: 1, fontSize: 15, textAlign: "center", color: "#444E72" }}>
                Thank you for reporting Below are some quick actions you can take
              </Text>
            </View>
            <View>
              <Text style={{ marginLeft: 40, marginTop: 15, fontWeight: "bold" }}>
                <Text style={{ marginRight: 20, color: "#444E72" }}>TITLE: </Text>
                <Text style={{ color: "#444E72" }}>{boldText}</Text>
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", width: "100%", marginLeft: 10 }}>
              <View style={{marginRight:20, flexDirection:"row", backgroundColor: "rgba(0, 113, 206, 0.15)",  alignItems: "center", borderRadius: 10, marginTop: 10 }}>
              <Image
                  source={require("../../images/icons/loca.png")}
                  resizeMode="contain"
                  style={{ width: 27, height: 28, tintColor: "rgba(0,113,206,1.0)", marginLeft: -2, marginRight: 5 }}
                />
               
                <Text style={{ color: "#444E72", padding:5,}}>
                 {`${addressName}`}
                </Text>
              </View>
            </View>
          </View>
          <SafeAreaView>
            <View style={styles.containerView}>
              <View style={styles.inputSimpleBorder}>
                <Text style={{ color: "#444E72" }}>{emegencyDreciption}</Text>
              </View>
              <StatusBar style="auto" />
            </View>
          </SafeAreaView>
          <Text style={{ marginLeft: 10, fontWeight: "bold", fontSize: 15, marginBottom: 9, color: "#444E72" }}>
            AI First Aid Assistance Response
          </Text>
          <View style={{ width: "100%", display: "flex",paddingLeft:10 }}>
            <View style={{
              
              // backgroundColor: "rgba(0, 113, 206, 0.21)",
              // borderColor:"rgba(0, 113, 206, 0.15)",
              // borderWidth:2,
              marginRight: 15
            }}>
              {isloading &&(
  <View style={{  alignItems: 'center' }}>
  <ActivityIndicator size="large" color="#0000ff" />
  <Text>typing...</Text>
</View>

              )}
             
         {(chatData && !isloading) &&(
     <Markdown>
     {chatData.response}
   </Markdown>

         )} 
         {!isloading &&(
          <Text style={{ position: "relative", fontWeight: "bold", marginLeft: 10, color: "#444E72" }}>Resilix AI Assistance</Text>
         )}
         </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerView: {
    padding: 5,
  },
  inputSimpleBorder: {
    marginBottom: 5,
    backgroundColor: "rgba(0, 113, 206, 0.43)",
    padding: 8,
    fontSize: 20,
    textAlignVertical: 'top',
    height: 73,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default HomeThreeScreen;
