// import * as firebase from "firebase";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { initializeApp } from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBiEbGTnsKK0vZuPkNchSWCFHuXQAVUwFo',
  authDomain: 'ai-blog-2023.firebaseapp.com',
  projectId: 'ai-blog-2023',
  storageBucket: 'ai-blog-2023.appspot.com',
  messagingSenderId: '997733234832',
  appId: '1:997733234832:web:ebb9c48bbfba74c07b8015',
}
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig)


// export
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
