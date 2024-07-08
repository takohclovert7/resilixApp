import React,{useState} from 'react';
import { View,Text,Image, } from 'react-native';

 const  FineScreenHeader = ({addressName}) => {
 
return(
    <>
    
    <View  style={{alignItems:"center"}}>
<Image 
                  source={require("../../images/icons/ai.png")}
                  resizeMode="contain"
                  style={{
                     width:228,
                     height:25,
                   
                     marginTop:20
                  }}
                  />
                  <Text style={{fontSize:14,color:"#444E72",textAlign:"center",margin:10}}>Thank you for reporting. Below is some quick actions you can take.</Text>
                  <View style={{ marginHorizontal:12,paddingHorizontal:30, backgroundColor: "rgba(0,113,206,0.15)", alignItems: "center", borderRadius: 10, flexDirection: "row" ,padding:10,paddingLeft:0}}>
                            <Image
                                 source={require("../../images/icons/location.png")}
                                // resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight:5,
                                }}
                            />
                            <Text style={{ marginLeft: 3,color:"#444E72" }}>{addressName}</Text>
                        </View>

</View>

<View style={{marginLeft:10,marginRight:10,marginTop:30, width: 354, backgroundColor: "rgba(0,113,206,0.21)", height: 41, alignItems: "center",  flexDirection: "row",justifyContent:"space-between" }}>

<Text style={{ marginLeft: 30,color:"#444E72" }}>Hello I am ready to assist you</Text>
                            <Image
                                 source={require("../../images/icons/chatHead.png")}
                                // resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />

                        </View>
    </>
)
}


export default FineScreenHeader;