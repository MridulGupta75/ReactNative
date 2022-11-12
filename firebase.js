import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyB8Dbo-CE9-OuB0wNDdAeapAgE0OUv3I08",
    authDomain: "sunshineit-50a4b.firebaseapp.com",
    projectId: "sunshineit-50a4b",
    storageBucket: "sunshineit-50a4b.appspot.com",
    messagingSenderId: "39152224782",
    appId: "1:39152224782:web:a511cfbbf376f0a5e60a5f",
    measurementId: "G-GT9MXDWMTV"
  };
  
 
   const app= firebase.initializeApp(firebaseConfig);

const database = getDatabase(app);
export{firebase,firebaseConfig,database};