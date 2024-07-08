// index.js

import React, { useEffect, useState } from 'react';
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';

const FirebaseMessagingApp = () => {
  const [fcmToken, setFcmToken] = useState('');

  useEffect(() => {
    const initializeFirebaseMessaging = async () => {
      await messaging().registerDeviceForRemoteMessages();
      
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });
  
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
      if (enabled) {
        const token = await messaging().getToken();
        if (token) {
        //   console.log('FCM Token:', token);
          setFcmToken(token); // Store the token in state
        } else {
          console.log('Failed to get FCM token.');
        }
  
        messaging().onTokenRefresh(newToken => {
        //   console.log('Refreshed FCM Token:', newToken);
          setFcmToken(newToken); // Update the token in state on refresh
        });
      } else {
        console.log('User denied messaging permissions.');
      }
    };

    initializeFirebaseMessaging();
  }, []);

  return <App fcmToken={fcmToken} />;
};

AppRegistry.registerComponent(appName, () => FirebaseMessagingApp);
