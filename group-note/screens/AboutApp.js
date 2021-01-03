import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { Card } from 'react-native-elements'
export default function AboutApp() {
  return (
    <View style={styles.container}>

        <Card containerStyle={styles.card}>
           <Card.Title>About app</Card.Title>
            <Card.Divider/>
            <Card.Image resizeMode='contain' source={require('../assets/logo.png')}>
                
                
            </Card.Image>
            <Card.Divider/>
            <Text >
            The idea with React Native Elements is more about component structure than actual design.

            </Text>
        </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        
      
  },
  card:{
    marginTop:50,
  },
});
