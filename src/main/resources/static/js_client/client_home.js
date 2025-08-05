let currentExpandedSidebar = null;

function toggleMobileMenu() {
    const sidebar = document.getElementById('mainSidebar');
    const overlay = document.getElementById('overlay');
            
    sidebar.classList.toggle('mobile-open');
    overlay.classList.toggle('active');
}

function closeMobileMenu() {
    const sidebar = document.getElementById('mainSidebar');
    const overlay = document.getElementById('overlay');
    const expandableSidebar = document.getElementById('expandableSidebar');
            
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
    expandableSidebar.classList.remove('expanded');
    currentExpandedSidebar = null;
}

function toggleExpandableSidebar(category) {
    const expandableSidebar = document.getElementById('expandableSidebar');
            
    if (currentExpandedSidebar === category) {
        expandableSidebar.classList.remove('expanded');
        currentExpandedSidebar = null;
    } else {
        expandableSidebar.classList.add('expanded');
        currentExpandedSidebar = category;
                
        // Close all categories first
        const allCategories = document.querySelectorAll('.category-content');
        allCategories.forEach(cat => cat.classList.remove('expanded'));
                
        // Open relevant categories based on selection
        if (category === 'ordinateur') {
            document.getElementById('bureau').classList.add('expanded');
            document.getElementById('portable').classList.add('expanded');
        } else if (category === 'imprimants') {
            document.getElementById('impression').classList.add('expanded');
        } else if (category === 'reseau') {
            document.getElementById('reseauSub').classList.add('expanded');
        }
    }
}

function toggleCategory(categoryId) {
    const category = document.getElementById(categoryId);
    const header = category.previousElementSibling;
    const icon = header.querySelector('i:last-child');
            
    category.classList.toggle('expanded');
            
    if (category.classList.contains('expanded')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}

// Close expandable sidebar when clicking outside
document.addEventListener('click', function(event) {
const expandableSidebar = document.getElementById('expandableSidebar');
const mainSidebar = document.getElementById('mainSidebar');
            
if (!expandableSidebar.contains(event.target) && 
    !mainSidebar.contains(event.target) && 
    !event.target.closest('.mobile-menu-toggle')) {
                
        if (window.innerWidth > 768) {
            expandableSidebar.classList.remove('expanded');
            currentExpandedSidebar = null;
        }
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
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