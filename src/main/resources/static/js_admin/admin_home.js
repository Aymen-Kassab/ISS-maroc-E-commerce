// Mobile menu functionality
const mobileToggle = document.getElementById('mobileToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

mobileToggle.addEventListener('click', function() {
    sidebar.classList.toggle('mobile-visible');
    sidebarOverlay.classList.toggle('active');
});

sidebarOverlay.addEventListener('click', function() {
    sidebar.classList.remove('mobile-visible');
    sidebarOverlay.classList.remove('active');
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('mobile-visible');
        sidebarOverlay.classList.remove('active');
    }
});

// Animate numbers
function animateNumber(elementId, targetValue, isCurrency = false) {
    const element = document.getElementById(elementId);
    const startValue = 0;
    const duration = 2000;
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
        
        if (isCurrency) {
            element.textContent = formatCurrency(currentValue);
        } else {
            element.textContent = formatNumber(currentValue);
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function formatNumber(num) {
    return num.toLocaleString('fr-FR');
}

function formatCurrency(num) {
    return num.toLocaleString('fr-FR') + ' DH';
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Animate statistics
    setTimeout(() => {
        animateNumber('totalOrdinateurs', 347);
        animateNumber('totalImprimantes', 156);
        animateNumber('totalReseaux', 89);
        animateNumber('totalCommandes', 1247);
        animateNumber('unreadMessages', 23);
    }, 500);
});