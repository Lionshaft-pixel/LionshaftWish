onAuthStateChanged(auth, (user) => {
  const welcomeBox = document.getElementById("welcomeMsg");
  const uidBox = document.getElementById("userUidBox");
  const logoutBtn = document.getElementById("logoutBtn");

  if (user) {
    if (welcomeBox) welcomeBox.textContent = `Welcome, ${user.email} 👋`;
    if (uidBox) uidBox.textContent = user.uid;
    if (logoutBtn) logoutBtn.style.display = "inline-block";
    localStorage.setItem("userUID", user.uid);
  } else {
    if (welcomeBox) welcomeBox.textContent = `Welcome, guest 👋`;
    if (uidBox) uidBox.textContent = `Guest`;
    if (logoutBtn) logoutBtn.style.display = "none";
    localStorage.removeItem("userUID");
  }
});