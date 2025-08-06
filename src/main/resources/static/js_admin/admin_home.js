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

        element.textContent = isCurrency ? formatCurrency(currentValue) : formatNumber(currentValue);

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

// Fetch all counts first
async function fetchAndAnimateDashboard() {
    try {
        const [computersRes, printersRes, networksRes, commandsRes, contactsRes] = await Promise.all([
            fetch("http://localhost:8080/api/computers"),
            fetch("http://localhost:8080/api/printer"),
            fetch("http://localhost:8080/api/network"),
            fetch("http://localhost:8080/api/command"),
            fetch("http://localhost:8080/api/contact")
        ]);

        if (!commandsRes.ok || !printersRes.ok || !networksRes.ok || !commandsRes.ok || !contactsRes.ok) {
            throw new Error("One or more endpoints failed");
        }

        const [computers, printers, networks, commands, contacts] = await Promise.all([
            computersRes.json(),
            printersRes.json(),
            networksRes.json(),
            commandsRes.json(),
            contactsRes.json()
        ]);

        const computerCount = computers.length;
        const printerCount = printers.length;
        const networkCount = networks.length;
        const commandCount = commands.length;
        const unreadMessages = contacts.filter(c => c.status === "unread").length;

        animateNumber("totalOrdinateurs", computerCount);
        animateNumber("totalImprimantes", printerCount);
        animateNumber("totalReseaux", networkCount);
        animateNumber("totalCommandes", commandCount);
        animateNumber("unreadMessages", unreadMessages);

    } catch (error) {
        console.error("Dashboard load error:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchAndAnimateDashboard();
});
