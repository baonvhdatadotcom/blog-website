// Unified Animation Script for The Blog

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initBlogCardHover();
    initProjectCardHover();
    initScrollAnimations();
    initReadingProgress();
    initParallax();
    initImageZoom();
    initDarkModeToggle();
    initSmoothScroll();
    initLoadingAnimation();
    initBlogFilter();
    initProjectFilter();
    
    // Initialize skill animations if on about page
    if (document.querySelectorAll('.skill-card').length > 0) {
        initSkillAnimations();
    }
    
    // Initialize profile card animation if on about page
    if (document.querySelector('.profile-image') || document.querySelector('.profile-card')) {
        initProfileCardAnimation();
    }
    
    // Initialize text reveal animations if section titles exist
    if (document.querySelectorAll('.section-title').length > 0) {
        initTextRevealAnimations();
    }
    
    // Initialize content section animations
    if (document.querySelectorAll('.content-section').length > 0) {
        initContentSectionAnimations();
    }
    
    // Initialize footer link animations
    if (document.querySelectorAll('.footer-link').length > 0) {
        initFooterLinkAnimations();
    }
    
    // Initialize cursor follow effect
    initCursorFollowEffect();
});

// Blog Card Hover Effects
function initBlogCardHover() {
    const blogCards = document.querySelectorAll('.blog-card, .blog-post-card, .other-post, .newsletter-card, .feature-card');
    if (!blogCards.length) return;

    blogCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
            card.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
    });
}

// Project Card Hover Effects
function initProjectCardHover() {
    const projectCards = document.querySelectorAll('.project-card');
    if (!projectCards.length) return;

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
            card.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.blog-section, .blog-card, .project-section, .project-card, .content-section, .blog-post-card, .other-post, .main-content, .container-wrapper');
    if (!scrollElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate child elements if they exist
                const children = entry.target.querySelectorAll('.subheading, .page-title, .section-text, .form-group, .button, .heading-2, .row-wrapper, .blog-post-card');
                
                children.forEach((child, index) => {
                    // Reset animation state
                    child.classList.remove('animate');
                    
                    // Add animation with delay
                    setTimeout(() => {
                        child.classList.add('animate');
                    }, index * 400);
                });
            }
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
}

// Reading Progress Bar
function initReadingProgress() {
    // Check if we're on a blog post page
    const articleContent = document.querySelector('.article-content');
    if (!articleContent) return;
    
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: #3D24F9;
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    if (!parallaxElements.length) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Image Zoom Effect
function initImageZoom() {
    const images = document.querySelectorAll('.blog-image, .project-image, .article-image img');
    if (!images.length) return;

    images.forEach(image => {
        image.addEventListener('click', () => {
            image.classList.toggle('zoomed');
        });
    });
}

// Notification System
function createNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'info' ? 'rgba(61, 36, 249, 0.1)' : 'rgba(255, 0, 0, 0.1)'};
        color: ${type === 'info' ? '#3D24F9' : '#ff4444'};
        border-radius: 8px;
        border: 1px solid ${type === 'info' ? '#3D24F9' : '#ff4444'};
        font-size: 14px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    document.body.appendChild(notification);

    // Animate out and remove
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Dark Mode Toggle
function initDarkModeToggle() {
    const toggleBtn = document.querySelector('.mode-btn, .toggle-mode');
    if (!toggleBtn) return;

    // Check for saved theme preference or use default
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('light-mode', currentTheme === 'light');
    document.body.classList.toggle('dark-mode', currentTheme === 'dark');

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        document.body.classList.toggle('dark-mode');
        
        // Save preference
        const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
        
        // Animate sun/moon icons if they exist
        const sunIcon = toggleBtn.querySelector('.sun-icon');
        const moonIcon = toggleBtn.querySelector('.moon-icon');
        
        if (sunIcon && moonIcon) {
            sunIcon.style.transform = document.body.classList.contains('dark-mode') 
                ? 'rotate(180deg) scale(0)' 
                : 'rotate(0) scale(1)';
                
            moonIcon.style.transform = document.body.classList.contains('dark-mode') 
                ? 'rotate(0) scale(1)' 
                : 'rotate(-180deg) scale(0)';
        }
        
        // Show notification
        const isDarkMode = document.body.classList.contains('dark-mode');
        createNotification(`Đã chuyển sang chế độ ${isDarkMode ? 'tối' : 'sáng'}`, 'info');
    });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Skill Animations for About Page
function initSkillAnimations() {
    const skillCards = document.querySelectorAll('.skill-card');
    if (!skillCards.length) return;
    
    skillCards.forEach(card => {
        // Hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        // Progress bar animation
        const progressBar = card.querySelector('.progress-bar');
        if (progressBar) {
            const skill = card.dataset.skill;
            
            // Set initial width to 0
            progressBar.style.width = '0%';
            
            // Animate progress bar on scroll
            const skillObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            progressBar.style.width = getSkillLevel(skill) + '%';
                        }, 300);
                        skillObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            skillObserver.observe(card);
        }
    });
}

// Get skill level based on skill name
function getSkillLevel(skill) {
    const levels = {
        'HTML': 90,
        'CSS': 85,
        'JavaScript': 80,
        'React': 75,
        'Vue.js': 70,
        'Node.js': 65,
        'UI/UX': 85
    };
    return levels[skill] || 0;
}

// Profile Card Animation
function initProfileCardAnimation() {
    const profileImage = document.querySelector('.profile-image');
    const profileCard = document.querySelector('.profile-card');
    const element = profileImage || profileCard;
    
    if (!element) return;
    
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
    
    // Parallax effect for profile image
    if (profileImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            profileImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        });
    }
}

// Text Reveal Animation
function initTextRevealAnimations() {
    // Text Reveal Animation with Slower Speed
    const textReveal = (element) => {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 100); // Slower speed for better readability
    };

    // Animate section titles with text reveal
    document.querySelectorAll('.section-title').forEach(title => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    textReveal(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(title);
    });
}

// Content Section Animations
function initContentSectionAnimations() {
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(section);
    });
}

// Footer Link Animations
function initFooterLinkAnimations() {
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px)';
            link.style.color = '#a78bfa';
            link.style.transition = 'all 0.3s ease';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
            link.style.color = 'var(--white-color)';
        });
    });
}

// Cursor Follow Effect
function initCursorFollowEffect() {
    // Only create if it doesn't exist yet
    if (!document.querySelector('.custom-cursor')) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: rgba(61, 36, 249, 0.3);
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9999;
            transition: transform 0.1s ease, width 0.3s ease, height 0.3s ease, background-color 0.3s ease;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Expand cursor on clickable elements
        document.querySelectorAll('a, button, .blog-card, .project-card, .skill-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.backgroundColor = 'rgba(61, 36, 249, 0.2)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'rgba(61, 36, 249, 0.3)';
            });
        });
    }
}

// Loading Animation
function initLoadingAnimation() {
    // Only create if it doesn't exist yet
    if (!document.querySelector('.loading-overlay')) {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;

        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        spinner.style.cssText = `
            width: 50px;
            height: 50px;
            border: 5px solid #3D24F9;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        `;

        // Add keyframes for spinner
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        loadingOverlay.appendChild(spinner);
        document.body.appendChild(loadingOverlay);

        // Show loading when navigating
        document.querySelectorAll('a').forEach(link => {
            if (link.href && !link.href.startsWith('#') && !link.href.includes('javascript:')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    loadingOverlay.style.opacity = '1';
                    loadingOverlay.style.pointerEvents = 'auto';
                    setTimeout(() => {
                        window.location.href = link.href;
                    }, 500);
                });
            }
        });
    }
}

// Blog Category Filter
function initBlogFilter() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const blogCards = document.querySelectorAll('.blog-card');
    if (!filterButtons.length || !blogCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            blogCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Project Filter Animation
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');
    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}