import React from 'react';
import {Alert, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image , Share} from 'react-native';

const SettingScreenStart = ({navigation}) => {
    const resilixProButtonPress = (title,message) => {
        Alert.alert(
            title,
           message,
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    };
    const shareMessage = `
Check out this awesome app! resilix

Visit our website for more information: https://resilix.netlify.app/#home/
`;

    const shareApp = async () => {
        try {
            const result = await Share.share({
                message: shareMessage,
                url: 'https://resilix.netlify.app/#home/',
            });
    
            // Handle the result as needed
            if (result.action === Share.sharedAction) {
                // Shared successfully
            } else if (result.action === Share.dismissedAction) {
                // Dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

  return (
    <ScrollView style={styles.container}  >
      <Text style={styles.headerText}>Apps</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.item}  onPress={()=>{
             resilixProButtonPress("Resilix Pro is comming soon","Please stay tuned for more update")}}>
          <Text style={styles.itemText}>ResilixPro</Text>
          <Image style={styles.itemIcon} source={require('../../images/icons/greater.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={()=>{  navigation.navigate('Screen2');}}>
          <Text style={styles.itemText}>About the app</Text>
          <Image style={styles.itemIcon} source={require('../../images/icons/greater.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}  onPress={()=>{shareApp()}}>
          <Text style={styles.itemText}>Share</Text>
          <Image style={styles.itemIcon} source={require('../../images/icons/greater.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}onPress={()=>{
             resilixProButtonPress("Language Setting","Language setting is not yet supported")}}>
          <Text style={styles.itemText}>Language setting</Text>
          <Image style={styles.itemIcon} source={require('../../images/icons/greater.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}  onPress={()=>{
             resilixProButtonPress("Theme","Theme setting is not yet supported")}}>
          <Text style={styles.itemText}>Theme</Text>
          <Image style={styles.itemIcon} source={require('../../images/icons/greater.png')} />
        </TouchableOpacity>
        
      </View>
      <View style={styles.card}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Help</Text>
          <Image style={styles.itemIcon} source={require('../../images/icons/greater.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Feedback</Text>
          <Image style={styles.itemIcon} source={require('../../images/icons/greater.png')} />
        </TouchableOpacity>
      </View>
      <Text style={styles.footerText}>Tell us about the experience with the app</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  
  },
  headerText: {
    fontSize: 15,
    marginHorizontal: 50,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
    paddingLeft: 15,
    elevation: 3, // for android
    shadowColor: '#000', // for ios
    shadowOffset: { width: 0, height: 2 }, // for ios
    shadowOpacity: 0.2, // for ios
    shadowRadius: 2, // for ios
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 13,
    color: '#333',
  },
  itemIcon: {
    width: 20,
    height: 20,
    marginRight: 15,
    tintColor: "black",
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    color: '#aaa',
    marginBottom: 20,
  },
});

export default SettingScreenStart;
