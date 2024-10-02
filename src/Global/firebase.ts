import {initializeApp, getApp} from "firebase/app"
import {getFirestore, FieldValue} from "firebase/firestore"
import {getAuth} from "firebase/auth"

const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY

const firebaseConfig = { 
	apiKey: API_KEY,
	authDomain: "open-music-2.firebaseapp.com",
	projectId: "open-music-2",
	storageBucket: "open-music-2.appspot.com",
	messagingSenderId: "650823685567",
	appId: "1:650823685567:web:c9a469548bcb1cd94efd0a",
	measurementId: "G-RVNMSB6QYP"
  };

// if (!firebase.apps.length) {
	const app = initializeApp(firebaseConfig)
// }

export const db = getFirestore(app)
export const auth = getAuth(app)