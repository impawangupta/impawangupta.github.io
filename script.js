// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-links a');

// Scroll Progress Indicator
function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        indicator.style.width = scrollPercent + '%';
    });
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Navigation Toggle
function setupMobileNavigation() {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile nav when clicking a link
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinkItems.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    navLinkItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.project-card, .timeline-item, .cert-category, .skill-category');
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// GitHub API Integration
async function fetchGitHubData() {
    const username = 'impawangupta';

    try {
        // Fetch user profile
        const profileResponse = await fetch(`https://api.github.com/users/${username}`);
        const profileData = await profileResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        const reposData = await reposResponse.json();

        displayGitHubProfile(profileData);
        displayGitHubRepos(reposData);
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        displayGitHubError();
    }
}

function displayGitHubProfile(data) {
    const profileContainer = document.getElementById('github-profile');
    profileContainer.innerHTML = `
        <div class="github-profile">
            <div class="profile-avatar">
                <img src="${data.avatar_url}" alt="${data.name}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">
            </div>
            <div class="profile-info">
                <h3>${data.name || data.login}</h3>
                <p class="profile-bio">${data.bio || 'Principal Cloud Architect'}</p>
                <div class="profile-stats">
                    <div class="stat">
                        <strong>${data.public_repos}</strong>
                        <span>Repositories</span>
                    </div>
                    <div class="stat">
                        <strong>${data.followers}</strong>
                        <span>Followers</span>
                    </div>
                    <div class="stat">
                        <strong>${data.following}</strong>
                        <span>Following</span>
                    </div>
                </div>
                <a href="${data.html_url}" target="_blank" class="github-link">
                    <i class="fab fa-github"></i> View on GitHub
                </a>
            </div>
        </div>
    `;
}

function displayGitHubRepos(repos) {
    const reposContainer = document.getElementById('github-repos');
    reposContainer.innerHTML = `
        <h3>Recent Repositories</h3>
        <div class="repos-list">
            ${repos.slice(0, 4).map(repo => `
                <div class="repo-item">
                    <div class="repo-header">
                        <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
                        <span class="repo-language">${repo.language || 'N/A'}</span>
                    </div>
                    <p class="repo-description">${repo.description || 'No description available'}</p>
                    <div class="repo-stats">
                        <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                        <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                        <span class="repo-updated">Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function displayGitHubError() {
    const profileContainer = document.getElementById('github-profile');
    const reposContainer = document.getElementById('github-repos');

    profileContainer.innerHTML = '<p>Unable to load GitHub profile data.</p>';
    reposContainer.innerHTML = '<p>Unable to load repository data.</p>';
}

// Dynamic Typing Effect for Hero Title
function setupTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = 'Pawan Gupta';
        let index = 0;

        // Clear initial text
        typingText.textContent = '';

        function typeWriter() {
            if (index < text.length) {
                typingText.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 150);
            }
        }

        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
}

// Skill Tags Hover Effect
function setupSkillTagEffects() {
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Project Card Tilt Effect
function setupProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });
}

// Counter Animation for Stats
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = target.textContent;
                const isMonetary = targetValue.includes('$');
                const numericValue = parseFloat(targetValue.replace(/[$M+]/g, ''));

                animateValue(target, 0, numericValue, 2000, isMonetary);
                observer.unobserve(target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

function animateValue(element, start, end, duration, isMonetary = false) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = start + (end - start) * easeOutQuart(progress);

        if (isMonetary) {
            element.textContent = `$${current.toFixed(1)}M+`;
        } else if (end >= 10) {
            element.textContent = `${Math.floor(current)}+`;
        } else {
            element.textContent = Math.floor(current);
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createScrollIndicator();
    handleNavbarScroll();
    setupMobileNavigation();
    updateActiveNavLink();
    setupSmoothScrolling();
    setupScrollAnimations();
    setupTypingEffect();
    setupSkillTagEffects();
    setupProjectCardEffects();
    animateCounters();

    // Load GitHub data
    fetchGitHubData();
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Add some additional CSS for GitHub profile styling
const additionalCSS = `
    .github-profile {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .profile-info h3 {
        margin-bottom: 0.5rem;
    }

    .profile-bio {
        color: var(--text-light);
        margin-bottom: 1rem;
        font-size: 0.9rem;
    }

    .profile-stats {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .profile-stats .stat {
        text-align: center;
    }

    .profile-stats .stat strong {
        display: block;
        font-size: 1.2rem;
        color: var(--primary-color);
    }

    .profile-stats .stat span {
        font-size: 0.8rem;
        color: var(--text-light);
    }

    .github-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s ease;
    }

    .github-link:hover {
        color: var(--primary-dark);
    }

    .repos-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .repo-item {
        padding: 1rem;
        border: 1px solid var(--border-light);
        border-radius: 0.5rem;
        transition: all 0.3s ease;
    }

    .repo-item:hover {
        border-color: var(--primary-color);
        transform: translateY(-2px);
    }

    .repo-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .repo-header h4 {
        margin: 0;
    }

    .repo-header a {
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 600;
    }

    .repo-header a:hover {
        text-decoration: underline;
    }

    .repo-language {
        background: var(--bg-light);
        color: var(--primary-color);
        padding: 0.25rem 0.5rem;
        border-radius: 1rem;
        font-size: 0.75rem;
        font-weight: 500;
    }

    .repo-description {
        color: var(--text-light);
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }

    .repo-stats {
        display: flex;
        gap: 1rem;
        font-size: 0.8rem;
        color: var(--text-light);
    }

    .repo-stats i {
        margin-right: 0.25rem;
    }

    .repo-updated {
        margin-left: auto;
    }

    @media (max-width: 768px) {
        .github-profile {
            flex-direction: column;
            text-align: center;
        }

        .profile-stats {
            justify-content: center;
        }
    }
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);
