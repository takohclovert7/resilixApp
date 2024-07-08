import React,{useState} from "react";
import {ActivityIndicator, Text, View, SafeAreaView, TextInput, StyleSheet, StatusBar, TouchableWithoutFeedback, TouchableOpacity, Image, KeyboardAvoidingView, Keyboard, ScrollView } from "react-native";
import axios from 'axios';
const CallScreenComp = ({ navigation }) => {
   
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
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

React.useEffect(()=>{
    getAlertChoices ()
})


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
    





    return (
        <ScrollView style={{ backgroundColor: "#D9D9D9", height: "100%" }}>
            <View style={{ width: "100%", backgroundColor: "#D9D9D9", height: "100%" }}>
                <View style={{ alignItems: "center", marginTop: 20 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16, color: "#444E72" }}>
                        Need Help?
                    </Text>
                </View>

                <TouchableOpacity     onPress={()=>{ navigation.navigate('Screen4')}}> 
                            <View style={[styles.emergencyView, { backgroundColor: "rgba(0,113,206,0.15)" }]}>
                                <View style={[styles.iconView, { backgroundColor: "green" }]}>
                                <Image
source={require("../../images/icons/Add.png")}
resizeMode="contain"
style={{
    width: 30,
    height: 30,
    tintColor: "white",
    backgroundColor: "green",
    borderRadius: 20
}}
/>
                                </View>
                                <View style={styles.textView}>
                                    <Text style={styles.boldText}>Custom</Text>
                                    <Text style={{ color: "#444E72" }}>Report your emergency</Text>
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

                <View style={{ marginTop: 30, marginBottom: 140 }}>
                    <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: "400", color: "#444E72" }}>Select your emergency</Text>

                    {data.length === 0 ? (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <ActivityIndicator size="large" color="#0000ff" />
       <Text>Fetching emegency types...</Text>
     </View>
      ) : (
                 
          data.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => {
                     
               
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
            </View>
        </ScrollView>
    )
}

        const styles = StyleSheet.create({
          emergencyView: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
            height: 50,
            borderRadius: 30,
            paddingHorizontal: 15,
            marginLeft:7,
            marginRight:7
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
      },
      arrowView: {
          width: 21,
          height: 21,
          borderRadius: 11,
          justifyContent: "center",
          alignItems: "center",
      },
          fView: {
            // backgroundColor:"red",
            width: 35,
            height: 35,
            borderRadius: 17,
            marginLeft: 25,
            marginTop: 4,
            paddingTop: 5,
            paddingLeft: 7
        
          },
        })
        
export default CallScreenComp; 