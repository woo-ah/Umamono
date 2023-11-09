import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import React , {useState} from 'react'
import {useNavigation} from "@react-navigation/native"
import {firebase} from '../config'



const Login = () =>{
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


   

    loginUser = async(email,password) => {
        try{
            await firebase.auth().signInWithEmailAndPassword(email,password)
        }catch(error){
            alert(error.message)
        }
    }

    

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
            반갑습니다!
            </Text>
            
            <View style={{marginTop: 40}}>
            
            <Text style={styles.label}>이메일</Text>
                <TextInput
                    style={styles.textInputEmail}
                   // placeholder='Email'
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                
                <Text style={styles.label}>비밀번호</Text>
                <TextInput
                    style={styles.textInput}
                  //  placeholder='Password'
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity
                onPress={() => loginUser(email, password)}
                style={styles.button}
            >
                <Text style = {{fontWeight:'bold', fontSize:22, color: 'white'}}>
                    로그인
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Registration')}
                style={{marginTop: 20}}
            >
                <Text style = {{fontWeight:'bold', fontSize: 16, color: 'grey'}}>
                    {/* Don't have an account?  Now */}
                    회원가입
                </Text>
            </TouchableOpacity>

        </View>
        
    )
}  

export default Login

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        
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
    textInputEmail: {
        paddingTop: 20,
        paddingBottom: 10,
        width: 300,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        
        textAlign: 'center',
        marginTop: 0,
    },

    button:{
        marginTop: 50,
        height: 70,
        width: 300,
        backgroundColor: '#FF7373',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        
    }, 
    welcome: {
        fontWeight: 'bold',
        fontSize: 26,
        textAlign: 'left', // 좌측 정렬
        alignSelf: 'flex-start', // 좌측 정렬
        marginLeft: 40, // 좌측 여백 추가
        marginBottom: 20, // 아래쪽 여백 추가
    },
    label: {
        alignSelf: 'flex-start', // 좌측 정렬
        marginLeft: 0, // 좌측 여백 추가
        //marginBottom: 0, // 아래쪽 여백 추가
        //fontWeight: 'bold',
        fontSize: 16,
        marginTop: 30,
        color: 'grey'
        
    },

})