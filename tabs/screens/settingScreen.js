import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const SettingScreen = () => {
  return (
    <ScrollView style={styles.container}  >
      <Text style={styles.headerText}>Apps</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>ResilixPro</Text>
          <Image style={styles.itemIcon} source={require('../../images/icons/greater.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>About the app</Text>
          <Image style={styles.itemIcon} source={require('../../images/icons/greater.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Share</Text>
          <Image style={styles.itemIcon} source={require('../../images/icons/greater.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Join with us</Text>
          <Image style={styles.itemIcon} source={require('../../images/icons/greater.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Mobile data limit</Text>
          <Image style={styles.itemIcon} source={require('../../images/icons/greater.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Review</Text>
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

export default SettingScreen;
