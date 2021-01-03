import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import * as Firebase from 'firebase';
import {Button,Input} from 'react-native-elements';

class Signup extends React.Component {
    state = {
        name: '',
        email: '',
        password: ''
    }

    handleSignUp = () => {
        const { email, password } = this.state
        Firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('Login'))
            .catch(error => alert(error))
    }

    render() {
        return (
            <View style={styles.container}>
                
                <View style={styles.form}>
                    <Input
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                        placeholder='Full Name'
                    />
                    <Input
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        placeholder='Email'
                        autoCapitalize='none'
                    />
                    <Input
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        placeholder='Password'
                        secureTextEntry={true}
                    />
                    <Button 
                        onPress={this.handleSignUp}
                        buttonStyle={{
                            backgroundColor:'#2b2e4a',
                            margin:10,
                        }}
                        icon={{
                            size: 15,
                            color:"white",
                            name:'user-plus',
                            type:'font-awesome',
                        }}
                        title="Signup"
                    />
                    <Button 
                        titleStyle={{color:'#2b2e4a'}}
                        onPress={() => this.props.navigation.goBack()}
                        buttonStyle={{
                            backgroundColor:'#dddddd',
                            margin:10,
                        }}
                        color='#2b2e4a'
                        icon={{
                            size: 15,
                            color:"#2b2e4a",
                            name:'sign-in',
                            type:'font-awesome',
                        }}
                        title="Login"
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
    form:{
        width:250,
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#FFA611',
        borderColor: '#FFA611',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    }
})

export default Signup