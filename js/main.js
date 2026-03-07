// Navigation function v2
function navigateTo(page) {
  console.log('Navigating to:', page);

  // Get the directory path
  const href = window.location.href;
  const lastSlash = href.lastIndexOf('/');
  const baseUrl = href.substring(0, lastSlash + 1);

  if (page === 'login') {
    window.location.href = baseUrl + 'login.html';
  } else if (page === 'departments') {
    window.location.href = baseUrl + 'departments.html';
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
