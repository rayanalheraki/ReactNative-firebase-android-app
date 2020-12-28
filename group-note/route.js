import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet,TouchableOpacity, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import GroupOp from './screens/GroupOp';
import CreateGroup from './screens/CreateGroup';
import JoinGroup from './screens/JoinGroup';
import GroupScreen from './screens/GroupScreen';
import Login from './screens/Login';
import Register from './screens/Register';

const Stack = createStackNavigator();

export default function Route() {
  return (
    <NavigationContainer  >
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
            <Stack.Screen name="Login" component={Login} options={() => ({ headerTitle: "Login" })} />
            <Stack.Screen name="Register" component={Register} options={() => ({ headerTitle: "Register" })} />
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