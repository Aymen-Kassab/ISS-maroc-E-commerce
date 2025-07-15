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

// Navigation functionality
/*const navLinks = document.querySelectorAll('.nav-link');
const pageTitle = document.getElementById('pageTitle');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        const pageName = this.dataset.page;
        const pageNames = {
            'accueil': 'Accueil',
            'nouveautes': 'Nouveautés',
            'ordinateurs': 'Ordinateurs',
            'imprimantes': 'Imprimantes',
            'scanners': 'Scanners',
            'reseaux': 'Équipements Réseau',
            'commandes': 'Gestion des Commandes',
            'messages': 'Messages'
        };
        
        pageTitle.textContent = pageNames[pageName];
        
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('mobile-visible');
            sidebarOverlay.classList.remove('active');
        }
    });
});*/

// Update Order Status
function updateOrderStatus(selectElement, orderId) {
    const newStatus = selectElement.value;
    const oldClass = selectElement.className.split(' ').find(cls => 
        ['pending', 'confirmed', 'shipped', 'delivered', 'canceled'].includes(cls)
    );
    
    // Update select styling
    selectElement.classList.remove(oldClass);
    selectElement.classList.add(newStatus);
    
    // Update row data attribute
    const row = selectElement.closest('tr');
    row.setAttribute('data-status', newStatus);
    
    // Here you would send the status update to your backend
    console.log(`Commande ${orderId} mise à jour: ${newStatus}`);
    
    // Show confirmation
    const statusNames = {
        'pending': 'En Attente',
        'confirmed': 'Confirmée',
        'shipped': 'Expédiée',
        'delivered': 'Livrée',
        'canceled': 'Annulée'
    };
    
    alert(`Statut de la commande ${orderId} mis à jour: ${statusNames[newStatus]}`);
    
    // Update statistics (you would get this from backend in real implementation)
    updateStatistics();
}

// Update Statistics
function updateStatistics() {
    const rows = document.querySelectorAll('#ordersTable tbody tr');
    const stats = {
        pending: 0,
        confirmed: 0,
        shipped: 0,
        delivered: 0,
        canceled: 0
    };
    
    rows.forEach(row => {
        const status = row.getAttribute('data-status');
        if (stats.hasOwnProperty(status)) {
            stats[status]++;
        }
    });
    
    // Update stat cards
    document.querySelector('.stat-card:nth-child(1) .stat-number').textContent = stats.pending;
    document.querySelector('.stat-card:nth-child(2) .stat-number').textContent = stats.confirmed;
    document.querySelector('.stat-card:nth-child(3) .stat-number').textContent = stats.shipped;
    document.querySelector('.stat-card:nth-child(4) .stat-number').textContent = stats.delivered;
    document.querySelector('.stat-card:nth-child(5) .stat-number').textContent = stats.canceled;
}

// Search functionality
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const dateFilter = document.getElementById('dateFilter');

function filterOrders() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedStatus = statusFilter.value;
    const selectedDate = dateFilter.value;
    const rows = document.querySelectorAll('#ordersTable tbody tr');

    rows.forEach(row => {
        const clientName = row.querySelector('.client-name').textContent.toLowerCase();
        const clientPhone = row.querySelector('.client-phone').textContent.toLowerCase();
        const productName = row.querySelector('.product-name').textContent.toLowerCase();
        const orderId = row.querySelector('.order-id').textContent.toLowerCase();
        const status = row.getAttribute('data-status');

        const matchesSearch = clientName.includes(searchTerm) || 
                            clientPhone.includes(searchTerm) || 
                            productName.includes(searchTerm) ||
                            orderId.includes(searchTerm);
        const matchesStatus = !selectedStatus || status === selectedStatus;

        if (matchesSearch && matchesStatus) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

searchInput.addEventListener('input', filterOrders);
statusFilter.addEventListener('change', filterOrders);
dateFilter.addEventListener('change', filterOrders);

// Order Actions
function viewOrder(orderId) {
    console.log('Voir détails de la commande:', orderId);
    alert(`Affichage des détails de la commande ${orderId}`);
    // Here you would open a modal or navigate to order details page
}

function editOrder(orderId) {
    console.log('Modifier la commande:', orderId);
    alert(`Modification de la commande ${orderId}`);
    // Here you would open an edit form or modal
}

function deleteOrder(orderId) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la commande ${orderId} ?`)) {
        // Find and remove the row
        const rows = document.querySelectorAll('#ordersTable tbody tr');
        rows.forEach(row => {
            if (row.querySelector('.order-id').textContent === orderId) {
                row.remove();
                console.log('Commande supprimée:', orderId);
                updateStatistics();
            }
        });
        // Here you would send delete request to backend
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('mobile-visible');
        sidebarOverlay.classList.remove('active');
    }
});

// Initialize statistics on page load
document.addEventListener('DOMContentLoaded', function() {
    updateStatistics();
});