import React,{useState} from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import "react-native-gesture-handler";
import { createStackNavigator } from '@react-navigation/stack';

// --------- screens -----------------
import CreateGroup from '../screens/CreateGroup';
import GroupScreen from '../screens/GroupScreen';
import Note from '../screens/Note';
import NoteEdit from '../screens/NoteEdit';

const StackCreateGroup = createStackNavigator();

export default function CreateGroupStack() {
    return(
      <StackCreateGroup.Navigator
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
          <StackCreateGroup.Screen name="CreateGroup" component={CreateGroup}
            options={({ navigation }) => ({
              headerTitle: "Create a group"})}
          />
          <StackCreateGroup.Screen name="GroupScreen" component={GroupScreen} />
          <StackCreateGroup.Screen name="Note" component={Note} />
          <StackCreateGroup.Screen name="NoteEdit" component={NoteEdit} />
      </StackCreateGroup.Navigator>
    );
  }