import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from '../config';
import {useNavigation} from "@react-navigation/native"

const Registration = () => {
    const user = firebase.auth().currentUser;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickName, setNickName] = useState('');
    const [profileImages, setProfileImages] = useState('');
    const navigation = useNavigation()
   

    

    
    loginUser = async(email,password) => {
        try{
            await firebase.auth().signInWithEmailAndPassword(email,password)
        }catch(error){
            alert(error.message)
        }
    }

    const registerUser = async (email, password, nickName) => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(async () => {
                    firebase.auth().currentUser.sendEmailVerification({
                        handleCodeInApp: true,
                        url: 'https://umamono-66263.firebaseapp.com',
                    })
                    .then(async () => {
                        const uid = firebase.auth().currentUser.uid;
    
                        // 프로필 이미지 설정
                        const defaultImageRef = firebase.storage().ref().child(`basicProfile.jpg`);
                        const downloadURL = await defaultImageRef.getDownloadURL();
                
                        // 사용자의 프로필 이미지 업로드
                        const userImageRef = firebase.storage().ref().child(`profileImages/${uid}`);
                        const response = await fetch(downloadURL);
                        const blob = await response.blob();
                        await userImageRef.put(blob);
                
                        // Firestore에 이미지 URL 저장
                        const userImageDownloadURL = await userImageRef.getDownloadURL();
                        
                        // Firestore에 사용자 정보 설정
                        await firebase.firestore().collection('users').doc(uid).set({
                            nickName,
                            email,
                            profileImages: userImageDownloadURL, // Corrected this line  
                        });
    
                        // 자동 로그인
                        await loginUser(email, password);
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
                })
                .catch((error) => {
                    alert(error.message);
                });
        } catch (error) {
            console.error("회원가입 중 에러:", error);
        }
    };
    

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
                onPress={() => { registerUser(email, password, nickName); }}
                style={styles.button}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
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