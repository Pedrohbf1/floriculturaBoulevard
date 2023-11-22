// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBXCUB7n_UfwSpLhd9nt8i4VV2UPlG1Q-0",
  authDomain: "floricultura-boulevard.firebaseapp.com",
  projectId: "floricultura-boulevard",
  storageBucket: "floricultura-boulevard.appspot.com",
  // messagingSenderId: "330104028621",
  // appId: "1:330104028621:web:370bcabb62393ea46d1884",
  // measurementId: "G-WVY71CMP7T"
};

const appInitialize = initializeApp(firebaseConfig);

export default appInitialize