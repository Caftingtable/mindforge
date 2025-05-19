import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABD9uPQUEe3Vrcm0FX6LoAXTNfahZBdBM",
  authDomain: "mindforge-d1839.firebaseapp.com",
  projectId: "mindforge-d1839",
  storageBucket: "mindforge-d1839.firebasestorage.app",
  messagingSenderId: "343786216889",
  appId: "1:343786216889:web:8d8ffc41b5b8354d27ea68",
  measurementId: "G-H87PZ2HXNR"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);

const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // You can now use result.user
    alert(`Signed in as ${result.user.displayName}`);
    // Optionally, save user role (student/tutor) to your DB here
  } catch (error) {
    alert('Google sign-in failed: ' + error.message);
    console.error(error);
  }
};

export default auth;