import { auth } from "./firebase-init.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Auto-redirect if user is already logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "index.html";
  }
});

console.log("✅ signup.js loaded");

const form = document.getElementById("signupForm");
const emailInput = document.getElementById("signupEmail");
const passwordInput = document.getElementById("signupPassword");
const message = document.getElementById("signupMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    message.textContent = "❌ Please fill in all fields.";
    message.style.color = "red";
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      message.textContent = "✅ Account created successfully!";
      message.style.color = "green";
      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    })
    .catch((error) => {
      message.textContent = `❌ ${error.message}`;
      message.style.color = "red";
    });
});