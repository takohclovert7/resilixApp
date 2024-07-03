
import { StyleSheet, Text, View,Modal,Button ,TouchableOpacity} from 'react-native';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import React, {useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
const ConfirmBox=()=>{
const [show ,setShow]=useState(true)

// Use the useFocusEffect hook provided by React Navigation
useFocusEffect(
    useCallback(() => {
      // This code will run every time the screen containing this component comes into focus

      // Place any logic or actions you want to run when the screen is displayed here
      console.log('Screen displayed, ConfirmBox rerun');
  setShow(true)
      // Return a cleanup function if necessary
      return () => {
        // Cleanup logic here if needed
      };
    }, [])
  );

  // Your ConfirmBox component's UI here
  return (
  
        < ConfirmDialog
        containerStyle={{backgroundColor:"red"}}
    visible={show}
   
         
    >
     <View  >
 <View >
    <Text style={{textAlign:"center",color:"#FF0F0F",fontSize:20,fontWeight:"bold",marginBottom:8,marginTop:20}}>GENERAL ALARM</Text>
    <Text style={{textAlign:"center",color:"#0071CE",fontSize:18,fontWeight:"bold",marginBottom:10 }}>Are you sure this concerns everyone?</Text>
    <Text style={{textAlign:"center",fontSize:16,fontWeight:"500",marginBottom:8,marginTop:60,color:"#444E72" }}>General Alarm</Text>
    <Text style={{textAlign:"center",fontSize:14,fontWeight:"300",marginBottom:8,marginTop:25,color:"#444E72" }}>This is an alert that concerns everyone be sure about it, if you are not sure, Report <Text style={{color:"#0071CE"}}>Here</Text> </Text>
 </View>
 

<View style={{flex:1,justifyContent: 'center',alignItems:"center",marginTop:40,marginBottom:50}}> 
<TouchableOpacity style={{
           backgroundColor:"#0071CE",
           width:156,
           height:46,
           borderRadius:10,
           borderWidth:1,
           borderColor:"white",
           textAlign:"center"
       }}
     onPress={() => {
    setShow(false)
     }}
   >
       <Text style={{color:"white",fontSize:16,fontWeight:"bold",marginTop:10,paddingLeft:9,textAlign:"center"}}>I Am Sure</Text>                
   </TouchableOpacity>

</View>

     </View>
 </ConfirmDialog>
   
  );
}


export default ConfirmBox;



const styles = StyleSheet.create({
    ConfirmDialog:{
        color:"red"
    }
  })