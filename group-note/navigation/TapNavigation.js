import React,{useState} from 'react';
import { StyleSheet, View } from 'react-native';
import "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigation from './HomeStackNavigation';
import JoinGroupStack from './JoinGroupStack';
import CreateGroupStack from './CreateGroupStack';

const Tab = createBottomTabNavigator();


export default function  TapNavigation() {
    return(
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'HomeStackNavigation') {
              return (
                <Ionicons
                  name={
                    focused
                    ? 'home'
                    : 'home-outline'
                  }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'CreateGroupStack') {
              return (
                <Ionicons
                  name={focused ? 'add' : 'add-circle-outline'}
                  size={size}
                  color={color}
                />
              );
            }else if (route.name === 'JoinGroupStack') {
              return (
                <Ionicons
                  name={focused ? 'enter' : 'enter-outline'}
                  size={size}
                  color={color}
                />
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'white',
          safeAreaInsets:{bottom:7 , },
          style: { backgroundColor: '#2b2e4a' ,fontWeight:'bold',paddingTop:10}
  
        }}
      >
        <Tab.Screen name="HomeStackNavigation" component={HomeStackNavigation}  options={()=>({  tabBarLabel: 'Home' }) } />
        <Tab.Screen name="CreateGroupStack" component={CreateGroupStack} options={()=>({  tabBarLabel:'Create a group'}) }/>
        <Tab.Screen name="JoinGroupStack" component={JoinGroupStack} options={()=>({ tabBarLabel: 'Join a group' }) }/>
      </Tab.Navigator>
    );
    
  }