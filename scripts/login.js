// scripts/login.js

const status = document.getElementById("userStatus");
const signinBtn = document.getElementById("signinBtn");

signinBtn.addEventListener("click", () => {
  const emailVal = document.getElementById("email").value.trim();
  const passwordVal = document.getElementById("password").value;

  // 1. Structural check for empty inputs before calling the network
  if (!emailVal || !passwordVal) {
    status.innerText = "❌ Error: Please enter both email and password.";
    status.style.color = "#ef4444";
    return;
  }

  status.innerText = "⏳ Connecting to authentication servers...";
  status.style.color = "#00ff66";

  // 2. Build payload structure matching exactly what your Flask app expects
  const payload = {
    email: emailVal,
    password: passwordVal
  };

  // 3. Fire payload across the public network to your live Vercel backend
  fetch('https://apg-api.vercel.app/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload) // Converts JavaScript object to JSON string
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      status.innerText = "✅ " + data.message;
      status.style.color = "#00ff66";

      // Wait 1.2 seconds so they see the success message, then redirect to the main app dashboard
      setTimeout(() => {
        window.location.href = "home.html";
      }, 1200);
    } else {
      // Handles 401 unauthenticated errors (e.g. "Please verify your email address first" or wrong pass)
      status.innerText = "❌ Error: " + data.message;
      status.style.color = "#ef4444";
    }
  })
  .catch(err => {
    status.innerText = "❌ Connection Failure: Production server node is unreachable.";
    status.style.color = "#ef4444";
    console.error("Fetch Network Error:", err);
  });
});
