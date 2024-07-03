import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';



const JB = () => {


  return (
    <ScrollView  contentContainerStyle={styles.container}  style={{marginBottom:90}}>
    <View style={[styles.header,{marginTop:40}]}>
      <Image
        source={require("../../images/icons/zag.png")} // Replace with your image URL
        style={styles.image}
      />
    </View>
    <View style={styles.content}>
      <Text style={styles.title}>Here’s what to expect from Tuesday weather forecast</Text>
      <Text style={styles.bodyText}>
        The contrast and colors employed when designing user interface elements can have a huge impact on their accessibility to all end-users. Relying solely on color distinctions limits the ability of color blind individuals to use your product. Using light and dark colors combined with techniques such as cross-hatching to differentiate part of the interface make it more accessible for users with vision issues. This design mentality can result in more interesting and usable interfaces for all of your users.
      </Text>
      <Text style={styles.bodyText}>
        Nature and art are resources for color inspiration in UI concepts that you would be wise to use.
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
  fontSize: 14,
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


export default JB;
