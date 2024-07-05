import React from 'react';
import { View,TouchableOpacity, Text, Image, StyleSheet } from 'react-native';


const LandComponent = ({ handlePressLand}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={()=>{handlePressLand()}}>
  <View  style={styles.left}>
<Text  style={{fontSize:17,fontWeight:"bold",marginHorizontal:20,marginVertical:10,color:"#444E72"}}>LAND SLIDES</Text>
       <Image
    source={require("../../images/icons/line.png")}
        
            style={{ width: 99, height: 60,marginTop:20,transform: [{ rotate: '-2deg' }],tintColor:"rgba(0, 113, 206,0.99)" }}
                                />
                                     <Image
    source={require("../../images/icons/line.png")}
        
            style={{ width: 110, height: 60, left:0,bottom:40,transform: [{ rotate: '-10deg' }],tintColor:"rgba(0, 113, 206,0.99)"}}
                                />

  </View>
  <View  style={[styles.Right]}>
  <Image
    source={require("../../images/icons/landslide.png")}
        
            style={{ width: 200, height: 90,right:10,marginBottom:30,marginTop:20,resizeMode:"contain"}}
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

export default LandComponent;
