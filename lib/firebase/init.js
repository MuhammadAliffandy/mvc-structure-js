// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlHNdAKc50U_XvALe6rEv7IlzTOajhwcg",
  authDomain: "binar-car-402108.firebaseapp.com",
  projectId: "binar-car-402108",
  storageBucket: "binar-car-402108.appspot.com",
  messagingSenderId: "699389168215",
  appId: "1:699389168215:web:5d0cc5f573e3cf0b287112",
  measurementId: "G-9ZM4ZBNRZY",
  storageBucket: 'gs://binar-car-402108.appspot.com'
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);

module.exports = fire;


