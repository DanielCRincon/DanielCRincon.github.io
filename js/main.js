/**
 * Main JavaScript - CV Portfolio
 * Handles animations, timeline, navigation, and interactions
 */

// Wait for both DOM and translations to be ready
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initParticles();

    // Wait for translations to load, then initialize content
    waitForTranslations().then(() => {
        initTypingEffect();
        initTimeline();
        initProjects();
        initScrollAnimations();
    });
});

// Wait for i18n translations to be loaded
function waitForTranslations() {
    return new Promise((resolve) => {
        const checkTranslations = () => {
            if (window.i18n && window.i18n.getCurrentTranslations()) {
                resolve();
            } else {
                setTimeout(checkTranslations, 100);
            }
        };
        // Start checking after a small delay
        setTimeout(checkTranslations, 200);
    });
}

// Listen for language changes
window.addEventListener('languageChanged', () => {
    initTimeline();
    initProjects();
    initTypingEffect();
});

/**
 * Navigation
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle) navToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = navbar ? navbar.offsetHeight : 70;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
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
}

/**
 * Typing Effect for Hero
 */
function initTypingEffect() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;

    const translations = window.i18n?.getCurrentTranslations();
    const titles = translations?.hero?.titles || [
        'SAP ABAP Consultant',
        'Full Stack Developer',
        'Scrum Master',
        'Software Engineer'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typedElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    typedElement.textContent = '';
    charIndex = 0;
    titleIndex = 0;
    isDeleting = false;
    type();
}

/**
 * Timeline
 */
function initTimeline() {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;

    const translations = window.i18n?.getCurrentTranslations();
    const jobs = translations?.experience?.jobs || [];

    console.log('Loading timeline with', jobs.length, 'jobs');

    timeline.innerHTML = '';

    jobs.forEach((job, index) => {
        const item = createTimelineItem(job, index);
        timeline.appendChild(item);
    });

    observeTimelineItems();
}

function createTimelineItem(job, index) {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.style.transitionDelay = `${index * 0.1}s`;

    const descriptionList = job.description.map(desc => `<li>${desc}</li>`).join('');
    const tagsList = job.tags.map(tag => `<span class="timeline-tag">${tag}</span>`).join('');

    item.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-card" onclick="this.classList.toggle('expanded')">
            <div class="timeline-date">${job.date}</div>
            <h3 class="timeline-title">${job.title}</h3>
            <p class="timeline-company">${job.company} | ${job.location}</p>
            <div class="timeline-description">
                <ul>${descriptionList}</ul>
            </div>
            <div class="timeline-tags">${tagsList}</div>
        </div>
    `;

    return item;
}

function observeTimelineItems() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
}

/**
 * Projects
 */
function initProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    const translations = window.i18n?.getCurrentTranslations();
    const projects = translations?.projects?.items || [];

    console.log('Loading projects:', projects.length, 'items');

    projectsGrid.innerHTML = '';

    if (projects.length === 0) {
        projectsGrid.innerHTML = '<p style="color: var(--color-text-secondary);">Loading projects...</p>';
        return;
    }

    projects.forEach((project, index) => {
        const card = createProjectCard(project, index);
        projectsGrid.appendChild(card);
    });

    // Re-observe for scroll animations
    initScrollAnimations();
}

function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.style.transitionDelay = `${index * 0.1}s`;

    const links = [];
    if (project.github) {
        links.push(`<a href="${project.github}" target="_blank" rel="noopener" aria-label="GitHub"><i class="fab fa-github"></i></a>`);
    }
    if (project.website) {
        links.push(`<a href="${project.website}" target="_blank" rel="noopener" aria-label="Website"><i class="fas fa-external-link-alt"></i></a>`);
    }

    const tagsList = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');

    card.innerHTML = `
        <div class="project-header">
            <i class="fas ${project.icon} project-icon"></i>
            <div class="project-links">
                ${links.join('')}
            </div>
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tags">${tagsList}</div>
    `;

    return card;
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .skill-category, .education-card, .cert-item, .project-card').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Particles Background
 */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(100, 255, 218, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0.5; }
        25% { transform: translateY(-20px) translateX(10px); opacity: 1; }
        50% { transform: translateY(-10px) translateX(-10px); opacity: 0.7; }
        75% { transform: translateY(-30px) translateX(5px); opacity: 0.9; }
    }
`;
document.head.appendChild(style);
