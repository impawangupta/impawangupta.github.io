// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-links a');

// Blog Posts Metadata (add new posts here)
const blogPosts = [
    {
        id: 1,
        title: "AI-Driven Cloud Architecture: Lessons from the Trenches",
        excerpt: "How we integrated AI tools into our development lifecycle and achieved 30% productivity gains while reducing debugging time by 45%.",
        category: "AI & Cloud",
        date: "2025-01-15",
        icon: "fas fa-robot",
        slug: "ai-driven-cloud-architecture",
        readTime: "8 min read",
        tags: ["AI", "Cloud Architecture", "DevOps", "Productivity"]
    },
    {
        id: 2,
        title: "Kubernetes Cost Optimization: $560K in Savings",
        excerpt: "Strategic approaches to system topology optimization that led to significant cost reductions across our enterprise infrastructure.",
        category: "DevOps",
        date: "2024-12-20",
        icon: "fas fa-dharmachakra",
        slug: "kubernetes-cost-optimization",
        readTime: "6 min read",
        tags: ["Kubernetes", "Cost Optimization", "Infrastructure", "Enterprise"]
    },
    {
        id: 3,
        title: "Building Resilient Kafka Architectures at Scale",
        excerpt: "Design patterns and best practices for implementing enterprise messaging backbone with Apache Kafka for high availability.",
        category: "Architecture",
        date: "2024-11-30",
        icon: "fas fa-stream",
        slug: "resilient-kafka-architectures",
        readTime: "10 min read",
        tags: ["Apache Kafka", "Microservices", "System Design", "Scalability"]
    }
];

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
    const animateElements = document.querySelectorAll('.project-card, .timeline-item, .cert-category, .skill-category, .blog-post');
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
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

// Enhanced Blog Posts Display
function displayBlogPosts() {
    const blogContainer = document.getElementById('blog-posts');

    if (blogPosts.length === 0) {
        blogContainer.innerHTML = `
            <div class="blog-empty">
                <i class="fas fa-pen-alt"></i>
                <h3>Technical Insights Coming Soon</h3>
                <p>I'm preparing detailed articles on cloud architecture, AI integration, Kubernetes optimization, and enterprise transformation. Stay tuned!</p>
            </div>
        `;
        return;
    }

    blogContainer.innerHTML = blogPosts.map(post => `
        <article class="blog-post">
            <div class="blog-post-image">
                <i class="${post.icon}"></i>
            </div>
            <div class="blog-post-content">
                <div class="blog-post-meta">
                    <div class="blog-post-date">
                        <i class="fas fa-calendar"></i>
                        ${formatDate(post.date)}
                    </div>
                    <span class="blog-post-category">${post.category}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="blog-post-footer">
                    <div class="blog-post-tags">
                        ${post.tags.slice(0, 2).map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="blog-post-read-time">
                        <i class="fas fa-clock"></i> ${post.readTime}
                    </div>
                </div>
                <a href="#" class="blog-post-link" onclick="openBlogPost('${post.slug}')">
                    Read Full Article <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `).join('');
}

// Load and Display Individual Blog Post
async function openBlogPost(slug) {
    try {
        showBlogModal();
        const response = await fetch(`blog/posts/${slug}.md`);

        if (!response.ok) {
            throw new Error('Blog post not found');
        }

        const markdown = await response.text();
        const post = blogPosts.find(p => p.slug === slug);

        displayBlogPostContent(markdown, post);
    } catch (error) {
        console.error('Error loading blog post:', error);
        displayBlogError(slug);
    }
}

// Show Blog Modal
function showBlogModal() {
    const modal = document.getElementById('blog-modal') || createBlogModal();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Create Blog Modal
function createBlogModal() {
    const modal = document.createElement('div');
    modal.id = 'blog-modal';
    modal.className = 'blog-modal';
    modal.innerHTML = `
        <div class="blog-modal-content">
            <div class="blog-modal-header">
                <button class="blog-modal-close" onclick="closeBlogModal()">&times;</button>
            </div>
            <div class="blog-modal-body" id="blog-modal-body">
                <div class="loading">Loading article...</div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBlogModal();
        }
    });

    return modal;
}

// Close Blog Modal
function closeBlogModal() {
    const modal = document.getElementById('blog-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Display Blog Post Content
function displayBlogPostContent(markdown, post) {
    const modalBody = document.getElementById('blog-modal-body');

    // Parse frontmatter if present
    const { content, frontmatter } = parseMarkdownWithFrontmatter(markdown);

    // Convert markdown to HTML
    const htmlContent = marked.parse(content);

    modalBody.innerHTML = `
        <article class="blog-article">
            <header class="blog-article-header">
                <div class="blog-article-meta">
                    <span class="blog-article-category">${post.category}</span>
                    <span class="blog-article-date">${formatDate(post.date)}</span>
                    <span class="blog-article-read-time">
                        <i class="fas fa-clock"></i> ${post.readTime}
                    </span>
                </div>
                <h1>${frontmatter.title || post.title}</h1>
                <div class="blog-article-tags">
                    ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                </div>
            </header>
            <div class="blog-article-content">
                ${htmlContent}
            </div>
            <footer class="blog-article-footer">
                <div class="blog-article-author">
                    <div class="author-info">
                        <strong>Pawan Gupta</strong>
                        <span>Principal Cloud Architect</span>
                    </div>
                </div>
                <div class="blog-article-share">
                    <a href="https://www.linkedin.com/in/impawangupta/" target="_blank" class="share-link">
                        <i class="fab fa-linkedin"></i> Connect on LinkedIn
                    </a>
                </div>
            </footer>
        </article>
    `;
}

// Parse Markdown with Frontmatter
function parseMarkdownWithFrontmatter(markdown) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);

    if (match) {
        const frontmatter = {};
        const frontmatterText = match[1];
        const content = match[2];

        // Simple frontmatter parsing
        frontmatterText.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length) {
                frontmatter[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
            }
        });

        return { frontmatter, content };
    }

    return { frontmatter: {}, content: markdown };
}

// Display Blog Error
function displayBlogError(slug) {
    const modalBody = document.getElementById('blog-modal-body');
    modalBody.innerHTML = `
        <div class="blog-error">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Article Coming Soon</h3>
            <p>This technical article is currently being written. Check back soon for insights on ${slug.replace(/-/g, ' ')}!</p>
            <button class="btn btn-primary" onclick="closeBlogModal()">
                <i class="fas fa-arrow-left"></i> Back to Blog
            </button>
        </div>
    `;
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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

    // Load GitHub data (profile only)
    fetchGitHubData();

    // Load blog posts
    displayBlogPosts();
});

// Handle ESC key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeBlogModal();
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});
