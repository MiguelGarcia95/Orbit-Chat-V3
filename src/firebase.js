import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

import {FIREBASE_API_KEY, STORAGE_BUCKET_LINK} from './apiKeys';

var config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "orbit-chat-v2.firebaseapp.com",
  databaseURL: "https://orbit-chat-v2.firebaseio.com",
  projectId: "orbit-chat-v2",
  storageBucket: STORAGE_BUCKET_LINK,
  messagingSenderId: "68202492210"
};

firebase.initializeApp(config);
//no longer needed
// firebase.firestore().settings({timestampsInSnapshots: true});

export default firebase;