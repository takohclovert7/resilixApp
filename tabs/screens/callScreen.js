import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeSecondScreen from '../../components/homeComponent/homeSecondScreen';
import HomeThreeScreen from '../../components/homeComponent/homeThreeScreen';
import CallScreenComp from '../../components/callComponent/callScreenComp';
import AlertCreation from '../../components/callComponent/customAlert';


const Stack = createStackNavigator();

const CustomBackButton = ({ navigation }) => (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image
            source={require('../../images/icons/Arrow.jpg')}
            style={styles.backButtonImage}
        />
    </TouchableOpacity>
);


const CalScreen = () => {
  return (
    <NavigationContainer independent={true}>
        <Stack.Navigator>
            <Stack.Screen
                name="Screen1"
                component={CallScreenComp}
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
                name="Screen4"
                component={AlertCreation}
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
export default CalScreen;
