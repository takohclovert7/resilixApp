import React,{useState} from "react";
import { Text, View ,SafeAreaView,TextInput,StyleSheet,StatusBar,TouchableWithoutFeedback,TouchableOpacity,Image,Dimensions, Keyboard, ScrollView} from "react-native";



const AIChat=()=>{
    const [componentHeight, setComponentHeight] = useState(0);
// Get screen height
const { height: screenHeight } = Dimensions.get('window');

const onLayout = (event) => {
    const { y, height } = event.nativeEvent.layout;
    // Calculate the height from the bottom of the scr
    const heightFromBottom = screenHeight - y - height;
    // Convert height from bottom to percentage
    const heightPercentage = (heightFromBottom / screenHeight) * 100;
    const newHieght=componentHeight-heightPercentage
  setComponentHeight(newHieght)
  console.log({or:heightPercentage,  nw:componentHeight})
};



    const [chatData, setChatData] = useState([]);
  const [userText,setUserText]=useState("")
    const setUserInput = (newInput) => {
        setChatData(prevData => [
            ...prevData,
            {
                userInput: newInput,
                aiResponse: "typing..." // Assuming you want to set "typing..." initially
            }
        ]);
    };
    
    const setAIResponse = (newResponse) => {
        setChatData(prevData => {
            // Make sure there are objects in the array
            if (prevData.length === 0) return prevData;
    
            // Update the aiResponse of the most recent object
            const updatedChatData = [...prevData];
            updatedChatData[updatedChatData.length - 1].aiResponse = newResponse;
            return updatedChatData;
        });
    };
    
    return(
       < TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} >
        <View >
            
            <View>
            <ScrollView  style={{backgroundColor:"green"}}>
            {
           
            chatData.map(function(chat,chat_index){
return(
    <View key={chat_index}>
          <View style={{paddingLeft:6,paddingRight:5,marginTop:7, backgroundColor:"rgba(0,113,206,0.05)",borderWidth:1,borderColor:"rgba(0,113,206,0.07)",marginRight:15,marginLeft:"20%"}}>
              <Text style={{fontSize:13,color:"#444E72"}}>{chat.userInput}</Text>
          </View>
          <View style={{paddingLeft:6,paddingRight:5,marginTop:7, backgroundColor:"rgba(0,113,206,0.21)",borderWidth:1,borderColor:"rgba(0,113,206,0.25)",marginLeft:15,marginRight:"20%"}}>
              <Text style={{fontSize:13,color:"#444E72"}}>{chat.aiResponse} </Text>
          </View>
    </View>
)

            })}
</ScrollView>
</View>

          <View  onLayout={onLayout} style={{ flexDirection:"row",alignContent:"space-between",marginLeft:15,marginTop:(15),width:"98%"
     


          }}  >
             <SafeAreaView style={styles.container}>
          <View style={styles.containerView}>
              <TextInput
            
                  style={styles.inputSimpleBorder} 
                  placeholder="Start chat"
                  multiline={true}
                  numberOfLines={5}
                  value={userText}
                  onChangeText={(text)=>{setUserText(text)}}
              />
              <StatusBar style="auto" />
          </View>
      </SafeAreaView>
      <TouchableOpacity style={{
          backgroundColor:"#0071CE",
          width:40,
          height:40,
          borderRadius:20,
          borderWidth:1,
          borderColor:"white",
          alignItems:"center",
          margin:5,
          marginRight:2
      }}
      onPress={() => {setUserInput(userText)}}
  >
  <Image 
                  source={require("../images/icons/send1.png")}
        
                  style={{
                     width:22.6,
                     height:21.74,
                     tintColor:"white",
                     marginTop:8
                  }}
                  />
               
  </TouchableOpacity>
  <View style={{marginTop:12, backgroundColor:"#0071CE",width:40,height:25,marginRight:20,borderRadius:15,alignItems:"center",justifyContent:"center"}}>
              <Text style={{fontWeight:"bold",color:"white"}}>ENG</Text>
          </View>
          </View>
          </View>
          </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    inputSimpleBorder: {
        marginBottom: 15,
        backgroundColor: "rgba(0,113,206,0.05)",
        borderColor: 'rgba(0,113,206,0.20)',
        padding:8,
        fontSize: 20,
        textAlignVertical: 'top',
        height: 50,
        width:260,
        borderWidth:2,
        marginRight:-3

     },

})
export default AIChat;