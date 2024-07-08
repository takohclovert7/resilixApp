import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image } from 'react-native';


const MenuCompStart = ({navigation,username, number}) => {
 
  const getFirstTwoLetters = (str) => {
    return str.substring(0, 2); // Extracts characters from index 0 to 1 (inclusive)
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Text   style={[styles.profileImage,{textTransform:"uppercase"}]}>
        {getFirstTwoLetters(username)}
          </Text>
        <Text style={styles.name}>{username}</Text>
        {/* <Text style={styles.email}>{ number}</Text> */}
      </View>
      <View style={styles.menu}>

      <TouchableOpacity style={styles.menuItem}   onPress={()=>{
       navigation.navigate('sideMenu',{screenName:"viewRecentDisaster"});
  }}>
    
      <Image
        source={require("../../images/icons/disaster.png")}
        style={styles.icon}
        />
    <Text style={styles.menuText}>View Recent Disasters</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuItem}  
  onPress={()=>{
    navigation.navigate('sideMenu',{screenName:"addFamilyMember"});
}}>
  <Image
        source={require("../../images/icons/people_plus.png")}
        style={styles.icon}
        />
    <Text style={styles.menuText}>Add Family members</Text>
  </TouchableOpacity>

       <TouchableOpacity style={styles.menuItem}
        onPress={()=>{
          navigation.navigate('sideMenu',{screenName:"ViewFamilyMember"});
     }} 
       >
       <Image
        source={require("../../images/icons/family.png")}
        style={styles.icon}
        />
    <Text style={styles.menuText}>View Family Members </Text>
  </TouchableOpacity>
  
  <TouchableOpacity style={styles.menuItem}    onPress={()=>{
       navigation.navigate('sideMenu',{screenName:"communityChat", username:getFirstTwoLetters(username)});
  }}    >
  <Image
        source={require("../../images/icons/live.png")}
        style={styles.icon}
        />
    <Text style={styles.menuText}>Community Chat</Text>
  </TouchableOpacity>


  <TouchableOpacity style={styles.menuItem}   onPress={()=>{
       navigation.navigate('sideMenu',{screenName:"profileInfo",username,number});
  }}>
  <Image
        source={require("../../images/icons/profile.png")}
        style={styles.icon}
        />
    <Text style={styles.menuText}>Change profile info</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuItem}  onPress={()=>{
       navigation.navigate('Screen1');
  }}  >
    
  <Image
        source={require("../../images/icons/logout.png")}
        style={styles.icon}
        />
    <Text style={styles.menuText}>Logout</Text>
  </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom:50,
    // borderRadius:20
   
  },
  profile: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
//  borderTopRightRadius:20,
//  borderTopLeftRadius:20
  },
  profileImage: {
    textAlign:"center",
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor:"white",
    fontSize:50
  

  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textTransform:"capitalize"
  },
  email: {
    fontSize: 18,
    color: '#666',
  },
  menu: {
    marginTop: 20,
  
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    
  },
  icon:{
    width:30,
    height:30,
    tintColor:"rgba(0, 113, 206, 0.9)"
  
  }
});



export default MenuCompStart;