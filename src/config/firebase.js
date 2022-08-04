import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzJfI8ICKBoyYj4D3mKWdx2_EvCY-h2T0",
  authDomain: "movie-db-7.firebaseapp.com",
  projectId: "movie-db-7",
  storageBucket: "movie-db-7.appspot.com",
  messagingSenderId: "741373811215",
  appId: "1:741373811215:web:0dbbc38ca0906b5d3d617a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth( app );

export { auth };