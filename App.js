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



    const Stack = createStackNavigator();

   
const CustomBackButton = ({ navigation }) => (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image
            source={require('./images/icons/Arrow.jpg')}
            style={styles.backButtonImage}
        />
    </TouchableOpacity>
);

 
export default function App() {
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
});




