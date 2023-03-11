import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD6HRd1lxT0opCiCOllDaO5iaxPUE51NTQ',
  authDomain: 'rn-social-71b5e.firebaseapp.com',
  projectId: 'rn-social-71b5e',
  storageBucket: 'rn-social-71b5e.appspot.com',
  messagingSenderId: '52581435219',
  appId: '1:52581435219:web:db26a6be4dd5a3e4e243a6',
  measurementId: 'G-Y3TE4Y5867',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
