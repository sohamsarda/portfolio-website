// DOM Elements
const darkModeToggle = document.getElementById('darkModeToggle');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

// Dark Mode Toggle
function initDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkModeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        darkModeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', !isDark);
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <button class="close-menu">
            <i class="fas fa-times"></i>
        </button>
        ${Array.from(navLinks).map(link => `
            <a href="${link.getAttribute('href')}">${link.textContent}</a>
        `).join('')}
    `;
    document.body.appendChild(mobileMenu);

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    mobileMenu.querySelector('.close-menu').addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling
function initSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Scroll Animations
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

// // Form Submission
// function initContactForm() {
//     const form = document.getElementById('contact-form');
    
//     form.addEventListener('submit', async (e) => {
//         e.preventDefault();
        
//         const formData = {
//             name: form.name.value,
//             email: form.email.value,
//             message: form.message.value
//         };

//         try {
//             // Replace with your EmailJS configuration
//             emailjs.init("YOUR_USER_ID");
//             await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData);
            
//             alert('Message sent successfully!');
//             form.reset();
//         } catch (error) {
//             console.error('Error sending message:', error);
//             alert('Failed to send message. Please try again later.');
//         }
//     });
// }

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    //initContactForm();
}); 