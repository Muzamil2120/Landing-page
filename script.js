// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const progressBar = document.getElementById('progressBar');
const backToTop = document.getElementById('backToTop');
const demoModal = document.getElementById('demoModal');
const openDemo = document.getElementById('openDemo');
const openDemoSecondary = document.getElementById('openDemoSecondary');
const closeDemo = document.getElementById('closeDemo');
const yearEl = document.getElementById('year');
const newsletterForm = document.getElementById('newsletterForm');
const greeting = document.getElementById('greeting');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }

    if (backToTop) {
        backToTop.classList.toggle('show', window.scrollY > 400);
    }
});

// Animate stats on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = element.dataset.target.includes('.') 
            ? value.toFixed(1) 
            : value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseFloat(stat.dataset.target);
                animateValue(stat, 0, target, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add subtle parallax effect to hero image
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
window.addEventListener('scroll', () => {
    if (prefersReducedMotion.matches) return;
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Reveal elements on scroll
const revealElements = document.querySelectorAll('.feature-card, .testimonial-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});

// Theme toggle with persistence
const setTheme = (isDark) => {
    document.body.classList.toggle('dark', isDark);
    if (themeToggle) {
        themeToggle.innerHTML = isDark
            ? '<i class="fas fa-sun" aria-hidden="true"></i>'
            : '<i class="fas fa-moon" aria-hidden="true"></i>';
    }
    localStorage.setItem('cloudsync-theme', isDark ? 'dark' : 'light');
};

if (themeToggle) {
    const savedTheme = localStorage.getItem('cloudsync-theme');
    if (savedTheme) {
        setTheme(savedTheme === 'dark');
    }
    themeToggle.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('dark');
        setTheme(isDark);
    });
}

// Back to top
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Demo modal
const openModal = () => {
    if (demoModal) {
        demoModal.classList.add('active');
        demoModal.setAttribute('aria-hidden', 'false');
    }
};

const closeModal = () => {
    if (demoModal) {
        demoModal.classList.remove('active');
        demoModal.setAttribute('aria-hidden', 'true');
    }
};

if (openDemo) {
    openDemo.addEventListener('click', openModal);
}

if (openDemoSecondary) {
    openDemoSecondary.addEventListener('click', openModal);
}

if (closeDemo) {
    closeDemo.addEventListener('click', closeModal);
}

if (demoModal) {
    demoModal.addEventListener('click', (event) => {
        if (event.target === demoModal) {
            closeModal();
        }
    });
}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
    const button = item.querySelector('.faq-question');
    button.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Newsletter form
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        newsletterForm.reset();
        alert('Thanks for subscribing!');
    });
}

// Update year
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Greeting message
if (greeting) {
    const hour = new Date().getHours();
    const message = hour < 12
        ? 'Good morning! Ready to sync your day?'
        : hour < 18
            ? 'Good afternoon! Let’s keep everything in sync.'
            : 'Good evening! Your files are always ready.';
    greeting.textContent = message;
}