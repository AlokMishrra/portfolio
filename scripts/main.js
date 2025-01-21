// Contact Form Handler
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    // Save to CSV (you'll need to implement server-side handling)
    try {
        const response = await fetch('/submit-contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        } else {
            throw new Error('Failed to submit form');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting the form. Please try again later.');
    }
});

// Floating Label Animation
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
    
    // Check initial state
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

// Dynamic text animation
const dynamicTexts = document.querySelector('.dynamic-texts');
const phrases = dynamicTexts.querySelectorAll('li');
let currentPhrase = 0;

function animateText() {
    // Remove active class from current phrase
    phrases[currentPhrase].classList.remove('active');
    
    // Move to next phrase
    currentPhrase = (currentPhrase + 1) % phrases.length;
    
    // Add active class to new phrase
    phrases[currentPhrase].classList.add('active');
}

// Set initial active phrase
phrases[0].classList.add('active');

// Start animation loop
setInterval(animateText, 3000);

// Image error handling
function handleImageError(img) {
    img.onerror = null; // Prevent infinite loop
    img.src = './assets/images/placeholder.jpg';
    img.classList.add('image-error');
}

// Add error handling to all images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onerror = () => handleImageError(img);
    });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports lazy loading
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Project scroll functionality
const projectsContainer = document.querySelector('.projects-container');
const prevButton = document.querySelector('.scroll-btn.prev');
const nextButton = document.querySelector('.scroll-btn.next');

// Show/hide scroll buttons based on scroll position
function updateScrollButtons() {
    const { scrollLeft, scrollWidth, clientWidth } = projectsContainer;
    
    prevButton.style.opacity = scrollLeft > 0 ? '1' : '0';
    nextButton.style.opacity = scrollLeft < (scrollWidth - clientWidth) ? '1' : '0';
}

// Smooth scroll to next/previous project
function scrollProjects(direction) {
    const cardWidth = projectsContainer.querySelector('.project-card').offsetWidth;
    const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
    
    projectsContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

// Initialize scroll buttons
if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => scrollProjects('prev'));
    nextButton.addEventListener('click', () => scrollProjects('next'));
    projectsContainer.addEventListener('scroll', updateScrollButtons);
    
    // Initial button state
    updateScrollButtons();
}

// Intersection Observer for project cards
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    projectObserver.observe(card);
});

// Touch scroll handling for mobile
let touchStartX = 0;
let touchEndX = 0;

projectsContainer.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

projectsContainer.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            scrollProjects('next');
        } else {
            scrollProjects('prev');
        }
    }
}
