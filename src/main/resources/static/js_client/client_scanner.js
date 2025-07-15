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

// Filter functionality
function applyFilters() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    const brandFilter = document.getElementById('brandFilter').value;
    const printTypeFilter = document.getElementById('printTypeFilter').value;
    
    const products = document.querySelectorAll('.product-card');
    let visibleCount = 0;
    
    products.forEach(product => {
        let show = true;
        
        // Category filter
        if (categoryFilter && product.dataset.category !== categoryFilter) {
            show = false;
        }
        
        // Brand filter
        if (brandFilter && product.dataset.brand !== brandFilter) {
            show = false;
        }
        
        // Print type filter
        if (printTypeFilter && product.dataset.printType !== printTypeFilter) {
            show = false;
        }
        
        // Price filter
        if (priceFilter) {
            const price = parseInt(product.dataset.price);
            const [min, max] = priceFilter.split('-').map(p => p.replace('+', ''));
            
            if (max) {
                if (price < parseInt(min) || price > parseInt(max)) {
                    show = false;
                }
            } else {
                if (price < parseInt(min)) {
                    show = false;
                }
            }
        }
        
        product.style.display = show ? 'block' : 'none';
        if (show) visibleCount++;
    });
    
    document.getElementById('resultsCount').textContent = visibleCount;
}

function clearAllFilters() {
    document.getElementById('categoryFilter').value = '';
    document.getElementById('priceFilter').value = '';
    document.getElementById('brandFilter').value = '';
    document.getElementById('printTypeFilter').value = '';
    
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        product.style.display = 'block';
    });
    
    document.getElementById('resultsCount').textContent = products.length;
}

function sortProducts() {
    const sortValue = document.getElementById('sortSelect').value;
    const productsGrid = document.getElementById('productsGrid');
    const products = Array.from(productsGrid.querySelectorAll('.product-card'));
    
    products.sort((a, b) => {
        switch (sortValue) {
            case 'price-low':
                return parseInt(a.dataset.price) - parseInt(b.dataset.price);
            case 'price-high':
                return parseInt(b.dataset.price) - parseInt(a.dataset.price);
            case 'name':
                return a.querySelector('.product-title').textContent.localeCompare(
                    b.querySelector('.product-title').textContent
                );
            default:
                return 0;
        }
    });
    
    products.forEach(product => productsGrid.appendChild(product));
}

function toggleView(viewType) {
    const buttons = document.querySelectorAll('.view-btn');
    const grid = document.getElementById('productsGrid');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.closest('.view-btn').classList.add('active');
    
    if (viewType === 'list') {
        grid.style.gridTemplateColumns = '1fr';
    } else {
        grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
    }
}

// Search functionality
document.querySelector('.search-bar').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

document.querySelector('.search-btn').addEventListener('click', performSearch);

function performSearch() {
    const searchTerm = document.querySelector('.search-bar').value.toLowerCase();
    const products = document.querySelectorAll('.product-card');
    let visibleCount = 0;
    
    if (searchTerm.trim()) {
        products.forEach(product => {
            const title = product.querySelector('.product-title').textContent.toLowerCase();
            const specs = product.querySelector('.product-specs').textContent.toLowerCase();
            const category = product.querySelector('.product-category').textContent.toLowerCase();
            
            const matches = title.includes(searchTerm) || 
                            specs.includes(searchTerm) || 
                            category.includes(searchTerm);
            
            product.style.display = matches ? 'block' : 'none';
            if (matches) visibleCount++;
        });
        
        document.getElementById('resultsCount').textContent = visibleCount;
    } else {
        products.forEach(product => {
            product.style.display = 'block';
            visibleCount++;
        });
        document.getElementById('resultsCount').textContent = visibleCount;
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('resultsCount').textContent = 
        document.querySelectorAll('.product-card').length;
});