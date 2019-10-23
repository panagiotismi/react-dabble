import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import { firebaseConfig } from './secrets';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const getAuthProvider = provider =>
  new firebase.auth[`${provider}AuthProvider`]();

const base = firebaseApp.database();
export default base;
