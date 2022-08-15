// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCRPajoRvuWaQvZ4Nu6gGv9tNKo1J1gSYQ',
  authDomain: 'funny-movies-7cd42.firebaseapp.com',
  projectId: 'funny-movies-7cd42',
  storageBucket: 'funny-movies-7cd42.appspot.com',
  messagingSenderId: '784630316775',
  appId: '1:784630316775:web:fec3135dcc95c8b8716c42',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
