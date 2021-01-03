import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { View , StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button,Input} from 'react-native-elements';
import * as Firebase from 'firebase';


class Login extends React.Component {
    state = {
        email: '',
        password: '',
        'authStatus': '',
        
    }

    handleLogin = () => {
        const { email, password } = this.state
        Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(async() => {
                try {
                await AsyncStorage.setItem('@authStatus', 'true');
                await AsyncStorage.setItem('@email', email)
                 this.props.navigation.navigate('MainDrawerNavigation')
                } catch (error) {
                Alert.alert('alert','asyncstorage problem')
                }

                 
            })
            .catch(error => alert(error))
        
    }
    componentDidMount = () =>{ AsyncStorage.getItem('@authStatus').then((value)  => this.setState({ '@authStatus': value }))
    
    }
    
    

    render() {
        
        return (
            <View style={styles.container}>
                <Text>
                 {this.state.authStatus}
                </Text>
                <View style={styles.form}>
                    <Input
                        placeholder='Email'
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        autoCapitalize='none'
                    />
                    <Input
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                    placeholder='Password'
                    secureTextEntry={true}
                    />
                    <Button 
                        onPress={this.handleLogin}
                        buttonStyle={{
                            backgroundColor:'#2b2e4a',
                            margin:10,
                        }}
                        icon={{
                            size: 15,
                            color:"white",
                            name:'sign-in',
                            type:'font-awesome',
                        }}
                        title="Login"
                    />
                    <Text style={styles.text}>Don't have an account yet?</Text>
                    <Button 
                        titleStyle={{color:'#2b2e4a'}}
                        onPress={() => this.props.navigation.navigate('Signup')}
                        buttonStyle={{
                            backgroundColor:'#dddddd',
                            margin:10,
                        }}
                        color='#2b2e4a'
                        icon={{
                            size: 15,
                            color:"#2b2e4a",
                            name:'user-plus',
                            type:'font-awesome',
                        }}
                        title="Sign up"
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:{
        fontSize:13,
        marginLeft:44,
    },
    form:{
        width:250,
    }
})

export default Login