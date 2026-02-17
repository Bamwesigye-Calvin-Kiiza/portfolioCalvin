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

    // Check for saved theme preference, default to light
    const storedTheme = localStorage.getItem('theme') || 'light';

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

// ============================================
// PARTICLE NETWORK BACKGROUND
// ============================================

const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    // Mouse position
    const mouse = {
        x: null,
        y: null,
        radius: 150 // Interaction radius
    };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    // Clear mouse position when leaving window
    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });


    // Particle Class
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
            this.baseX = x;
            this.baseY = y;
            this.density = (Math.random() * 30) + 1;
        }

        // Method to draw individual particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        // Method to check particle position, check mouse position, move the particle, draw the particle
        update() {
            // Check if particle is still within canvas
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // Mouse Interaction (Displacement)
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius + this.size) {
                // Calculate direction away from mouse
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;

                // Max distance, past that the force is 0
                const maxDistance = mouse.radius;

                // Convert (0...maxDistance) range into (1...0).
                // Close is stronger.
                const force = (maxDistance - distance) / maxDistance;

                // DirectionX/Y is random seed, density is mass
                // Push away
                const directionX = forceDirectionX * force * this.density;
                const directionY = forceDirectionY * force * this.density;

                if (mouse.x !== undefined) {
                    this.x -= directionX;
                    this.y -= directionY;
                }
            } else {
                // Return to original speed/direction logic if desired,
                // or just drift. Here we just drift.
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 10; // Return slowly
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 10;
                }
            }

            // Move particle
            this.x += this.directionX;
            this.y += this.directionY;

            // Draw particle
            this.draw();
        }
    }

    // Create particle array
    function initParticles() {
        particlesArray = [];
        // Number of particles based on screen area
        let numberOfParticles = (canvas.height * canvas.width) / 9000;

        // Adjust for mobile
        if (window.innerWidth < 768) {
            numberOfParticles = (canvas.height * canvas.width) / 15000;
        }

        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 2) - 1; // Speed
            let directionY = (Math.random() * 2) - 1;

            // Theme checking for color
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            let color = isLight ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 0.5)'; // Dark/Light

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Connect particles with lines
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                    + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

                // Threshold for connection
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);

                    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
                    let strokeColor = isLight ? `rgba(99, 102, 241, ${opacityValue})` : `rgba(255, 255, 255, ${opacityValue})`;

                    ctx.strokeStyle = strokeColor;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    // Check for theme changes to update particle color
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
                initParticles(); // Re-init to change colors
            }
        });
    });
    observer.observe(document.documentElement, {
        attributes: true //configure it to listen to attribute changes
    });


    initParticles();
    animate();
}
