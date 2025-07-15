// Form elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberMeCheckbox = document.getElementById('rememberMe');
const loginBtn = document.getElementById('loginBtn');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.getElementById('btnLoading');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const loginAttempts = document.getElementById('loginAttempts');

// Login attempts tracking
let attemptCount = parseInt(localStorage.getItem('loginAttempts') || '0');
let lastAttemptTime = parseInt(localStorage.getItem('lastAttemptTime') || '0');

// Check if user is temporarily locked out
function checkLockout() {
    const now = Date.now();
    const lockoutDuration = 15 * 60 * 1000; // 15 minutes
    
    if (attemptCount >= 5 && (now - lastAttemptTime) < lockoutDuration) {
        const remainingTime = Math.ceil((lockoutDuration - (now - lastAttemptTime)) / 60000);
        showLoginAttempts(`Trop de tentatives échouées. Réessayez dans ${remainingTime} minute(s).`);
        loginBtn.disabled = true;
        return true;
    } else if (attemptCount >= 5 && (now - lastAttemptTime) >= lockoutDuration) {
        // Reset attempts after lockout period
        attemptCount = 0;
        localStorage.setItem('loginAttempts', '0');
        loginAttempts.style.display = 'none';
        loginBtn.disabled = false;
    }
    return false;
}

// Password toggle functionality
const passwordToggle = document.getElementById('passwordToggle');

passwordToggle.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

// Load remembered email
window.addEventListener('load', function() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        rememberMeCheckbox.checked = true;
        passwordInput.focus();
    } else {
        emailInput.focus();
    }
    
    checkLockout();
});

// Form validation
function validateForm() {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    let isValid = true;
    let errorMsg = '';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        isValid = false;
        errorMsg = 'Veuillez entrer une adresse email valide.';
    }

    // Password validation
    if (password.length < 1) {
        isValid = false;
        errorMsg = 'Veuillez entrer votre mot de passe.';
    }

    return { isValid, errorMsg };
}

// Form submission
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Check if locked out
    if (checkLockout()) {
        return;
    }

    const validation = validateForm();
    
    if (!validation.isValid) {
        showError(validation.errorMsg);
        return;
    }

    // Show loading state
    loginBtn.disabled = true;
    btnText.style.opacity = '0';
    btnLoading.style.display = 'block';

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Get form data
        const formData = {
            email: emailInput.value.trim(),
            password: passwordInput.value,
            rememberMe: rememberMeCheckbox.checked
        };

        // Simulate authentication (replace with real backend call)
        const isValidCredentials = await authenticateUser(formData);

        if (isValidCredentials) {
            // Reset login attempts on success
            attemptCount = 0;
            localStorage.setItem('loginAttempts', '0');
            
            // Handle remember me
            if (rememberMeCheckbox.checked) {
                localStorage.setItem('rememberedEmail', formData.email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            // Show success message
            showSuccess('Connexion réussie ! Redirection en cours...');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'admin-dashboard.html';
            }, 1500);

        } else {
            // Increment failed attempts
            attemptCount++;
            lastAttemptTime = Date.now();
            localStorage.setItem('loginAttempts', attemptCount.toString());
            localStorage.setItem('lastAttemptTime', lastAttemptTime.toString());

            if (attemptCount >= 3) {
                showLoginAttempts(`Attention: ${attemptCount}/5 tentatives échouées. Compte temporairement bloqué après 5 échecs.`);
            }

            showError('Email ou mot de passe incorrect. Veuillez réessayer.');
            
            // Check if should be locked out
            checkLockout();
        }

    } catch (error) {
        showError('Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        console.error('Erreur de connexion:', error);
    } finally {
        // Reset loading state
        if (!loginBtn.disabled) {
            loginBtn.disabled = false;
            btnText.style.opacity = '1';
            btnLoading.style.display = 'none';
        }
    }
});

// Simulate user authentication (replace with real backend)
async function authenticateUser(credentials) {
    // Demo credentials for testing
    const validCredentials = [
        { email: 'admin@issmaroc.com', password: 'admin123' },
        { email: 'demo@issmaroc.com', password: 'demo123' },
        { email: 'test@issmaroc.com', password: 'test123' }
    ];

    return validCredentials.some(cred => 
        cred.email === credentials.email && cred.password === credentials.password
    );
}

// Quick login buttons
document.getElementById('demoLogin').addEventListener('click', function() {
    emailInput.value = 'demo@issmaroc.com';
    passwordInput.value = 'demo123';
    showSuccess('Identifiants de démonstration chargés. Cliquez sur "Se connecter".');
});

document.getElementById('guestLogin').addEventListener('click', function() {
    showSuccess('Redirection vers le mode invité...');
    setTimeout(() => {
        window.location.href = 'admin-dashboard.html?mode=guest';
    }, 1000);
});

// Forgot password functionality
document.getElementById('forgotPasswordLink').addEventListener('click', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    if (email) {
        showSuccess(`Instructions de réinitialisation envoyées à ${email}`);
    } else {
        showError('Veuillez entrer votre adresse email d\'abord.');
        emailInput.focus();
    }
});

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Show success message
function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
}

// Show login attempts warning
function showLoginAttempts(message) {
    loginAttempts.textContent = message;
    loginAttempts.style.display = 'block';
}

// Real-time validation feedback
[emailInput, passwordInput].forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            const validation = validateForm();
            if (!validation.isValid) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#27ae60';
            }
        }
    });

    input.addEventListener('focus', function() {
        this.style.borderColor = '#1e3c72';
        errorMessage.style.display = 'none';
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + D for demo login
    if (e.altKey && e.key === 'd') {
        e.preventDefault();
        document.getElementById('demoLogin').click();
    }
    
    // Alt + G for guest login
    if (e.altKey && e.key === 'g') {
        e.preventDefault();
        document.getElementById('guestLogin').click();
    }
});

// Clear lockout on page visibility change (when user comes back)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        checkLockout();
    }
});