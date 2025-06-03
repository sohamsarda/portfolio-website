// DOM Elements
const darkModeToggle = document.getElementById('darkModeToggle');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  dot.style.left = `${mouseX}px`;
  dot.style.top = `${mouseY}px`;
});

function animateCursor() {
  outlineX += (mouseX - outlineX) * 0.100;
  outlineY += (mouseY - outlineY) * 0.100;

  outline.style.left = `${outlineX}px`;
  outline.style.top = `${outlineY}px`;

  requestAnimationFrame(animateCursor);
}

animateCursor();

// Dark Mode Toggle
function initDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkModeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'light');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('darkMode', 'false');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('darkMode', 'true');
        }
    });
}

// Mobile Menu Initialization
function initMobileMenu() {
    // Create mobile menu container
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <button class="close-menu" aria-label="Close menu">
            <i class="fas fa-times"></i>
        </button>
        ${Array.from(navLinks).map(link => `
            <a href="${link.getAttribute('href')}">${link.textContent}</a>
        `).join('')}
    `;
    document.body.appendChild(mobileMenu);

    // Open mobile menu on button click
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    // Close mobile menu on close button click
    mobileMenu.querySelector('.close-menu').addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // Close mobile menu on link click (for better UX)
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling for nav links
function initSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;

            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Dynamic Page Title on Visibility Change
const originalTitle = document.title;
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '👋 Come back soon!';
    } else {
        document.title = originalTitle;
    }
});

// Scroll Animations (Fade In Sections)
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// Uncomment and configure this to enable EmailJS form submission
/*
function initContactForm() {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', async e => {
        e.preventDefault();

        const formData = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        };

        try {
            emailjs.init("YOUR_USER_ID");
            await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData);

            alert('Message sent successfully!');
            form.reset();
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again later.');
        }
    });
}
*/

// Initialize all functionality after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    // initContactForm(); // Uncomment to activate form handling
});
