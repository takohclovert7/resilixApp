import React, { useState, useEffect } from 'react';
import { StyleSheet, Keyboard, ScrollView, TouchableWithoutFeedback, Text, View, Button, Alert, TouchableOpacity, Image, SafeAreaView, TextInput, StatusBar } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import ConfirmBox from '../../components/confirmBox';


const NotificationMainScreen = ({ handleSendAlert,addressName}) => {
    const [text, setText] = useState('');
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (text) => {
        setInputValue(text);
      };

      const handleSubmit = () => {
        if (inputValue.trim() === '' || selected.length ===0) {
          Alert.alert('Input Feild Required', selected.length ===0?"Select Alert  Category.":'Provide alert description.');
        } else {
            handleSendAlert(selected,inputValue)
           
        }
      };

      
    const [selected, setSelected] = React.useState([]);
    const data = [
        { key: '1', value: 'Flood ', },
        { key: '2', value: 'Ambulance' },
        { key: '3', value: 'landslide' },
        { key: '4', value: 'Ambulance', },
        { key: '5', value: 'landslide' },
        { key: '6', value: 'Ambulance' },
        { key: '7', value: 'Flood ' },
    ];

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <ScrollView style={{ backgroundColor: "#D9D9D9", height: "100%" }}>
            <ConfirmBox/>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={{ backgroundColor: "#D9D9D9", height: "100%" }}>
                    <View style={{ paddingTop: 10, height: 50 }}>
                        {/* free */}
                    </View>
                    <View style={{ marginTop: -1 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", marginBottom: 15,color:"#444E72"  }}>General Alarm</Text>
                        <Text style={{ fontSize: 14, paddingLeft: 5, paddingRight: 5, marginTop: 15, textAlign: "center" ,color:"#444E72" }}>This is an alert that concerns everyone be sure about it, if you are not sure, Report <Text style={{ color: "rgba(0, 113, 206,0.9)" }}>Here</Text> </Text>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold", marginLeft: 20,color:"#444E72"  }}>TITLE</Text>
                        <SelectList boxStyles={{ margin: 10,color:"#444E72"  }}
                            setSelected={(val) => setSelected(val)}
                            data={data}
                            save="value"
                            placeholder='Select Alert  Category'
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 20 ,marginBottom:8}}>
                        <View style={{ width: 260, backgroundColor: "rgba(0, 113, 206,0.25)",  alignItems: "center", borderRadius: 10, flexDirection: "row" }}>
                            <Image
                                source={require("../../images/icons/location.png")}
                                // resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tinColor:"rgba(165,229,255,1.0)"
                                }}
                            />
                            <Text style={{ marginLeft: 5,color:"#444E72", padding:5 }}>{addressName}</Text>
                        </View>
                        <View style={{ marginLeft: 10 ,marginTop:10}}>
                            <Image
                                source={require("../../images/icons/eng.png")}
                                // resizeMode="contain"
                                style={{
                                    width: 70,
                                    height: 35,
                                }}
                            />
                        </View>
                    </View>

                    <SafeAreaView>
                        <View style={styles.containerView}>
                            <TextInput
                                //    onFocus={handleTextInputFocus}
                                style={styles.inputSimpleBorder}
                                placeholder="Type your message here(optional)"
                                multiline={true}
                                numberOfLines={5}
                                value={inputValue}
                                onChangeText={handleInputChange}
                            />
                            <StatusBar style="auto" />
                        </View>
                    </SafeAreaView>

                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                        <TouchableOpacity style={{
                            backgroundColor: "red",
                            width: 130,
                            height: 40,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: "white",
                            display: "flex",
                            flexDirection: "row"
                        }}
                        onPress={handleSubmit}
                        >
                            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", marginTop: 10, paddingLeft: 9 }}> Send Alert</Text>
                            <Image
                                source={require("../../images/icons/send1.png")}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 20,
                                    tintColor: "white",
                                    marginTop: 8
                                }}
                            />

                        </TouchableOpacity>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    containerView: {
        padding: 5,
    },
    inputSimpleBorder: {
        marginBottom: 15,
        backgroundColor: "rgba(0,113,206,0.05)",
        borderWidth: 1.5,
        borderColor: "rgba(0,113,206,0.15)",
        padding: 8,
        fontSize: 13,
        textAlignVertical: 'top',
        height: 100,
        marginLeft: 10,
        marginRight: 10,
    },
});

export default NotificationMainScreen;
