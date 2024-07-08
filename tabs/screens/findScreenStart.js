import React,{useState,useEffect} from 'react';
import {ActivityIndicator, View,Keyboard,Text,Image, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import FineScreenHeader from './findScreenHeader';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Markdown from 'react-native-markdown-display';
const  FineScreenStart = ({location,reloadScreen}) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [disableTextInput, setDisableTextInput]=useState(true)
  const [addressName,setAddresName]=useState(null)
const [isLoading, setIsLoading] = useState(true);
const [isOnline, setIsOnline] = useState(true);
const [chatDataAi,setChatDataAi]=useState("")
const [chatExist, setChatExist]=useState(false)
useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(state => {
    setIsOnline(state.isConnected);
  });

  // Check the initial network state
  NetInfo.fetch().then(state => {
    setIsOnline(state.isConnected);
  });

  return () => {
    unsubscribe();
  };
}, [isOnline]);
  React.useEffect(() => {
  
    if(location===0){

    }else{
    getHumanReadableAddress(location.coords.latitude, location.coords.longitude);
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        setIsKeyboardVisible(true);
      });
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setIsKeyboardVisible(false);
      });
  
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };}
    }, [reload]);
  
    const getHumanReadableAddress = async (latitude, longitude) => {
        setErr(false)
        setIsLoading(true)
        try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          // console.log('Address:', response.data.display_name);
          setAddresName(response.data.display_name);
          setIsLoading(false)
          // sendPostRequest()
        } catch (error) {
          setErr(true)
          setIsLoading(false)
        }
      };
    
      const handleInputChange = (text) => {
        setInputValue(text);
      };
    
      const [reload ,setReload]=useState(false)
      const [err, setErr]=useState(false)
    const [chatData, setChatData] = useState([]);
  const [userText,setUserText]=useState("")
  const setUserInput = (newInput) => {
    setUserText(""); // Assuming setUserText clears the user input
    setDisableTextInput(false);

    // Add user input with initial AI response of "typing..."
    setChatData(prevData => [
        ...prevData,
        {
            userInput: newInput,
            aiResponse: "typing..."
        }
    ]);

    // Send the POST request to the API
    sendPostRequest(newInput)
        .then(response => {
            // Update AI response after successful API response
            setTimeout(() => setAIResponse(response.data.response), 3000);
        })
        .catch(error => {
            console.error('Error sending post request:', error);
            // Handle error if necessary
        });
};

const setAIResponse = (newResponse) => {
    setChatData(prevData => {
        if (prevData.length === 0) return prevData;

        const updatedChatData = [...prevData];
        updatedChatData[updatedChatData.length - 1].aiResponse = newResponse;
        return updatedChatData;
    });
    setDisableTextInput(true);
};

async function sendPostRequest(userInput) {
    setChatExist(false);
    const url = 'https://resilixapi.onrender.com/chatbot/';
    const data = {
        message: userInput
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Success:', response.data.response);
        setChatExist(true);
        return response; // Return the entire response object
    } catch (error) {
        if (error.response) {
            console.log('Server error:', error.response.data);
            console.log('Status code:', error.response.status);
        } else if (error.request) {
            console.log('Network error:', error.request);
        } else {
            console.log('Error:', error.message);
        }
        throw error; // Rethrow the error to handle it in setUserInput
    }
}






    if (isLoading ) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
               <ActivityIndicator size="large" color="#0000ff" />
            <Text>Decoding  device location...</Text>
          </View>
        );
      }
      if (!isOnline) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            
            <Text style={{fontSize:18,marginBottom:10}}>you are currently offline</Text>
            <TouchableOpacity style={{marginTop:10,width:90,height:35,borderRadius:10,
              backgroundColor:"lightgray",justifyContent:"center"}}
              onPress={()=>{  setReload(prevState => !prevState);}}
              >
              <Text style={{fontSize:15,fontWeight:"bold",textTransform:"uppercase",textAlign:"center"}}>Roload </Text>
            </TouchableOpacity>
          </View>
        );
      }


      if (err) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Network error occur  fail to get device address</Text>
            <TouchableOpacity style={{marginTop:10,width:90,height:35,borderRadius:10,
              backgroundColor:"lightgray",justifyContent:"center"}}
              onPress={()=>{   setReload(prevState => !prevState);}}
              >
              <Text style={{fontSize:15,fontWeight:"bold",textTransform:"uppercase",textAlign:"center"}}>Roload </Text>
            </TouchableOpacity>
          </View>
        );
      }
    

  return (
    <KeyboardAvoidingView 
  
      style={[styles.container,{flex:isKeyboardVisible?1:0.84}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
        <ScrollView>
      <FineScreenHeader  addressName={addressName} />
   {/* chat manipulations  start */}
   {
           
           chatData.map(function(chat,chat_index){
return(
   <View key={chat_index}  style={{marginBottom:10}}>
         <View style={{paddingLeft:6,paddingRight:5,marginTop:7, backgroundColor:"rgba(0,113,206,0.05)",borderWidth:1,borderColor:"rgba(0,113,206,0.07)",marginRight:15,marginLeft:"20%"}}>
             <Text style={{fontSize:13,color:"#444E72"}}>{chat.userInput}
              
             </Text>
         </View>
         <View style={{paddingLeft:6,paddingRight:5,marginTop:7, backgroundColor:"rgba(0,113,206,0.21)",borderWidth:1,borderColor:"rgba(0,113,206,0.25)",marginLeft:15,marginRight:"20%"}}>
             {/* <Text style={{fontSize:13,color:"#444E72"}}> */}
             <Markdown>
             {chat.aiResponse}
   </Markdown>
              
               {/* </Text> */}
         </View>
   </View>
)

           })}

   {/* chat manipulations  end */}

      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput,{fontSize:disableTextInput?12:12}]}
          placeholder={disableTextInput?"Start chat":"wait for Resilix AI response"}
          multiline={true}
          numberOfLines={5}
          editable={disableTextInput}
          value={userText}
          onChangeText={(text)=>{setUserText(text)}}
        />
        <TouchableOpacity style={styles.sendButton} 
           onPress={() => {setUserInput(userText)}}>
        <Image 
                  source={require("../../images/icons/send1.png")}
        
                  style={{
                     width:25.6,
                     height:23.74,
                     tintColor:"white",
                     marginTop:8
                  }}
                  />
        </TouchableOpacity>

        <View style={{marginTop:1, backgroundColor:"#0071CE",width:50,height:30,marginRight:5,borderRadius:15,alignItems:"center",justifyContent:"center"}}>
              <Text style={{fontWeight:"bold",color:"white"}}>ENG</Text>
          </View>

      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },


  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
     marginBottom:1
  },
  textInput: {
    flex: 1,  
    backgroundColor: "rgba(0,113,206,0.05)",
    borderColor: 'rgba(0,113,206,0.20)',
    padding:8,
    textAlignVertical: 'top',
    height: 48,
    width:260,
    borderWidth:2,
    marginLeft:4
   
  },
  sendButton: {
    backgroundColor:"#0071CE",
    width:40,
    height:40,
    borderRadius:20,
    borderWidth:1,
    borderColor:"white",
    alignItems:"center",
    margin:5,
    marginRight:2

  },
 
});


export default FineScreenStart;
