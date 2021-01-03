import 'react-native-gesture-handler';
import firebase from '../firebase-connect/firebaseConf';
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {Button,Input} from 'react-native-elements';
import { StyleSheet, View, Alert ,Text} from 'react-native';
import NetInfo from "@react-native-community/netinfo";

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('Groups.db');


export default  function CreateGroup({navigation}){
    const [groupId , setGroupId] = useState(null);
    const [name , setName] = useState(null);
    const [code , setCode] = useState(null);

    const NewGroup =()=>{
        NetInfo.fetch().then(state => {
            if(state.isConnected){ 
                if(groupId === null || name===null || code===null )
                {
                    Alert.alert('Invalid Inputs', 'Please make sure all fields are filled in');
                }
                else{
                    const fireb =firebase.database()
                    .ref(`groups/${groupId.toLowerCase()}`);
                     
                    fireb.on("value",snapshot => {
                        if(snapshot.val() !== null)
                        {
                            Alert.alert('Error', 'This ID is not available, please try another one');
                        }
                        else{
                            fireb.set({
                                GroupName: name,
                                GroupCode: code,
                            }, 
                            (error) => {
                                if (!error) {
                                    Alert.alert('Alert', 'Your group has been created');
                                    navigation.navigate('GroupScreen', {
                                        groupId : groupId.toLowerCase(),
                                        groupCode:code,
                                    })
                                    db.transaction(tx=>{
                                        tx.executeSql("insert into MyGroups (GroupId , groupCode , groupName) values (?,?,?)", [groupId.toLowerCase() ,code,name]);
                    
                                    },
                                    null,
                                    console.log("done")
                                    );
                                    
                                    
                                } else {
                                    Alert.alert('Alert', 'Error');
                                }
                            }
                            );
                        }
                        
                    });
                }
            }else{
                Alert.alert('Alert', 'Please check your internet connection and try again');
            }
        })
    }


    return(
        <View style={styles.container}>
            <View style={styles.form}>
                <Input
                    placeholder='Group Name'
                    onChangeText={value => setName(value)}
                />
                <Input
                    placeholder='Group ID'
                    onChangeText={value => setGroupId(value)}
                />
                <Input
                    placeholder='Group Code'
                    onChangeText={value => setCode(value)}
                    //errorMessage=
                />
                <Button 
                    onPress={NewGroup }
                    buttonStyle={{
                        backgroundColor:'#2b2e4a',
                        margin:10,
                    }}
                    icon={{
                        size: 15,
                        color:"white",
                        name:'plus',
                        type:'font-awesome',
                    }}
                    title="Create"
                />
            </View>
            
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      },
    form:{
        marginTop:100,
        width:250,
    }
});



