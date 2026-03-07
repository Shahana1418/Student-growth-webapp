// Navigation function
function navigateTo(page) {
  console.log('Navigating to:', page);

  if (page === 'login') {
    window.location.href = './login.html';
  } else if (page === 'departments') {
    window.location.href = './departments.html';
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
