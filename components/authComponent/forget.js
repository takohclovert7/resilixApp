import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Keyboard } from 'react-native';


const ForgetScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

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
        
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Don’t worry! It happens. Please enter the email associated with your account.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.sendCodeButton}>
        <Text style={styles.sendCodeButtonText}>Send Code</Text>
      </TouchableOpacity>
      <View style={{flexDirection:"row"}}>
      <Text style={styles.footerText}>
        Remember Password? </Text>
        <TouchableOpacity   onPress={()=>{ navigation.navigate('Screen1');}}>
        <Text style={styles.loginText}>Login</Text></TouchableOpacity>
     
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
    height:"100%",
    flex: 1,
    alignItems: 'center',
    
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    marginTop:40

  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
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
  sendCodeButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    height:48
  },
  sendCodeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#aaa',
  },
  loginText: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
});

export default ForgetScreen;
