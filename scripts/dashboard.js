import { auth } from './firebase-init.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ==== Show welcome message ====
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("welcomeMsg").textContent = `Welcome, ${user.email} 👋`;
    document.getElementById("userUidBox").textContent = user.uid;
    localStorage.setItem("userUID", user.uid);
  } else {
    alert("You must be logged in to access this page.");
    window.location.href = "login.html";
  }
});

// ==== Sidebar toggle ====
document.getElementById("openSidebar").addEventListener("click", () => {
  document.getElementById("sidebar").classList.add("show");
});

document.getElementById("closeSidebar").addEventListener("click", () => {
  document.getElementById("sidebar").classList.remove("show");
});

// ==== Logout ====
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => {
    localStorage.removeItem("userUID");
    alert("👋 Logged out!");
    window.location.href = "login.html";
  }).catch((error) => {
    alert("❌ Logout failed: " + error.message);
  });
});