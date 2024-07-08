import { Alert ,Modal,Image, StyleSheet,Button, TouchableOpacity,Text, View,TouchableWithoutFeedback,Keyboard } from 'react-native';
import React ,{useEffect,useState,}from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './tabs/tabs';
import SignUpScreen from './components/authComponent/signup';
import LoginScreen from './components/authComponent/login';
import ForgetScreen from './components/authComponent/forget';
import SplashScreen from './components/splash';
import NetInfo from '@react-native-community/netinfo';
import OtpVerification from './components/authComponent/otpScreen';
import { initializeNotifee } from './PushNotificationConfig';
import Chat from "./test"

    const Stack = createStackNavigator();

   
const CustomBackButton = ({ navigation }) => (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image
            source={require('./images/icons/Arrow.jpg')}
            style={styles.backButtonImage}
        />
    </TouchableOpacity>
);

 
export default function App({fcmToken}) {
    const [isLoading, setIsLoading] =useState(true);
   



    useEffect( () => {
     
      setTimeout(() => {
        setIsLoading(false);
      }, 3000); // Duration for splash screen
      
    }, []);

    const handlePress = () => {
        initializeNotifee("emegency description","flood happen")
      
      };



return(

    <NavigationContainer independent={true}>
   
    <Stack.Navigator>

    {isLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen}
          
          options={({ navigation }) => ({
            headerTitle: '', // Hides the header title
            headerShown: false,
        })}
          />
        ) : (

        <Stack.Screen
            name="Screen1"
            component={LoginScreen}
            initialParams={{fcmToken:fcmToken}} // Pass initial parameters here
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
    )}



        <Stack.Screen
            name="Screen2"
            component={SignUpScreen}
            options={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: 'transparent',
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerTransparent: true,
                headerTitle: '', // Hides the header title,
                headerShown: false,
               
            })}
        />

        <Stack.Screen
            name="Screen3"
            component={ForgetScreen}
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
            name="Screen4"
            component={Tabs}
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
                    name="Screen5"
                    component={OtpVerification}
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


// <View style={styles.container}>
// <Text style={styles.header}>Group Chat</Text>
// <Chat groupId={"resilix-group-id"} currentUser={{ _id: '1', name: 'User1' }}/>
// </View>


)
} 


const styles = StyleSheet.create({
    backButton: {
        marginLeft: 15,
    },
    backButtonImage: {
      width:40,
      height:30,
      tintColor:"#0071CE"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
      },
});




