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

// Credly Badges Integration
async function fetchCredlyBadges() {
    try {
        const username = 'impawangupta';
        
        // Using local badge images from your actual Credly profile
        const credlyBadges = [
            {
                name: "KCSA: Kubernetes and Cloud Native Security Associate",
                issuer: "The Linux Foundation",
                year: "2025",
                category: "kubernetes",
                verified: true,
                image: "assets/badges/kcsa.png",
                expires: "Mar 24, 2027"
            },
            {
                name: "Kubestronaut",
                issuer: "The Linux Foundation",
                year: "2025",
                category: "kubernetes",
                verified: true,
                image: "assets/badges/kubestronaut.png",
                issued: "Mar 23, 2025"
            },
            {
                name: "CKS: Certified Kubernetes Security Specialist",
                issuer: "The Linux Foundation",
                year: "2025",
                category: "kubernetes",
                verified: true,
                image: "assets/badges/cks.png",
                expires: "Mar 3, 2027"
            },
            {
                name: "KCNA: Kubernetes and Cloud Native Associate",
                issuer: "The Linux Foundation",
                year: "2025",
                category: "kubernetes",
                verified: true,
                image: "assets/badges/kcna.png",
                expires: "Jan 5, 2027"
            },
            {
                name: "CKAD: Certified Kubernetes Application Developer",
                issuer: "The Linux Foundation",
                year: "2021",
                category: "kubernetes",
                verified: true,
                image: "assets/badges/ckad.png"
            },
            {
                name: "CKA: Certified Kubernetes Administrator",
                issuer: "The Linux Foundation",
                year: "2021",
                category: "kubernetes",
                verified: true,
                image: "assets/badges/cka.png"
            },
            {
                name: "AWS Certified Solutions Architect - Professional",
                issuer: "Amazon Web Services",
                year: "2019",
                category: "aws",
                verified: true,
                image: "assets/badges/aws-solutions-architect-professional.png"
            },
            {
                name: "AWS Certified Solutions Architect - Associate",
                issuer: "Amazon Web Services",
                year: "2019",
                category: "aws",
                verified: true,
                image: "assets/badges/aws-solutions-architect-associate.png"
            },
            {
                name: "AWS Certified SysOps Administrator - Associate",
                issuer: "Amazon Web Services",
                year: "2019",
                category: "aws",
                verified: true,
                image: "assets/badges/aws-sysops-administrator.png"
            },
            {
                name: "AWS Certified Developer - Associate",
                issuer: "Amazon Web Services",
                year: "2019",
                category: "aws",
                verified: true,
                image: "assets/badges/aws-developer-associate.png"
            },
            {
                name: "Google Cloud Associate Cloud Engineer",
                issuer: "Google Cloud",
                year: "2021",
                category: "gcp",
                verified: true,
                image: "assets/badges/gcp-associate-cloud-engineer.png"
            },
            {
                name: "Sun Certified Java Programmer",
                issuer: "Oracle",
                year: "2005",
                category: "java",
                verified: true,
                image: "assets/badges/java-certification.png"
            }
        ];

        displayCredlyBadges(credlyBadges);
    } catch (error) {
        console.error('Error loading Credly badges:', error);
        displayCredlyError();
    }
}

function displayCredlyBadges(badges) {
    const credlyContainer = document.getElementById('credly-badges');
    
    if (!credlyContainer) return;

    credlyContainer.innerHTML = `
        <div class="credly-badges-grid">
            ${badges.map(badge => `
                <div class="credly-badge" data-category="${badge.category}">
                    <div class="credly-badge-image">
                        <img src="${badge.image}" alt="${badge.name}" loading="lazy">
                    </div>
                    <div class="credly-badge-content">
                        <h4>${badge.name}</h4>
                        <p class="credly-issuer">${badge.issuer}</p>
                        <div class="credly-meta">
                            <span class="credly-year">${badge.year}</span>
                            ${badge.verified ? '<span class="credly-verified"><i class="fas fa-check-circle"></i> Verified</span>' : ''}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="credly-disclaimer">
            <p><i class="fas fa-info-circle"></i> All badges are verified on Credly. Click on any badge or visit my complete <a href="https://www.credly.com/users/impawangupta/badges" target="_blank">Credly profile</a> for verification</p>
        </div>
    `;

    // Add click handlers to badges to open them on Credly
    const badgeElements = credlyContainer.querySelectorAll('.credly-badge');
    badgeElements.forEach(badgeEl => {
        badgeEl.style.cursor = 'pointer';
        badgeEl.addEventListener('click', () => {
            window.open('https://www.credly.com/users/impawangupta/badges', '_blank');
        });
    });
}

function displayCredlyError() {
    const credlyContainer = document.getElementById('credly-badges');
    if (credlyContainer) {
        credlyContainer.innerHTML = `
            <div class="credly-error">
                <p>Unable to load Credly badges. Please visit my <a href="https://www.credly.com/users/impawangupta/badges" target="_blank">Credly profile</a> directly.</p>
            </div>
        `;
    }
}

// GitHub API Integration (Profile Only)
async function fetchGitHubData() {
    const username = 'impawangupta';

    try {
        // Fetch user profile only (no repositories)
        const profileResponse = await fetch(`https://api.github.com/users/${username}`);
        const profileData = await profileResponse.json();

        displayGitHubProfile(profileData);
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
                <p class="profile-bio">${data.bio || 'Principal Cloud Architect & Technology Leader'}</p>
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
                    <i class="fab fa-github"></i> View Profile
                </a>
            </div>
        </div>
    `;
}

function displayGitHubError() {
    const profileContainer = document.getElementById('github-profile');
    profileContainer.innerHTML = '<p>Unable to load GitHub profile data.</p>';
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
                
                // Skip animation for text-based stats like "Multi-Million"
                if (targetValue.includes('Multi-Million') || isNaN(parseFloat(targetValue))) {
                    // Just add a fade-in effect for non-numeric stats
                    target.style.opacity = '0';
                    target.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        target.style.transition = 'all 0.6s ease';
                        target.style.opacity = '1';
                        target.style.transform = 'translateY(0)';
                    }, 100);
                    observer.unobserve(target);
                    return;
                }
                
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

    // Load GitHub data (profile only)
    fetchGitHubData();
    
    // Load Credly badges
    fetchCredlyBadges();
});


// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});
