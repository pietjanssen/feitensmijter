import firebase from "firebase/compat/app";

const firebaseConfig = {
    apiKey: "AIzaSyD4orp-VKW5jvanUZEqHr4c1JTstMHuodo",
    authDomain: "feitensmijter.firebaseapp.com",
    projectId: "feitensmijter",
    storageBucket: "feitensmijter.appspot.com",
    messagingSenderId: "603203084406",
    appId: "1:603203084406:web:555247a7ddd1f8af453f57",
    measurementId: "G-88NK57EQM3"
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);