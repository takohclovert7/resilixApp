import React, { useState, useEffect } from 'react';
import { StyleSheet, Keyboard, ScrollView, TouchableWithoutFeedback, Text, View, Button, Alert, TouchableOpacity, Image, SafeAreaView, TextInput, StatusBar } from 'react-native';
import NotificationStartScreen from '../../components/notificationComp/notificationStart';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeThreeScreen from '../../components/homeComponent/homeThreeScreen';


const Stack = createStackNavigator();

const CustomBackButton = ({ navigation }) => (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image
            source={require('../../images/icons/Arrow.jpg')}
            style={styles.backButtonImage}
        />
    </TouchableOpacity>
);

const NotificationScreen = () => {
 

    return (
        <NavigationContainer independent={true}>
        <Stack.Navigator>
            <Stack.Screen
                name="Screen1"
                component={NotificationStartScreen}
                options={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: 'transparent',
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerTransparent: true,
                    headerTitle: '', // Hides the header title
                    headerShown: false,
                
    
                })}
            />
            <Stack.Screen
                name="Screen2"
                component={HomeThreeScreen}
                options={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: 'transparent',
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerTransparent: true,
                    headerTitle: '', // Hides the header title
                    headerLeft: () => <CustomBackButton navigation={navigation} />,
                })}
            />

</Stack.Navigator>
</NavigationContainer>
    );
}

const styles = StyleSheet.create({
    backButton: {
        marginLeft: 15,
    },
    backButtonImage: {
      width:50,
      height:30,
      tintColor:"#0071CE"
    },
  });

export default NotificationScreen;
