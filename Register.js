//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Button,TextInput } from 'react-native';
import {Actions} from 'react-native-router-flux';
const firebase = require("firebase");


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged); 
    }

    getRef() {
        return firebase.database().ref();
    }
    onAuthStateChanged = (user) => {

        if (user) {
           
            this.getRef().child('friends').push({
                email: user.email,
                uid: user.uid,
                name: this.state.name,     
            })
            console.log('username added');
            Actions.home();
            
        }
    }
   
signup = () => {
     
    const {email,password,name} = this.state;

    firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
        
            console.log('Its gone');
            Actions.pop();
            Actions.home();
            
          }).catch((error) => {
            console.log('error');
        });
        
}
    render() {
        return (
            <View style={styles.container}>
                <TextInput 
					placeholder="Full Name" 
                    value={this.state.name}
                    onChangeText={name => this.setState({ name }) } />

                <TextInput 
					placeholder="Email" 
                    value={this.state.email}
                    onChangeText={email => this.setState({ email }) } />

                <TextInput 
					placeholder="Password" secureTextEntry 
                    value={this.state.password}
                    onChangeText={password => this.setState({ password }) } />

                <Button onPress={()=>this.signup()} title="Register" />


                <Button onPress={()=>{Actions.pop();}} title="Login" />
                

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft:10,
        marginRight:10,
        alignItems:'stretch'
    },
});

export default Register;
