import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseInit = firebase.initializeApp({
  apiKey: 'AIzaSyBKWuQj1RO1GwVY_v-6VRUemPkb2qF7WFU',
  authDomain: 'todoshiro-f4412.firebaseapp.com',
  databaseURL: 'https://todoshiro-f4412.firebaseio.com',
  projectId: 'todoshiro-f4412',
  storageBucket: 'todoshiro-f4412.appspot.com',
  messagingSenderId: '499418196980',
  appId: '1:499418196980:web:452c0d2c3ddc9d602467a1',
  measurementId: 'G-BJYY4562SB',
});

export { firebaseInit as firebase };
