import React,{useState} from 'react';
import { StyleSheet, View } from 'react-native';
import "react-native-gesture-handler";
import { createStackNavigator } from '@react-navigation/stack';

import JoinGroup from '../screens/JoinGroup';
import GroupScreen from '../screens/GroupScreen';
import Note from '../screens/Note';
import NoteEdit from '../screens/NoteEdit';

const StackJoinGroup = createStackNavigator();

export default function JoinGroupStack() {
    return(
      <StackJoinGroup.Navigator
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
          <StackJoinGroup.Screen name="JoinGroup" component={JoinGroup}
            options={({ navigation }) => ({
                headerTitle: "Join a group"})}
          />
          <StackJoinGroup.Screen name="GroupScreen" component={GroupScreen} />
          <StackJoinGroup.Screen name="Note" component={Note} />
          <StackJoinGroup.Screen name="NoteEdit" component={NoteEdit} />
      </StackJoinGroup.Navigator>
    );
  }