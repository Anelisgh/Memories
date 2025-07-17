async function checkPassword() { 
  const passwordInput = document.getElementById('password').value;
  const errorElement = document.getElementById('error-message');
  
  const storedHash = "297581d6cd198a6e6df740f13288cb13a1e76cebe3f0ebc3fe259977addfd646"; 
  const inputHash = await sha256(passwordInput);
  
  if (inputHash === storedHash) {
    sessionStorage.setItem('authenticated', 'true');
    window.location.href = 'site.html';
  } else {
    errorElement.textContent = 'Parolă incorectă!';
  }
}

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");

  passwordInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      checkPassword().catch(console.error);
    }
  });
});