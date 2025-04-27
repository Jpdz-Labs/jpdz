/**
 * JPDZ Mobile Enhancements
 * Improves mobile interactions and fixes common mobile browser issues
 */

document.addEventListener('DOMContentLoaded', function() {
  // Fix for 100vh issue on mobile browsers
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  };
  window.addEventListener('resize', appHeight);
  appHeight();
  
  // Improve mobile menu toggle behavior
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }
  
  // Add active states for better touch feedback
  const addActiveFeedback = (elements, activeClass) => {
    elements.forEach(el => {
      el.addEventListener('touchstart', () => el.classList.add(activeClass));
      el.addEventListener('touchend', () => el.classList.remove(activeClass));
      el.addEventListener('touchcancel', () => el.classList.remove(activeClass));
    });
  };
  
  // Apply active states to buttons and interactive elements
  addActiveFeedback(document.querySelectorAll('.btn, .nav-button, .download-button'), 'touch-active');
  
  // Prevent double-tap zoom on buttons and navigation
  const preventDoubleTapZoom = (elements) => {
    elements.forEach(el => {
      el.addEventListener('touchend', (e) => {
        e.preventDefault();
        // Trigger the element's click event
        setTimeout(() => {
          el.click();
        }, 10);
      });
    });
  };
  
  preventDoubleTapZoom(document.querySelectorAll('.nav-button, .menu-toggle'));
  
  // Fix for iOS Safari 100vh issue
  if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    const fixHeight = () => {
      document.documentElement.style.setProperty('--real-vh', `${window.innerHeight * 0.01}px`);
    };
    window.addEventListener('resize', fixHeight);
    window.addEventListener('orientationchange', fixHeight);
    fixHeight();
  }
});