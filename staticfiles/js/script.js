// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

// Get elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ============================================

const sections = document.querySelectorAll('.section');
const navbarHeight = navbar.offsetHeight;

function highlightNavigation() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ============================================
// FADE IN UP ANIMATIONS
// ============================================

const fadeInElements = document.querySelectorAll('.fade-in-up, .fade-in');

const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger animation by letting CSS animation play
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeInElements.forEach(element => {
    fadeObserver.observe(element);
});

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================

const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-content p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
}

// ============================================
// TYPING EFFECT FOR HERO SUBTITLE (Optional Enhancement)
// ============================================

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Uncomment to enable typing effect
// const heroSubtitle = document.querySelector('.hero-subtitle');
// if (heroSubtitle) {
//     const originalText = heroSubtitle.textContent;
//     typeWriter(heroSubtitle, originalText, 30);
// }

// ============================================
// PERFORMANCE: PRELOAD CRITICAL RESOURCES
// ============================================

// Preconnect to external resources
const preconnect = document.createElement('link');
preconnect.rel = 'preconnect';
preconnect.href = 'https://fonts.googleapis.com';
document.head.appendChild(preconnect);

// ============================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================

// Focus trap for mobile menu
navMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.focus();
    }
});

// Announce page changes to screen readers
function announcePageChange(sectionName) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Navigated to ${sectionName} section`;
    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttle to scroll events for better performance
window.addEventListener('scroll', throttle(() => {
    highlightNavigation();
}, 100));

// ============================================
// BADGE HOVER EFFECT
// ============================================

const badges = document.querySelectorAll('.badge');

badges.forEach(badge => {
    badge.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });

    badge.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// CURSOR EFFECT (Optional Premium Touch)
// ============================================

// Uncomment to enable custom cursor effect
/*
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .card').forEach(elem => {
    elem.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    elem.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});
*/

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initial navigation highlight
    highlightNavigation();

    // Add loaded class to body for any CSS transitions
    document.body.classList.add('loaded');

    // Initialize any other components here
    console.log('Portfolio loaded successfully! 🚀');
});

// ============================================
// PERFORMANCE MONITORING (Optional)
// ============================================

if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    });
}

// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    // Select icons directly using data attributes or classes
    const iconSun = document.querySelector('.theme-icon-light');
    const iconMoon = document.querySelector('.theme-icon-dark');
    const htmlElement = document.documentElement;

    // Check for saved theme preference, default to dark
    const storedTheme = localStorage.getItem('theme') || 'dark';

    // Apply theme on load
    if (storedTheme === 'light') {
        htmlElement.setAttribute('data-theme', 'light');
        if (iconSun) iconSun.style.display = 'none';
        if (iconMoon) iconMoon.style.display = 'block';
    } else {
        htmlElement.removeAttribute('data-theme');
        if (iconSun) iconSun.style.display = 'block'; // Show Sun (switch to light)
        if (iconMoon) iconMoon.style.display = 'none';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');

            if (currentTheme === 'light') {
                // Switch to Dark
                htmlElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                if (iconSun) iconSun.style.display = 'block';
                if (iconMoon) iconMoon.style.display = 'none';
            } else {
                // Switch to Light
                htmlElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                if (iconSun) iconSun.style.display = 'none';
                if (iconMoon) iconMoon.style.display = 'block';
            }
        });
    }

    // ============================================
    // MODAL FUNCTIONALITY
    // ============================================
    const modal = document.getElementById("detailModal");
    const closeBtn = document.querySelector(".close-modal");

    // Check if modal exists before adding listeners
    if (modal) {
        const modalTitle = document.getElementById("modalTitle");
        const modalIcon = document.getElementById("modalIcon");
        const modalDescription = document.getElementById("modalDescription");
        const modalTech = document.getElementById("modalTech");
        const modalLinks = document.getElementById("modalLinks");

        // Open Modal
        document.querySelectorAll('.modal-trigger').forEach(item => {
            item.addEventListener('click', function (e) {
                // Prevent opening if clicking a link inside the card (like the original links)
                if (e.target.tagName === 'A' || e.target.closest('a')) return;

                // Prevent bubbling if the button itself was clicked (redundant but safe)
                e.stopPropagation();

                const title = this.dataset.title;
                const description = this.dataset.description;
                const icon = this.dataset.icon;
                const image = this.dataset.image;
                const tech = this.dataset.tech;
                const link = this.dataset.link;
                const linkText = this.dataset.linkText;

                if (modalTitle) modalTitle.textContent = title || '';

                // Show Image if available, else Icon
                if (modalIcon) {
                    if (image && image !== 'None' && image !== '') {
                        modalIcon.innerHTML = `<img src="${image}" alt="${title}" style="width: 100%; height: 250px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: 1rem;">`;
                        // Remove font-size style if it was set for emoji
                        modalIcon.style.fontSize = '';
                    } else {
                        modalIcon.innerHTML = icon || '';
                        modalIcon.style.fontSize = '2.5rem';
                    }
                }

                if (modalDescription) modalDescription.innerHTML = description || '';

                // Clear previous tech and links
                if (modalTech) modalTech.innerHTML = '';
                if (modalLinks) modalLinks.innerHTML = '';

                // Add Tech Stack
                if (tech && modalTech) {
                    // Check if it's a Django template list representation or comma string
                    // Clean up square brackets if present from Python list str conversion
                    let cleanTech = tech.replace(/[\[\]']/g, "");
                    const techList = cleanTech.split(',').map(t => t.trim());

                    techList.forEach(t => {
                        if (t) {
                            const span = document.createElement('span');
                            span.className = 'badge';
                            span.textContent = t;
                            modalTech.appendChild(span);
                        }
                    });
                }

                // Add Link if exists
                if (link && link !== 'None' && link !== '' && modalLinks) {
                    const a = document.createElement('a');
                    a.href = link;
                    a.target = '_blank';
                    a.className = 'btn btn-primary';
                    a.style.marginTop = '1.5rem';
                    a.innerHTML = `<span>🔗</span> <span>${linkText || 'View Project'}</span>`;
                    modalLinks.appendChild(a);
                }

                modal.style.display = "block";
                document.body.style.overflow = "hidden"; // Prevent background scrolling
            });
        });

        // Close Modal
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            });
        }

        // Close on click outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === "block") {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    }
});
