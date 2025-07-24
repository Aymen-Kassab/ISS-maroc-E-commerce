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

// Image Upload Functionality
const imageUploadSection = document.getElementById('imageUploadSection');
const equipmentImages = document.getElementById('equipmentImages');
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
equipmentImages.addEventListener('change', function(e) {
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
document.getElementById('addNetworkForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Create FormData object
    const formData = new FormData();
    
    // Add form fields
    formData.append('equipmentName', document.getElementById('equipmentName').value);
    formData.append('brand', document.getElementById('brand').value);
    formData.append('model', document.getElementById('model').value);
    formData.append('equipmentType', document.getElementById('equipmentType').value);
    formData.append('ports', document.getElementById('ports').value);
    formData.append('speed', document.getElementById('speed').value);
    formData.append('management', document.getElementById('management').value);
    formData.append('price', document.getElementById('price').value);
    formData.append('stockQuantity', document.getElementById('stockQuantity').value);
    formData.append('description', document.getElementById('description').value);
    
    // Add images
    selectedFiles.forEach((file, index) => {
        formData.append(`equipmentImages[${index}]`, file);
    });
    
    // Here you would send the formData to your backend
    console.log('Network equipment data ready for backend:', formData);
    
    // Show success message
    alert('Équipement réseau ajouté avec succès! (Connectez votre backend pour sauvegarder)');
    
    // Reset form
    resetForm();
});

// Reset form
function resetForm() {
    document.getElementById('addNetworkForm').reset();
    imagePreview.innerHTML = '';
    selectedFiles = [];
}

// Search functionality
const searchInput = document.getElementById('searchInput');
const brandFilter = document.getElementById('brandFilter');
const typeFilter = document.getElementById('typeFilter');
const stockFilter = document.getElementById('stockFilter');

function filterNetworkEquipment() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedBrand = brandFilter.value;
    const selectedType = typeFilter.value;
    const selectedStock = stockFilter.value;
    const networkCards = document.querySelectorAll('.network-card');

    networkCards.forEach(card => {
        const name = card.querySelector('.network-name').textContent.toLowerCase();
        const brand = card.dataset.brand;
        const type = card.dataset.type;
        const stock = card.dataset.stock;
        const model = card.querySelector('.spec-item span').textContent.toLowerCase();

        const matchesSearch = name.includes(searchTerm) || 
                            brand.toLowerCase().includes(searchTerm) || 
                            model.includes(searchTerm);
        const matchesBrand = !selectedBrand || brand === selectedBrand;
        const matchesType = !selectedType || type === selectedType;
        const matchesStock = !selectedStock || stock === selectedStock;

        if (matchesSearch && matchesBrand && matchesType && matchesStock) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

searchInput.addEventListener('input', filterNetworkEquipment);
brandFilter.addEventListener('change', filterNetworkEquipment);
typeFilter.addEventListener('change', filterNetworkEquipment);
stockFilter.addEventListener('change', filterNetworkEquipment);

// Edit Network Equipment function
function editNetwork(button) {
    const networkCard = button.closest('.network-card');
    const networkName = networkCard.querySelector('.network-name').textContent;
    
    // Here you would populate the form with existing data or open an edit modal
    console.log('Éditer équipement réseau:', networkName);
    alert('Fonction d\'édition à implémenter avec votre backend');
}


// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('mobile-visible');
        sidebarOverlay.classList.remove('active');
    }
})