// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
    hamburger.innerHTML = navList.classList.contains('active') ?
        '<i class="fas fa-times"></i>' :
        '<i class="fas fa-bars"></i>';
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Close mobile menu if open
        if (navList.classList.contains('active')) {
            navList.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Price Calculation
const serviceSelect = document.getElementById('service');
const quantityInput = document.getElementById('quantity');
const serviceNameEl = document.getElementById('service-name');
const quantityDisplayEl = document.getElementById('quantity-display');
const addonsDisplayEl = document.getElementById('addons-display');
const totalPriceEl = document.getElementById('total-price');
const addonCheckboxes = document.querySelectorAll('.addon-option input[type="checkbox"]');

const PRICES = {
    basic: 5000,
    standard: 10000,
    premium: 40000
};

const ADDON_PRICES = {
    'color-grading': 10000,
    'background-remove': 3000,
    'face-retouch': 12000,
    'urgent': 20000
};

function calculatePrice() {
    const service = serviceSelect.value;
    const quantity = parseInt(quantityInput.value) || 0;

    if (!service || quantity < 1) return;

    // Calculate base price
    let total = PRICES[service] * quantity;
    let addons = [];
    let addonTotal = 0;

    // Calculate addons
    addonCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const addonId = checkbox.id;
            const addonPrice = ADDON_PRICES[addonId];
            const addonLabel = checkbox.nextElementSibling.textContent;

            // Urgent is a fixed price, others are per photo
            const addonCost = addonId === 'urgent' ? addonPrice : addonPrice * quantity;

            addons.push(addonLabel);
            addonTotal += addonCost;
        }
    });

    total += addonTotal;

    // Update display
    serviceNameEl.textContent = serviceSelect.options[serviceSelect.selectedIndex].text;
    quantityDisplayEl.textContent = quantity;
    addonsDisplayEl.textContent = addons.length > 0 ? addons.join(', ') : '-';
    totalPriceEl.textContent = total.toLocaleString('id-ID');
}

// Event listeners
serviceSelect.addEventListener('change', calculatePrice);
quantityInput.addEventListener('input', calculatePrice);
addonCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', calculatePrice);
});

// Initial calculation
calculatePrice();

// Form Submission
document.getElementById('photoOrderForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const service = serviceSelect.value;
    const quantity = parseInt(quantityInput.value);

    if (!service || quantity < 1) {
        alert('Harap pilih layanan dan masukkan jumlah foto yang valid!');
        return;
    }

    // Calculate final price
    let total = PRICES[service] * quantity;
    let addons = [];

    addonCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const addonId = checkbox.id;
            const addonPrice = ADDON_PRICES[addonId];
            total += addonId === 'urgent' ? addonPrice : addonPrice * quantity;
            addons.push(checkbox.nextElementSibling.textContent);
        }
    });

    // Prepare order data
    const orderData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        service,
        quantity,
        addons,
        totalPrice: total,
        description: document.getElementById('description').value,
        date: new Date().toISOString()
    };

    console.log('Data Pesanan:', orderData);
    alert(`Pesanan berhasil dikirim!\nTotal harga: Rp ${total.toLocaleString('id-ID')}\nSilakan upload file foto Anda melalui link MEGA yang telah disediakan.\nKami akan menghubungi Anda via email setelah file diterima.`);

    // Reset form
    this.reset();
    calculatePrice();
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate form
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    if (!name || !email || !message) {
        alert('Harap lengkapi semua field yang wajib diisi!');
        return;
    }

    // Save data (in real implementation, send to server)
    const contactData = {
        name,
        email,
        message,
        date: new Date().toISOString()
    };

    console.log('Data Kontak:', contactData);

    // Show confirmation
    alert('Pesan Anda telah terkirim!\nKami akan menghubungi Anda secepatnya.');

    // Reset form
    this.reset();
});

// Lightbox Gallery
const portfolioItems = document.querySelectorAll('.portfolio-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
const portfolioImages = Array.from(portfolioItems).map(item => ({
    src: item.querySelector('img').src,
    alt: item.querySelector('img').alt,
    caption: item.querySelector('.portfolio-overlay p').textContent
}));

// Open lightbox
portfolioItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        updateLightbox();
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close when clicking outside image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Navigation
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigate(-1);
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigate(1);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            navigate(-1);
        } else if (e.key === 'ArrowRight') {
            navigate(1);
        } else if (e.key === 'Escape') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});

// Swipe for mobile
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        navigate(1); // Swipe left
    } else if (touchEndX > touchStartX + 50) {
        navigate(-1); // Swipe right
    }
}

function navigate(direction) {
    currentIndex = (currentIndex + direction + portfolioImages.length) % portfolioImages.length;
    updateLightbox();
}

function updateLightbox() {
    const { src, alt, caption } = portfolioImages[currentIndex];
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightboxCaption.textContent = caption;

    // Preload next and previous images for smoother transitions
    const nextIndex = (currentIndex + 1) % portfolioImages.length;
    const prevIndex = (currentIndex - 1 + portfolioImages.length) % portfolioImages.length;

    const nextImg = new Image();
    nextImg.src = portfolioImages[nextIndex].src;

    const prevImg = new Image();
    prevImg.src = portfolioImages[prevIndex].src;
}

// Scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');

    // Initialize Intersection Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Header blur effect
        if (currentScroll > 100) {
            header.classList.add('scrolled');
            document.body.classList.add('scrolled');

            // Hide header when scrolling down
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('scrolled');
            document.body.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Hero scale effect on scroll
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        if (scrollValue < 500) {
            const scale = 1 + scrollValue / 2000;
            hero.style.transform = `scale(${Math.min(scale, 1.05)})`;
        }
    });
});