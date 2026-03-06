// Authentication System

const ADMIN_PASSWORD = 'Admin';

function handleLogin(event) {
  event.preventDefault();

  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('errorMessage');

  if (password === ADMIN_PASSWORD) {
    // Store session
    sessionStorage.setItem('isLoggedIn', 'true');
    errorMessage.classList.remove('show');

    // Redirect to departments page
    window.location.href = 'departments.html';
  } else {
    // Show error
    errorMessage.textContent = 'Invalid password. Please try again.';
    errorMessage.classList.add('show');
    document.getElementById('password').value = '';
    document.getElementById('password').focus();
  }
}

function goHome() {
  window.location.href = 'index.html';
}

function handleLogout() {
  sessionStorage.removeItem('isLoggedIn');
  window.location.href = 'index.html';
}

// Check if user is logged in on departments page
function checkAuth() {
  if (window.location.pathname.includes('departments.html')) {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      window.location.href = 'login.html';
    }
  }
}

// Run auth check when page loads
document.addEventListener('DOMContentLoaded', checkAuth);
