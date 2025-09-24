// Restaurant Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initDarkMode();
    initTodaysSpecial();
    initContactForm();
    initGalleryModal();
    initScrollAnimations();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 100;
        
        // Update navbar background on scroll
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            if (document.body.classList.contains('dark-mode')) {
                navbar.style.background = 'rgba(17, 24, 39, 0.98)';
            }
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            if (document.body.classList.contains('dark-mode')) {
                navbar.style.background = 'rgba(17, 24, 39, 0.95)';
            }
        }
        
        // Update active nav link
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
}

// Dark Mode functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');
    
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        enableDarkMode();
    }
    
    darkModeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
    
    function enableDarkMode() {
        body.classList.add('dark-mode');
        icon.className = 'bi bi-sun-fill';
        localStorage.setItem('darkMode', 'true');
        
        // Update navbar background if scrolled
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(17, 24, 39, 0.98)';
        } else {
            navbar.style.background = 'rgba(17, 24, 39, 0.95)';
        }
    }
    
    function disableDarkMode() {
        body.classList.remove('dark-mode');
        icon.className = 'bi bi-moon-fill';
        localStorage.setItem('darkMode', 'false');
        
        // Update navbar background if scrolled
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
}

// Today's Special Badge functionality
function initTodaysSpecial() {
    const specialBadge = document.getElementById('specialBadge');
    const today = new Date().getDay();
    
    // Show badge on weekends (Friday=5, Saturday=6, Sunday=0)
    if (today === 5 || today === 6 || today === 0) {
        setTimeout(() => {
            specialBadge.classList.add('show');
        }, 2000);
        
        // Hide badge after 10 seconds
        setTimeout(() => {
            specialBadge.classList.remove('show');
        }, 12000);
    }
    
    // Hide badge when clicked
    specialBadge.addEventListener('click', function() {
        this.classList.remove('show');
    });
}

// Contact Form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    const fields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        message: document.getElementById('message')
    };
    
    // Form validation rules
    const validators = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50,
            message: 'Name must be between 2-50 characters'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: false,
            pattern: /^[\+]?[1-9][\d]{0,15}$/,
            message: 'Please enter a valid phone number'
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 500,
            message: 'Message must be between 10-500 characters'
        }
    };
    
    // Real-time validation
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        field.addEventListener('blur', () => validateField(fieldName, field.value));
        field.addEventListener('input', () => {
            if (field.classList.contains('is-invalid')) {
                validateField(fieldName, field.value);
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const formData = {};
        
        // Validate all fields
        Object.keys(fields).forEach(fieldName => {
            const value = fields[fieldName].value.trim();
            formData[fieldName] = value;
            
            if (!validateField(fieldName, value)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Message Sent!';
                submitBtn.classList.add('btn-success');
                submitBtn.classList.remove('btn-primary');
                
                // Reset form after success
                setTimeout(() => {
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    submitBtn.classList.remove('btn-success');
                    submitBtn.classList.add('btn-primary');
                    
                    // Clear validation states
                    Object.keys(fields).forEach(fieldName => {
                        fields[fieldName].classList.remove('is-invalid');
                        const errorElement = document.getElementById(fieldName + 'Error');
                        if (errorElement) {
                            errorElement.style.display = 'none';
                        }
                    });
                }, 2000);
            }, 1500);
        }
    });
    
    function validateField(fieldName, value) {
        const validator = validators[fieldName];
        const field = fields[fieldName];
        const errorElement = document.getElementById(fieldName + 'Error');
        
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (validator.required && !value) {
            isValid = false;
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
        }
        // Length validation
        else if (validator.minLength && value.length < validator.minLength) {
            isValid = false;
            errorMessage = validator.message;
        }
        else if (validator.maxLength && value.length > validator.maxLength) {
            isValid = false;
            errorMessage = validator.message;
        }
        // Pattern validation
        else if (validator.pattern && value && !validator.pattern.test(value)) {
            isValid = false;
            errorMessage = validator.message;
        }
        
        // Update field appearance
        if (isValid) {
            field.classList.remove('is-invalid');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        } else {
            field.classList.add('is-invalid');
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
            }
        }
        
        return isValid;
    }
}

// Gallery Modal functionality
function initGalleryModal() {
    const galleryImages = document.querySelectorAll('.gallery-img');
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-bs-image') || this.src;
            const altText = this.alt;
            
            modalImage.src = imageSrc;
            modalImage.alt = altText;
        });
        
        // Keyboard navigation for gallery images
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make images focusable
        img.setAttribute('tabindex', '0');
    });
    
    // Modal keyboard navigation
    if (modal) {
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate menu cards
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate gallery images
    const galleryImages = document.querySelectorAll('.gallery-img');
    galleryImages.forEach((img, index) => {
        img.style.opacity = '0';
        img.style.transform = 'translateY(20px)';
        img.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        observer.observe(img);
    });
}

// Utility functions
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

// Performance optimization: Debounce scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations can be added here
}, 10));

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Escape key handling
    if (e.key === 'Escape') {
        // Close any open modals
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        });
        
        // Hide special badge
        const specialBadge = document.getElementById('specialBadge');
        if (specialBadge && specialBadge.classList.contains('show')) {
            specialBadge.classList.remove('show');
        }
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to a logging service
});

// Console welcome message
console.log('🍝 Welcome to Bella Vista Restaurant! 🍝');
console.log('This website was built with HTML, CSS, JavaScript, and Bootstrap.');
console.log('Features: Responsive design, dark mode, form validation, and smooth animations.');