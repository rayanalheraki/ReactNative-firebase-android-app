import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Route from './route.js';
import firebase from './firebase-connect/firebaseConf';


// firebase test 
 firebase.database()
          .ref(`/notes/1`)
          .on('value', snapshot => {
              console.log('----------',snapshot.val());
                    
                    
          },[]);


export default function App() {
  return <Route/>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});