import React,{useState,useEffect} from 'react';
import {View,Keyboard,Text,Image, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import axios from 'axios';
import CommunityChatHeader from './communityChatHeader';
import CommunityChatBottom from './communityChatBottom';


export default  function CommunityChat  ({username}){
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
  
      style={[styles.container,{flex:isKeyboardVisible?1:0.85}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
        <CommunityChatHeader  username={username}/>
        <CommunityChatBottom  groupId={"resilix-group-id"} currentUser={{ _id: `${username}`, name: `${username}` }} />

      
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
 
});



