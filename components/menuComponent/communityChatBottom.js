import React, { useState, useEffect } from 'react';
import { Alert, View, Image, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { firestore } from '../authComponent/firebaseConfig';

const CommunityChatBottom = ({ groupId, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('messages')
      .where('groupId', '==', groupId)
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: firebaseData.text,
            createdAt: new Date(firebaseData.createdAt.seconds * 1000),
            user: firebaseData.user,
          };

          return data;
        });

        setMessages(messages);
      });

    return () => unsubscribe();
  }, [groupId]);

  useEffect(() => {
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

  const onSend = (newMessages = []) => {
    const { _id, createdAt, text, user } = newMessages[0];
    firestore()
      .collection('messages')
      .add({
        _id,
        text,
        createdAt,
        user,
        groupId,
      });
  };

  const onDeleteMessage = (messageId) => {
    firestore()
      .collection('messages')
      .doc(messageId)
      .delete()
      .then(() => {
        Alert.alert('Message deleted');
      })
      .catch((error) => {
        console.error('Error deleting message: ', error);
      });
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        onLongPress={() => {
          if (props.currentMessage.user._id === currentUser._id) {
            Alert.alert(
              'Delete Message',
              'Are you sure you want to delete this message?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => onDeleteMessage(props.currentMessage._id) },
              ],
              { cancelable: true }
            );
          }
        }}
      />
    );
  };

  // Customize InputToolbar style
  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: 'rgba(0,113,206,0.05)',
          borderTopColor: '#e0e0e0',
          marginTop: 2,
          marginHorizontal: 2,
          borderRadius: 25,
          borderBottomWidth: 2,
          borderTopWidth: 2,
          borderColor: 'rgba(0,113,206,0.20)',
        }}
      />
    );
  };

  // Customize Send button style
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <Image
            source={require('../../images/icons/send1.png')}
            style={styles.sendIcon}
          />
        </View>
      </Send>
    );
  };

  // Dismiss keyboard when tapping anywhere on the screen
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
      <View style={{ flex:isKeyboardVisible?0.93: 1 }}>
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{ _id: currentUser._id, name: currentUser.name }}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderSend}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  sendButton: {
    marginRight: 10,
    marginBottom: 5,
    backgroundColor: '#0071CE',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    margin: 5,
  },
  sendIcon: {
    width: 25.6,
    height: 23.74,
    tintColor: 'white',
  },
});

export default CommunityChatBottom;
