import React,{useState,useEffect} from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//------ screens ----------
import Login from './screens/Login';
import Signup from './screens/Signup';
import MainDrawerNavigation from './navigation/MainDrawerNavigation';

const Stack = createStackNavigator();
const Stack2 = createStackNavigator();


//for signOut 
function stacklogin(){
  return(
  <Stack2.Navigator
      screenOptions={{
          headerStyle: {
          backgroundColor: '#e84545',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold',
          },
      }}
    >
      <Stack2.Screen name="Login" component={Login} options={() => ({ headerTitle: "Login" })} />
      <Stack2.Screen name="Signup" component={Signup} options={() => ({ headerTitle: "Signup" })} />

  </Stack2.Navigator>
  );

}


export default function Route() {
  const [userToken,setUserToken]= useState('');


  useEffect(() => {
    getData();
  },[]);

  
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@authStatus')
      if(value !== null) {
        setUserToken(value)
        console.log('*******',value)
      }
    } catch(error) {alert(error)}
  }
  return (
    <NavigationContainer >
      
      <StatusBar style="auto" />
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                backgroundColor: '#e84545',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
                },
            }}
          >
            {userToken === 'true'? (
              <>
                  <Stack.Screen name="MainDrawerNavigation" component={MainDrawerNavigation} options={()=>({ headerShown: false}) } />
                  <Stack.Screen name="stacklogin" component={stacklogin} options={()=>({ headerShown: false}) } />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} options={() => ({ headerTitle: "Login" })} />
                <Stack.Screen name="Signup" component={Signup} options={() => ({ headerTitle: "Signup" })} />
                <Stack.Screen name="MainDrawerNavigation" component={MainDrawerNavigation} options={()=>({ headerShown: false}) } />
                <Stack.Screen name="stacklogin" component={stacklogin} options={()=>({ headerShown: false}) } />

              </>
            )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  
    },
    button: {
      alignItems: "center",
      backgroundColor: "white",
      paddingTop: 5,
      paddingBottom: 5,
      width: 45,
      borderRadius: 30
    },
    text: {
      color: "#2b2e4a",
      fontSize: 20
    },
  });