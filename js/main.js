// Navigation function
function navigateTo(page) {
  console.log(`Navigating to: ${page}`);

  switch(page) {
    case 'login':
      window.location.href = 'login.html';
      break;
    case 'departments':
      window.location.href = 'departments.html';
      break;
    default:
      console.log('Unknown page:', page);
  }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  console.log('Student Growth Application loaded successfully');
  initializeApp();
});

function initializeApp() {
  // Add any initialization logic here
  // For now, this is just a placeholder for future functionality
  console.log('App initialized');
}

// Add smooth transitions to buttons
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function() {
    this.style.transform = 'scale(0.98)';
    setTimeout(() => {
      this.style.transform = '';
    }, 100);
  });
});
