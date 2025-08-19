// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
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
    alert('Anda akan diarahkan ke aplikasi email. Silakan kirim pesan Anda dari sana.');
});

// Dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.className = 'btn btn-sm btn-outline-secondary position-fixed bottom-0 end-0 m-3';
darkModeToggle.style.zIndex = '1000';
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        document.documentElement.style.setProperty('--primary-color', '#f8f9fa');
        document.documentElement.style.setProperty('--secondary-color', '#dee2e6');
        document.documentElement.style.setProperty('--accent-color', '#0d6efd');
        document.documentElement.style.setProperty('--text-color', '#212529');
        document.documentElement.style.setProperty('--text-secondary', '#6c757d');
        document.documentElement.style.setProperty('--bg-color', '#f8f9fa');
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        document.documentElement.style.setProperty('--primary-color', '#0a192f');
        document.documentElement.style.setProperty('--secondary-color', '#495670');
        document.documentElement.style.setProperty('--accent-color', '#64ffda');
        document.documentElement.style.setProperty('--text-color', '#ccd6f6');
        document.documentElement.style.setProperty('--text-secondary', '#8892b0');
        document.documentElement.style.setProperty('--bg-color', '#0a192f');
        document.documentElement.style.setProperty('--card-bg', '#112240');
    }
});
