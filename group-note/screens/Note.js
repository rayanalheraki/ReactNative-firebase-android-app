import { StatusBar } from 'expo-status-bar';
import React , {useState , useEffect}from 'react';
import { StyleSheet,Text, View,TextInput } from 'react-native';
import {  Button, Icon } from 'react-native-elements'

import firebase from '../firebase-connect/firebaseConf';

// function saveNote(title , text, groupId){
//     var noteData = {
//         noteText: text,
//         noteTitle: title,
//       };
    
//       // Get a key for a new Post.
//       var newPostKey = firebase.database().ref().child(`notes/${groupId}`).push().key;
    
//       // Write the new post's data simultaneously in the posts list and the user's post list.
//       var updates = {};
//       updates[`/notes/${groupId}/` + newPostKey] = noteData;
//       //updates['/user-posts/' + uid + '/' + newPostKey] = noteData;
    
//       return firebase.database().ref().update(updates);

// }


export default function Note({route , navigation}) {
    const { groupId } = route.params;
    const [title ,setTitle] = useState('');
    const [text  ,setText ] = useState('');

    const saveNote= ()=>{
        var noteData = {
            noteText: text,
            noteTitle: title,
          };
          var newPostKey = firebase.database().ref().child(`notes/${groupId}`).push().key;
        
          var updates = {};
          updates[`/notes/${groupId}/` + newPostKey] = noteData;
          firebase.database().ref().update(updates);
          navigation.goBack();
    }


    return(
        <View style={styles.container}>
            <Text style={styles.title} > New Note</Text>
            <View style={styles.noteTitle} >
                <TextInput
                    // style={styles.textArea}
                    placeholder="Title"
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
                    onChangeText={value => setText(value)}
                    editable={true}
                />
            </View>
            <View style={styles.opir}>
               
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