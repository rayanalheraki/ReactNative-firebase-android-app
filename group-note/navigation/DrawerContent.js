import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect} from 'react';
import { StyleSheet, View ,Alert} from 'react-native';
import { Avatar,Button, Text,SocialIcon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function DrawerContent({navigation}) {
    const [email, setEmail] = useState('')
    useEffect(() => {
        getData();
      },[]);
    
      
      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('@email')
          if(value !== null) {
            setEmail(value)
          }
        } catch(error) {
          alert(error)
        }
      }
    const SignOut = async() => {
        try{
            await AsyncStorage.setItem('@authStatus', 'false');
            navigation.reset({
                index: 0,
                routes: [{ name: 'stacklogin' }],
              });
        }catch (error) {
            Alert.alert('alert',error)
        }
    }
    
  return (
    <View style={styles.container}>
      <Avatar
        containerStyle={{marginTop:50,marginBottom:10}}
        size={100}
        rounded
        overlayContainerStyle={{backgroundColor: '#dddddd'}}

        icon={{name: 'user', type: 'font-awesome',color:'#2b2e4a'}}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
        />   
        <Text h4>Profile</Text>    
        <Text >{email}</Text>
        <View style={styles.divider} />
        
        <View style={styles.buttons}>
            <Button
                title="About App"
                type="clear"
                
                onPress={()=>navigation.navigate('AboutApp')}

                />
            <View style={styles.divider} />

            <Button
                title="Sign out"
                type="clear"
                onPress={SignOut}
                />
        </View>
        <View style={styles.socialIcon}>
            <SocialIcon
                style={{width:40,height:40}}
                iconSize={20}
                light
                type='twitter'
            />
            <SocialIcon
                style={{width:40,height:40}}
                iconSize={20}
                light
                type='facebook'
            />
            <SocialIcon
                style={{width:40,height:40}}
                iconSize={20}
                light      
                type='instagram'
            />
            <SocialIcon
                style={{width:40,height:40}}
                iconSize={20}
                light
                type='github'
            />
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  divider:{
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    width:170,
    margin:10
  },
  socialIcon:{
    flexDirection: 'row',
    position: 'absolute',
    bottom:40
  },
  buttons:{
  }
});
