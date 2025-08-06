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

// Image Upload Functionality
const imageUploadSection = document.getElementById('imageUploadSection');
const pcImages = document.getElementById('pcImages');
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
pcImages.addEventListener('change', function(e) {
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
document.getElementById('addPcForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Create FormData object
    const formData = new FormData();
    
    // Add form fields
    formData.append('pcName', document.getElementById('pcName').value);
    formData.append('brand', document.getElementById('brand').value);
    formData.append('pcType', document.getElementById('pcType').value);
    formData.append('processor', document.getElementById('processor').value);
    formData.append('ram', document.getElementById('ram').value);
    formData.append('stockage', document.getElementById('stockage').value);
    formData.append('price', document.getElementById('price').value);
    formData.append('stockQuantity', document.getElementById('stockQuantity').value);
    
    // Add images
    selectedFiles.forEach((file, index) => {
        formData.append(`pcImages[${index}]`, file);
    });
    
    // Here you would send the formData to your backend
    console.log('PC data ready for backend:', formData);
    
    // Show success message
    alert('Ordinateur ajouté avec succès! (Connectez votre backend pour sauvegarder)');
    
    // Reset form
    resetForm();
});

// Reset form
function resetForm() {
    document.getElementById('addPcForm').reset();
    imagePreview.innerHTML = '';
    selectedFiles = [];
}

// Search functionality
const searchInput = document.getElementById('searchInput');
const brandFilter = document.getElementById('brandFilter');
const stockFilter = document.getElementById('stockFilter');
const typeFilter = document.getElementById('typeFilter');
const stockRangeFilter = document.getElementById('stockRangeFilter');

function filterPCs() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedBrand = brandFilter.value;
    const selectedStock = stockFilter.value;
    const selectedType = typeFilter.value;
    const selectedStockRange = document.getElementById('stockRangeFilter').value;
    const pcCards = document.querySelectorAll('.pc-card');

    pcCards.forEach(card => {
        const name = card.querySelector('.pc-name').textContent.toLowerCase();
        const brand = card.dataset.brand;
        const stock = card.dataset.stock;
        const processor = card.querySelector('.spec-item span').textContent.toLowerCase();
        const pcType = card.querySelector('.spec-item:nth-child(2) span').textContent;
        const stockQuantity = parseInt(card.querySelector('.spec-item:last-child span').textContent.match(/\d+/)[0]);
        let matchesStockRange = true;

        const matchesSearch = name.includes(searchTerm) || 
                            brand.toLowerCase().includes(searchTerm) || 
                            processor.includes(searchTerm);
        const matchesBrand = !selectedBrand || brand === selectedBrand;
        const matchesStock = !selectedStock || stock === selectedStock;
        const matchesType = !selectedType || pcType.includes(selectedType);

        if (selectedStockRange === 'high') matchesStockRange = stockQuantity > 10;
        else if (selectedStockRange === 'medium') matchesStockRange = stockQuantity >= 5 && stockQuantity <= 10;
        else if (selectedStockRange === 'low') matchesStockRange = stockQuantity >= 1 && stockQuantity <= 4;
        else if (selectedStockRange === 'empty') matchesStockRange = stockQuantity === 0;

        if (matchesSearch && matchesBrand && matchesStock && matchesType && matchesStockRange) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

searchInput.addEventListener('input', filterPCs);
brandFilter.addEventListener('change', filterPCs);
stockFilter.addEventListener('change', filterPCs);
typeFilter.addEventListener('change', filterPCs);
stockRangeFilter.addEventListener('change', filterPCs);

// Edit PC function
function editPc(button) {
    const pcCard = button.closest('.pc-card');
    const pcName = pcCard.querySelector('.pc-name').textContent;
    
    // Here you would populate the form with existing data or open an edit modal
    console.log('Éditer PC:', pcName);
    alert('Fonction d\'édition à implémenter avec votre backend');
}

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('mobile-visible');
        sidebarOverlay.classList.remove('active');
    }
});