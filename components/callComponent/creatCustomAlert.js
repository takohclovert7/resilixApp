import React,{useState} from 'react';
import { StyleSheet, ScrollView, Text, Keyboard, View, Image, TouchableOpacity, SafeAreaView, TextInput, StatusBar, TouchableWithoutFeedback, Alert } from 'react-native';

const CustomAlertCreation = ({addressName,handleSendAlert}) => {
    const [titleInputValue, setTitleInputValue] = useState('');
    const [alertDesInputValue, setAlertDesInputValue] = useState('');
   
    const handleTitleInputChange = (text) => {
        setTitleInputValue(text);
      };
    
      const handleAlertDesInputChange = (text) => {
        setAlertDesInputValue(text);
      };
      const handleSubmit = () => {
        if (titleInputValue.trim() === '' || alertDesInputValue.trim() === '') {
          Alert.alert('Input Field Required', titleInputValue.trim() === ''?"Provide Custom Alert Title.":'Provide Description For Custom Alert .');
        } else {

handleSendAlert(titleInputValue,alertDesInputValue);
          }
      };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Custom Alert</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Alert Title</Text>
            <TextInput
              style={[styles.inputSimpleBorder,{height:65}]}
              placeholder="Type alert title"
              multiline={true}
              numberOfLines={5}
              value={titleInputValue}
              onChangeText={handleTitleInputChange}
            />
          </View>

          <Text style={styles.infoText}>
            Noticed something Dangerous or Strange? Report it to keep the community informed and safe.
          </Text>

          <View style={styles.locationContainer}>
            <View style={styles.locationView}>
              <Image
                source={require("../../images/icons/loca.png")}
                resizeMode="contain"
                style={styles.locationIcon}
              />
              <Text style={styles.locationText}>{addressName}</Text>
            </View>
          </View>

          <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.innerContainer}>
              <View style={[styles.inputContainer,{width:"100%"}]}>
                <TextInput
                  style={styles.inputSimpleBorder}
                  placeholder="Type alert description here "
                  multiline={true}
                  numberOfLines={5}
                  value={alertDesInputValue}
                  onChangeText={handleAlertDesInputChange}
                />
                <Image
                  source={require('../../images/icons/mic.png')}
                  style={styles.image}
                />
              </View>
            </View>
          </SafeAreaView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit} 
            >
              <Text style={styles.buttonText}>Send Alert</Text>
              <Image
                source={require("../../images/icons/send1.png")}
                resizeMode="contain"
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#D9D9D9",
    height:"100%",
    marginBottom:100
  },
  container: {
    backgroundColor: "#D9D9D9",
    flex: 1,
  },
  header: {
    marginTop: 30,
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#444E72",
  },
  inputContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  inputLabel: {
    textAlign: "left",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
    marginVertical: 10,
  },
  inputSimpleBorder: {
    marginBottom: 15,
    backgroundColor: "rgba(165,229,255,0.2)",
    borderWidth: 1,
    borderColor: 'rgba(165,229,255,0.6)',
    padding: 10,
    fontSize: 13,
    textAlignVertical: 'top',
    height: 120,
    width: "100%",
  },
  infoText: {
    width: "80%",
    marginLeft: 20,
    fontSize: 12,
    color: "#444E72",
    textAlign: 'center',
  },
  locationContainer: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    justifyContent: "center",
    marginLeft: 30,
  },
  locationView: {
    flexDirection: "row",
    backgroundColor: "rgba(165,229,255,0.3)",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  locationIcon: {
    width: 24,
    height: 30,
    tintColor: "rgba(0,113,206,1.0)",
    marginLeft: -2,
    marginRight: 5,
  },
  locationText: {
    color: "#444E72",
    padding:10
  },
  safeAreaView: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    position: 'absolute',
    bottom: 16,
    right: 4,
    width: 30,
    height: 30,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    bottom:20
  },
  button: {
    backgroundColor: "red",
    width: 130,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    paddingRight: 10,
  },
  buttonIcon: {
    width: 30,
    height: 20,
    tintColor: "white",
  },
});

export default CustomAlertCreation;
