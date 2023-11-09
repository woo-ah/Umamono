import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../config';
import {useNavigation} from "@react-navigation/native"

const ProfileUpdate = () => {
    const user = firebase.auth().currentUser;
    const [image, setImage] = useState(null);
    const [newName, setNewName] = useState('');
    const navigation = useNavigation()

    const uploadImage = async () => {
        try {
            let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                alert("카메라 롤에 접근 권한이 필요합니다!");
                return;
            }

            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (pickerResult.canceled === true) {
                return;
            }

            const { uri } = pickerResult.assets[0];
            const response = await fetch(uri);
            const blob = await response.blob();

            const ref = firebase.storage().ref().child(`profileImages/${user.uid}`);
            await ref.put(blob);
            const downloadURL = await ref.getDownloadURL();

            setImage(downloadURL);

            // 이미지 URL을 Firestore에 저장
            await firebase.firestore().collection('users').doc(user.uid).update({
                profileImage: downloadURL
            });
        } catch (error) {
            console.error(error);
        }
    };
    const changeName = async () => {
        try {
            await firebase.firestore().collection('users').doc(user.uid).update({
                nickName: newName
            });
            alert('이름이 변경되었습니다.');
            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                프로필 수정
            </Text>

            <View style={styles.photo}>
            <TouchableOpacity onPress={uploadImage}>
                {image ? (
                    <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Text>프로필 사진 업로드</Text>
                    </View>
                )}
            </TouchableOpacity>
            </View>
            <TextInput
                style={styles.input}
                placeholder="새로운 이름 입력"
                onChangeText={text => setNewName(text)}
                value={newName}
            />
            <TouchableOpacity
                onPress={changeName}
                style={styles.button}
                
            >
                <Text style={{fontSize: 22, fontWeight: 'bold'}}>이름 변경</Text>
                
            </TouchableOpacity>

           < TouchableOpacity
                onPress={()=> {
                   
                    navigation.navigate('Profile', { updatedImage: image, updatedName: newName });
                    // 로그아웃 후 로그인 화면으로 이동
                }}
                style={styles.button}
            >
                <Text style={{fontSize: 22, fontWeight: 'bold'}}>이전</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'start', // Align items at the top of the screen
        paddingTop: 80,
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: '80%',
       
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
       
    },
    button: {
        backgroundColor: '#E5E5E5',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    imagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    photo:{
        paddingTop: 30,
        paddingBottom:30,
    },
});

export default ProfileUpdate;
