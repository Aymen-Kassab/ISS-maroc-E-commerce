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
const imageUploadArea = document.getElementById('imageUploadArea');
const newsImages = document.getElementById('newsImages');
let selectedFiles = [];

// Drag and Drop functionality
imageUploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.classList.add('dragover');
});

imageUploadArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    this.classList.remove('dragover');
});

imageUploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    this.classList.remove('dragover');
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
});

// File input change
newsImages.addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    handleFiles(files);
});

// Handle file selection
function handleFiles(files) {
    files.forEach(file => {
        if (file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) {
            selectedFiles.push(file);
            console.log('Image ajoutée:', file.name);
        } else {
            alert('Veuillez sélectionner des images valides (max 10MB)');
        }
    });
    
    // Update UI to show selected files count
    if (selectedFiles.length > 0) {
        const uploadContent = document.querySelector('.upload-content h3');
        uploadContent.textContent = `${selectedFiles.length} image(s) sélectionnée(s)`;
    }
}

// Upload images function
function uploadImages() {
    if (selectedFiles.length === 0) {
        alert('Veuillez sélectionner au moins une image');
        return;
    }

    const selectedType = document.querySelector('input[name="imageType"]:checked').value;
    
    // Create FormData object
    const formData = new FormData();
    formData.append('imageType', selectedType);
    
    selectedFiles.forEach((file, index) => {
        formData.append(`newsImages[${index}]`, file);
    });
    
    // Here you would send to your backend
    console.log('Uploading images:', {
        type: selectedType,
        count: selectedFiles.length,
        formData: formData
    });
    
    // Show success message
    const typeNames = {
        'ordinateurs': 'Ordinateurs',
        'imprimantes': 'Imprimantes',
        'reseaux': 'Réseaux',
        'promotion': 'Promotion',
        'solde': 'Solde',
        'banniere': 'Bannière'
    };
    
    alert(`${selectedFiles.length} image(s) de type "${typeNames[selectedType]}" ajoutée(s) avec succès!`);
    
    // Reset
    clearAll();
}

// Clear all function
function clearAll() {
    selectedFiles = [];
    newsImages.value = '';
    document.querySelector('.upload-content h3').textContent = 'Glissez-déposez vos images ici';
}

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('mobile-visible');
        sidebarOverlay.classList.remove('active');
    }
});