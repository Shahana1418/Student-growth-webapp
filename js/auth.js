// Authentication System
// Using localStorage for persistent login across page refreshes

const ADMIN_PASSWORD = 'Admin';

// Protected pages that require authentication
const PROTECTED_PAGES = ['departments.html', 'batches.html', 'students.html', 'teams.html', 'assignment.html', 'syllabus.html', 'course-assignment.html'];

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
  // Get current page from href instead of pathname for better compatibility
  const href = window.location.href;
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  // Check if current page is a protected page
  const isProtectedPage = PROTECTED_PAGES.some(page => href.includes(page));

  // Prevent redirect loops
  if (isProtectedPage && !isLoggedIn) {
    if (!href.includes('login.html')) {
      window.location.href = 'login.html';
    }
    return;
  }

  // If on login page but already logged in, redirect to index
  if (href.includes('login.html') && isLoggedIn) {
    if (!href.includes('index.html')) {
      window.location.href = 'index.html';
    }
  }
}

// Run auth check when page loads
// Check if DOM is already loaded, otherwise wait for DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkAuth);
} else {
  checkAuth();
}
