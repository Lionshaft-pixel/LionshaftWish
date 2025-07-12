// firebase-init.js

// Firebase imports (only work in module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDxWDc87fwSYdNi8SoNWscNNgY1rvt1Vnw",
  authDomain: "lionshaftwish.firebaseapp.com",
  projectId: "lionshaftwish",
  storageBucket: "lionshaftwish.firebasestorage.app",
  messagingSenderId: "376123076668",
  appId: "1:376123076668:web:0b1b784da1928786171339",
  measurementId: "G-VZH79V097X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Export so you can use `auth` in login/signup pages
export { auth };
