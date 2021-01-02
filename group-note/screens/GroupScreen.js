
import React,{ useState,useEffect} from 'react';
import { StyleSheet,Text, View, ScrollView,Alert} from 'react-native';
import 'react-native-gesture-handler';
import { Card, Button, } from 'react-native-elements';
import firebase from '../firebase-connect/firebaseConf';
import NetInfo from "@react-native-community/netinfo";

export default function GroupScreen({route , navigation}) {
    const { groupId, groupCode } = route.params;
    const [notesPlus , setNotePlus] = useState([]);
    const [notNull , setNotNull] =useState(false)

    useEffect(() => {
        NetInfo.fetch().then(state => {
            if(state.isConnected){
                const Notes = firebase.database()
                .ref(`/notes/${groupId}`)
                .on('value', snapshot => {
                    const myData=snapshot.val();
                    
                    const array=[];
                    if(myData!= null)
                    {
                        const keys = Object.keys(myData);
                        Object.values(myData).map((item,index)=>{
                            if(keys!==null){
                                array.push({
                                    id:keys[index],
                                    text:item.noteText,
                                    title:item.noteTitle,
                                })
                            }
                        }
                        )
                        setNotePlus(array)
                        setNotNull(true)
                    }
                    else{
                        setNotNull(false)
                    }
                },[]);
                return () => firebase.database()
                    .ref(`/notes/${groupId}`)
                    .off('child_added', Notes);
            }else{
                Alert.alert('No Internet',' sorry try agine later')
            }}) 

    },[]);


    


    return(
        <View style={styles.container}>
            
            <Button
                    onPress={()=>navigation.navigate('Note',{
                        groupId:groupId,
                    }) }    
                    buttonStyle={{
                        backgroundColor:'#2b2e4a',
                        marginTop:10,
                        marginLeft:12,
                        marginRight:12,
                        marginBottom:0,
                        height:70,
                    }}
                    icon={{
                        size: 15,
                        color: "white",
                        name:'sticky-note',
                        type:'font-awesome',
                    }}
                    title="  Add a New Note  "
                />
            <ScrollView > 
               
               {notNull &&
                notesPlus.map((item, index) => (
                     
                    <Card key = {index} containerStyle={{marginBottom:-10 }}>
                        
                        <Card.Title style={{textAlign:'left'}}> {item.title}</Card.Title>
                        <Card.Divider/>

                        <Text style={styles.text}>
                            {item.text}
                        </Text>
                        <View style={{alignItems:'flex-end'}}>
                            
                            <Button
                                onPress={()=>navigation.navigate('NoteEdit',{
                                    groupId:groupId,
                                    noteId:item.id,
                                    noteText : item.text,
                                    noteTitle:item.title,
                                })}
                                buttonStyle={{margin:0 , borderRadius:100 , width:50 ,  backgroundColor:'#2b2e4a'}}
                                titleStyle={{ color:'white', fontSize:15}}
                                type="solid"
                                icon={{
                                    size: 15,
                                    color: "white",
                                    name:'pencil',
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