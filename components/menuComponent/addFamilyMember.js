import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet,  TouchableOpacity } from 'react-native';

const  AddFamilyMember = () => {

    const showAlert = () => {
        Alert.alert(
          "ResilixPro",
          "ResilixPro is coming soon ",
          [
       
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      };
  return (
    <View style={styles.container}>
    <Text style={styles.text}>Subscribe to ResilixPro to have full access to this feature </Text>
    <TouchableOpacity style={{marginTop:10,width:150,height:50,borderRadius:20,
          backgroundColor:"#007BFF",justifyContent:"center",alignSelf:"center"}}
         onPress={()=>{showAlert()}}
          >
          <Text style={{fontSize:15,fontWeight:"bold",textTransform:"uppercase",textAlign:"center",color:"white"}}>Subscribe Now  </Text>
        </TouchableOpacity>
 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent:"center",
    alignContent:"center"

  },
  text:{
padding:9,
fontSize:16,
textAlign:"center",
marginBottom:10,
fontWeight:"500"
  }

});

export default AddFamilyMember;
