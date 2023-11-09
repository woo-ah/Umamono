import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from '../config';
import {useNavigation} from "@react-navigation/native"

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickName, setNickName] = useState('');
    const navigation = useNavigation()

    

   const registerUser = async (email, password, nickName) => {
        

        await firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(() => {
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url: 'https://umamono-66263.firebaseapp.com',
            })
                .then(() => {
                    firebase.firestore().collection('users')
                        .doc(firebase.auth().currentUser.uid)
                        .set({
                            nickName,
                            email,
                        })
                })
                .catch((error) => {
                    alert(error.message)
                })
        })
        .catch((error) => {
            alert(error.message);
        });
    }

    return (
        
        <View style={styles.container}>
            {/* <Text style={{ fontWeight: 'bold', fontSize: 23 }}>
                Registration
            </Text> */}
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backButton}>
                <Text style={{ fontSize: 18, color: '#026efd' }}>Back to Login</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 40 }}>
            <Text style={styles.label}>닉네임</Text>
            <TextInput
                    style={styles.textInput}
                    // placeholder='NickName'
                    onChangeText={(nickName) => setNickName(nickName)}
                    autoCapitalize='none'
                    autoCorrect={false}
                />
               <Text style={styles.label}>이메일</Text>
                <TextInput
                    style={styles.textInput}
                    // placeholder='Email'
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.textInput}
                    // placeholder='Password'
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity
                onPress={()=>registerUser(email, password, nickName)}
                // onPress={() => navigation.navigate('TermsOfUse', {  email, password ,nickName})}
                style={styles.button}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 22 , color: 'white'}}>
                    Register
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Registration;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between', // Adjusted to space items evenly
        paddingTop: 40, // Added paddingTop to create space between text inputs and top edge
        paddingBottom: 0, // Added paddingBottom to create space between button and bottom edge
    },
    textInput: {
        paddingTop: 20,
        paddingBottom: 10,
        width: 300,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        
        textAlign: 'center',
        marginTop: 0,
    },
    button: {
        height: 100,
        width: 400,
        backgroundColor: '#FF7373',
        alignItems: 'center',
        justifyContent: 'center',
       
        marginBottom:0,
    },
    label: {
        alignSelf: 'flex-start', // 좌측 정렬
        marginLeft: 0, // 좌측 여백 추가
        //marginBottom: 0, // 아래쪽 여백 추가
        //fontWeight: 'bold',
        fontSize: 16,
        marginTop: 50,
        color: 'grey'
        
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
    },
});
