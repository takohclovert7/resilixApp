import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';

const OtpVerification = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isValid, setIsValid] = useState([true, true, true, true, true, true]);
  const inputs = useRef([]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    const newIsValid = [...isValid];

    // Validate the input
    if (/^[0-9]*$/.test(value)) {
      newOtp[index] = value;
      newIsValid[index] = true;
    } else {
      newIsValid[index] = false;
    }

    setOtp(newOtp);
    setIsValid(newIsValid);

    // Move to next input if value is valid and not empty and index is not the last one
    if (value && /^[0-9]*$/.test(value) && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }

    // If input is more than 1 character, distribute the characters
    if (value.length > 1) {
      const values = value.split('');
      values.forEach((char, idx) => {
        if (idx < 6) {
          newOtp[idx] = char;
          newIsValid[idx] = /^[0-9]*$/.test(char);
          if (inputs.current[idx]) {
            inputs.current[idx].value = char;
          }
        }
      });
      setOtp(newOtp);
      setIsValid(newIsValid);
      inputs.current[5].focus(); // Focus the last input after distributing the characters
    }
  };

  const handleResendOtp = () => {
    // Implement resend OTP logic here
  };

  const handleVerifyOtp = () => {
    const allFieldsFilled = otp.every((digit) => digit !== '');
    const allFieldsValid = isValid.every((valid) => valid);

    if (!allFieldsFilled) {
      Alert.alert('Error', 'Please enter all OTP fields.');
      return;
    }

    if (!allFieldsValid) {
      Alert.alert('Error', 'Please enter valid numbers in all OTP fields.');
      return;
    }

    // Implement OTP verification logic here
    Alert.alert('Success', 'OTP verified successfully!');
   navigation.navigate('Screen4');
  };

  return (
    <ScrollView >
    <View style={styles.container}>
      <Image 
        source={require("../../images/icons/otp.jpeg")} 
        style={styles.image}
      />
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Enter OTP sent to +234 674 456 5903</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput 
            key={index}
            style={[styles.otpInput, !isValid[index] && styles.invalidInput]} 
            keyboardType="numeric" 
            value={digit} 
            onChangeText={(value) => handleOtpChange(value, index)} 
            maxLength={1} // Allow maximum 1 character per input field
            ref={ref => inputs.current[index] = ref}
            textContentType="oneTimeCode"
            autoCompleteType="sms-otp"
          />
        ))}
      </View>
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive OTP?</Text>
        <TouchableOpacity onPress={handleResendOtp}>
          <Text style={styles.resendLink}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    
  },
  image: {
    marginTop:100,
    width: 230,
    height: 230,
    marginBottom: 30,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    height: 50,
    width: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    marginRight: 10,
  },
  invalidInput: {
    borderColor: 'red',
  },
  resendContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  resendText: {
    color: 'gray',
  },
  resendLink: {
    color: '#007BFF',
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default OtpVerification;
