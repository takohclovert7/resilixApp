import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ChangeProfileInfo = () => {
  const [name, setName] = useState('John Doe'); // Example name
 
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [retypePassword, setRetypePassword] = React.useState('');
  
  const [email, setEmail] = useState('johndoe@example.com'); // Example email
  const [edit,setEdit]=useState(false)

  const handleNameChange = (newName) => {
    setName(newName);
  };

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
  };

  const handlePasswordChange = () => {
    // Logic to handle changing password (optional)

  };

  function  handleUpdateProfile(){
    setEdit(true)
 
  };

  const handleSaveProfile = () => {
    setEdit(false)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={handleNameChange}
          placeholder="Enter your name"
          editable={edit} // Disable editing
        />
        <Image
          source={require('../../images/icons/loca.png')}
          style={styles.icon}
        />
      </View>

      <Text style={styles.label}>Email:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Enter your email"
          keyboardType="email-address"
          editable={edit} // Disable editing
        />
        <Image
          source={require('../../images/icons/loca.png')}
          style={styles.icon}
        />
      </View>
     
       
      
{!edit && <TouchableOpacity  style={styles.button}
onPress={()=>{handleUpdateProfile()}}>
    <Text  style={styles.buttonText}>UPDATE PROFILE</Text>
</TouchableOpacity> }
{(edit) &&
<TouchableOpacity  style={[styles.button,{backgroundColor:"red",borderRadius:10}]}
onPress={()=>{handleSaveProfile()}}>
    <Text  style={styles.buttonText}>SAVE INFO</Text>
</TouchableOpacity>

 }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    marginTop:30
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontWeight: 'bold',
    marginLeft:15,
    fontSize:17
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderRadius:20,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingLeft: 40, // Ensure enough space for the icon
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10, // Adjust as necessary for vertical alignment
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  password: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  button:{
    backgroundColor:"rgba(0, 113, 206, 0.9)",
    width:150,
    height:40,
    borderRadius:15,
    justifyContent:"center"
  
  },
  buttonText:{
    textAlign:"center",
    color:"white",
    fontSize:15,
    fontWeight:"bold"
    
    
    
  }
});

export default ChangeProfileInfo;
