import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image } from 'react-native';
import MenuCompStart from './menuStart';


const MenuCompOpen = ({navigation,username, number}) => {
  return (
   <MenuCompStart  navigation={navigation} username={username}  number={number}/>
  );
};





export default MenuCompOpen;