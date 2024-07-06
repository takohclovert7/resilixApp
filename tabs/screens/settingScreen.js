import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SettingScreenStart from '../../components/settingScreenComp/settingScreenStart';
import AboutReslixScreen from '../../components/settingScreenComp/aboutResilixScreen';



const Stack = createStackNavigator();

const CustomBackButton = ({ navigation }) => (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image
            source={require('../../images/icons/Arrow.jpg')}
            style={styles.backButtonImage}
        />
    </TouchableOpacity>
);

const SettingScreen = () => {
    
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Screen1"
                    component={SettingScreenStart}
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
                    component={AboutReslixScreen}
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


export default SettingScreen;
