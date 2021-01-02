import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect} from 'react';
import {StyleSheet, Text,View, ScrollView ,Alert} from 'react-native';
import 'react-native-gesture-handler';
import { Card, Button } from 'react-native-elements';
import firebase from '../firebase-connect/firebaseConf';


import { useIsFocused } from '@react-navigation/native';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('Groups.db');



export default function  HomeScreen({navigation}) {
    const [items, setItems]= useState([])
    const [notNull , setNotNull] =useState(false)
    const [update, setUpdate]= useState(false)
    const isFocused = useIsFocused();
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
              'create table if not exists MyGroups (id integer primary key not null  , GroupId text NOT NULL UNIQUE ,groupCode text , groupName text);'),
              null,
              () => Alert.alert("db created from db",'') ,
              () => Alert.alert("ERROr",'') 
          });
          
    },[])
    useEffect(() => {
        
        db.transaction(tx=>{
            tx.executeSql(
                `SELECT * FROM MyGroups;`,
                null,
                (_, { rows: {length, _array } }) => {
                    if(_array !== null){
                       // Alert.alert("read from db",JSON.stringify(_array))
                        setNotNull(true)
                        setItems(_array )
                    }else if(_array ===null){
                        setNotNull(false)
                    }
                }
            );
        });
        
    },[isFocused,update]);

    const GoToGroup=  (groupId ,code)=>{
       
        if(groupId=== null || code===null){
            Alert.alert('Sorry', 'Please enter the data correctly');
        }else{
            firebase.database()
                .ref(`/groups/${groupId.toLowerCase()}/GroupCode`)
                .on('value', snapshot => {
                    if(snapshot.val()=== null){
                        Alert.alert('Sorry', 'This ID is not used');
                    }else if(snapshot.val()==code)
                    {   
                        navigation.navigate('GroupScreen', {
                            groupId : groupId.toLowerCase(),
                            groupCode:code,
                        })

                    }else if(snapshot.val()!==code){
                        Alert.alert('Sorry', 'Wrong code');
                    }
                })
        }
        
    }
    
    return(
        
        <View style={styles.container}>
            {/* {!notNull &&(
                <Text style={styles.text}>
                    no items
                </Text>

            )} */}
            <ScrollView > 
               {
                items.map((item) => (
                    
                    <Card key = {item.id} containerStyle={{marginBottom:-10 }}>
                        <Card.Title style={styles.title}>{item.groupName}</Card.Title>
                        <Card.Divider/>
                            {/* <Text style={styles.text}>
                                {item.GroupId}
                            </Text> */}
                        <View style={{alignItems:'flex-end',flexDirection: 'row',justifyContent: 'space-between' }}>
                            
                            <Button
                                onPress={()=> navigation.navigate('GroupScreen', {
                                    groupId : item.GroupId,
                                    groupCode:null,
                                })}
                                buttonStyle={{margin:0 , borderRadius:100 , width:50 ,  backgroundColor:'#2b2e4a'}}
                                titleStyle={{ color:'white', fontSize:15}}
                                type="solid"
                                icon={{
                                    size: 15,
                                    color: "white",
                                    name:'chevron-right',
                                    type:'font-awesome',
                                }}
                                />
                            <Button
                                onPress={()=> {
                                    db.transaction(tx=>{
                                        tx.executeSql(
                                            `DELETE FROM MyGroups WHERE id=${item.id};`);
                                    });
                                    if(update===true)
                                    {
                                        setUpdate(false)
                                    }else{
                                        setUpdate(true)
                                    }
                                // window.location.reload(true);
                                }}
                                buttonStyle={{margin:0 , borderRadius:100 , width:50 ,  backgroundColor:'#2b2e4a'}}
                                titleStyle={{ color:'white', fontSize:15}}
                                type="solid"
                                icon={{
                                    size: 15,
                                    color: "white",
                                    name:'trash-o',
                                    type:'font-awesome',
                                }}
                                />
                        </View>
                        
                    </Card>
                            ))
               }
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    list:{

    },
    group:{
        margin: 5,
        backgroundColor:'#a6e3e9',
        height:150,
        textAlign:'center',
    },
    text: {
        marginBottom: 10,
        
    },
    noGroup:{
        alignItems:'center',
        margin: 5,
        backgroundColor:'#a6e3e9',
        height:150,
        textAlign:'center',
    },
    title: {
        color: '#e84545',
        fontSize:20,
        margin:-5,
        textAlign:'left'
    },
    item: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        margin: 2,
        backgroundColor: '#cbf1f5'
     },
})