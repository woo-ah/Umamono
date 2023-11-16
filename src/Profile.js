import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { firebase } from '../config';
import * as ImagePicker from 'expo-image-picker';
import 'firebase/compat/storage'; 
import { useNavigation } from "@react-navigation/native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';

const Profile = ({ route }) => {
    const user = firebase.auth().currentUser;
    const [image, setImage] = useState(null);
    const [name, setName] = useState('')
    const navigation = useNavigation()



    useEffect(() => {
        // Firebase에서 사용자 정보 가져오기
        const fetchUserInfo = async () => {
            try {
                const currentUser = firebase.auth().currentUser;
    
                if (currentUser) {
                    const snapshot = await firebase.firestore().collection('users').doc(currentUser.uid).get();
                    const data = snapshot.data();
                    setName(data.nickName); // 사용자 이름 설정
                    setImage(data.profileImages); // 프로필 이미지 설정
                } else {
                    console.error("User not available.");
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchUserInfo();
    }, []);
    

 

    return (
        <View style={styles.container}>



            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                프로필
            </Text>
            <View style={styles.photo}>
            <TouchableOpacity>
            <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 20 }} />
                
            </TouchableOpacity>
            </View>
            <Text style={styles.name}>{name} </Text> 
           
          
            <TouchableOpacity
               onPress={() => navigation.navigate('ProfileUpdate')} 
                style={styles.button}
            >
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>프로필 편집</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
                onPress={()=> {
                    firebase.auth().signOut();
                    navigation.navigate('Login'); // 로그아웃 후 로그인 화면으로 이동
                }}
                style={styles.button}
            >
                <Text style={{fontSize: 22, fontWeight: 'bold'}}>Sign out</Text>
            </TouchableOpacity> */}
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'start', // Align items at the top of the screen
        paddingTop: 80,
        alignItems: 'center',
    },
    photo:{
        paddingTop: 30,
    },
    name:{
        paddingTop:10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#E5E5E5',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
     
    },
});
