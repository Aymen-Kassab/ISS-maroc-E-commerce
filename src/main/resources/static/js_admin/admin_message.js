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
            'messages': 'Gestion des Messages'
        };
        
        pageTitle.textContent = pageNames[pageName];
        
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('mobile-visible');
            sidebarOverlay.classList.remove('active');
        }
    });
});*/

// Search functionality
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const priorityFilter = document.getElementById('priorityFilter');
const dateFilter = document.getElementById('dateFilter');

function filterMessages() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedStatus = statusFilter.value;
    const selectedPriority = priorityFilter.value;
    const selectedDate = dateFilter.value;
    const messageCards = document.querySelectorAll('.message-card');

    messageCards.forEach(card => {
        const clientName = card.querySelector('.client-name').textContent.toLowerCase();
        const email = card.querySelector('.contact-item span').textContent.toLowerCase();
        const subject = card.querySelector('.message-subject').textContent.toLowerCase();
        const messageText = card.querySelector('.message-text').textContent.toLowerCase();
        const status = card.dataset.status;
        const priority = card.dataset.priority;

        const matchesSearch = clientName.includes(searchTerm) || 
                            email.includes(searchTerm) || 
                            subject.includes(searchTerm) ||
                            messageText.includes(searchTerm);
        const matchesStatus = !selectedStatus || status === selectedStatus;
        const matchesPriority = !selectedPriority || priority === selectedPriority;

        if (matchesSearch && matchesStatus && matchesPriority) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

searchInput.addEventListener('input', filterMessages);
statusFilter.addEventListener('change', filterMessages);
priorityFilter.addEventListener('change', filterMessages);
dateFilter.addEventListener('change', filterMessages);

// Message Actions
function replyMessage(messageId) {
    console.log('Répondre au message:', messageId);
    alert(`Ouverture de l'interface de réponse pour le message ${messageId}`);
    // Here you would open a reply modal or navigate to reply page
}

function markAsRead(messageId) {
    console.log('Marquer comme lu:', messageId);
    
    // Find the message card and update its status
    const messageCards = document.querySelectorAll('.message-card');
    messageCards.forEach(card => {
        const actions = card.querySelector('.message-actions');
        if (actions && actions.innerHTML.includes(messageId)) {
            card.classList.remove('unread');
            card.classList.add('read');
            card.dataset.status = 'read';
            
            const statusBadge = card.querySelector('.status-badge');
            statusBadge.textContent = 'Lu';
            statusBadge.className = 'status-badge read';
            
            // Remove the mark as read button
            const markReadBtn = actions.querySelector('.mark-read');
            if (markReadBtn) {
                markReadBtn.remove();
            }
        }
    });
    
    updateStatistics();
    alert(`Message ${messageId} marqué comme lu`);
}

function archiveMessage(messageId) {
    console.log('Archiver le message:', messageId);
    
    // Find the message card and update its status
    const messageCards = document.querySelectorAll('.message-card');
    messageCards.forEach(card => {
        const actions = card.querySelector('.message-actions');
        if (actions && actions.innerHTML.includes(messageId)) {
            card.classList.remove('unread', 'read', 'replied');
            card.classList.add('archived');
            card.dataset.status = 'archived';
            
            const statusBadge = card.querySelector('.status-badge');
            statusBadge.textContent = 'Archivé';
            statusBadge.className = 'status-badge archived';
            
            // Update action buttons
            actions.innerHTML = `
                <button class="action-btn delete" onclick="deleteMessage('${messageId}')">
                    <i class="fas fa-trash"></i> Supprimer
                </button>
            `;
        }
    });
    
    updateStatistics();
    alert(`Message ${messageId} archivé`);
}

function deleteMessage(messageId) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ce message ?`)) {
        // Find and remove the message card
        const messageCards = document.querySelectorAll('.message-card');
        messageCards.forEach(card => {
            const actions = card.querySelector('.message-actions');
            if (actions && actions.innerHTML.includes(messageId)) {
                card.remove();
                console.log('Message supprimé:', messageId);
                updateStatistics();
            }
        });
        // Here you would send delete request to backend
    }
}

// Update Statistics
function updateStatistics() {
    const messageCards = document.querySelectorAll('.message-card');
    const stats = {
        new: 0,
        read: 0,
        replied: 0,
        archived: 0
    };
    
    messageCards.forEach(card => {
        const status = card.dataset.status;
        if (stats.hasOwnProperty(status)) {
            stats[status]++;
        }
    });
    
    // Update stat cards
    document.querySelector('.stat-card:nth-child(1) .stat-number').textContent = stats.new;
    document.querySelector('.stat-card:nth-child(2) .stat-number').textContent = stats.read;
    document.querySelector('.stat-card:nth-child(3) .stat-number').textContent = stats.replied;
    document.querySelector('.stat-card:nth-child(4) .stat-number').textContent = stats.archived;
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