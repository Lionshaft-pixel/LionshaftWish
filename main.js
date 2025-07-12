// === IMPORTS ===
import { auth } from './firebase-init.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// === DISABLE ACCESS PROTECTION FOR NOW ===
// if (!localStorage.getItem("userUID")) {
//   alert("You must be logged in to view this page.");
//   window.location.href = "login.html";
// }

// === DONATION PROGRESS ===
const goalAmount = 5000;
const currentDonation = 0; // <== UPDATE this

const progressPercent = Math.min((currentDonation / goalAmount) * 100, 100);

const fillEl = document.getElementById('progress-fill');
const textEl = document.getElementById('progress-text');
const messageEl = document.getElementById('progress-message');

if (fillEl && textEl && messageEl) {
  fillEl.style.width = `${progressPercent}%`;
  textEl.textContent = `₹${currentDonation.toLocaleString()}`;

  fillEl.classList.remove('progress-red', 'progress-yellow', 'progress-green');

  if (progressPercent < 35) {
    fillEl.classList.add('progress-red');
    messageEl.textContent = "We're just getting started!";
  } else if (progressPercent < 75) {
    fillEl.classList.add('progress-yellow');
    messageEl.textContent = "You're making a difference!";
  } else if (progressPercent < 100) {
    fillEl.classList.add('progress-green');
    messageEl.textContent = "Almost there!";
  } else {
    fillEl.classList.add('progress-green');
    messageEl.textContent = "🎉 Goal achieved! You're a legend!";
  }
}

// === COPY LINK FUNCTION ===
function copyLink() {
  const input = document.getElementById("copyLinkInput");
  if (input) {
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("✅ Link copied to clipboard!");
  }
}

// === SHARE SITE FUNCTION ===
function shareSite() {
  const shareData = {
    title: "LionshaftWish 🌟",
    text: "Check out this amazing website where wishes come true!",
    url: "https://glitchyn.online"
  };

  if (navigator.share) {
    navigator.share(shareData).catch((err) => {
      alert("Sharing failed: " + err);
    });
  } else {
    alert("❌ Chrome doesn't support Web Share API. Use copy instead!");
  }
}

// === DISPLAY USER UID (HIDDEN FOR GUEST MODE) ===
// const userUID = localStorage.getItem("userUID");
// const uidBox = document.getElementById("userUidBox");

// if (userUID && uidBox) {
//   uidBox.textContent = userUID;
//   console.log("Logged in as UID:", userUID);
// }

// === WELCOME MESSAGE (GUEST FRIENDLY) ===
onAuthStateChanged(auth, (user) => {
  const welcomeBox = document.getElementById("welcomeMsg");
  const uidBox = document.getElementById("userUidBox");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginLink = document.querySelector('a[href="login.html"]');

  if (user) {
    if (welcomeBox) welcomeBox.textContent = `Welcome back, ${user.email} 👋`;
    if (uidBox) uidBox.textContent = user.uid;
    if (logoutBtn) logoutBtn.style.display = "inline-block";
    if (loginLink) loginLink.style.display = "none";
    localStorage.setItem("userUID", user.uid);
  } else {
    if (welcomeBox) welcomeBox.textContent = `Welcome, guest 👋`;
    if (uidBox) uidBox.textContent = `Guest`;
    if (logoutBtn) logoutBtn.style.display = "none"; // 👈 Hides logout button for guests!
    if (loginLink) loginLink.style.display = "inline-block";
    localStorage.removeItem("userUID");
  }
});

// === WAIT FOR PAGE TO LOAD THEN ADD LOGOUT FUNCTION ===
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtns = document.querySelectorAll("#logoutBtn");

  logoutBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      signOut(auth).then(() => {
        localStorage.removeItem("userUID");
        alert("👋 Logged out successfully!");
        window.location.href = "index.html";
      }).catch((error) => {
        alert("❌ Logout failed: " + error.message);
      });
    });
  });
});

// === SIDEBAR TOGGLE ===
const sidebar = document.getElementById("sidebar");
const openBtn = document.getElementById("openSidebar");
const closeBtn = document.getElementById("closeSidebar");

if (openBtn && sidebar) {
  openBtn.addEventListener("click", () => {
    sidebar.classList.add("show");
  });
}

if (closeBtn && sidebar) {
  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("show");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("openSidebar");
  const closeBtn = document.getElementById("closeSidebar");

  openBtn.addEventListener("click", () => {
    sidebar.classList.add("show");
    sidebar.classList.remove("hidden");
    openBtn.classList.add("hide");
  });

  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("show");
    sidebar.classList.add("hidden");
    openBtn.classList.remove("hide");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth).then(() => {
        localStorage.removeItem("userUID");
        alert("👋 Logged out successfully!");
        window.location.href = "index.html";
      }).catch((error) => {
        alert("❌ Logout failed: " + error.message);
      });
    });
  }
});