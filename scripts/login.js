import { auth } from "./firebase-init.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

console.log("✅ login.js loaded");

const loginBtn = document.getElementById("loginBtn");
const loginMessage = document.getElementById("loginMessage");

loginBtn.addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    loginMessage.textContent = "❌ Please enter email and password.";
    loginMessage.style.color = "red";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const uid = user.uid;

      // 🔑 Store UID locally
      localStorage.setItem("userUID", uid);

      loginMessage.textContent = "✅ Login successful!";
      loginMessage.style.color = "green";

      // ⏳ Redirect after short delay
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    })
    .catch((error) => {
      loginMessage.textContent = `❌ ${error.message}`;
      loginMessage.style.color = "red";
    });
});