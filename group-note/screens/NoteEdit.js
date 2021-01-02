import { StatusBar } from 'expo-status-bar';
import React , {useState , useEffect}from 'react';
import { StyleSheet, Text, View,TextInput, Alert } from 'react-native';
import {  Button, Icon  } from 'react-native-elements'

import firebase from '../firebase-connect/firebaseConf';

// function saveNote(title , text, noteId, groupId){
//     var noteData = {
//         noteText: text,
//         noteTitle: title,
//       };
//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     var updates = {};
//     updates[`/notes/${groupId}/${noteId}/`] = noteData;
//     return firebase.database().ref().update(updates)
   
// }


export default function Note({route , navigation}) {
    const { groupId,noteId, noteText,noteTitle } = route.params;
    const [title ,setTitle] = useState(noteTitle);
    const [text  ,setText ] = useState(noteText);

    const saveNote= ()=>{
        var noteData = {
            noteText: text,
            noteTitle: title,
          };
        var updates = {};
        updates[`/notes/${groupId}/${noteId}/`] = noteData;
        firebase.database().ref().update(updates)

        navigation.goBack();
        Alert.alert('Done','Note has been saved')
    }

    const DeleteNote = ()=>{
        firebase.database().ref(`/notes/${groupId}/${noteId}/`).remove()
        navigation.goBack();
        Alert.alert('Done','Note has been deleted')
    } 

    return(
        <View style={styles.container}>
            <Text style={styles.title} > Edit Your Note</Text>
            <View style={styles.noteTitle} >
                <TextInput
                    // style={styles.textArea}
                    placeholder="Title"
                    value={title}
                    onChangeText={value => setTitle(value)}
                    editable={true}
                />
            </View>
            <View style={styles.textAreaContainer} >
                <TextInput
                    style={styles.textArea}
                    placeholder="Content"
                    multiline={true}
                    numberOfLines={20}
                    value={text}
                    onChangeText={value => setText(value)}
                    editable={true}
                />
            </View>
            <View style={styles.opir}>
                <Button
                    onPress={DeleteNote}
                    buttonStyle={{margin:5 , borderRadius:100 ,width:100,  backgroundColor:'#2b2e4a'}}
                    titleStyle={{ color:'white', fontSize:15}}
                    type="solid"
                    title=" Delete "
                    icon={{
                        size: 15,
                        color: "white",
                        name:'trash-o',
                        type:'font-awesome',
                    }}
                />
                <Button
                    onPress={saveNote}
                    buttonStyle={{margin:5 , borderRadius:100 ,width:100,  backgroundColor:'#2b2e4a'}}
                    titleStyle={{ color:'white', fontSize:15}}
                    type="solid"
                    title=" Save "
                    icon={{
                        size: 15,
                        color: "white",
                        name:'check',
                        type:'font-awesome',
                    }}
                />

            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#fff',
        padding:20,
        alignItems:'stretch'
    },
    list:{

    },
    textAreaContainer: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        marginBottom:10,
        
    },
    noteTitle:{
        borderColor: 'black',
        borderWidth: 1,
        marginBottom:10,
        padding: 10,
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start",
        textAlignVertical:'top',
        padding:10,
    },
    title: {
        color: '#53354a',
        fontSize:20,
        margin:10,
        textAlign:'center'
    },
    opir:{
        flexDirection:'row-reverse',

    },

})