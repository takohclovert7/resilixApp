
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyATzJvFxVrWLeO_BLNKfWfZCOOzDJImAD4",
  authDomain: "projectresilix.firebaseapp.com",
  projectId: "projectresilix",
  storageBucket: "projectresilix.appspot.com",
  messagingSenderId: "100777085705",
  appId: "1:100777085705:web:5266a1505d9a52e57221d8",
  measurementId: "G-34GXZFDYHC"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase, firestore };