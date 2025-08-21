// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Adjust for navbar height

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');

            // Close mobile navbar after clicking
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');

            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.pageYOffset;

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Show/hide scroll to top button
    const scrollToTop = document.getElementById('scrollToTop');
    if (scrollPosition > 300) {
        scrollToTop.classList.add('visible');
    } else {
        scrollToTop.classList.remove('visible');
    }

    // Animate elements on scroll
    animateOnScroll();
});

// Scroll to top functionality
document.getElementById('scrollToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = 'fawwazayq@gmail.com';
    const subject = encodeURIComponent('Pesan dari CV Website');
    const body = encodeURIComponent(
        `Nama: ${this.elements[0].value}\n` +
        `Email: ${this.elements[1].value}\n\n` +
        `Pesan:\n${this.elements[2].value}`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    this.reset();

    // Show success message
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';

    setTimeout(() => {
        submitBtn.textContent = originalText;
    }, 2000);
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved theme preference or respect OS preference
if (localStorage.getItem('theme') === 'light' ||
    (window.matchMedia('(prefers-color-scheme: light)').matches && !localStorage.getItem('theme'))) {
    body.classList.add('light-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener('click', function() {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// Image gallery modal functionality
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');
const prevButton = document.getElementById('prevImage');
const nextButton = document.getElementById('nextImage');

// Get all gallery images
const galleryItems = document.querySelectorAll('.gallery-item img');
const profileImage = document.getElementById('profileImage');
let currentImageIndex = 0;
let images = [];

// Add profile image and gallery images to the images array
function initImages() {
    images = [
        { src: profileImage.src, alt: profileImage.alt }
    ];

    galleryItems.forEach(item => {
        images.push({
            src: item.getAttribute('data-full') || item.src,
            alt: item.alt
        });
    });
}

// Open modal with clicked image
function openModal(index) {
    currentImageIndex = index;
    modalImage.src = images[index].src;
    modalImage.alt = images[index].alt;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling

    // Preload next and previous images for smoother navigation
    const nextIndex = (index + 1) % images.length;
    const prevIndex = (index - 1 + images.length) % images.length;

    const nextImage = new Image();
    nextImage.src = images[nextIndex].src;

    const prevImage = new Image();
    prevImage.src = images[prevIndex].src;
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Enable scrolling
}

// Navigate to next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    modalImage.src = images[currentImageIndex].src;
    modalImage.alt = images[currentImageIndex].alt;
}

// Navigate to previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    modalImage.src = images[currentImageIndex].src;
    modalImage.alt = images[currentImageIndex].alt;
}

// Initialize image gallery
initImages();

// Add event listeners for image gallery
profileImage.addEventListener('click', () => openModal(0));

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openModal(index + 1));
});

modalClose.addEventListener('click', closeModal);
prevButton.addEventListener('click', prevImage);
nextButton.addEventListener('click', nextImage);

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }

    // Navigate with arrow keys
    if (modal.classList.contains('active')) {
        if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    }
});

// Animate elements on scroll
function animateOnScroll() {
    const experienceItems = document.querySelectorAll('.experience-item');
    const homeContent = document.querySelector('.home-content');
    const progressBars = document.querySelectorAll('.progress-bar');
    const windowHeight = window.innerHeight;

    // Animate home content
    if (homeContent && homeContent.getBoundingClientRect().top < windowHeight * 0.75) {
        homeContent.classList.add('visible');
    }

    // Animate experience items
    experienceItems.forEach(item => {
        if (item.getBoundingClientRect().top < windowHeight * 0.75) {
            item.classList.add('visible');
        }
    });

    // Animate progress bars
    progressBars.forEach(bar => {
        const barContainer = bar.parentElement;
        if (barContainer.getBoundingClientRect().top < windowHeight * 0.85 && !bar.hasAttribute('data-animated')) {
            const targetWidth = bar.getAttribute('data-width') || bar.style.width;
            bar.setAttribute('data-width', targetWidth);
            bar.style.width = '0';

            // Use requestAnimationFrame for smoother animation
            let start = null;
            const duration = 1500; // 1.5 seconds

            function animateProgress(timestamp) {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                bar.style.width = progress * parseInt(targetWidth) + '%';

                if (progress < 1) {
                    requestAnimationFrame(animateProgress);
                } else {
                    bar.setAttribute('data-animated', 'true');
                }
            }

            requestAnimationFrame(animateProgress);
        }
    });
}

// Initialize animations on page load
window.addEventListener('load', () => {
    // Set initial width for progress bars and store it
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const width = bar.style.width;
        bar.setAttribute('data-width', width);
        bar.style.width = '0';
    });

    animateOnScroll();

    // Add animation to sidebar and main content
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelectorAll('.main-content');

    if (sidebar) {
        sidebar.style.transform = 'translateY(20px)';
        sidebar.style.opacity = '0';
    }

    mainContent.forEach(content => {
        content.style.transform = 'translateY(20px)';
        content.style.opacity = '0';
    });

    setTimeout(() => {
        if (sidebar) {
            sidebar.style.transform = 'translateY(0)';
            sidebar.style.opacity = '1';
        }

        mainContent.forEach((content, index) => {
            setTimeout(() => {
                content.style.transform = 'translateY(0)';
                content.style.opacity = '1';
            }, index * 100);
        });
    }, 100);
});

// Download CV button functionality
document.getElementById('downloadCV').addEventListener('click', function(e) {
    e.preventDefault();

    // Create a simple PDF download simulation
    const button = this;
    const originalText = button.textContent;

    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
    button.disabled = true;

    setTimeout(() => {
        // In a real scenario, this would download an actual PDF
        alert('Fitur download CV akan segera tersedia!');
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
});

// Handle image loading errors
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'https://placehold.co/200x200/64ffda/0a192f?text=Image+Not+Found';
        this.alt = 'Gambar tidak ditemukan';
    });
});

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[title]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
