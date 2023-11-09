import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyALpQI-rOmW8v2ViHB8GBucD3NZRFc17Jw",
    authDomain: "umamono-66263.firebaseapp.com",
    projectId: "umamono-66263",
    storageBucket: "umamono-66263.appspot.com",
    messagingSenderId: "890378408228",
    appId: "1:890378408228:web:ae02af17fc9e789d9a63b1",
    measurementId: "G-CWQ5MNRGK5"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}


export {firebase};