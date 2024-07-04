import { Alert ,Modal,Image, StyleSheet,Button, TouchableOpacity,Text, View,TouchableWithoutFeedback,Keyboard } from 'react-native';
import React ,{useEffect,useState,}from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './tabs/tabs';
import SignUpScreen from './components/authComponent/signup';
import LoginScreen from './components/authComponent/login';
import ForgetScreen from './components/authComponent/forget';
import MyComponent from './test';
import SplashScreen from './components/splash';
import NetworkStatus from "./testme";
import NetInfo from '@react-native-community/netinfo';
import OtpVerification from './components/authComponent/otpScreen';
import { initializeNotifee } from './PushNotificationConfig';
import MyApp1 from './test';
import MyMap from './components/map/mapView';


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


// {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//   <Text>Network is online. Your content goelf vkldfv kldsvk ds here.</Text>
//   <Text>Network is online. Your content goelf vkldfv kldsvk ds here.</Text>
//   <Text>Network is online. Your content goelf vkldfv kldsvk ds here.</Text>
//   <Text>Network is online. Your content goelf vkldfv kldsvk ds here. {isOnline?"true":"false"}</Text>

//   <NonDismissibleAlert visible={!isOnline} message="This is a non-dismissible alert!" />

// </View> */}



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








// sk.eyJ1IjoianVuaW9yNzAiLCJhIjoiY2x4cTN1ODc5MG42bzJxcHV6dmo4Z25zMiJ9.3JtsOrFCBDVBq9ciaDxg3A