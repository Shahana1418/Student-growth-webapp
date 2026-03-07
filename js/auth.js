// Authentication System
// Using localStorage for persistent login across page refreshes

const ADMIN_PASSWORD = 'Admin';

// Protected pages that require authentication
const PROTECTED_PAGES = ['index.html', 'departments.html', 'batches.html', 'students.html', 'teams.html', 'assignment.html'];

function handleLogin(event) {
  event.preventDefault();

  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('errorMessage');

  if (password === ADMIN_PASSWORD) {
    // Store session in localStorage (persists across page refresh)
    localStorage.setItem('isLoggedIn', 'true');
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
  // Clear all session data
  localStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('selectedDept');
  sessionStorage.removeItem('selectedBatch');
  sessionStorage.removeItem('generatedTeams');
  window.location.href = 'index.html';
}

// Check if user is logged in
function checkAuth() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  // Check if current page is a protected page
  const isProtectedPage = PROTECTED_PAGES.some(page => currentPage.includes(page));

  if (isProtectedPage && !isLoggedIn) {
    window.location.href = 'login.html';
    return;
  }

  // If on login page but already logged in, redirect to index
  if (currentPage.includes('login.html') && isLoggedIn) {
    window.location.href = 'index.html';
  }
}

// Run auth check when page loads
document.addEventListener('DOMContentLoaded', checkAuth);
