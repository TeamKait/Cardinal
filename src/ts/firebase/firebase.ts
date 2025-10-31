import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB3ygxBAWOEgyuled5grcIPfQBmCFyUUJ8",
    authDomain: "arvavir-d14b3.firebaseapp.com",
    projectId: "arvavir-d14b3",
    storageBucket: "arvavir-d14b3.firebasestorage.app",
    messagingSenderId: "289266155249",
    appId: "1:289266155249:web:261217b74227dd8f2e3350"
};

const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
})

export const auth = getAuth(app)