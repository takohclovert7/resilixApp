import React from 'react';
import { View,TouchableOpacity, Text, Image, StyleSheet } from 'react-native';


const FloodComponent = ( {handlePressFlood}) => {
      
  return (
    <TouchableOpacity style={styles.card}  onPress={()=>{handlePressFlood();}}>
  <View  style={styles.left}>
<Text  style={{fontSize:17,fontWeight:"bold",marginHorizontal:20,marginVertical:10,color:"#444E72"}}>FLOODS</Text>
       <Image
    source={require("../../images/icons/line.png")}
        
            style={{ width: 99, height: 60,marginTop:20,transform: [{ rotate: '-2deg' }],tintColor:"rgba(0, 113, 206,0.99)" }}
                                />
                                     <Image
    source={require("../../images/icons/line.png")}
        
            style={{ width: 110, height: 60, left:0,bottom:40,transform: [{ rotate: '-10deg' }],tintColor:"rgba(0, 113, 206,0.99)"}}
                                />

  </View>
  <View  style={styles.Right}>
  <Image
    source={require("../../images/icons/flood.png")}
        
            style={{ width: 170, height: 110, top:3,right:10,marginBottom:20}}
                                />

<Text style={{fontSize:17,fontWeight:"bold",color:"#444E72",textAlign:"center"}}>READ </Text>
  </View>
        </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(0, 113, 206, 0.15)',
        borderRadius: 25,
        marginHorizontal: 20,
        width:"90%",
        height:"90%",
        marginVertical:10,
        flexDirection:"row"
      },
      left:{
        width:"50%"
      },
      Right:{
        width:"50%"
      }
});

export default FloodComponent;
