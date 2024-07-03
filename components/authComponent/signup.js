import React, { useState,useEffect } from 'react';
import { Modal,View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';



const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Resilix</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Name"
            value={email}
            onChangeText={setName}
              keyboardType="email-address"
          />
         
          <TextInput
            style={styles.input}
            placeholder="Enter Your Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Your Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Password"
              value={password}
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
          <TouchableOpacity style={styles.signUpButton}
           onPress={()=>{ navigation.navigate('Screen5');}}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>or continue with</Text>
          <TouchableOpacity style={styles.googleButton}
           onPress={()=>{ navigation.navigate('Screen4');}}
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
