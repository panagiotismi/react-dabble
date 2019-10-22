import firebase from 'firebase/app';
import 'firebase/database';

import { firebaseConfig } from './secrets';

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
const base = firebaseApp.database();
export default base;
