import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDmEbsPVGjnjjIrK437L1gvV90rifXtHbE",
  authDomain: "cab-finder-c70bc.firebaseapp.com",
  projectId: "cab-finder-c70bc",
  storageBucket: "cab-finder-c70bc.appspot.com",
  messagingSenderId: "609476740172",
  appId: "1:609476740172:web:808f2181511c0bfea860e9",
  measurementId: "G-3F8SLVYY4B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);