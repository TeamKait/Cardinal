import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCQe_R9zeHdy74pVRxMsBxx0ym99DXVXEA",
    authDomain: "cardinal-4a7d3.firebaseapp.com",
    projectId: "cardinal-4a7d3",
    storageBucket: "cardinal-4a7d3.firebasestorage.app",
    messagingSenderId: "33577878667",
    appId: "1:33577878667:web:48aa3fb51e281fb389c08e"
};

const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
})

export const auth = getAuth(app)