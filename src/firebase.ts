import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyARB0AHSQpuiZcGqS4mKhzj7WslbleejTY",
    authDomain: "ecom-web-app-8477d.firebaseapp.com",
    projectId: "ecom-web-app-8477d",
    storageBucket: "ecom-web-app-8477d.firebasestorage.app",
    messagingSenderId: "1011914986930",
    appId: "1:1011914986930:web:69d1b2cf360359948280ab",
    measurementId: "G-TSFR7YMSPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
