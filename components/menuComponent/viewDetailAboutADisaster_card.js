import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity,ActivityIndicator, ScrollView  } from 'react-native';


export default function DisasterCard ({addressName,disaster,distance,handleTrace}){

    return(
        <View style={styles.card}>

        <View style={styles.item}>
            
            <View  style={{width:"60%"}}>
               <Text  style={{fontSize:16,fontWeight:"bold",marginBottom:2,marginLeft:10}}>Disaster Area</Text>
            <Text style={[styles.itemText,{fontSize:12,fontWeight:"500",color:"gray"}]}>{addressName}</Text>
            </View>
         <View style={{marginRight:10}}> 
         <Text style={[styles.itemText,{fontSize:16,fontWeight:"bold",textAlign:"center",marginBottom:3}]}>{distance} Km </Text>
         <Text style={[styles.itemText,{fontSize:12,fontWeight:"500",color:"gray"}]}>Away from you </Text>
         </View>
      
        </View>
      
        <View style={styles.item}>
         <View style={{width:"45%"}}>
<TouchableOpacity  style={[styles.Button,{backgroundColor:"#007BFF"}]}>
    <Text style={[styles.ButtonText,{color:"white"}]}>escape Route</Text>
</TouchableOpacity>
         </View>
        
         <View style={{width:"55%",borderLeftWidth:2,borderLeftColor:"lightgray",alignItems:"flex-end"}}>
         <TouchableOpacity style={[styles.Button,{backgroundColor:"red",width:"90%",marginRight:10}]}
         onPress={()=>{ handleTrace()}}
         >
    <Text  style={[styles.ButtonText,{color:"white",fontSize:13,paddingHorizontal:3}]}>visit disaster area </Text>
</TouchableOpacity>
         </View>
        </View>
      
    
      </View>
    )
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: 'lightgray',
        borderRadius: 10,
        marginHorizontal: 12,
        marginTop: 4,
        paddingLeft: 15,
        elevation: 3, // for android
        shadowColor: '#000', // for ios
        shadowOffset: { width: 0, height: 2 }, // for ios
        shadowOpacity: 0.2, // for ios
        shadowRadius: 2, // for ios
        marginBottom:101
      
      },
      item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom:13
      },
      itemText: {
        fontSize: 13,
        color: '#333',
      },
  Button:{
width:"80%",
height:35,
borderRadius:10,
justifyContent:"center"
  },
  ButtonText:{
    fontWeight:"bold",
    fontSize:14,
    textAlign:"center",
    textTransform:"uppercase",
  }
  });


//   <View style={styles.item}>
//     <View>
//           <Text style={{fontSize:18,fontWeight:"bold",marginBottom:5}}>{disaster.type}</Text>
//           <Text style={[styles.itemText,{fontSize:12,fontWeight:"500",color:"gray"}]}>{disaster. description}</Text>
//         </View>
//         </View>