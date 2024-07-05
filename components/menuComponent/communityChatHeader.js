import React,{useState,useEffect} from 'react';
import {View,Keyboard,Text,Image, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import axios from 'axios';



export default  function CommunityChatHeader  (){

    return(
        <View>
            <View style={styles.communityView}> 
                <Text style={styles.communityText}>Community chat</Text>
                <Text   style={styles.profileImage}>
         SA
          </Text>
            </View>
            <Text style={styles.discusedText}>Discuss with other people in your community</Text>
        </View>
    )

}

const styles=StyleSheet.create({
    profileImage: {
        textAlign:"center",
        width: 55,
        height: 55,
        borderRadius: 30,
        backgroundColor:"lightgray",
        fontSize:35,
        
      
    
      },
communityView:{
flexDirection:"row",
marginTop:8,
justifyContent:"space-between",
paddingHorizontal:10

},
communityText:{
    width:"85%",
    textAlign:"center",
    marginTop:4,
    fontSize:22,
    fontWeight:"bold",
    color:"green"

},
discusedText:{
    textAlign:"center",
    width:"85%",
    top:-15,
    fontSize:14,
    fontWeight:"bold",
    color:"gray"
}
})