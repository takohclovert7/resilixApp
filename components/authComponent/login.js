import React, { useState ,useEffect} from 'react';
import {ActivityIndicator, Alert,View, Image, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Keyboard } from 'react-native';
import CheckBox from 'react-native-check-box'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({route, navigation }) => {
  const {fcmToken}= route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
const [isLogging,setIsLoggin]=useState(false)
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const loginWithGoogleButtonPress = () => {
    Alert.alert(
        'Google Login comming',
        'Please use the normal login method',
        [
            { text: 'OK' }
        ],
        { cancelable: false }
    );
};


async function sendPostRequest() {
  setIsLoggin(true)
  const url = 'https://resilixapi.onrender.com/login/';
  const data = {
    username:email ,
     password:password
  };

  try {
      const response = await axios.post(url, data, {
          headers: {
              'Content-Type': 'application/json'
          }
      });

      console.log('Success:', response.data);
// local storage
try {
  const jsonValue = JSON.stringify(response.data);
  await AsyncStorage.setItem('@resilixUser', jsonValue);
  console.log('Data successfully saved');
} catch (e) {
  console.log('Failed to save the data to the storage');
}
// 
      navigation.navigate('Screen4',{user:response.data});
      setIsLoggin(false)
  } catch (error) {
    setIsLoggin(false)
    Alert.alert(
      'Login Fail',
      'Please try to login agian',
      [
          { text: 'OK' }
      ],
      { cancelable: false }
  );
      if (error.response) {
          console.log('Status code:', error.response.status);
          console.log('Headers:', error.response.headers);
      } else if (error.request) {
          console.log('Network error:', error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error:', error.message);
      }
  }
}



  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <TouchableOpacity style={styles.container} activeOpacity={1} onPress={dismissKeyboard}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../images/icons/resilix.png")}
            style={{ width: 200, height: 54, marginTop: 90 }}
          />
        </View>
        <View style={styles.formContainer}>
        <Text style={{fontWeight:"bold",color:"black",marginBottom:4,marginLeft:7}}>User Name</Text>
          <TextInput
            style={styles.input}
            placeholder="user name"
            value={email}
            editable={!isLogging}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Text style={{fontWeight:"bold",color:"black",marginBottom:4,marginLeft:7}}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Password"
              value={password}
              onChangeText={setPassword}
              editable={!isLogging}
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Image
                source={require("../../images/icons/hide.png")}
                resizeMode="contain"
                style={{ width: 28, height: 26, tintColor: "black" }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.rememberMeContainer}>

          <CheckBox
    style={{flex: 1, padding: 10}}
    onClick={() => setRememberMe(!rememberMe)}
    isChecked={rememberMe}
    rightText={"Remember Me"}
    rightTextStyle={styles.rememberMeText}
/>

            <TouchableOpacity     onPress={()=>{ navigation.navigate('Screen3');}}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          {isLogging && (
          <View style={{ alignItems: 'center' ,marginBottom:15}}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{color:"red",fontSize:16,fontWeight:"bold"}}>Logging you in...</Text>
      </View>
          )}
          <TouchableOpacity style={styles.loginButton}
          disabled={isLogging}
          onPress={()=>{ 
            
            sendPostRequest();}}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>or continue with</Text>
          <TouchableOpacity style={styles.googleButton}
           disabled={isLogging}
           onPress={()=>{ loginWithGoogleButtonPress();}}
          >
            <Image
              source={require("../../images/icons/google.png")}
              resizeMode="contain"
              style={{ width: 24, height: 20 }}
            />
            <Text style={styles.googleButtonText}>Login with Google</Text>
          </TouchableOpacity>
            <View style={{flexDirection:"row",justifyContent:"center"}}>
          <Text style={styles.footerText}>
            Don’t have an account? </Text>
            <TouchableOpacity  
            onPress={()=>{ navigation.navigate('Screen2',{fcmToken:fcmToken});}}
            ><Text style={styles.signUpText}>Sign Up</Text></TouchableOpacity>
        </View>
        </View>
       
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'rgba(0,113,206,0.9)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,113,206,0.9)',
  },
  logoContainer: {
    alignItems: 'center',
    backgroundColor: "rgba(0,113,206,0.9)",
    width: "100%",
    height: 180,
  },
  formContainer: {
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    height:"100%"
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 20,
    height:48
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  rememberMeContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  rememberMeText: {
    flex: 1,
    color: '#333',
  },
  forgotPassword: {
    color: '#FF6347',
  },
  loginButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    height:48
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    color: '#aaa',
    marginBottom: 10,
    textAlign: "center"
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    borderWidth: 2,
    height:48,
    paddingBottom:8
  },
  googleButtonText: {
    color: 'gray',
    fontSize: 14,
    marginLeft: 35,
    
  },
  footerText: {
    color: 'black',
    textAlign: "center"
  },
  signUpText: {
    color: '#4A90E2',
    fontWeight: 'bold',

    
  },
});

export default LoginScreen;
