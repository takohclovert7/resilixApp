import React, { useState,useEffect } from 'react';
import {ActivityIndicator, Alert ,View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
const SignUpScreen = ({route, navigation }) => {
  const {fcmToken}= route.params;
  
  const [isCreatingaccount,setIsCreatingaccount] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const signWithGoogleButtonPress = () => {
    Alert.alert(
        'Google Signup comming',
        'Please use the normal signup method',
        [
            { text: 'OK' }
        ],
        { cancelable: false }
    );
};
async function handleSignupWithnuber(){
     // Password validation regex: at least one uppercase, one lowercase, one special character, and minimum 8 characters
     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;


  if (name.length < 6) {
    Alert.alert('Invalid Username', 'Username must be at least 6 characters long.');
    return; // Prevent form submission
  }
  else if (phone.length < 9) {
    Alert.alert('Invalid Phone Number', 'Phone number must be at least 9 characters long.');
    return; // Prevent form submission
  }

  else if (!passwordRegex.test(password)) {
    Alert.alert(
      'Invalid Password',
      'Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long.'
    );
    return; // Prevent form submission
  }
  else{
    setIsCreatingaccount(true)
    try {
      const response = await axios.post('https://resilix.onrender.com/user/signup/', {
        username: name,
        password: password,
        phone_number: phone,
        fcmToken:fcmToken
      });
      console.log('Response:', response.data);
      setIsCreatingaccount(false)
      // Handle success, update state, etc.
      Alert.alert(
        'Account created succesfully',
        'Your account has being created successfully',
        [
            { text: 'OK', onPress: () => {
             navigation.navigate('Screen5',{phone:phone});
              
            }, }
        ],
        { cancelable: false }
    );
    } catch (error) {
      console.log('Error:', error.message);
      // Handle error, show alert, etc.
      Alert.alert(
        'Account creation unsuccesful',
        'Your account was  not created please try again',
        [
            { text: 'OK' }
        ],
        { cancelable: false }
    );
      setIsCreatingaccount(false)
    }
  }
}

const handlePostRequest = async () => {
  setIsCreatingaccount(true)
  try {
    const response = await axios.post('https://resilix.onrender.com/user/signup/', {
      username: "brandosk70",
      password: "@Bossman123",
      phone_number: "+237653603453",
      fcmToken:fcmToken
    });
    console.log('Response:', response.data);
    setIsCreatingaccount(false)
    // Handle success, update state, etc.
  } catch (error) {
    console.log('Error:', error.message);
    // Handle error, show alert, etc.
    setIsCreatingaccount(false)
  }
};
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Resilix</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your user Name"
            value={name}
            editable={!isCreatingaccount}
            onChangeText={setName}
              keyboardType="email-address"
          />
         
          
          <TextInput
            style={styles.input}
            placeholder="Enter Your Phone Number"
            value={phone}
            editable={!isCreatingaccount}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Password"
              value={password}
              editable={!isCreatingaccount}
              onChangeText={setPassword}
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
          {isCreatingaccount && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{color:"red",fontSize:16,fontWeight:"bold"}}>Creating Your account...</Text>
      </View>
          )}
          <TouchableOpacity style={styles.signUpButton}
          disabled={isCreatingaccount}
           onPress={()=>{ 
            handleSignupWithnuber()
          
          }}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>or continue with</Text>
          <TouchableOpacity style={styles.googleButton}
          disabled={isCreatingaccount}
           onPress={()=>{ 
            // handlePostRequest()
          signWithGoogleButtonPress()
            }}
          >
            <Image
              source={require("../../images/icons/google.png")}
              resizeMode="contain"
              style={{ width: 24, height: 26 }}
            />
            <Text style={styles.googleButtonText}>Signup with Google</Text>
          </TouchableOpacity>
          <View style={{flexDirection:"row"}}>
          <Text style={styles.footerText}>
            Already have an account?  </Text>
             <TouchableOpacity
             onPress={()=>{ navigation.navigate('Screen1');}}
            >
             <Text style={styles.loginText}>Login</Text></TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 50,
    marginTop:80
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
  signUpButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    height:48,
    paddingBottom:7
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    color: '#aaa',
    marginBottom: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    width: '100%',
    marginBottom: 20,
    borderWidth: 2,
    height:48,
    paddingBottom:8
  },
  googleButtonText: {
    color: 'gray',
    fontSize: 16,
    marginLeft: 40,
  },
  footerText: {
    color: 'black',
  },
  loginText: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
