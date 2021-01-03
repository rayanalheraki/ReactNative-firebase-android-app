import React,{useState,useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import "react-native-gesture-handler";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../screens/Profile';
import TapNavigation from './TapNavigation';
import DrawerContent from './DrawerContent';
import AboutApp from '../screens/AboutApp';
const Drawer = createDrawerNavigator();

export default function MainDrawerNavigation(){
   
    return(
      <Drawer.Navigator drawerContent={props=><DrawerContent {...props}/>}>
        <Drawer.Screen name="TapNavigation" component={TapNavigation} />
        <Drawer.Screen name="AboutApp" component={AboutApp} />
      </Drawer.Navigator>
    );
  }