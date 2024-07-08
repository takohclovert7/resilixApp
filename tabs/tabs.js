import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View,Text, Image, TouchableOpacity,TouchableWithoutFeedback , StyleSheet, Keyboard, Animated, Dimensions } from "react-native";
import FineScreen from "./screens/findScreen";
import HomeScreen from "./screens/homeScreen";
import NotificationScreen from "./screens/notificationScreen";
import CalScreen from "./screens/callScreen";
import SettingScreen from "./screens/settingScreen";
import MenuCompOpen from "../components/menuComponent/menuOpen";
import SidebarScreen from "./screens/sideBarScreen";


const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const CustomButton = ({ children, onPress, fine,keyb }) => (
  <TouchableOpacity
    style={{
      top: fine ? -13 : -30,
      justifyContent: "center",
      alignItems: "center"
    }}
    onPress={onPress}
  >
    <View style={{ width:keyb? 0:70, height: keyb?0:70, borderRadius: 35, backgroundColor: "red" }}>
      {children}
    </View>
  </TouchableOpacity>
);

const Sidebar = ({ isVisible, toggleSidebar,navigation ,username, number}) => (
  <Animated.View style={[styles.sidebar, { transform: [{ translateX: isVisible ? 0 :(width * -1) }] }]}>
 
 <View  style={[styles.sideTop,]}>
  <Image  
  source={require("../images/icons/resilix.png")}
   style={{width:100,height:26}}
  />
    <TouchableOpacity onPress={toggleSidebar}>
      <Text style={styles.closeButton}>X</Text>
    </TouchableOpacity>
    </View>
    <MenuCompOpen navigation={navigation}  username={username}   number={number}/>

</Animated.View>
);

const CustomHeader = ({ toggleSidebar }) => (
  <View style={styles.header}>
    <Image
      source={require("../images/icons/head.png")}
      style={{
        width: 100,
        height: 26,
        backgroundColor: "#0071CE",
      }}
    />
    <TouchableOpacity onPress={toggleSidebar}>
      <Image
        source={require("../images/icons/Menu.png")}
        style={{
          width: 30,
          height: 30,
          backgroundColor: "#0071CE",
        }}
      />
    </TouchableOpacity>
  </View>
);

const Tabs = ({ navigation}) => {
  const username="junior"
  const number="+2367994243"
  const [isFineScreen, setIsFineScreen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const navigateToFind = () => {
    navigation.navigate('Find');
  };


  const handleTabPress = (screenName) => {
    if (screenName === "Find" || screenName=== "sideMenu") {
      setIsFineScreen(true);
    } else {
      setIsFineScreen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      <Tab.Navigator
        initialRouteName="RESILIX"
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: "#ffffff",
            height: 100,
            elevation: 0
          },
          header: () => <CustomHeader toggleSidebar={toggleSidebar} />,
        }}
      >
        <Tab.Screen
          name="Find"
          component={FineScreen}
          listeners={{
            tabPress: e => {
              handleTabPress('Find');
            },
          }}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center", bottom: 5 }}>
                <Image
                  source={require("../images/icons/chats.png")}
                  resizeMode="contain"
                  style={{
                    width: 28,
                    height: 28,
                    tintColor: focused ? "#0071CE" : "black"
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="RESILIX"
          component={HomeScreen}
          listeners={{
            tabPress: e => {
              handleTabPress('RESILIX');
            },
          }}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center", bottom: 5 }}>
                <Image
                  source={require("../images/icons/home.png")}
                  resizeMode="contain"
                  style={{
                    width: 28,
                    height: 28,
                    tintColor: focused ? "#0071CE" : "black"
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          listeners={{
            tabPress: e => {
              handleTabPress('Notification');
            },
          }}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../images/icons/noti.png")}
                resizeMode="contain"
                style={{
                  width: 33,
                  height: 33,
                  tintColor: "white"
                }}
              />
            ),
            tabBarButton: (props) => (
              <CustomButton {...props} fine={isFineScreen} keyb={isKeyboardVisible} />
            )
          }}
        />
        <Tab.Screen
          name="Call"
          component={CalScreen}
          listeners={{
            tabPress: e => {
              handleTabPress('Call');
            },
          }}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center", bottom: 5 }}>
                <Image
                  source={require("../images/icons/phone.png")}
                  resizeMode="contain"
                  style={{
                    width: 28,
                    height: 28,
                    tintColor: focused ? "#0071CE" : "black"
                  }}
                />
                   <Icon name="Home" type="ionicon" size={30} color="green" />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingScreen}
          listeners={{
            tabPress: e => {
              handleTabPress('Setting');
            },
          }}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center", bottom: 5 }}>
                <Image
                  source={require("../images/icons/setting.png")}
                  resizeMode="contain"
                  style={{
                    width: 28,
                    height: 28,
                    tintColor: focused ? "#0071CE" : "black"
                  }}
                />
                  
              </View>
            ),
          }}
        />
{/* #0071CE */}
<Tab.Screen
          name="sideMenu"
          component={SidebarScreen}
          listeners={{
            focus: e => {
              handleTabPress('sideMenu');
            },
          }}
          options={{
            tabBarButton: () => null, // This makes the tab invisible
            tabBarVisible: false, // Hides the tab bar for this screen
          }}
/>

      </Tab.Navigator>
      <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar}  
      navigation={navigation} username={username}  number={number}/>
    </>

  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: "auto",
    backgroundColor: '#0071CE',
    justifyContent: "space-between",
    alignItems: 'center',
    flexDirection: "row",
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 20,
    paddingBottom:20
  },
  sidebar: {
    position: 'absolute',
    width: width * 0.75,
    height: '100%',
    backgroundColor: 'white',
    top: 0,
    left: 0,
    zIndex: 1000,
    // borderRightWidth:3,
    // borderColor:"rgba(0, 113, 206, 0.9)",
   
  
  },
  closeButton: {
    fontSize: 30,
    textAlign:"right",
    color: 'white',
    fontWeight:"bold",
    top:-10
   
  
  },
  sideTop:{
   flexDirection:"row",
   justifyContent:"space-between",
     backgroundColor:"rgba(0, 113, 206, 0.9)",
     height:"auto",
     paddingTop:29.6

  }
  
});

export default Tabs;
