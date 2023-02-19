import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBb9iJypDSvc3KcRjIfkqIJ_4NJzF7c4po",
  authDomain: "reactecommece.firebaseapp.com",
  projectId: "reactecommece",
  storageBucket: "reactecommece.appspot.com",
  messagingSenderId: "623809186861",
  appId: "1:623809186861:web:f122d5729ca474a07a3ca4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const auth = firebase.auth();
// export const googleAuthProvider = new firebase.auth.googleAuthProvider();
