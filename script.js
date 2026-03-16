// ===== CURATED HAVEN INTERIORS - MAIN JAVASCRIPT =====

// ===== NAVIGATION FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
  
  // Active navigation highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Hide navbar on scroll down, show on scroll up
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      navbar.classList.remove('hide');
      return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.classList.add('hide');
    } else {
      navbar.classList.remove('hide');
    }
    
    lastScroll = currentScroll;
  });

  // ===== COOKIE CONSENT =====
  const cookieConsent = document.getElementById('cookieConsent');
  const acceptCookies = document.getElementById('acceptCookies');
  const declineCookies = document.getElementById('declineCookies');

  if (cookieConsent) {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    
    if (!consent) {
      setTimeout(() => {
        cookieConsent.classList.add('active');
      }, 1000);
    }

    if (acceptCookies) {
      acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('active');
        console.log('Cookies accepted');
      });
    }

    if (declineCookies) {
      declineCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.classList.remove('active');
        console.log('Cookies declined');
      });
    }
  }

  // ===== LEAD FORM MODAL =====
  const modal = document.getElementById('leadModal');
  const modalClose = document.getElementById('modalClose');
  const leadForm = document.getElementById('leadForm');
  const openModalButtons = document.querySelectorAll('[data-service]');

  // Open modal function
  function openModal(serviceName = '') {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Pre-select service if provided
      const serviceSelect = document.getElementById('service');
      if (serviceSelect && serviceName) {
        serviceSelect.value = serviceName;
      }
    }
  }

  // Close modal function
  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'unset';
      
      // Reset form after animation
      setTimeout(() => {
        if (leadForm) {
          leadForm.reset();
        }
        const successMessage = document.getElementById('formSuccess');
        const formContent = document.getElementById('formContent');
        if (successMessage && formContent) {
          successMessage.style.display = 'none';
          formContent.style.display = 'block';
        }
      }, 300);
    }
  }

  // Attach click events to all buttons with data-service attribute
  openModalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = button.getAttribute('data-service');
      openModal(serviceName);
    });
  });

  // Close modal on X click
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close modal on overlay click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // ===== LEAD FORM SUBMISSION =====
  if (leadForm) {
    leadForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        privacyConsent: document.getElementById('privacyConsent').checked
      };

      // Log form data (in production, send to backend)
      console.log('Lead form submitted:', formData);

      // Show success message
      const formContent = document.getElementById('formContent');
      const successMessage = document.getElementById('formSuccess');
      
      if (formContent && successMessage) {
        formContent.style.display = 'none';
        successMessage.style.display = 'block';
      }

      // Auto-close modal after 3 seconds
      setTimeout(() => {
        closeModal();
      }, 3000);
    });
  }

  // ===== CONTACT FORM SUBMISSION =====
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        message: document.getElementById('contactMessage').value,
        privacyConsent: document.getElementById('contactPrivacy').checked
      };

      // Log form data (in production, send to backend)
      console.log('Contact form submitted:', formData);

      // Show success message
      const formWrap = document.querySelector('.contact-form-wrap');
      if (formWrap) {
        formWrap.innerHTML = `
          <div class="form-success">
            <h3>Thank You for Reaching Out!</h3>
            <p>We've received your message and will respond within 24 hours. We look forward to discussing your project.</p>
          </div>
        `;
      }

      // Reset after 5 seconds
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    });
  }

  // ===== SCROLL ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .service-row, .masonry-item');
  animateElements.forEach(el => {
    observer.observe(el);
  });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== IMAGE LAZY LOADING =====
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // ===== PRIVACY CONSENT CHECKBOX VALIDATION =====
  const privacyCheckboxes = document.querySelectorAll('.form-checkbox');
  
  privacyCheckboxes.forEach(checkbox => {
    const form = checkbox.closest('form');
    if (form) {
      const submitButton = form.querySelector('.form-submit');
      
      checkbox.addEventListener('change', () => {
        if (submitButton) {
          submitButton.disabled = !checkbox.checked;
        }
      });
    }
  });

  // ===== FORM INPUT ANIMATIONS =====
  const formInputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');
  
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
  });

  // ===== PARALLAX EFFECT FOR HERO IMAGES =====
  const heroImages = document.querySelectorAll('.hero-image-main, .hero-image-accent');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    heroImages.forEach(img => {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      img.style.transform = `translateY(${yPos}px)`;
    });
  });

  // ===== PRICING CARD HOVER EFFECT =====
  const pricingCards = document.querySelectorAll('.pricing-card');
  
  pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      pricingCards.forEach(c => {
        if (c !== this && !c.classList.contains('featured')) {
          c.style.opacity = '0.7';
        }
      });
    });
    
    card.addEventListener('mouseleave', function() {
      pricingCards.forEach(c => {
        c.style.opacity = '1';
      });
    });
  });

  console.log('Curated Haven Interiors - Website Initialized');
});

// ===== UTILITY FUNCTIONS =====

// Email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Phone validation (US format)
function validatePhone(phone) {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return re.test(phone.replace(/\s/g, ''));
}

// Format phone number
function formatPhoneNumber(phone) {
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phone;
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
