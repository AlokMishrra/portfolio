// Cursor Animation
const cursor = document.querySelector(".cursor");
const cursor2 = document.querySelector(".cursor2");
document.addEventListener("mousemove", (e) => {
    cursor.style.cssText = cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
});

// Typing Animation
const initTypingAnimation = () => {
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = [
        "Full Stack Developer",
        "Web Designer",
        "UI/UX Developer",
        "Problem Solver"
    ];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    document.addEventListener("DOMContentLoaded", function() {
        if(textArray.length) setTimeout(type, newTextDelay + 250);
    });
};

// Initialize all sections
const initSections = () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'none';
    });
};

// Initialize AOS with proper settings
const initAOS = () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50
    });
};

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
    // Ensure sections are visible
    initSections();
    
    // Initialize animations and effects
    initTypingAnimation();
    initAOS();

    // Handle navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});

// Add fade-in animation to elements
const addFadeInAnimation = () => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        element.style.opacity = '1';
    });
};

// Call fade-in animation after page load
window.addEventListener('load', () => {
    addFadeInAnimation();
});

// Scroll Progress Bar
const updateScrollProgress = () => {
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        document.documentElement.style.setProperty('--scroll', scrolled + '%');
    });
};

// Navigation Scroll Effect
const handleNavScroll = () => {
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
};

// Section Visibility
const handleSectionVisibility = () => {
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        threshold: 0.3,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                updateActiveNavLink(entry.target.id);
            }
        });
    }, options);

    sections.forEach(section => observer.observe(section));
};

// Update Active Navigation Link
const updateActiveNavLink = (sectionId) => {
    const navLinks = document.querySelectorAll('.navItems a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === sectionId) {
            link.classList.add('active');
        }
    });
};

// Smooth Scroll
const initSmoothScroll = () => {
    const navLinks = document.querySelectorAll('.navItems a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
};

// Floating Shapes Animation
const animateShapes = () => {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        shape.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`;
    });
};

// Parallax Effect
const initParallax = () => {
    window.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const moveX = (x * 50 * speed);
            const moveY = (y * 50 * speed);
            shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
};

// Futuristic Logo Animation
const initLogoAnimation = () => {
    const logoText = document.querySelector('.logo-text');
    logoText.setAttribute('data-text', logoText.textContent);
};

// Mobile Menu Toggle
const initMobileMenu = () => {
    const menuBtn = document.querySelector('.menu-btn');
    const navItems = document.querySelector('.navItems');
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navItems.classList.toggle('active');
    });
};

// Glitch Effect
const addGlitchEffect = () => {
    const nav = document.querySelector('nav');
    
    setInterval(() => {
        nav.style.transform = `translateX(${Math.random() * 2 - 1}px)`;
        setTimeout(() => {
            nav.style.transform = 'translateX(0)';
        }, 50);
    }, 3000);
};

// Nav Links Hover Effect
const initNavHoverEffect = () => {
    const navLinks = document.querySelectorAll('.navItems li a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseover', (e) => {
            const letters = link.textContent.split('');
            link.textContent = '';
            letters.forEach((letter, i) => {
                const span = document.createElement('span');
                span.textContent = letter;
                span.style.animationDelay = `${i * 50}ms`;
                span.style.display = 'inline-block';
                span.style.animation = 'navLinkHover 0.5s ease forwards';
                link.appendChild(span);
            });
        });

        link.addEventListener('mouseout', (e) => {
            link.textContent = link.textContent;
        });
    });
};

// Header Scroll Effect
const initHeaderScroll = () => {
    const nav = document.querySelector('nav');
    let lastScroll = 0;
    let scrollTimer = null;
    const scrollThreshold = 100; // Minimum scroll before hiding
    const scrollDelay = 150; // Delay before showing header after scroll stops

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Clear the timeout on scroll
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }

        // Add scrolled class when page is scrolled
        if (currentScroll > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }

        // Only hide header after scrolling past threshold
        if (currentScroll > scrollThreshold) {
            // Scrolling down
            if (currentScroll > lastScroll) {
                nav.classList.add('nav-hidden');
                nav.classList.remove('nav-visible');
            }
            // Scrolling up
            else {
                nav.classList.remove('nav-hidden');
                nav.classList.add('nav-visible');
            }
        }

        lastScroll = currentScroll;

        // Set timeout to show header when scrolling stops
        scrollTimer = setTimeout(() => {
            nav.classList.remove('nav-hidden');
            nav.classList.add('nav-visible');
        }, scrollDelay);
    });

    // Show header when mouse moves to top of screen
    document.addEventListener('mousemove', (e) => {
        if (e.clientY <= 60) {
            nav.classList.remove('nav-hidden');
            nav.classList.add('nav-visible');
        }
    });
};

// Apple-style Zoom Effect
const initZoomEffects = () => {
    const zoomElements = document.querySelectorAll('[data-zoom]');
    let lastScrollTop = 0;
    let ticking = false;

    const lerp = (start, end, factor) => {
        return start + (end - start) * factor;
    };

    const updateZoom = (scrollTop) => {
        zoomElements.forEach(element => {
            const section = element.closest('.zoom-section');
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            const viewportHeight = window.innerHeight;

            // Calculate progress (0 to 1) based on section visibility
            const progress = Math.max(0, Math.min(1, 
                1 - (sectionTop / (viewportHeight - sectionHeight * 0.5))
            ));

            // Get zoom factor from data attribute (reduced by half)
            const zoomFactor = parseFloat(element.dataset.zoom) * 0.5 || 0.1;

            // Calculate scale based on progress (reduced scale effect)
            const scale = lerp(1, 1 + zoomFactor * 0.5, progress);
            const translateZ = lerp(0, 50 * zoomFactor, progress);

            // Apply transform with smooth easing
            element.style.transform = `translateZ(${translateZ}px) scale(${scale})`;
        });

        ticking = false;
    };

    const requestZoomUpdate = (scrollTop) => {
        if (!ticking) {
            requestAnimationFrame(() => updateZoom(scrollTop));
            ticking = true;
        }
    };

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        requestZoomUpdate(scrollTop);
        lastScrollTop = scrollTop;
    }, { passive: true });

    // Initial update
    updateZoom(window.pageYOffset);
};

// Parallax Background Effect
const initParallaxBackgrounds = () => {
    const backgrounds = document.querySelectorAll('.zoom-background');
    let ticking = false;

    const updateBackgrounds = () => {
        backgrounds.forEach(bg => {
            const section = bg.closest('.zoom-section');
            const rect = section.getBoundingClientRect();
            const progress = -rect.top / (window.innerHeight * 0.5);
            
            // Parallax effect
            const scale = 2 + progress * 0.5;
            const blur = Math.min(10, Math.abs(progress * 5));
            
            bg.style.transform = `translateZ(-10px) scale(${scale})`;
            bg.style.filter = `blur(${blur}px)`;
        });

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateBackgrounds);
            ticking = true;
        }
    }, { passive: true });

    // Initial update
    updateBackgrounds();
};

// Initialize Skill Cards with reduced effects
const initSkillCards = () => {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        // Initialize progress bars
        const progress = card.querySelector('.progress');
        const skillLevel = card.dataset.skill;
        
        // Animate progress bar when card becomes visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        progress.style.width = `${skillLevel}%`;
                    }, 200);
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(card);

        // Add subtle hover effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Reduced rotation angles
            const rotateX = (y - centerY) / 20; // Reduced from /10
            const rotateY = (centerX - x) / 20; // Reduced from /10

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(5px)
            `;
        });

        // Reset card position on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
            card.style.transition = 'transform 0.5s ease';
        });
    });
};

// Add floating animation to skill icons with reduced movement
const initSkillIconAnimation = () => {
    const icons = document.querySelectorAll('.skill-icon');
    
    icons.forEach(icon => {
        const random = Math.random() * 0.3 + 0.3; // Reduced range (0.3 to 0.6)
        icon.style.animation = `floatIcon ${random}s ease-in-out infinite alternate`;
    });
};

// Add this keyframe animation to your existing animations
const addSkillAnimations = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatIcon {
            0% {
                transform: translateY(0);
            }
            100% {
                transform: translateY(-10px);
            }
        }

        @keyframes glowPulse {
            0%, 100% {
                filter: drop-shadow(0 0 5px var(--accent-primary));
            }
            50% {
                filter: drop-shadow(0 0 15px var(--accent-primary));
            }
        }
    `;
    document.head.appendChild(style);
};

// Enhanced Progress Bar Animation
const progressBars = document.querySelectorAll('.progress');
const animateProgress = () => {
    progressBars.forEach(progress => {
        const width = progress.style.width;
        progress.style.width = '0';
        setTimeout(() => {
            progress.style.width = width;
        }, 100);
    });
};

// Enhanced Intersection Observer for skills section
const skillsSection = document.querySelector('.skills-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgress();
            entry.target.querySelectorAll('.skill-card').forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = 'translateY(0)';
                    card.style.opacity = '1';
                }, index * 200);
            });
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    observer.observe(skillsSection);
    // Initialize skill cards
    skillsSection.querySelectorAll('.skill-card').forEach(card => {
        card.style.transform = 'translateY(50px)';
        card.style.opacity = '0';
        card.style.transition = 'all 0.6s ease-out';
    });
}

// Parallax effect for splash image
window.addEventListener('mousemove', (e) => {
    const splash = document.querySelector('#splash');
    if (splash) {
        const speed = 5;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        splash.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
});

// Contact Form Handling
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = 'Sending...';
        
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            submitButton.innerHTML = 'Message Sent!';
            form.reset();
            setTimeout(() => {
                submitButton.innerHTML = originalText;
            }, 3000);
        })
        .catch(error => {
            submitButton.innerHTML = 'Error!';
            console.error('Error:', error);
            setTimeout(() => {
                submitButton.innerHTML = originalText;
            }, 3000);
        });
    });
}

// Animate contact cards on scroll
const contactCards = document.querySelectorAll('.contact-card');
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }, index * 200);
        }
    });
}, { threshold: 0.5 });

contactCards.forEach(card => {
    card.style.transform = 'translateY(50px)';
    card.style.opacity = '0';
    card.style.transition = 'all 0.6s ease-out';
    contactObserver.observe(card);
});

// Input focus animations
const inputGroups = document.querySelectorAll('.input-group');
inputGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const span = group.querySelector('span');
    
    // Add floating label animation
    input.addEventListener('focus', () => {
        span.style.transform = 'translateY(-20px)';
        span.style.color = '#00feba';
    });
    
    input.addEventListener('blur', () => {
        if (input.value === '') {
            span.style.transform = 'translateY(0)';
            span.style.color = '#555';
        }
    });
});

// Add new keyframe animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkHover {
        0% {
            transform: translateY(0);
            color: var(--text-secondary);
        }
        50% {
            transform: translateY(-5px);
            color: var(--accent-primary);
        }
        100% {
            transform: translateY(0);
            color: var(--text-primary);
        }
    }
`;
document.head.appendChild(style);

// Header Animation
let lastScrollTop = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add sticky class when scrolling down
    if (scrollTop > 50) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
    
    lastScrollTop = scrollTop;
});
