import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, } from 'react-native';

const AboutReslixScreen = () => {
  return (
    <View style={styles.container}  >
      <Image 
      source={require("../../images/icons/resilix.png")}
      style={{alignSelf:"center",tintColor:"black"}}
      />
      <Text style={styles.Text} >
      Resilix is an app that sends alerts to keep 
      you informed during emergencies. Whether it's
       a natural disaster or a medical issue, it notifies 
       you quickly so you can stay safe. You can customize
        how you receive alerts and it updates you in real-time
         based on where you are. It's designed to help you be 
         prepared and take action when needed, making it
       easier to stay safe during unexpected events.
         </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent:"center"
  
  },
Text:{
  top:"-10%",
    fontSize:14,
    fontWeight:"300",
    color:"gray",
    textAlign:"justify",
    paddingHorizontal:30,
    lineHeight:28
}
});

export default AboutReslixScreen ;
