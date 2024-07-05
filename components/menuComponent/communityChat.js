import React,{useState,useEffect} from 'react';
import {View,Keyboard,Text,Image, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import axios from 'axios';
import CommunityChatHeader from './communityChatHeader';



export default  function CommunityChat  (){
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [userText,setUserText]=useState("")
  React.useEffect(() => {
   
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        setIsKeyboardVisible(true);
      });
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setIsKeyboardVisible(false);
      });
  
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);
  
 
  
  return (
    <KeyboardAvoidingView 
  
      style={[styles.container,{flex:isKeyboardVisible?1:0.86}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
        <CommunityChatHeader  />
        <ScrollView   style={{borderWidth:1.5,marginHorizontal:5,borderColor: 'rgba(0,113,206,0.60)',paddingTop:5}}>

<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text><Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
<Text>am brandoski junior a sample guy</Text>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput]}
          placeholder={"Type your message "}
          multiline={true}
          numberOfLines={5}
          value={userText}
          onChangeText={(text)=>{setUserText(text)}}
        />
        <TouchableOpacity style={styles.sendButton} 
          >
        <Image 
                  source={require("../../images/icons/send1.png")}
        
                  style={{
                     width:25.6,
                     height:23.74,
                     tintColor:"white",
                     marginTop:8
                  }}
                  />
        </TouchableOpacity>

        <View style={{marginTop:1, backgroundColor:"#0071CE",width:50,height:30,marginRight:5,borderRadius:15,alignItems:"center",justifyContent:"center"}}>
              <Text style={{fontWeight:"bold",color:"white"}}>ENG</Text>
          </View>

      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },


  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
     marginBottom:1
  },
  textInput: {
    flex: 1,  
    backgroundColor: "rgba(0,113,206,0.05)",
    borderColor: 'rgba(0,113,206,0.20)',
    padding:8,
    textAlignVertical: 'top',
    height: 48,
    width:260,
    borderWidth:2,
    marginLeft:4
   
  },
  sendButton: {
    backgroundColor:"#0071CE",
    width:40,
    height:40,
    borderRadius:20,
    borderWidth:1,
    borderColor:"white",
    alignItems:"center",
    margin:5,
    marginRight:2

  },
 
});



