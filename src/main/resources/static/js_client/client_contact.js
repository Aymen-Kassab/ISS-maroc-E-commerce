// Mobile menu functionality
function toggleMobileMenu() {
    const sidebar = document.getElementById('mainSidebar');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.toggle('mobile-open');
    overlay.classList.toggle('active');
}

function closeMobileMenu() {
    const sidebar = document.getElementById('mainSidebar');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
}

// Contact form submission
function submitForm(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    
    // Disable submit button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    
    // Simulate form submission delay
    setTimeout(() => {
        // Show success message
        successMessage.classList.add('show');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le Message';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
    }, 2000);
}

// FAQ toggle functionality
function toggleFAQ(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('i');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-answer').forEach(item => {
        if (item !== answer) {
            item.classList.remove('expanded');
            item.previousElementSibling.querySelector('i').style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current FAQ item
    answer.classList.toggle('expanded');
    
    if (answer.classList.contains('expanded')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}

function performSearch() {
    const searchTerm = document.querySelector('.search-bar').value;
    if (searchTerm.trim()) {
        console.log('Recherche pour: ' + searchTerm);
        alert('Recherche pour: ' + searchTerm);
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
});

function validateField(field) {
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        field.classList.add('error');
        field.style.borderColor = '#ff4757';
        return false;
    }
    
    // Validate email format
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            field.style.borderColor = '#ff4757';
            return false;
        }
    }
    
    // Field is valid
    field.style.borderColor = '#2ed573';
    return true;
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

function getCartProductCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    for (let item of cart) {
        total += item.quantity;
    }

    return total;
}

document.querySelector(".cart-badge").innerText = getCartProductCount();