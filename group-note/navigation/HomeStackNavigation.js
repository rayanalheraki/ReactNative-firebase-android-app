import React,{useState} from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import GroupScreen from '../screens/GroupScreen';
import Note from '../screens/Note';
import NoteEdit from '../screens/NoteEdit';
 

const StackHome = createStackNavigator();


export default function HomeStackNavigation() {
    return(
      <StackHome.Navigator
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
          <StackHome.Screen 
            name="HomeScreen" component={HomeScreen} 
            options={({ navigation }) => ({
              headerTitle: "Your Groups",
              headerRight: () => (
                <View style={{ flexDirection: "row", justifyContent: "flex-end", marginRight: 15, width: 120 }} >
  
                  <TouchableOpacity
                    onPress={() => {
                      navigation.toggleDrawer();
                    }}
                  >
                    <Ionicons
                      name='list-outline'
                      size={30}
                      color='white'
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
            />
          <StackHome.Screen name="Note" component={Note} />
          <StackHome.Screen name="NoteEdit" component={NoteEdit} />
          <StackHome.Screen name="GroupScreen" component={GroupScreen} />
          
  
        </StackHome.Navigator>
    );
  }
  