import React,{useState} from 'react';
import { StyleSheet,Button , TouchableOpacity, Text, View } from 'react-native';
import "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './screens/HomeScreen';
import GroupOp from './screens/GroupOp';
import CreateGroup from './screens/CreateGroup';
import JoinGroup from './screens/JoinGroup';
import GroupScreen from './screens/GroupScreen';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Note from './screens/Note';
import NoteEdit from './screens/NoteEdit';
import Profil from './screens/Profil';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackHome = createStackNavigator();
const StackCreateGroup = createStackNavigator();
const StackJoinGroup = createStackNavigator();

function HomeStackNavigation() {
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
          />
        <StackHome.Screen name="Note" component={Note} />
        <StackHome.Screen name="NoteEdit" component={NoteEdit} />
        <StackCreateGroup.Screen name="GroupScreen" component={GroupScreen} />
        

      </StackHome.Navigator>
  );
}

function CreateGroupStack() {
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
        <StackCreateGroup.Screen name="CreateGroup" component={CreateGroup} />
        <StackCreateGroup.Screen name="GroupScreen" component={GroupScreen} />
        <StackHome.Screen name="Note" component={Note} />
        <StackHome.Screen name="NoteEdit" component={NoteEdit} />
    </StackCreateGroup.Navigator>
  );
}

function JoinGroupStack() {
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
        <StackJoinGroup.Screen name="JoinGroup" component={JoinGroup} />
        <StackCreateGroup.Screen name="GroupScreen" component={GroupScreen} />
        <StackHome.Screen name="Note" component={Note} />
        <StackHome.Screen name="NoteEdit" component={NoteEdit} />
    </StackJoinGroup.Navigator>
  );
}

function  TapNavigation() {
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

function MainDrawerNavigation(){

  return(
    <Drawer.Navigator>
      <Drawer.Screen name="TapNavigation" component={TapNavigation} />
      <Drawer.Screen name="Profil" component={Profil} />
    </Drawer.Navigator>
  );
}

export default function Route() {
  const [userToken,setUserToken]= useState(null);

  return (
    <NavigationContainer >
      
        <Stack.Navigator
        initialRouteName="Login"
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
            {userToken == null ? (
              <Stack.Screen name="MainDrawerNavigation" component={MainDrawerNavigation} options={()=>({ headerShown: false}) } />
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} options={() => ({ headerTitle: "Login" })} />
                <Stack.Screen name="Signup" component={Signup} options={() => ({ headerTitle: "Signup" })} />
              </>
            )}
           
            <Stack.Screen
                name="HomeScreen"
                backgroundColor="red"
                component={HomeScreen}
                options={({ navigation }) => ({

                headerTitle: "Your Groups",
                headerRight: () => (
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", marginRight: 15, width: 120 }} >

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate('newGroup')
                        }}
                    >
                        <Text style={styles.text}>+</Text>
                    </TouchableOpacity>
                    </View>
                ),
                })}
            />
            <Stack.Screen name="newGroup" component={GroupOp} options={() => ({ headerTitle: "New Group" })} />
            <Stack.Screen name="createGroup" component={CreateGroup} options={() => ({ headerTitle: "Create a Group" })} />
            <Stack.Screen name="joinGroup" component={JoinGroup} options={() => ({ headerTitle: "Join a Group" })} />
            <Stack.Screen name="groupScreen" component={GroupScreen} options={() => ({ headerTitle: "Group Page" })} />

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