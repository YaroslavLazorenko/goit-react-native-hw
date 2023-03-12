import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCIzd2VRu4KqUVMi_QiNOiAHeDRH-r1pw8',
  authDomain: 'rn-social1.firebaseapp.com',
  projectId: 'rn-social1',
  storageBucket: 'rn-social1.appspot.com',
  messagingSenderId: '818198319248',
  appId: '1:818198319248:web:6ee7a084d013f816098815',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
