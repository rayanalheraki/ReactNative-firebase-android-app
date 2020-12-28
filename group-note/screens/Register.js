import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Input } from 'react-native-elements';

export default function Register({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.form}>
      <Input
        placeholder='  FullName'
        leftIcon={
          <Icon
            name='user'
            size={22}
            color='#2b2e4a'
          />
          }
        />
        <Input
        placeholder='  Email'
        leftIcon={
          <Icon
            name='envelope'
            size={18}
            color='#2b2e4a'
          />
          }
        />
        <Input
          placeholder="  Password" 
          secureTextEntry={true}
          leftIcon={
            <Icon name='lock' size={24} color='#2b2e4a'/>
          }
        />
       <Button
           // onPress={GoToGroup }
            buttonStyle={styles.button}
            icon={{size: 15, color: "white", name:'plus',type:'font-awesome',}}
            title="Register"
        />
        <Button
            onPress={()=>navigation.goBack() }
            buttonStyle={styles.register}
            icon={{size: 15, color: "white", name:'arrow-left',type:'font-awesome',}}
            title="Back to login"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  form:{
    marginTop:100,
    width:250,
  },
  button:{
    backgroundColor:'#2b2e4a',
    margin:10,
    height:50,
    width:200,
  },
  register:{
    backgroundColor:'#bbbbbb',
    margin:10,
    height:50,
    width:200,
  }
});
