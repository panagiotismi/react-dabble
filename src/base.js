import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from './secrets';

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);

const base = Rebase.createClass(firebaseApp.database());
export default base;
