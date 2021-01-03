import React from 'react';
import "react-native-gesture-handler";
import { createDrawerNavigator } from '@react-navigation/drawer';
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