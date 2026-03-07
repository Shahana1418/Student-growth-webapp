// Navigation function v2
function navigateTo(page) {
  console.log('Navigating to:', page);

  // Get the base path for the app
  const basePath = window.location.pathname.replace(/\/[^\/]*$/, '/');

  if (page === 'login') {
    window.location.href = basePath + 'login.html';
  } else if (page === 'departments') {
    window.location.href = basePath + 'departments.html';
  }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  console.log('✅ Student Growth Application loaded v2');
});

// Add smooth transitions to buttons
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function() {
    this.style.transform = 'scale(0.98)';
    setTimeout(() => {
      this.style.transform = '';
    }, 100);
  });
});
