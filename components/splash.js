// SplashScreen.js
import React ,{useEffect} from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SplashScreen = ({route, navigation }) => {

  useEffect(() => {
    const fetchData = async () => {
      const token = await getItemFromLocalStorage('@resilixUser');
      if (token) {
        navigation.navigate('Screen4',{user:token});
      } else {
        console.log('User token not found.');
      }
    };
  
    fetchData();
  }, []);
  
  const getItemFromLocalStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value); // Parse JSON string back to object or value
      } else {
        return null;
      }
    } catch (error) {
      return null; // Handle error gracefully
    }
  };
  

  return (
    <View style={styles.container}>
      <Image source={require("../images/icons/LOAD.png")} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 
  },
  logo: {
    width: "100%",
    height: "100%", // Adjust to fit your logo size
  },
});

export default SplashScreen;
