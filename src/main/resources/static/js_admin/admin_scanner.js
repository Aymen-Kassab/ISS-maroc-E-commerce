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
            'reseaux': 'Réseaux',
            'commandes': 'Commandes',
            'messages': 'Messages'
        };
        
        pageTitle.textContent = pageNames[pageName];
        
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('mobile-visible');
            sidebarOverlay.classList.remove('active');
        }
    });
});*/

// Connectivity toggle functionality
function toggleConnectivity(element) {
    const checkbox = element.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
    element.classList.toggle('checked', checkbox.checked);
}

// Image Upload Functionality
const imageUploadSection = document.getElementById('imageUploadSection');
const scannerImages = document.getElementById('scannerImages');
const imagePreview = document.getElementById('imagePreview');
let selectedFiles = [];

// Drag and Drop functionality
imageUploadSection.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.classList.add('dragover');
});

imageUploadSection.addEventListener('dragleave', function(e) {
    e.preventDefault();
    this.classList.remove('dragover');
});

imageUploadSection.addEventListener('drop', function(e) {
    e.preventDefault();
    this.classList.remove('dragover');
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
});

// File input change
scannerImages.addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    handleFiles(files);
});

// Handle file selection
function handleFiles(files) {
    files.forEach(file => {
        if (file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
            selectedFiles.push(file);
            displayImagePreview(file);
        } else {
            alert('Veuillez sélectionner des images valides (max 5MB)');
        }
    });
}

// Display image preview
function displayImagePreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        previewItem.innerHTML = `
            <img src="${e.target.result}" alt="Preview" class="preview-image">
            <button type="button" class="remove-image" onclick="removeImage(this, '${file.name}')">
                <i class="fas fa-times"></i>
            </button>
        `;
        imagePreview.appendChild(previewItem);
    };
    reader.readAsDataURL(file);
}

// Remove image
function removeImage(button, fileName) {
    button.parentElement.remove();
    selectedFiles = selectedFiles.filter(file => file.name !== fileName);
}

// Form submission
document.getElementById('addScannerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Create FormData object
    const formData = new FormData();
    
    // Add form fields
    formData.append('scannerName', document.getElementById('scannerName').value);
    formData.append('brand', document.getElementById('brand').value);
    formData.append('printSpeed', document.getElementById('printSpeed').value);
    formData.append('printResolution', document.getElementById('printResolution').value);
    formData.append('monthlyDutyCycle', document.getElementById('monthlyDutyCycle').value);
    formData.append('duplexPrinting', document.getElementById('duplexPrinting').value);
    formData.append('price', document.getElementById('price').value);
    formData.append('stockQuantity', document.getElementById('stockQuantity').value);
    
    // Add connectivity options
    const connectivityOptions = [];
    document.querySelectorAll('input[name="connectivity[]"]:checked').forEach(checkbox => {
        connectivityOptions.push(checkbox.value);
    });
    formData.append('connectivity', JSON.stringify(connectivityOptions));
    
    // Add images
    selectedFiles.forEach((file, index) => {
        formData.append(`scannerImages[${index}]`, file);
    });
    
    // Here you would send the formData to your backend
    console.log('Scanner data ready for backend:', formData);
    
    // Show success message
    alert('Scanner ajouté avec succès! (Connectez votre backend pour sauvegarder)');
    
    // Reset form
    resetForm();
});

// Reset form
function resetForm() {
    document.getElementById('addScannerForm').reset();
    imagePreview.innerHTML = '';
    selectedFiles = [];
    
    // Reset connectivity checkboxes
    document.querySelectorAll('.connectivity-item').forEach(item => {
        item.classList.remove('checked');
        item.querySelector('input[type="checkbox"]').checked = false;
    });
}

// Search functionality
const searchInput = document.getElementById('searchInput');
const brandFilter = document.getElementById('brandFilter');
const stockFilter = document.getElementById('stockFilter');
const connectivityFilter = document.getElementById('connectivityFilter');

function filterScanners() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedBrand = brandFilter.value;
    const selectedStock = stockFilter.value;
    const selectedConnectivity = connectivityFilter.value;
    const scannerCards = document.querySelectorAll('.scanner-card');

    scannerCards.forEach(card => {
        const name = card.querySelector('.scanner-name').textContent.toLowerCase();
        const brand = card.dataset.brand;
        const stock = card.dataset.stock;
        const resolution = card.querySelector('.spec-item:nth-child(2) span').textContent.toLowerCase();
        const connectivityBadges = Array.from(card.querySelectorAll('.connectivity-badge')).map(badge => badge.textContent);

        const matchesSearch = name.includes(searchTerm) || 
                            brand.toLowerCase().includes(searchTerm) || 
                            resolution.includes(searchTerm);
        const matchesBrand = !selectedBrand || brand === selectedBrand;
        const matchesStock = !selectedStock || stock === selectedStock;
        const matchesConnectivity = !selectedConnectivity || connectivityBadges.includes(selectedConnectivity);

        if (matchesSearch && matchesBrand && matchesStock && matchesConnectivity) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

searchInput.addEventListener('input', filterScanners);
brandFilter.addEventListener('change', filterScanners);
stockFilter.addEventListener('change', filterScanners);
connectivityFilter.addEventListener('change', filterScanners);

// Edit Scanner function
function editScanner(button) {
    const scannerCard = button.closest('.scanner-card');
    const scannerName = scannerCard.querySelector('.scanner-name').textContent;
    
    // Here you would populate the form with existing data or open an edit modal
    console.log('Éditer Scanner:', scannerName);
    alert('Fonction d\'édition à implémenter avec votre backend');
}

// Delete Scanner function
function deleteScanner(button) {
    const scannerCard = button.closest('.scanner-card');
    const scannerName = scannerCard.querySelector('.scanner-name').textContent;
    
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${scannerName}" ?`)) {
        scannerCard.remove();
        // Here you would send delete request to backend
        console.log('Scanner supprimé:', scannerName);
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('mobile-visible');
        sidebarOverlay.classList.remove('active');
    }
});