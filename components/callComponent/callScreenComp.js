import React from "react";
import { Text, View, SafeAreaView, TextInput, StyleSheet, StatusBar, TouchableWithoutFeedback, TouchableOpacity, Image, KeyboardAvoidingView, Keyboard, ScrollView } from "react-native";

const CallScreenComp = ({ navigation }) => {
    const emergency = [
        { boldText: "Emergnecy", lightText: "Report any flood concern in your area", boxColor: "red" },
        { boldText: "Medical emergency", lightText: "Need urgent medical help? Report here", boxColor: "red" },
        { boldText: "Report Fire", lightText: "Notify the fire Brigade about fire help in", boxColor: "orange" },
        { boldText: "Ambulance", lightText: "Book an   ambulance for medical issues ", boxColor: "blue" },
        { boldText: "Emergnecy", lightText: "Report any flood concern in your area", boxColor: "red" },
        { boldText: "Medical emergency", lightText: "Need urgent medical help? Report here", boxColor: "red" },
        { boldText: "Ambulance", lightText: "Book an   ambulance for medical issues ", boxColor: "blue" },
        { boldText: "Emergnecy", lightText: "Report any flood concern in your area", boxColor: "red" },
        { boldText: "Emergnecy", lightText: "Report any flood concern in your area", boxColor: "red" },
        { boldText: "Medical emergency", lightText: "Need urgent medical help? Report here", boxColor: "red" },
        { boldText: "Report Fire", lightText: "Notify the fire Brigade about fire help in", boxColor: "orange" },
        { boldText: "Ambulance", lightText: "Book an   ambulance for medical issues ", boxColor: "blue" },
        { boldText: "Emergnecy", lightText: "Report any flood concern in your area", boxColor: "red" },
        { boldText: "Medical emergency", lightText: "Need urgent medical help? Report here", boxColor: "red" },
        { boldText: "Ambulance", lightText: "Book an   ambulance for medical issues ", boxColor: "blue" },
        { boldText: "Emergnecy", lightText: "Report any flood concern in your area", boxColor: "red" },
    ];

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

                    {emergency.map((item, index) => {
                        return (
                          <TouchableOpacity key={index} onPress={() => {
                      
                            navigation.navigate('Screen2', { boldT:item.boldText })
                        }}>
                            <View style={[styles.emergencyView, { backgroundColor: "rgba(0,113,206,0.15)" }]}>
                                <View style={[styles.iconView, { backgroundColor: item.boxColor }]}>
                                    <Image
                                        source={require("../../images/icons/Police.png")}
                                        resizeMode="contain"
                                        style={{ width: 19, height: 19, tintColor: "white" }}
                                    />
                                </View>
                                <View style={styles.textView}>
                                    <Text style={styles.boldText}>{item.boldText}</Text>
                                    <Text style={{ color: "#444E72" }}>{item.lightText}</Text>
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
                        )
                    })}

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