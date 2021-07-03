import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBlRWGvDoFpxZKPN7RSD0cCE7ygU4urI6g",
    authDomain: "ytube-clone-project.firebaseapp.com",
    projectId: "ytube-clone-project",
    storageBucket: "ytube-clone-project.appspot.com",
    messagingSenderId: "145865373900",
    appId: "1:145865373900:web:0cef3ced96a662401aaa69"
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
