import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDLJXIYnOaSmYK2OT91_Vsn-mWT4bGufJ0",
  authDomain: "eve-nt.firebaseapp.com",
  databaseURL: "https://eve-nt.firebaseio.com",
  projectId: "eve-nt",
  storageBucket: "eve-nt.appspot.com",
  messagingSenderId: "1079671142098"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const database = firebase.database()
export const googleProvider = new firebase.auth.GoogleAuthProvider()