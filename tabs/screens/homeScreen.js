import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeThreeScreen from '../../components/homeComponent/homeThreeScreen';
import HomeSecondScreen from '../../components/homeComponent/homeSecondScreen';
import HomeFirstScreen from '../../components/homeComponent/homeFirstScreen';
import PredictFloodStatistic from '../../components/predictionComponent/predictFloodStart';
import FloodForcastPerDay from '../../components/predictionComponent/floodForcastePerDay';
import LandSlideMainComp from '../../components/floodComponent/landslideMain';





const Stack = createStackNavigator();

const CustomBackButton = ({ navigation }) => (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image
            source={require('../../images/icons/Arrow.jpg')}
            style={styles.backButtonImage}
        />
    </TouchableOpacity>
);

const HomeScreen = () => {
    
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Screen1"
                    component={HomeFirstScreen }
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
                    component={HomeSecondScreen}
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
        
                <Stack.Screen
                    name="Screen3"
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
       
       <Stack.Screen
                    name="Screen5"
                    component={PredictFloodStatistic}
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


<Stack.Screen
                    name="Screen6"
                    component={LandSlideMainComp}
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
  
 
<Stack.Screen
                    name="Screen7"
                    component={FloodForcastPerDay}
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
      width:40,
      height:30,
      tintColor:"#0071CE"
    },
});

export default HomeScreen;
