import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,ActivityIndicator } from 'react-native';
import ForcastScreen from './forcast';
import axios from 'axios';
const HomeFirstScreen = ({ navigation}) => {

    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bold, setBold] = React.useState("");
    const firstFourEmergency = data && data.length > 0 ? data.slice(0, 4) : "";

    function createRandomNumberGenerator() {
        let lastIndex = -1; // Initialize with -1 to start with a different number at first call
    
        return function() {
            lastIndex = (lastIndex + 1) % 3; // Increment and wrap around from 0 to 3
            return lastIndex;
        };
    }
    // Create an instance of the generator
const generateRandomNumber = createRandomNumberGenerator();
const color=["red","blue","orange"]
function ensureEmergence(text) {
    // Convert the text to lowercase for case-insensitive comparison
    const lowerCaseText = text.toLowerCase();
    const word = "emergency";
    if (lowerCaseText.includes(word)) {
      return text;
    } else {
      return text + " " + word;
    }
  }
  function removeEmergence(text) {
    const regex = /emergency/i;
    if (regex.test(text)) {
      return text.replace(regex, '').trim();
    } else {
      return text;
    }
  }


function  handleFlood(){
    navigation.navigate('Screen5');
 }

 function  handleLand(){
    navigation.navigate('Screen6');
 }

 const getAlertChoices = async () => {
    setLoading(false)
 try {
    const response = await axios.get('https://resilix.onrender.com/emergency/choices');
    setData(response.data);
setLoading(true)
 } catch (error) {
    console.log(error)
    setLoading(false)
 }
  };

  useEffect(()=>{
    getAlertChoices()
   
  },[])

    return (
        <ScrollView contentContainerStyle={styles.container} style={{marginBottom:100}}>
            <View style={styles.header}>
                <View style={{marginTop:10,flexDirection:"row",marginHorizontal:24}}>
                <Image
                                    source={require("../../images/icons/line1.png")}
    
                                    style={{ width: 73, height: 3,tintColor:"rgba(0, 113, 206,0.63)",marginTop:9 }}
                                />
                    <Text style={{fontSize:14,fontWeight:"bold",color:"#444E72"}} >Todays Forecast</Text>
                </View>
               <ForcastScreen  
                handlePressFlood={handleFlood}
                handlePressLand={handleLand}
           
                 />
            </View>
            <View style={styles.emergencyContainer}>
                <Text style={styles.title}>Select Your Emergency</Text>

     {data.length === 0 ? (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <ActivityIndicator size="large" color="#0000ff" />
       <Text>Fetching emegency types...</Text>
     </View>
      ) : (
        
        firstFourEmergency.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => {
                     
                setBold(item.boldText);
                navigation.navigate('Screen2', { boldT:item.emergency_name,index:item.id});
               
            }}>
                <View style={[styles.emergencyView, { backgroundColor: "rgba(0, 113, 206, 0.15)" }]}>
                    <View style={[styles.iconView, { backgroundColor:color[generateRandomNumber()]}]}>
                        <Image
                            source={require("../../images/icons/Police.png")}
                            resizeMode="contain"
                            style={{ width: 19, height: 19, tintColor: "white" }}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.boldText}>{ensureEmergence(item.emergency_name)}</Text>
                        <Text style={{ color: "#444E72" }}>Report situations related to {removeEmergence(item.emergency_name)}</Text>
                    </View>
                    <View style={[styles.arrowView, { backgroundColor: "rgb(0,113,206)" }]}>
                        <Image
                            source={require("../../images/icons/Right.png")}
                            resizeMode="contain"
                            style={{ width: 13, height: 15, tintColor: "white" }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        ))
            )}

                
            </View>
            <View style={styles.aiAssistantContainer}>
                <TouchableOpacity >
                <Text style={styles.aiAssistantTitle}>AI Assistant</Text>
                <View style={styles.aiAssistantContent}>
                    <Text style={styles.aiAssistantText}>
                        Get Fast and Real-Time response with our well-trained AI assistant to help you
                    </Text>
                    <TouchableOpacity style={styles.settingsButton}>
                        <Image
                            source={require("../../images/icons/setting.png")}
                            resizeMode="contain"
                            style={{ width: 55, height: 55, marginLeft: -20, marginTop: 5 }}
                        />
                    </TouchableOpacity>
                    
                </View>
                </TouchableOpacity>
            </View>
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
        height: "32%",
        justifyContent: "center",
        width:"100%"
        
    },
    emergencyContainer: {
        padding: 8,
    },
    title: {
        fontWeight: "bold",
        marginTop: 10,
        fontSize: 15,
        color: "#444E72"
    },
    emergencyView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        height: 50,
        borderRadius: 30,
        paddingHorizontal: 15,
    },
    iconView: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        justifyContent: "center",
        alignItems: "center",
    },
    textView: {
        flex: 1,
        marginLeft: 10,
        color: "#444E72",
    },
    boldText: {
        fontWeight: "bold",
        fontSize: 17,
        color: "#444E72",
        textTransform:"capitalize"
    },
    arrowView: {
        width: 21,
        height: 21,
        borderRadius: 11,
        justifyContent: "center",
        alignItems: "center",
    },
    aiAssistantContainer: {
        padding: 5,
        marginTop: 10,
    },
    aiAssistantTitle: {
        fontWeight: "bold",
        fontSize: 15,
        marginLeft: 10,
        color: "#444E72",
    },
    aiAssistantContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "rgba(0, 113, 206, 0.15)",
        height: 110,
        marginLeft: 7,
        marginRight: 7,
        borderRadius: 25,
        padding: 15,
        alignItems: "center",
        color: "#444E72",
    },
    aiAssistantText: {
        width: "70%",
        marginTop: 10,
        fontSize: 14,
        color: "#444E72",
    },
    settingsButton: {
        height: 45,
        width: 50,
        borderRadius: 10,
        marginTop: -17,
    },
});

export default HomeFirstScreen;
