import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseInit = firebase.initializeApp({
  // deleted 
});

export { firebaseInit as firebase };
