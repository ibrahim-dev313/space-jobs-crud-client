// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCACCQUrf2nbL15oRh6DfvctQv3m65kRlY",
    authDomain: "job-hunter-f15a2.firebaseapp.com",
    projectId: "job-hunter-f15a2",
    storageBucket: "job-hunter-f15a2.appspot.com",
    messagingSenderId: "739943630675",
    appId: "1:739943630675:web:4bc38055a1771ac79483a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
