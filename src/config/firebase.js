import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyASHniFvJHVL23asAcov0_GCfv2mgkJXbg",
  authDomain: "react-4f837.firebaseapp.com",
  projectId: "react-4f837",
  storageBucket: "react-4f837.appspot.com",
  messagingSenderId: "836508685957",
  appId: "1:836508685957:web:a53ff5505deb7122cefbec"
};

  let firebaseApp=firebase.initializeApp(firebaseConfig);
  export let firebaseAuth=firebaseApp.auth();
  export let firebaseStorage=firebaseApp.storage();
  export let firebaseDb=firebaseApp.firestore();
  export let timestamp=firebase.firestore.FieldValue.serverTimestamp;

