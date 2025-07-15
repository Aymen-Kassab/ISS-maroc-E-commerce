// Form elements
const signupForm = document.getElementById('signupForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const termsCheckbox = document.getElementById('terms');
const signupBtn = document.getElementById('signupBtn');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.getElementById('btnLoading');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

// Password toggle functionality
const passwordToggle = document.getElementById('passwordToggle');
const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');

passwordToggle.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

confirmPasswordToggle.addEventListener('click', function() {
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

// Password strength checker
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');

passwordInput.addEventListener('input', function() {
    const password = this.value;
    const strength = checkPasswordStrength(password);
    
    strengthFill.className = 'strength-fill';
    strengthText.className = 'strength-text';
    
    if (password.length === 0) {
        strengthText.textContent = 'Entrez un mot de passe';
        return;
    }
    
    if (strength.score < 3) {
        strengthFill.classList.add('weak');
        strengthText.classList.add('weak');
        strengthText.textContent = 'Mot de passe faible';
    } else if (strength.score < 5) {
        strengthFill.classList.add('medium');
        strengthText.classList.add('medium');
        strengthText.textContent = 'Mot de passe moyen';
    } else {
        strengthFill.classList.add('strong');
        strengthText.classList.add('strong');
        strengthText.textContent = 'Mot de passe fort';
    }
});

function checkPasswordStrength(password) {
    let score = 0;
    
    // Length check
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    
    // Character variety checks
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    return { score };
}

// Real-time validation
function validateForm() {
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const termsAccepted = termsCheckbox.checked;

    let isValid = true;
    let errorMsg = '';

    // Username validation
    if (username.length < 3) {
        isValid = false;
        errorMsg = 'Le nom d\'utilisateur doit contenir au moins 3 caractères.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        isValid = false;
        errorMsg = 'Veuillez entrer une adresse email valide.';
    }

    // Password validation
    if (password.length < 8) {
        isValid = false;
        errorMsg = 'Le mot de passe doit contenir au moins 8 caractères.';
    }

    // Password confirmation
    if (password !== confirmPassword) {
        isValid = false;
        errorMsg = 'Les mots de passe ne correspondent pas.';
    }

    // Terms acceptance
    if (!termsAccepted) {
        isValid = false;
        errorMsg = 'Vous devez accepter les conditions d\'utilisation.';
    }

    return { isValid, errorMsg };
}

// Form submission
signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const validation = validateForm();
    
    if (!validation.isValid) {
        showError(validation.errorMsg);
        return;
    }

    // Show loading state
    signupBtn.disabled = true;
    btnText.style.opacity = '0';
    btnLoading.style.display = 'block';

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Get form data
        const formData = {
            username: usernameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value
        };

        // Here you would send the data to your backend
        console.log('Données d\'inscription:', formData);
        
        // Show success message
        showSuccess('Compte administrateur créé avec succès ! Redirection en cours...');
        
        // Redirect after success (simulate)
        setTimeout(() => {
            window.location.href = 'admin-dashboard.html';
        }, 2000);

    } catch (error) {
        showError('Une erreur est survenue lors de la création du compte. Veuillez réessayer.');
        console.error('Erreur d\'inscription:', error);
    } finally {
        // Reset loading state
        signupBtn.disabled = false;
        btnText.style.opacity = '1';
        btnLoading.style.display = 'none';
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

// Real-time validation feedback
[usernameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
    input.addEventListener('blur', function() {
        const validation = validateForm();
        if (!validation.isValid && this.value.trim() !== '') {
            this.style.borderColor = '#e74c3c';
        } else if (this.value.trim() !== '') {
            this.style.borderColor = '#27ae60';
        }
    });

    input.addEventListener('focus', function() {
        this.style.borderColor = '#1e3c72';
        errorMessage.style.display = 'none';
    });
});

// Login link functionality
document.getElementById('loginLink').addEventListener('click', function(e) {
    e.preventDefault();
    // Redirect to login page
    window.location.href = 'admin-login.html';
});

// Auto-focus first input
window.addEventListener('load', function() {
    usernameInput.focus();
});