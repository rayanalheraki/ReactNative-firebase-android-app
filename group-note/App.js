import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Route from './route.js';
import firebase from './firebase-connect/firebaseConf';
import Signup from './screens/Signup.js';
import Login from './screens/Login.js';

// firebase test 
console.log("started")
export default function App() {
  return (
    <Route/>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
