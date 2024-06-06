// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyA4lcL6Z_UtFhClFJykm3Eeuh2Y_lSCo54',
	authDomain: 'rentrack-b7327.firebaseapp.com',
	projectId: 'rentrack-b7327',
	storageBucket: 'rentrack-b7327.appspot.com',
	messagingSenderId: '406242820082',
	appId: '1:406242820082:web:7028b9dfe421ad4876b56b',
	measurementId: 'G-RR0QHP53H7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
