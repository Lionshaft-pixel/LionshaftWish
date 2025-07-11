document.getElementById("resetBtn").addEventListener("click", function () {
  const email = document.getElementById("resetEmail").value;
  const msg = document.getElementById("resetMessage");

  if (!email) {
    msg.textContent = "📩 Please enter your email.";
    msg.style.color = "red";
    return;
  }

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      msg.textContent = "✅ Reset link sent! Check your inbox.";
      msg.style.color = "green";
    })
    .catch((error) => {
      msg.textContent = `❌ Error: ${error.message}`;
      msg.style.color = "red";
    });
});

document.getElementById("resetBtn").addEventListener("click", function () {
  const email = document.getElementById("resetEmail").value;
  const msg = document.getElementById("resetMessage");

  if (!email) {
    msg.textContent = "❌ Please enter your email.";
    msg.style.color = "red";
    return;
  }

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      msg.textContent = "✅ Reset link sent! Check your inbox.";
      msg.style.color = "green";
    })
    .catch((error) => {
      msg.textContent = `❌ ${error.message}`;
      msg.style.color = "red";
    });
});