// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const currentPath = window.location.pathname;

// Toggle mobile navigation
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navLinks && navLinks.classList.contains('show') && !e.target.closest('.navbar')) {
    navLinks.classList.remove('show');
  }
});

// Set active navigation link
const setActiveNavLink = () => {
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    const itemPath = new URL(item.href).pathname;
    if (currentPath === itemPath || 
        (currentPath === '/' && itemPath.includes('index.html')) ||
        (currentPath.includes(itemPath) && itemPath !== '/')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
};

// Dark Mode Functions
const setupDarkMode = () => {
  // Create dark mode toggle button
  const darkModeToggle = document.createElement('button');
  darkModeToggle.className = 'dark-mode-toggle';
  darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  document.body.appendChild(darkModeToggle);
  
  // Check for saved theme preference or respect OS theme setting
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  
  // Apply dark mode if saved or preferred
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  // Toggle dark mode on button click
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Update icon based on current mode
    if (document.body.classList.contains('dark-mode')) {
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'dark');
    } else {
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'light');
    }
  });
  
  // Listen for OS theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
    }
  });
};

// Handle form submission
const handleFormSubmit = () => {
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const firstName = document.getElementById('first-name').value.trim();
      const lastName = document.getElementById('last-name').value.trim();
      
      // Store in localStorage
      if (firstName && lastName) {
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        
        // Redirect to thank you page
        window.location.href = 'bedankt.html';
      } else {
        alert('Vul a.u.b uw gegevens in.');
      }
    });
  }
};

// Display personalized greeting on thank you page
const setupThankYouPage = () => {
  const thankYouTitle = document.getElementById('thank-you-title');
  const thankYouText = document.getElementById('thank-you-text');
  
  if (thankYouTitle && thankYouText) {
    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';
    
    if (firstName && lastName) {
      thankYouTitle.textContent = `Hallo, ${firstName} ${lastName}!`;
      thankYouText.textContent = 'Bedankt voor het invullen van mijn formulier.';
    } else {
      thankYouText.textContent = 'Je hebt nog geen gegevens ingevuld.';
    }
  }
};

// Handle "leave site" confirmation
const setupLeaveConfirmation = () => {
  const leaveButton = document.getElementById('leave-site');
  
  if (leaveButton) {
    leaveButton.addEventListener('click', () => {
      const firstName = localStorage.getItem('firstName') || 'bezoeker';
      const confirmed = confirm(`Bedankt voor je bezoek, ${firstName}! Weet je zeker dat je de site wilt verlaten?`);
      
      if (confirmed) {
        window.location.href = 'https://www.google.com';
      }
    });
  }
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setActiveNavLink();
  setupDarkMode();
  handleFormSubmit();
  setupThankYouPage();
  setupLeaveConfirmation();
  
  // Exit confirmation
  
}); 