import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import React, {useState, useEffect} from 'react';
import {firebase} from './config';
import {View, Image, StyleSheet, Dimensions} from 'react-native';

import Login from "./src/Login";
import Registration from "./src/Registration";
import Dashboard from "./src/Dashboard";
import Profile from "./src/Profile"; 
import TermsOfUse from "./src/TermsOfUse";
import 'expo-dev-client';
import ProfileUpdate from "./src/ProfileUpdate";
import ConvienceStore from "./src/ConvienceStore";
import FoodDetail from "./src/FoodDetail";
import Food from "./src/Food";

const Stack = createStackNavigator();

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/splash_umamono.png')}
        style={styles.image}
        resizeMode='cover'
      />
    </View>
  );
};

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 },
 image: {
    width: width,
    height: height,
 },
});

function App(){

  const [initializing, setInitializing] = useState(true);
  const [user,setUser] = useState();
  const [showSplash, setShowSplash] = useState(true);

  function onAuthStateChanged(user){
    setUser(user);
    if(initializing)setInitializing(false);
  }

  useEffect(()=>{
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
      setInitializing(false);
    }, 2000);

    return () => clearTimeout(splashTimer);
  }, []);

  if(showSplash) {
    return <SplashScreen />;
  }

  if(initializing) return null;


  if(!user){
    return (
      <Stack.Navigator>
        <Stack.Screen 
        name="Login" 
        component={Login}
        options={{ headerShown: false }}

        
        />
         <Stack.Screen 
        name="TermsOfUse" 
        component={TermsOfUse}
        options={{ headerShown: false }}
        />

          <Stack.Screen 
        name="Registration" 
        component={Registration}
        options={{ headerShown: false }}
        />
        
      </Stack.Navigator>

      
    )
  }
  

  return (
    <Stack.Navigator>
            <Stack.Screen 
        name="Profile" 
        component={Profile}
        options={{ headerShown: false }}
        />

    <Stack.Screen
      name="ProfileUpdate"
      component={ProfileUpdate}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="ConvienceStore"
      component={ConvienceStore}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="FoodDetail"
      component={FoodDetail}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Food"
      component={Food}
      options={{ headerShown: false }}
    />


        
    </Stack.Navigator>
    

    

    
  );

}


export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}
